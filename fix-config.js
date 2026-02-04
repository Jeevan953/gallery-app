const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing Gallery App Configuration...\n');

const envPath = path.join(__dirname, '.env.local');
const envExample = `# Cloudinary Configuration - REPLACE WITH YOUR ACTUAL VALUES
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_name

# If you don't have Cloudinary yet, leave these empty to use demo images
# NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
# NEXT_PUBLIC_CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=
# NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
`;

if (!fs.existsSync(envPath)) {
  console.log('📄 Creating .env.local file...');
  fs.writeFileSync(envPath, envExample);
  console.log('✅ Created .env.local');
  console.log('\n📝 Please edit .env.local with your Cloudinary credentials');
} else {
  console.log('✅ .env.local already exists');
  
  // Check if it has placeholder values
  const content = fs.readFileSync(envPath, 'utf8');
  if (content.includes('your_actual_cloud_name') || content.includes('your_cloud_name')) {
    console.log('⚠️  Found placeholder values in .env.local');
    console.log('💡 Please update with your actual Cloudinary credentials');
  } else {
    console.log('✅ .env.local appears to have real values');
  }
}

console.log('\n🚀 Quick Start:');
console.log('1. Run: node load-env.js');
console.log('2. Run: node check-cloudinary-folders.js');
console.log('3. Run: npm run dev');
console.log('4. Visit: http://localhost:3000');
console.log('\n📤 To upload images:');
console.log('1. Visit: http://localhost:3000/upload');
console.log('2. Or use Cloudinary Console: https://cloudinary.com/console');