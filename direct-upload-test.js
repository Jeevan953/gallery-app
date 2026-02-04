// Load environment first
require('./load-env.js');

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function directUploadTest() {
  console.log('📤 Testing direct upload to Cloudinary...\n');
  
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
  if (!uploadPreset) {
    console.log('❌ ERROR: Upload preset not configured!');
    console.log('\n📝 To configure upload preset:');
    console.log('1. Go to Cloudinary Console: https://cloudinary.com/console');
    console.log('2. Settings → Upload → Upload presets');
    console.log('3. Create a new upload preset:');
    console.log('   - Name: gallery_upload (or any name)');
    console.log('   - Signing mode: Unsigned (for testing)');
    console.log('   - Folder: gallery/uploads');
    console.log('   - Save');
    console.log('4. Update .env.local with:');
    console.log('   NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name');
    return;
  }
  
  console.log(`✅ Upload preset found: ${uploadPreset}`);
  
  // Test upload with a public URL
  const testImageUrl = 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&q=80';
  
  try {
    console.log('\n📤 Testing upload...');
    
    const result = await cloudinary.uploader.upload(testImageUrl, {
      upload_preset: uploadPreset,
      folder: 'gallery/uploads',
      public_id: 'test_upload_' + Date.now(),
      tags: ['test', 'gallery']
    });
    
    console.log('✅ Upload successful!');
    console.log('📊 Upload details:');
    console.log(`  - URL: ${result.secure_url}`);
    console.log(`  - Public ID: ${result.public_id}`);
    console.log(`  - Format: ${result.format}`);
    console.log(`  - Size: ${Math.round(result.bytes/1024)} KB`);
    
    console.log('\n🎉 Your Cloudinary is working!');
    console.log('💡 You can now upload images via:');
    console.log('   1. Web interface: http://localhost:3000/upload');
    console.log('   2. Cloudinary Console');
    
  } catch (error) {
    console.error('❌ Upload failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('1. Check if upload preset exists in Cloudinary');
    console.log('2. Check if upload preset is "Unsigned"');
    console.log('3. Check your API credentials');
  }
}

directUploadTest();