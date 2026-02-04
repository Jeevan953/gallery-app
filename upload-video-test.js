require('./load-env.js');

const cloudinary = require('cloudinary').v2;
const axios = require('axios');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadVideoTest() {
  console.log('🎬 Uploading test videos to Cloudinary...\n');
  
  const testVideos = [
    {
      url: 'https://res.cloudinary.com/demo/video/upload/samples/sea-turtle.mp4',
      folder: 'gallery/uploads',
      public_id: 'sea_turtle',
      tags: ['video', 'nature', 'ocean']
    },
    {
      url: 'https://res.cloudinary.com/demo/video/upload/samples/elephants.mp4',
      folder: 'gallery/nature',
      public_id: 'elephants',
      tags: ['video', 'nature', 'wildlife']
    },
    {
      url: 'https://res.cloudinary.com/demo/video/upload/samples/dog.mp4',
      folder: 'gallery/portraits',
      public_id: 'dog_portrait',
      tags: ['video', 'portrait', 'pet']
    }
  ];
  
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
  for (const video of testVideos) {
    try {
      console.log(`📤 Uploading to ${video.folder}: ${video.public_id}`);
      
      const result = await cloudinary.uploader.upload(video.url, {
        resource_type: 'video',
        folder: video.folder,
        public_id: video.public_id,
        tags: video.tags,
        upload_preset: uploadPreset
      });
      
      console.log(`✅ Uploaded: ${result.secure_url}`);
      console.log(`   Duration: ${result.duration}s, Size: ${Math.round(result.bytes/1024/1024)}MB`);
      
    } catch (error) {
      console.error(`❌ Failed to upload ${video.public_id}:`, error.message);
    }
  }
  
  console.log('\n🎉 Test videos uploaded!');
  console.log('\n👉 Check your gallery at: http://localhost:3000');
  console.log('👉 Upload your own videos at: http://localhost:3000/upload');
}

uploadVideoTest();