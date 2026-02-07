import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let folder = req.query.folder || 'Psalm 1';
  folder = decodeURIComponent(folder);
  
  if (folder === 'gallery') {
    folder = 'Psalm 1';
  }

  const publicDir = path.join(process.cwd(), 'public');
  const folderPath = path.join(publicDir, folder);

  console.log(`🔍 Looking for images in: ${folderPath}`);

  try {
    if (!fs.existsSync(folderPath)) {
      console.log(`❌ Folder not found: ${folderPath}`);
      return res.status(404).json({ 
        error: `Folder "${folder}" not found`,
        hint: `Make sure you have a folder named "${folder}" in the public directory`
      });
    }

    const allFiles = fs.readdirSync(folderPath);
    console.log(`📄 Found ${allFiles.length} files in folder`);

    const imageFiles = allFiles.filter(file => {
      return file.toLowerCase().endsWith('.png');
    });

    console.log(`🖼️  Found ${imageFiles.length} PNG files`);

    imageFiles.sort((a, b) => {
      const getNumber = (filename) => {
        const match = filename.match(/psalm1_(\d+)\.png/);
        return match ? parseInt(match[1]) : 0;
      };
      return getNumber(a) - getNumber(b);
    });

    const images = imageFiles.map((file, index) => {
      const url = `/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
      
      return {
        url: url,
        secure_url: url,
        public_id: file,
        filename: file,
        id: index + 1,
        name: `psalm1_${index + 1}`,
        format: 'PNG',
        width: 800,
        height: 600
      };
    });

    console.log(`✅ Returning ${images.length} images`);
    return res.status(200).json(images);

  } catch (error) {
    console.error('💥 Error:', error);
    return res.status(500).json({ 
      error: 'Failed to read images',
      message: error.message 
    });
  }
}
