const fs = require('fs');
const path = require('path');

console.log('📊 Gallery App Configuration Check\n');

// Check .env.local
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local exists');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const lines = envContent.split('\n');
  
  lines.forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, value] = line.split('=');
      if (key && value) {
        const isSet = !value.includes('your_') && value.trim().length > 5;
        console.log(`${isSet ? '✅' : '⚠️'} ${key}=${isSet ? '***SET***' : value}`);
      }
    }
  });
} else {
  console.log('❌ .env.local not found');
}

// Check package.json
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  console.log(`\n📦 Package: ${packageJson.name} v${packageJson.version}`);
  console.log(`✅ Dependencies: ${Object.keys(packageJson.dependencies || {}).length}`);
}

// Check next.config.js
const nextConfigPath = path.join(__dirname, 'next.config.js');
if (fs.existsSync(nextConfigPath)) {
  console.log('✅ next.config.js exists');
}

console.log('\n🚀 To start: npm run dev');
console.log('🌐 Your app will be at: http://localhost:3000');