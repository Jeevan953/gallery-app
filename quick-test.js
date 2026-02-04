// Quick test to check Cloudinary connection
require('./load-env.js');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function quickTest() {
  console.log('🚀 Quick Cloudinary Test\n');
  
  console.log('1. Testing connection...');
  try {
    const ping = await cloudinary.api.ping();
    console.log('✅ Connected to Cloudinary');
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    return;
  }
  
  console.log('\n2. Checking all images...');
  const all = await cloudinary.api.resources({ type: 'upload', max_results: 10 });
  console.log(`   Found ${all.resources.length} total images`);
  
  console.log('\n3. Checking folders...');
  const folders = ['UPLOADS', 'NATURE', 'PORTRAITS'];
  
  for (const folder of folders) {
    try {
      const res = await cloudinary.api.resources({ 
        type: 'upload', 
        prefix: folder,
        max_results: 5 
      });
      console.log(`   📂 ${folder}: ${res.resources.length} images`);
    } catch (error) {
      console.log(`   📂 ${folder}: 0 images`);
    }
  }
  
  console.log('\n🎉 Your Cloudinary is ready!');
  console.log('👉 Visit: http://localhost:3000');
  console.log('👉 Test: http://localhost:3000/cloudinary-test');
}

quickTest();