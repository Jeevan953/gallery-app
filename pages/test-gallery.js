// pages/test-gallery.js
import { useState, useEffect } from 'react';

export default function TestGallery() {
  const galleries = [
    { id: 'gallery', name: 'ALL' },
    { id: 'uploads', name: 'UPLOADS' },
    { id: 'nature', name: 'NATURE' },
    { id: 'portraits', name: 'PORTRAITS' },
    { id: 'psalm1', name: 'PSALM 1' }
  ];

  const [activeGallery, setActiveGallery] = useState('gallery');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (activeGallery === 'psalm1') {
      // Load Psalm 1 images
      const psalmImages = [];
      for (let i = 1; i <= 7; i++) {
        psalmImages.push({
          secure_url: `/Psalm 1/psalm1_${i}.png`,
          public_id: `psalm1_${i}`
        });
      }
      setImages(psalmImages);
    } else {
      // Load from API for other galleries
      fetch(`/api/images?folder=${activeGallery}`)
        .then(res => res.json())
        .then(data => setImages(data))
        .catch(err => console.error('Error:', err));
    }
  }, [activeGallery]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Test Gallery with Psalm 1</h1>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {galleries.map((gallery) => (
          <button
            key={gallery.id}
            onClick={() => setActiveGallery(gallery.id)}
            className={`px-4 py-2 rounded-lg ${
              activeGallery === gallery.id
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            {gallery.name}
          </button>
        ))}
      </div>

      <p className="mb-4">
        Active Gallery: <strong>{activeGallery}</strong> | 
        Images: <strong>{images.length}</strong>
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow">
            <img 
              src={img.secure_url} 
              alt={img.public_id}
              className="w-full h-48 object-cover rounded"
            />
            <p className="mt-2 text-center text-sm">{img.public_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}