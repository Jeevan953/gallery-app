// A simpler, faster API route for images
export default async function handler(req, res) {
  const { folder = 'gallery1' } = req.query;
  
  // Enable CORS and caching
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'public, max-age=60');
  
  try {
    // Check if Cloudinary is configured
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
    
    if (!cloudName || cloudName === 'your_cloud_name') {
      console.log('Using mock data - Cloudinary not configured');
      return res.status(200).json(getMockImages(folder));
    }
    
    // If Cloudinary is configured, try to fetch from it
    const images = await fetchFromCloudinary(folder);
    return res.status(200).json(images);
    
  } catch (error) {
    console.error('Error in simple-images API:', error.message);
    // Always return mock data as fallback
    return res.status(200).json(getMockImages(folder));
  }
}

async function fetchFromCloudinary(folder) {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  
  // Simple fetch without Cloudinary SDK
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload`;
  const params = new URLSearchParams({
    max_results: '30',
    prefix: `gallery/${folder}`,
    type: 'upload'
  });
  
  const response = await fetch(`${url}?${params.toString()}`, {
    headers: {
      'Authorization': `Basic ${btoa(`${apiKey}:`)}`
    }
  });
  
  if (!response.ok) {
    throw new Error(`Cloudinary API error: ${response.status}`);
  }
  
  const data = await response.json();
  return data.resources || [];
}

function getMockImages(folder) {
  const galleries = {
    gallery1: [
      { 
        secure_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&q=80',
        url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=400&h=300&fit=crop&q=80',
        public_id: 'nature_1',
        format: 'jpg',
        width: 400,
        height: 300,
        bytes: 250000
      },
      { 
        secure_url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&q=80',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop&q=80',
        public_id: 'nature_2',
        format: 'jpg',
        width: 400,
        height: 300,
        bytes: 250000
      },
    ],
    gallery2: [
      { 
        secure_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&q=80',
        url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop&q=80',
        public_id: 'urban_1',
        format: 'jpg',
        width: 400,
        height: 300,
        bytes: 250000
      },
      { 
        secure_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&q=80',
        url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop&q=80',
        public_id: 'urban_2',
        format: 'jpg',
        width: 400,
        height: 300,
        bytes: 250000
      },
    ],
    gallery3: [
      { 
        secure_url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=300&fit=crop&q=80',
        url: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=400&h=300&fit=crop&q=80',
        public_id: 'abstract_1',
        format: 'jpg',
        width: 400,
        height: 300,
        bytes: 250000
      },
      { 
        secure_url: 'https://images.unsplash.com/photo-1543857778-c4a1a569e388?w=400&h=300&fit=crop&q=80',
        url: 'https://images.unsplash.com/photo-1543857778-c4a1a569e388?w=400&h=300&fit=crop&q=80',
        public_id: 'abstract_2',
        format: 'jpg',
        width: 400,
        height: 300,
        bytes: 250000
      },
    ]
  };
  
  return galleries[folder] || galleries.gallery1;
}