
// pages/gallery/index.js - FIXED VERSION (28 images for Psalm 1)
import { useState, useEffect } from 'react';

const Gallery = () => {
  const [activeGallery, setActiveGallery] = useState('gallery');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const galleries = [
    { id: 'gallery', name: 'ALL', folder: 'gallery' },
    { id: 'uploads', name: 'UPLOADS', folder: 'gallery/uploads' },
    { id: 'nature', name: 'NATURE', folder: 'gallery/nature' },
    { id: 'portraits', name: 'PORTRAITS', folder: 'gallery/portraits' },
    { id: 'psalm1', name: 'PSALM 1', folder: 'Psalm 1' }
  ];

  useEffect(() => {
    fetchImages();
  }, [activeGallery]);

  const fetchImages = async () => {
    setLoading(true);
    
    // Find the current gallery
    const currentGallery = galleries.find(g => g.id === activeGallery);
    const folder = currentGallery ? currentGallery.folder : activeGallery;
    
    try {
      const response = await fetch(`/api/images?folder=${encodeURIComponent(folder)}`);
      const data = await response.json();
      console.log(`📊 Loaded ${data.length} images for ${activeGallery} (folder: ${folder})`);
      setImages(data);
    } catch (error) {
      console.error('Error loading images:', error);
      setImages([]);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          🌈 Rainbow Image Gallery
        </h1>
        <p className="text-gray-600">
          {activeGallery === 'psalm1' 
            ? 'Viewing Psalm 1 images' 
            : 'Browse gallery images'}
        </p>
      </header>

      {/* Gallery Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {galleries.map((gallery) => (
          <button
            key={gallery.id}
            onClick={() => setActiveGallery(gallery.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeGallery === gallery.id
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-700 border hover:bg-gray-100'
            }`}
          >
            {gallery.name}
          </button>
        ))}
      </div>

      {/* Status Message */}
      <div className="text-center mb-6">
        {loading ? (
          <p className="text-blue-600">Loading images...</p>
        ) : (
          <p className="text-gray-700">
            Showing <span className="font-bold">{images.length}</span> images for <span className="font-bold">{galleries.find(g => g.id === activeGallery)?.name || activeGallery}</span>
          </p>
        )}
      </div>

      {/* Images Grid */}
      {images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {images.map((img, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
              <img
                src={img.secure_url || img.url}
                alt={img.public_id || img.filename}
                className="w-full h-48 object-contain bg-gray-100 p-2"
                onError={(e) => {
                  console.error(`Failed to load: ${img.secure_url || img.url}`);
                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect width="200" height="150" fill="%23f0f0f0"/><text x="100" y="75" text-anchor="middle" fill="%23999">Image Error</text></svg>';
                }}
              />
              <div className="p-3">
                <p className="text-sm font-medium truncate">{img.public_id || img.filename}</p>
                <p className="text-xs text-gray-500">#{index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      ) : !loading && (
        <p className="text-center text-gray-500">No images found</p>
      )}

      {/* Debug Info */}
      <div className="mt-12 p-4 bg-gray-100 rounded-lg border">
        <h3 className="font-semibold text-lg mb-3">Debug Information</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Current Gallery:</p>
            <p className="text-sm">ID: {activeGallery}</p>
            <p className="text-sm">Name: {galleries.find(g => g.id === activeGallery)?.name}</p>
            <p className="text-sm">API Folder: {galleries.find(g => g.id === activeGallery)?.folder}</p>
          </div>
          <div>
            <p className="font-medium">Image Data:</p>
            <p className="text-sm">Total Images: {images.length}</p>
            <p className="text-sm">Loading: {loading ? 'Yes' : 'No'}</p>
            {images.length > 0 && (
              <p className="text-sm">First Image: {images[0].public_id || images[0].filename}</p>
            )}
          </div>
        </div>
        <div className="mt-4">
          <button 
            onClick={fetchImages}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            Reload Images
          </button>
        </div>
      </div>
    </div>
  );
};

export default Gallery;