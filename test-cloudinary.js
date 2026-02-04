// Create a test file: test-cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function testFolders() {
  console.log('Testing Cloudinary folders...\n');
  
  const folders = ['gallery', 'gallery/nature', 'gallery/portraits', 'gallery/uploads'];
  
  for (const folder of folders) {
    try {
      // Method 1: Using folder parameter
      console.log(`Testing folder: "${folder}"`);
      
      const result = await cloudinary.api.resources({
        type: 'upload',
        folder: folder,
        max_results: 10,
      });
      
      console.log(`✅ Folder method: ${result.resources?.length || 0} images`);
      
      // Method 2: Using prefix
      const prefixResult = await cloudinary.api.resources({
        type: 'upload',
        prefix: folder,
        max_results: 10,
      });
      
      console.log(`✅ Prefix method: ${prefixResult.resources?.length || 0} images\n`);
      
    } catch (error) {
      console.log(`❌ Error for "${folder}":`, error.message, '\n');
    }
  }
}

testFolders();