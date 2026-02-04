const fs = require('fs');
const path = require('path');

// Load .env.local
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

// Log what we found
console.log('📊 Loaded Environment Variables:');
console.log('Cloud Name:', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'Not set');
console.log('API Key:', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? 'Set' : 'Not set');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set');
console.log('Upload Preset:', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'Not set');