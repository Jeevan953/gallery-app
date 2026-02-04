import { v2 as cloudinary } from 'cloudinary';

const cache = new Map();
const CACHE_DURATION = 30000;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');
  
  if (req.method === 'GET') {
    const { folder = 'all' } = req.query;
    const cacheKey = `cloudinary-images:${folder}`;

    try {
      // Check cache first
      if (cache.has(cacheKey)) {
        const cached = cache.get(cacheKey);
        if (Date.now() - cached.timestamp < CACHE_DURATION) {
          console.log('Serving from cache:', folder);
          return res.status(200).json(cached.data);
        }
      }

      // Configure Cloudinary
      cloudinary.config({
        cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true,
        timeout: 5000
      });

      console.log('Fetching from Cloudinary for:', folder);

      let result;
      try {
        // Map folder names to your Cloudinary structure
        if (folder === 'all') {
          // Get all images
          result = await cloudinary.api.resources({
            type: 'upload',
            max_results: 100,
            context: true
          });
        } else if (folder === 'uploads') {
          // Get images from UPLOADS folder
          result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'UPLOADS',
            max_results: 50,
            context: true
          });
        } else if (folder === 'nature') {
          // Get images from NATURE folder
          result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'NATURE',
            max_results: 50,
            context: true
          });
        } else if (folder === 'portraits') {
          // Get images from PORTRAITS folder
          result = await cloudinary.api.resources({
            type: 'upload',
            prefix: 'PORTRAITS',
            max_results: 50,
            context: true
          });
        } else {
          result = { resources: [] };
        }
      } catch (cloudinaryError) {
        console.log('Cloudinary API error:', cloudinaryError.message);
        return res.status(200).json([]);
      }

      const images = result.resources || [];
      
      console.log(`✅ Found ${images.length} images for ${folder}`);
      
      // Cache the results
      cache.set(cacheKey, { data: images, timestamp: Date.now() });
      return res.status(200).json(images);
      
    } catch (error) {
      console.error('API Error:', error.message);
      return res.status(200).json([]);
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}