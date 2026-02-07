// pages/test-psalm.js
import { useState, useEffect } from 'react';

export default function TestPsalm() {
  const galleries = [
    { id: 'gallery', name: 'ALL', icon: '🖼️', type: 'cloudinary' },
    { id: 'uploads', name: 'UPLOADS', icon: '📤', type: 'cloudinary' },
    { id: 'nature', name: 'NATURE', icon: '🌿', type: 'cloudinary' },
    { id: 'portraits', name: 'PORTRAITS', icon: '👤', type: 'cloudinary' },
    { id: 'psalm1', name: 'PSALM 1', icon: '📖', type: 'local' }
  ];

  const [activeGallery, setActiveGallery] = useState('gallery');
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (activeGallery === 'psalm1') {
      // Load Psalm 1 images
      const psalmImages = [];
      for (let i = 1; i <= 7; i++) {
        psalmImages.push({
          url: `/Psalm 1/psalm1_${i}.png`,
          name: `psalm1_${i}`
        });
      }
      setImages(psalmImages);
    } else {
      setImages([]);
    }
  }, [activeGallery]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">Test Psalm 1 Gallery</h1>
      
      {/* Gallery Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {galleries.map((gallery) => (
          <button
            key={gallery.id}
            onClick={() => setActiveGallery(gallery.id)}
            className={`px-4 py-2 rounded-lg ${
              activeGallery === gallery.id
                ? gallery.type === 'local'
                  ? 'bg-purple-600 text-white'
                  : 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border'
            }`}
          >
            {gallery.icon} {gallery.name}
          </button>
        ))}
      </div>

      {/* Images Grid */}
      {activeGallery === 'psalm1' && images.length > 0 ? (
        <div>
          <p className="mb-4 text-gray-600">Showing {images.length} Psalm 1 images</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <img 
                  src={img.url} 
                  alt={img.name}
                  className="w-full h-48 object-cover rounded"
                />
                <p className="mt-2 text-center">{img.name}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Select a gallery to view images</p>
      )}

      {/* Direct Links Test */}
      <div className="mt-8 p-4 bg-gray-200 rounded">
        <h2 className="text-xl font-semibold mb-2">Direct Image Links Test:</h2>
        <div className="space-y-2">
          <p><a href="/Psalm%201/psalm1_1.png" className="text-blue-600 underline">/Psalm 1/psalm1_1.png</a></p>
          <p><a href="/Psalm%201/psalm1_2.png" className="text-blue-600 underline">/Psalm 1/psalm1_2.png</a></p>
          <p><a href="/Psalm%201/psalm1_3.png" className="text-blue-600 underline">/Psalm 1/psalm1_3.png</a></p>
        </div>
      </div>
    </div>
  );
}