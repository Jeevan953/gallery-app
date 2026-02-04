require('./load-env.js');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

async function setupFolders() {
  console.log('📁 Setting up Cloudinary folder structure...\n');
  
  try {
    // Create gallery folder structure
    const folders = ['gallery/uploads', 'gallery/nature', 'gallery/portraits'];
    
    // Create folders by uploading a placeholder image
    for (const folder of folders) {
      try {
        console.log(`Creating folder: ${folder}`);
        
        // Upload a tiny placeholder image to create the folder
        const result = await cloudinary.uploader.upload(
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PC9zdmc+',
          {
            folder: folder,
            public_id: '.folder_marker',
            overwrite: true,
            invalidate: true
          }
        );
        
        console.log(`✅ Created folder: ${folder}`);
        
        // Delete the placeholder image
        await cloudinary.uploader.destroy(result.public_id);
        
      } catch (error) {
        console.log(`ℹ️ Folder ${folder} already exists or error:`, error.message);
      }
    }
    
    console.log('\n🎉 Folder structure created!');
    console.log('\n📁 Your Cloudinary folder structure:');
    console.log('   - gallery/uploads');
    console.log('   - gallery/nature');
    console.log('   - gallery/portraits');
    
    // Move some existing images to the new structure
    console.log('\n📤 To move your existing images:');
    console.log('1. Go to https://cloudinary.com/console');
    console.log('2. Click "Media Library"');
    console.log('3. Select images and move them to gallery/ folder');
    
  } catch (error) {
    console.error('Error setting up folders:', error.message);
  }
}

setupFolders();