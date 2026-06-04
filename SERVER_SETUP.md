# Server Setup & Configuration

This guide explains how to run the Foodtales Site with both the frontend and backend servers.

## Requirements

- Node.js v14+ installed
- npm or yarn package manager
- Port 5174 available (Vite)
- Port 3001 available (Express API)

## Installation

First, install all dependencies:

```bash
npm install
```

This installs:
- Vite & React (frontend)
- Express & Multer (backend for uploads)

## Running the Servers

### Option 1: Automatic (Recommended)

Run both servers with one command:

```bash
chmod +x START_SERVERS.sh
./START_SERVERS.sh
```

This starts:
- ✅ Vite dev server on port 5174
- ✅ Express API server on port 3001

### Option 2: Manual (Two Terminals)

**Terminal 1 - Start Vite Dev Server:**
```bash
npm run dev
```
Output: `Local: http://localhost:5174/`

**Terminal 2 - Start Express API Server:**
```bash
node server.js
```
Output: `Server running at http://localhost:3001`

### Option 3: Production Build & Run

Build the site and run with Express server:

```bash
npm run prod
```

## Admin Page Access

**Development:**
- Frontend: `http://localhost:5174/admin`
- Password: `premnirvana2025`

**Production:**
- Access: `http://your-domain/admin`
- Password: `premnirvana2025`

## Admin Features

### 1. Image Upload
- Click "📸 Select Image" on any menu item
- Choose image from phone/computer
- Preview appears before upload
- Click "✓ Upload" to save
- Image saves to `/public/menu-images/[item-number].jpg`

### 2. Edit Item Names
- Click "✏️" next to item name
- Type new name
- Click "✓" to save
- Click "✕" to cancel
- Changes saved to `/data/menu-names.json`

### 3. Share Admin Link
- Click "📋 Copy Admin Link"
- Paste to share with authorized users
- Works on mobile browsers

## API Endpoints

### Image Upload
**POST** `/api/upload-menu-image`
- Body: FormData with `image` file and `itemNumber`
- Response: `{ success: true, message: "..." }`

### Update Item Name
**POST** `/api/update-name`
- Body: `{ itemNumber: 5, name: "New Name" }`
- Response: `{ success: true, message: "..." }`

### Get Custom Names
**GET** `/api/menu-names`
- Response: `{ "5": "Custom Name", "10": "Another Name" }`

## Directory Structure

```
/home/ubuntu/foodtales-site/
├── src/
│   └── App.jsx              # React app with AdminPage
├── public/
│   └── menu-images/         # Uploaded food images
│       ├── 1.jpg
│       ├── 2.jpg
│       └── ...
├── data/
│   └── menu-names.json      # Custom menu item names
├── server.js                # Express API server
├── vite.config.js           # Vite configuration
└── package.json             # Dependencies
```

## Troubleshooting

### Port Already in Use
If ports 5174 or 3001 are in use:

```bash
# Find process using port 5174
lsof -i :5174

# Find process using port 3001
lsof -i :3001

# Kill process (replace PID)
kill -9 <PID>
```

### Images Not Uploading
1. Ensure Express server is running on port 3001
2. Check `/public/menu-images/` directory exists
3. Check browser console for error messages
4. Verify file size < 5MB
5. Try uploading again

### Images Not Showing
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh (Ctrl+Shift+R)
3. Check file exists: `/public/menu-images/[item-number].jpg`
4. Verify Vite is serving the image correctly

### Can't Access Admin Page
1. Verify you're on `/admin` (not hash route)
2. Check password: `premnirvana2025`
3. Verify Vite dev server is running
4. Check browser console for errors

## Development Tips

### Live Reload
- Vite automatically reloads when you edit React components
- Changes to `server.js` require server restart

### Environment Variables
To use different ports:

```bash
PORT=3000 node server.js      # Use port 3000 for Express
npm run dev -- --port 5173    # Use port 5173 for Vite
```

### Testing API Directly

```bash
# Upload image using curl
curl -X POST http://localhost:3001/api/upload-menu-image \
  -F "image=@image.jpg" \
  -F "itemNumber=5"

# Update name using curl
curl -X POST http://localhost:3001/api/update-name \
  -H "Content-Type: application/json" \
  -d '{"itemNumber": 5, "name": "New Name"}'

# Get custom names
curl http://localhost:3001/api/menu-names
```

## CORS Configuration

The Express server includes CORS headers for development:
- `Access-Control-Allow-Origin: *`
- Allows requests from any origin (safe for development)

For production, update `server.js` to restrict CORS to your domain:

```javascript
res.header('Access-Control-Allow-Origin', 'https://yourdomain.com');
```

## Database (File-based)

Custom menu names are stored in JSON format at `/data/menu-names.json`:

```json
{
  "5": "Delicious Corn Salad",
  "10": "Fresh Watermelon Juice"
}
```

To reset all custom names, delete this file and restart the server.

## Production Deployment

When deploying to production:

1. Build the frontend:
   ```bash
   npm run build
   ```

2. Run production server:
   ```bash
   npm run prod
   ```

3. Configure CORS in `server.js` for your domain

4. Set environment variable for port (if needed):
   ```bash
   PORT=3001 npm run prod
   ```

5. Use a process manager (PM2, systemd) to keep servers running:
   ```bash
   pm2 start server.js --name "foodtales-api"
   pm2 start "npm run build && npm run dev" --name "foodtales-frontend"
   ```

## Support

For issues or questions, check:
- Browser developer console (F12) for errors
- Server console for logs
- `/ADMIN_GUIDE.md` for admin-specific help
