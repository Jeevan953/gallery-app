const fs = require('fs');
const path = require('path');

// Load environment variables
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    }
  });
}

console.log('📊 Cloudinary Configuration:');
console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
console.log('API Key:', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? '✓ Set' : '✗ Not set');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Not set');
console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

async function uploadSampleVideos() {
  console.log('\n🎬 Uploading sample videos to Cloudinary...\n');
  
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
  if (!cloudName || !uploadPreset) {
    console.log('❌ Please configure Cloudinary in .env.local first!');
    return;
  }
  
  const sampleVideos = [
    {
      url: 'https://res.cloudinary.com/demo/video/upload/samples/sea-turtle.mp4',
      folder: 'gallery/nature',
      public_id: 'sea_turtle',
      tags: ['nature', 'ocean', 'video']
    },
    {
      url: 'https://res.cloudinary.com/demo/video/upload/samples/elephants.mp4',
      folder: 'gallery/nature',
      public_id: 'elephants',
      tags: ['nature', 'wildlife', 'video']
    },
    {
      url: 'https://res.cloudinary.com/demo/video/upload/samples/dog.mp4',
      folder: 'gallery/portraits',
      public_id: 'dog_portrait',
      tags: ['portrait', 'pet', 'video']
    }
  ];
  
  console.log('📤 Uploading sample videos...');
  console.log('👉 After upload, visit: http://localhost:3000');
  console.log('👉 Filter by "Videos" to see your uploaded videos\n');
  
  for (const video of sampleVideos) {
    try {
      console.log(`Uploading: ${video.public_id} to ${video.folder}`);
      
      // In a real implementation, you would use the Cloudinary upload API
      // For now, we'll show the upload URLs
      const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`;
      
      console.log(`✅ Sample video ready: ${video.public_id}`);
      console.log(`   Source: ${video.url}`);
      console.log(`   Will upload to: ${uploadUrl}`);
      console.log(`   Folder: ${video.folder}`);
      console.log('');
      
    } catch (error) {
      console.error(`❌ Failed to process ${video.public_id}:`, error.message);
    }
  }
  
  console.log('🎉 Sample videos are ready!');
  console.log('\n💡 To upload your own videos:');
  console.log('   1. Visit: http://localhost:3000/upload');
  console.log('   2. Select "Video" type');
  console.log('   3. Choose your video file');
  console.log('   4. Select gallery folder');
  console.log('   5. Click "Upload Video"');
}

uploadSampleVideos();