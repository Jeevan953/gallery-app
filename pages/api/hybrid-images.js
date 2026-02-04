import { v2 as cloudinary } from 'cloudinary';

const cache = new Map();
const CACHE_DURATION = 30000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (req.method === 'GET') {
    const { folder = 'all' } = req.query;
    const cacheKey = `images:${folder}`;

    try {
      // Check cache
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
          return res.status(200).json(cached.data);
        }
      }

      // Try to get from Cloudinary first
      try {
        cloudinary.config({
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          secure: true,
          timeout: 3000
        });

        let result;
        if (folder === 'all') {
          result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'gallery',
            max_results: 50
          });
        } else {
          result = await cloudinary.api.resources({
            type: 'upload',
            prefix: `gallery/${folder}`,
            max_results: 50
          });
        }

        const cloudinaryImages = result.resources || [];
        
        if (cloudinaryImages.length > 0) {
          console.log(`✅ Using ${cloudinaryImages.length} images from Cloudinary for ${folder}`);
          cache.set(cacheKey, { data: cloudinaryImages, timestamp: Date.now() });
          return res.status(200).json(cloudinaryImages);
        }
        
        // If Cloudinary has no images, fall back to mock
        console.log(`⚠️ No Cloudinary images for ${folder}, using mock data`);
        
      } catch (cloudinaryError) {
        console.log(`⚠️ Cloudinary error for ${folder}:`, cloudinaryError.message);
        // Fall through to mock data
      }

      // Use mock data
      const mockImages = getMockImages(folder);
      cache.set(cacheKey, { data: mockImages, timestamp: Date.now() });
      return res.status(200).json(mockImages);
      
    } catch (error) {
      console.error('API Error:', error.message);
      const mockImages = getMockImages(folder);
      return res.status(200).json(mockImages);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

function getMockImages(folder) {
  // Same mock data as before
  const galleries = {
    all: [
      { secure_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&q=80', public_id: 'nature_1' },
      { secure_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80', public_id: 'urban_1' },
      { secure_url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=600&h=400&fit=crop&q=80', public_id: 'abstract_1' },
      { secure_url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&h=400&fit=crop&q=80', public_id: 'portrait_1' },
    ],
    uploads: [
      { secure_url: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop&q=80', public_id: 'upload_1' },
      { secure_url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=400&fit=crop&q=80', public_id: 'upload_2' },
    ],
    nature: [
      { secure_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&q=80', public_id: 'nature_1' },
      { secure_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&q=80', public_id: 'nature_2' },
    ],
    portraits: [
      { secure_url: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&h=400&fit=crop&q=80', public_id: 'portrait_1' },
      { secure_url: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=600&h=400&fit=crop&q=80', public_id: 'portrait_2' },
    ]
  };
  
  return galleries[folder] || galleries.all;
}