require('./load-env.js');

const cloudinary = require('cloudinary').v2;
const axios = require('axios');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function uploadTestImages() {
  console.log('📤 Uploading test images to Cloudinary...\n');
  
  const testImages = [
    {
      url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&q=80',
      folder: 'gallery/nature',
      public_id: 'nature_mountain',
      tags: ['nature', 'mountain', 'landscape']
    },
    {
      url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80',
      folder: 'gallery/nature',
      public_id: 'nature_city',
      tags: ['nature', 'city', 'urban']
    },
    {
      url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=400&fit=crop&q=80',
      folder: 'gallery/portraits',
      public_id: 'portrait_art',
      tags: ['portrait', 'art', 'abstract']
    },
    {
      url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&h=400&fit=crop&q=80',
      folder: 'gallery/portraits',
      public_id: 'portrait_model',
      tags: ['portrait', 'model', 'person']
    },
    {
      url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop&q=80',
      folder: 'gallery/uploads',
      public_id: 'upload_gradient',
      tags: ['upload', 'gradient', 'color']
    }
  ];
  
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  
  for (const image of testImages) {
    try {
      console.log(`Uploading to ${image.folder}: ${image.public_id}`);
      
      // Download image first
      const response = await axios.get(image.url, { responseType: 'arraybuffer' });
      const imageBuffer = Buffer.from(response.data, 'binary');
      
      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${imageBuffer.toString('base64')}`,
        {
          folder: image.folder,
          public_id: image.public_id,
          tags: image.tags,
          upload_preset: uploadPreset
        }
      );
      
      console.log(`✅ Uploaded: ${result.secure_url}`);
      console.log(`   Size: ${Math.round(result.bytes/1024)}KB, Format: ${result.format}`);
      
    } catch (error) {
      console.error(`❌ Failed to upload ${image.public_id}:`, error.message);
    }
  }
  
  console.log('\n🎉 Test images uploaded!');
  console.log('\n👉 Check your gallery at: http://localhost:3000');
}

uploadTestImages();