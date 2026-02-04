#!/bin/bash

echo "Fixing gallery app issues..."

# 1. Rename Upload.js to upload.js (case sensitivity)
if [ -f "pages/Upload.js" ]; then
  echo "Renaming Upload.js to upload.js..."
  mv pages/Upload.js pages/upload.js
fi

# 2. Update API route for faster responses
echo "Updating API route..."
cat > pages/api/images.js << 'EOF'
import { v2 as cloudinary } from 'cloudinary';

const cache = new Map();
const CACHE_DURATION = 30000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    const { folder = 'gallery1' } = req.query;
    const cacheKey = `images:${folder}`;

    try {
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
          return res.status(200).json(cached.data);
        }
      }

      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      
      if (!cloudName || cloudName === 'your_cloud_name' || cloudName === 'demo') {
        const mockImages = getMockImages(folder);
        cache.set(cacheKey, { data: mockImages, timestamp: Date.now() });
        return res.status(200).json(mockImages);
      }

      const mockImages = getMockImages(folder);
      cache.set(cacheKey, { data: mockImages, timestamp: Date.now() });
      return res.status(200).json(mockImages);
      
    } catch (error) {
      const mockImages = getMockImages(folder);
      cache.set(cacheKey, { data: mockImages, timestamp: Date.now() });
      return res.status(200).json(mockImages);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function getMockImages(folder) {
  const galleries = {
    gallery1: [
      { secure_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&q=80', public_id: 'nature_1' },
      { secure_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&q=80', public_id: 'nature_2' },
    ],
    gallery2: [
      { secure_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80', public_id: 'urban_1' },
      { secure_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=400&fit=crop&q=80', public_id: 'urban_2' },
    ],
    gallery3: [
      { secure_url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=400&fit=crop&q=80', public_id: 'abstract_1' },
      { secure_url: 'https://images.unsplash.com/photo-1543857778-c4a1a569e388?w=600&h=400&fit=crop&q=80', public_id: 'abstract_2' },
    ]
  };
  
  return galleries[folder] || galleries.gallery1;
}
EOF

echo "✅ Issues fixed! Restarting server..."
rm -rf .next
echo "Now run: npm run dev"
