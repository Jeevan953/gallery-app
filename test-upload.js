// Load environment first
require('./load-env.js');

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function testCloudinary() {
  console.log('\n🔍 Testing Cloudinary connection...');
  
  try {
    // Test 1: Check if we can ping Cloudinary
    console.log('\n1. Testing Cloudinary connection...');
    const ping = await cloudinary.api.ping();
    console.log('✅ Cloudinary connection successful:', ping);
    
    // Test 2: List existing resources
    console.log('\n2. Checking existing images...');
    const resources = await cloudinary.api.resources({
      type: 'upload',
      max_results: 10
    });
    
    console.log(`📊 Found ${resources.resources.length} images in Cloudinary`);
    
    if (resources.resources.length > 0) {
      console.log('Sample images:');
      resources.resources.slice(0, 3).forEach((img, i) => {
        console.log(`  ${i+1}. ${img.public_id} (${img.format})`);
      });
    } else {
      console.log('ℹ️ No images found. You can upload some!');
    }
    
    // Test 3: Check upload preset
    console.log('\n3. Checking upload preset...');
    const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (uploadPreset) {
      console.log(`✅ Upload preset configured: ${uploadPreset}`);
    } else {
      console.log('❌ Upload preset not configured');
    }
    
  } catch (error) {
    console.error('❌ Cloudinary test failed:', error.message);
    console.log('Check your environment variables in .env.local');
  }
}

testCloudinary();