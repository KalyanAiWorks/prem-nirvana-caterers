# Admin Upload Page Guide

## Overview
The admin page allows Gopinath to upload custom food images for each menu item. Images are stored locally and displayed on the main menu modal.

## Access the Admin Page

**URL:** `http://site-url/admin`

**Password:** `premnirvana2025`

## Features

1. **Password Protection** - Only authorized users can access the admin page
2. **Grid View** - All 242 menu items displayed with current images
3. **Image Upload** - Click "📸 Select Image" to choose an image from phone/computer
4. **Image Preview** - See the image before uploading
5. **Upload Status** - Visual feedback for upload progress (uploading, success, error)
6. **Mobile-Friendly** - Fully responsive design for phone uploads
7. **Share Link** - Copy button to share admin URL with others

## How to Upload Images

1. Navigate to `/admin` and enter password
2. Find the menu item by number (e.g., #3 for the third item)
3. Click "📸 Select Image" to choose a food photo
4. Preview appears in the card
5. Click "✓ Upload" to save the image
6. Wait for "✓ Uploaded" confirmation
7. The image now appears on the menu modal

## Menu Item Numbering

Items are numbered **continuously across all categories:**

- **Salads & Drinks:** Items 1-25
- **Sweets & Ice Creams:** Items 26-56
- **Tiffins, Rotis & Rice:** Items 57-81
- **Veg Curries & Dal:** Items 82-131
- **Sambars, Sides & Chaat:** Items 132-178
- **Non-Veg:** Items 179-229
- **Live Counters:** Items 230-242

## Running the Server

### Development Mode
```bash
npm install  # Install dependencies (including express and multer)
npm run dev  # Development server on port 5174
npm run server  # Run the upload API server on port 3000 (in another terminal)
```

### Production Mode
```bash
npm run prod  # Builds and runs the full server with upload API
```

The server will:
- Serve the built React app
- Handle `/admin` route
- Process image uploads to `/public/menu-images/[item-number].jpg`
- Fall back to default images if custom ones don't exist

## Technical Details

### Image Storage
- **Location:** `/public/menu-images/`
- **Format:** `[item-number].jpg`
- **Max Size:** 5MB per image
- **Accepted Formats:** JPG, PNG, GIF, WebP

### API Endpoint
- **POST** `/api/upload-menu-image`
- **Body:** FormData with `image` file and `itemNumber`
- **Response:** `{ success: true, message: "Image uploaded successfully" }`

### Image Loading Logic
1. First attempts to load from `/menu-images/[item-number].jpg`
2. If not found, falls back to default image
3. Default images remain as backup

## Sharing the Admin Link

1. Click "📋 Copy Admin Link" button
2. Link is copied to clipboard
3. Share with `kalyan@rotomaker.com` or other authorized users
4. They can paste it in their browser to access the admin page

## Troubleshooting

**Images not uploading?**
- Check file size (max 5MB)
- Ensure it's a valid image format
- Check browser console for error messages
- Verify `/public/menu-images/` directory exists

**Images not showing on menu?**
- Clear browser cache (Ctrl+Shift+Delete)
- Try uploading again
- Check that file was saved to `/public/menu-images/`
- Verify image format is JPG/PNG/GIF

**Can't access admin page?**
- Check URL is exactly `/admin` (case-sensitive)
- Verify password is correct: `premnirvana2025`
- Ensure server is running if using production mode
