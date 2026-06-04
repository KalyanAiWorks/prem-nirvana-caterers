import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Ensure directories exist
const menuImagesDir = path.join(__dirname, 'public', 'menu-images');
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(menuImagesDir)) {
  fs.mkdirSync(menuImagesDir, { recursive: true });
}
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const menuNamesFile = path.join(dataDir, 'menu-names.json');

// Configure multer for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, menuImagesDir);
  },
  filename: (req, file, cb) => {
    // Use a temporary filename since itemNumber from req.body isn't available yet
    cb(null, `temp-${Date.now()}.jpg`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 }, // 25MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

// API endpoint for image upload
app.post('/api/upload-menu-image', (req, res, next) => {
  // Use multer middleware
  upload.single('image')(req, res, (err) => {
    if (err) {
      console.error('❌ Multer error:', err.message);
      return res.status(400).json({ error: `Upload error: ${err.message}` });
    }

    if (!req.file) {
      console.error('❌ No file provided in request');
      console.error('   Body:', req.body);
      console.error('   Headers:', req.headers);
      return res.status(400).json({ error: 'No image file provided' });
    }

    if (!req.body.itemNumber) {
      console.error('❌ No itemNumber in request body');
      console.error('   Available body fields:', Object.keys(req.body));
      return res.status(400).json({ error: 'Item number is required' });
    }

    const itemNumber = req.body.itemNumber;
    const finalFilename = `${itemNumber}.jpg`;
    const tempPath = req.file.path;
    const finalPath = path.join(menuImagesDir, finalFilename);

    try {
      // Rename the temp file to the correct item number
      fs.renameSync(tempPath, finalPath);

      console.log(`✅ Image uploaded successfully:`);
      console.log(`   Item #${itemNumber}`);
      console.log(`   Filename: ${finalFilename}`);
      console.log(`   Full path: ${finalPath}`);
      console.log(`   File size: ${(req.file.size / 1024).toFixed(2)} KB`);

      res.json({ success: true, message: 'Image uploaded successfully', itemNumber, filename: finalFilename });
    } catch (renameErr) {
      console.error('❌ Error renaming file:', renameErr.message);
      res.status(500).json({ error: `Failed to save image: ${renameErr.message}` });
    }
  });
});

// API endpoint for updating menu item names
app.post('/api/update-name', (req, res) => {
  const { itemNumber, name } = req.body;

  if (!itemNumber || !name) {
    return res.status(400).json({ error: 'Item number and name are required' });
  }

  try {
    let names = {};
    if (fs.existsSync(menuNamesFile)) {
      const data = fs.readFileSync(menuNamesFile, 'utf-8');
      names = JSON.parse(data);
    }

    names[itemNumber] = name;
    fs.writeFileSync(menuNamesFile, JSON.stringify(names, null, 2));

    console.log(`✅ Name updated: #${itemNumber} -> "${name}"`);
    res.json({ success: true, message: 'Name updated successfully' });
  } catch (error) {
    console.error('❌ Error updating name:', error.message);
    console.error('Details:', error);
    res.status(500).json({ error: `Failed to update name: ${error.message}` });
  }
});

// API endpoint to get custom menu names
app.get('/api/menu-names', (req, res) => {
  try {
    if (fs.existsSync(menuNamesFile)) {
      const data = fs.readFileSync(menuNamesFile, 'utf-8');
      return res.json(JSON.parse(data));
    }
    res.json({});
  } catch (error) {
    console.error('Error reading names:', error);
    res.status(500).json({ error: 'Failed to read names' });
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'), (err) => {
    if (err) {
      res.sendFile(path.join(__dirname, 'public', 'index.html'));
    }
  });
});

app.listen(PORT, () => {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 Foodtales Server Started');
  console.log('='.repeat(60));
  console.log(`📡 API Server: http://localhost:${PORT}`);
  console.log(`🖼️  Images Dir: ${menuImagesDir}`);
  console.log(`📝 Names File: ${menuNamesFile}`);
  console.log('='.repeat(60) + '\n');
});
