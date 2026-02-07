// pages/api/media.js
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import path from 'path';

const cache = new Map();
const CACHE_DURATION = 30000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');
  
  if (req.method === 'GET') {
    const { folder = 'gallery', type = 'all' } = req.query;
    const cacheKey = `media:${folder}:${type}`;

    try {
      // Check cache first
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
          console.log('Serving from cache:', folder, type);
          return res.status(200).json(cached.data);
        }
      }

      // SPECIAL CASE: For Psalm 1, return local images
      if (folder === 'psalm1' || folder === 'Psalm 1') {
        console.log('Loading local Psalm 1 images');
        const localImages = getLocalPsalm1Images(type);
        cache.set(cacheKey, { data: localImages, timestamp: Date.now() });
        return res.status(200).json(localImages);
      }

      // Get credentials for Cloudinary
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
      const apiSecret = process.env.CLOUDINARY_API_SECRET;

      // Check if credentials are actually set
      const hasRealCredentials = cloudName && apiKey && apiSecret && 
                                !cloudName.includes('your_cloud_name') && 
                                !cloudName.includes('demo');

      if (!hasRealCredentials) {
        console.log('Using mock data - Cloudinary not properly configured');
        const mockMedia = getMockMedia(folder, type);
        cache.set(cacheKey, { data: mockMedia, timestamp: Date.now() });
        return res.status(200).json(mockMedia);
      }

      // Configure Cloudinary
      cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
        secure: true,
        timeout: 5000
      });

      console.log('Fetching from Cloudinary for folder:', folder, 'type:', type);

      let allResources = [];
      
      try {
        // Fetch images
        if (type === 'all' || type === 'image') {
          const imageResult = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'image',
            prefix: folder === 'gallery' ? 'gallery' : `gallery/${folder}`,
            max_results: 50,
            context: true
          });
          
          if (imageResult.resources) {
            imageResult.resources.forEach(img => {
              allResources.push({ ...img, resource_type: 'image' });
            });
          }
        }
        
        // Fetch videos
        if (type === 'all' || type === 'video') {
          const videoResult = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'video',
            prefix: folder === 'gallery' ? 'gallery' : `gallery/${folder}`,
            max_results: 50,
            context: true
          });
          
          if (videoResult.resources) {
            videoResult.resources.forEach(vid => {
              allResources.push({ ...vid, resource_type: 'video' });
            });
          }
        }
        
      } catch (cloudinaryError) {
        console.log('Cloudinary API error, using mock data:', cloudinaryError.message);
        const mockMedia = getMockMedia(folder, type);
        cache.set(cacheKey, { data: mockMedia, timestamp: Date.now() });
        return res.status(200).json(mockMedia);
      }

      // Sort by creation date (newest first)
      allResources.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      console.log(`✅ Fetched ${allResources.length} media items from Cloudinary`);
      cache.set(cacheKey, { data: allResources, timestamp: Date.now() });
      return res.status(200).json(allResources);
      
    } catch (error) {
      console.error('API Error:', error.message);
      const mockMedia = getMockMedia(folder, type);
      cache.set(cacheKey, { data: mockMedia, timestamp: Date.now() });
      return res.status(200).json(mockMedia);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

// Function to get local Psalm 1 images
function getLocalPsalm1Images(type) {
  const images = [];
  
  // Only return images (no videos in Psalm 1)
  if (type === 'all' || type === 'image') {
    // Create 7 image objects for psalm1_1.png through psalm1_7.png
    for (let i = 1; i <= 7; i++) {
      images.push({
        secure_url: `/Psalm 1/psalm1_${i}.png`,
        public_id: `psalm1_${i}`,
        resource_type: 'image',
        format: 'png',
        bytes: 300000,
        created_at: new Date().toISOString(),
        width: 600,
        height: 400,
        folder: 'psalm1'
      });
    }
  }
  
  // Return empty array for video type
  return images;
}

function getMockMedia(folder, type) {
  const mockMedia = [];
  
  // Add mock images
  if (type === 'all' || type === 'image') {
    mockMedia.push(
      { 
        secure_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&q=80', 
        public_id: 'nature_mountain', 
        resource_type: 'image',
        format: 'jpg',
        bytes: 400000,
        created_at: new Date().toISOString()
      },
      { 
        secure_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80', 
        public_id: 'nature_city', 
        resource_type: 'image',
        format: 'jpg',
        bytes: 420000,
        created_at: new Date().toISOString()
      }
    );
  }
  
  // Add mock videos
  if (type === 'all' || type === 'video') {
    mockMedia.push(
      { 
        secure_url: 'https://res.cloudinary.com/demo/video/upload/samples/sea-turtle.mp4', 
        public_id: 'sea_turtle', 
        resource_type: 'video',
        format: 'mp4',
        bytes: 2500000,
        duration: 12.5,
        created_at: new Date().toISOString()
      },
      { 
        secure_url: 'https://res.cloudinary.com/demo/video/upload/samples/elephants.mp4', 
        public_id: 'elephants', 
        resource_type: 'video',
        format: 'mp4',
        bytes: 3500000,
        duration: 8.2,
        created_at: new Date().toISOString()
      }
    );
  }
  
  return mockMedia;
}