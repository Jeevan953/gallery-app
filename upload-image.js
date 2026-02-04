const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadSampleImage() {
  console.log('Uploading sample image to Cloudinary...');
  
  try {
    // Create a simple test image (if you want to upload a local file)
    // For now, let's just test the upload preset
    
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    
    if (!uploadPreset) {
      console.log('❌ Upload preset not configured');
      console.log('Please set NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env.local');
      return;
    }
    
    console.log(`✅ Upload preset found: ${uploadPreset}`);
    
    // Test direct upload using the preset
    console.log('To upload an image:');
    console.log('1. Go to http://localhost:3000/upload');
    console.log('2. Select a gallery (all, uploads, nature, portraits)');
    console.log('3. Choose an image file');
    console.log('4. Click "Upload Image"');
    console.log('');
    console.log('Or upload via Cloudinary Console:');
    console.log('1. Go to https://cloudinary.com/console');
    console.log('2. Click "Media Library"');
    console.log('3. Click "Upload"');
    console.log('4. Create folders: gallery/uploads, gallery/nature, gallery/portraits');
    console.log('5. Upload images to these folders');
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

uploadSampleImage();