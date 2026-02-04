// Load environment first
require('./load-env.js');

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function checkFolders() {
  console.log('🔍 Checking Cloudinary folder structure...\n');
  
  try {
    // List all folders
    const folders = await cloudinary.api.root_folders();
    
    console.log('📁 Root folders:');
    folders.folders.forEach(folder => {
      console.log(`  ${folder.name} (${folder.path})`);
    });
    
    // Check for gallery folder
    console.log('\n🔍 Looking for gallery folder...');
    try {
      const galleryFolder = await cloudinary.api.sub_folders('gallery');
      console.log('✅ Gallery folder exists with subfolders:');
      galleryFolder.folders.forEach(subfolder => {
        console.log(`  📂 ${subfolder.name}`);
      });
    } catch (error) {
      console.log('⚠️ Gallery folder not found or has no subfolders');
      console.log('The app will create folders automatically when you upload images.');
    }
    
    // List all images
    console.log('\n📊 All images in Cloudinary:');
    const resources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 20
    });
    
    if (resources.resources.length === 0) {
      console.log('📭 No images found in Cloudinary.');
      console.log('💡 Upload images via:');
      console.log('  1. Web interface: http://localhost:3000/upload');
      console.log('  2. Cloudinary Console: https://cloudinary.com/console');
    } else {
      console.log(`Found ${resources.resources.length} images:`);
      resources.resources.forEach((img, i) => {
        console.log(`${i+1}. ${img.public_id} - ${img.format} (${Math.round(img.bytes/1024)} KB)`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error checking Cloudinary:', error.message);
    console.log('Possible issues:');
    console.log('1. Check if Cloudinary credentials are correct in .env.local');
    console.log('2. Check if Cloudinary account is active');
    console.log('3. Check internet connection');
  }
}

checkFolders();