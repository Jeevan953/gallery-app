import { useState, useEffect, useRef } from 'react';

const Gallery = () => {
  const [activeGallery, setActiveGallery] = useState('gallery');
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('all'); // 'all', 'image', 'video'
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const videoRefs = useRef([]);

  const galleries = [
    { id: 'gallery', name: 'ALL', icon: '🖼️', description: 'All media' },
    { id: 'uploads', name: 'UPLOADS', icon: '📤', description: 'Uploaded media' },
    { id: 'nature', name: 'NATURE', icon: '🌿', description: 'Nature media' },
    { id: 'portraits', name: 'PORTRAITS', icon: '👤', description: 'Portrait media' }
  ];

  const mediaTypes = [
    { id: 'all', name: 'All Media', icon: '🖼️' },
    { id: 'image', name: 'Images', icon: '📷' },
    { id: 'video', name: 'Videos', icon: '🎬' }
  ];

  useEffect(() => {
    fetchMedia();
  }, [activeGallery, filterType]);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching: ${activeGallery}, type: ${filterType}`);
      
      // Use the new API endpoint that handles both images and videos
      const response = await fetch(`/api/media?folder=${activeGallery}&type=${filterType}`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`Loaded ${data.length} media items`);
      setMedia(data);
      
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to load media. Using demo data.');
      setMedia(getDemoMedia());
    } finally {
      setLoading(false);
    }
  };

  const getDemoMedia = () => {
    return [
      { 
        secure_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop&q=80', 
        public_id: 'nature_mountain', 
        resource_type: 'image',
        format: 'jpg',
        bytes: 400000,
        created_at: new Date().toISOString()
      },
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
        secure_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop&q=80', 
        public_id: 'nature_city', 
        resource_type: 'image',
        format: 'jpg',
        bytes: 420000,
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
    ];
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const openLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    // Pause all videos when closing lightbox
    videoRefs.current.forEach(video => {
      if (video) video.pause();
    });
  };

  const goToPrevious = () => {
    const newIndex = (lightboxIndex - 1 + media.length) % media.length;
    setLightboxIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (lightboxIndex + 1) % media.length;
    setLightboxIndex(newIndex);
  };

  const handleVideoRef = (index) => (el) => {
    videoRefs.current[index] = el;
  };

  // Lightbox Component
  const Lightbox = () => {
    if (!lightboxOpen || !media[lightboxIndex]) return null;

    const currentItem = media[lightboxIndex];
    const isVideo = currentItem.resource_type === 'video';

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
        if (e.key === ' ' && isVideo) {
          e.preventDefault();
          const video = videoRefs.current[lightboxIndex];
          if (video) {
            if (video.paused) video.play();
            else video.pause();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxIndex, isVideo]);

    return (
      <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
        {/* Close button */}
        <button
          onClick={closeLightbox}
          className="absolute top-6 right-6 text-white text-3xl hover:text-gray-300 z-10 bg-black/50 p-2 rounded-full"
        >
          ✕
        </button>

        {/* Navigation buttons */}
        {media.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/90 transition-colors"
            >
              ←
            </button>
            <button
              onClick={goToNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/70 text-white p-4 rounded-full hover:bg-black/90 transition-colors"
            >
              →
            </button>
          </>
        )}

        {/* Media container */}
        <div className="max-w-6xl w-full max-h-[85vh] relative">
          {isVideo ? (
            <div className="relative">
              <video
                ref={handleVideoRef(lightboxIndex)}
                src={currentItem.secure_url}
                controls
                autoPlay
                className="w-full h-auto max-h-[70vh] rounded-lg shadow-2xl"
                playsInline
              />
              <div className="mt-6 text-white text-center">
                <p className="text-xl font-medium">{currentItem.public_id}</p>
                <div className="flex justify-center items-center gap-4 mt-2 text-gray-300">
                  <span className="px-3 py-1 bg-red-600 rounded-full text-sm">VIDEO</span>
                  <span>{currentItem.format?.toUpperCase()}</span>
                  {currentItem.duration && (
                    <span>Duration: {formatDuration(currentItem.duration)}</span>
                  )}
                  {currentItem.bytes && (
                    <span>Size: {Math.round(currentItem.bytes / 1024 / 1024)} MB</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img
                src={currentItem.secure_url}
                alt={currentItem.public_id}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="mt-6 text-white text-center">
                <p className="text-xl font-medium">{currentItem.public_id}</p>
                <div className="flex justify-center items-center gap-4 mt-2 text-gray-300">
                  <span className="px-3 py-1 bg-blue-600 rounded-full text-sm">IMAGE</span>
                  <span>{currentItem.format?.toUpperCase()}</span>
                  {currentItem.width && currentItem.height && (
                    <span>Dimensions: {currentItem.width}×{currentItem.height}</span>
                  )}
                  {currentItem.bytes && (
                    <span>Size: {Math.round(currentItem.bytes / 1024)} KB</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Counter */}
        <div className="absolute top-6 left-6 text-white bg-black/50 px-4 py-2 rounded-full">
          {lightboxIndex + 1} / {media.length}
        </div>

        {/* Thumbnail strip */}
        {media.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 px-4 py-3">
            {media.map((item, index) => (
              <button
                key={index}
                onClick={() => setLightboxIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === lightboxIndex 
                    ? 'border-white scale-110' 
                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-105'
                }`}
              >
                {item.resource_type === 'video' ? (
                  <div className="w-full h-full bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center relative">
                    <span className="text-lg">🎬</span>
                    {item.duration && (
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {formatDuration(item.duration)}
                      </div>
                    )}
                  </div>
                ) : (
                  <img
                    src={item.secure_url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            🎬 Media Gallery
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Browse images and videos
          </p>
        </header>

        {/* Gallery Selection */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-6">
          {galleries.map((gallery) => (
            <button
              key={gallery.id}
              onClick={() => setActiveGallery(gallery.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-lg transition-all duration-300 ${
                activeGallery === gallery.id
                  ? 'bg-gray-900 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span className="text-xl">{gallery.icon}</span>
              <span className="font-semibold">{gallery.name}</span>
            </button>
          ))}
        </div>

        {/* Media Type Filter */}
        <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-4 mb-8">
          {mediaTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setFilterType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                filterType === type.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
            <p className="mt-4 text-gray-600 text-lg">Loading media...</p>
          </div>
        )}

        {/* Media Grid */}
        {!loading && media.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {media.map((item, index) => (
                <div
                  key={`${item.public_id}_${index}`}
                  onClick={() => openLightbox(index)}
                  className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  {/* Video Thumbnail */}
                  {item.resource_type === 'video' ? (
                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                          <span className="text-4xl text-white">▶</span>
                        </div>
                      </div>
                      {/* Video Badge */}
                      <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        VIDEO
                      </div>
                      {/* Video Duration */}
                      {item.duration && (
                        <div className="absolute bottom-3 left-3 bg-black/80 text-white px-2 py-1 rounded text-sm font-medium">
                          {formatDuration(item.duration)}
                        </div>
                      )}
                      {/* Video Format */}
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white px-2 py-1 rounded text-xs">
                        {item.format?.toUpperCase() || 'MP4'}
                      </div>
                    </div>
                  ) : (
                    /* Image Thumbnail */
                    <div className="aspect-square relative overflow-hidden bg-gray-200">
                      <img
                        src={item.secure_url}
                        alt={item.public_id}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                        <div className="p-4 text-white w-full">
                          <p className="font-medium truncate text-sm">
                            {item.public_id.split('/').pop().replace(/_/g, ' ')}
                          </p>
                          <div className="flex justify-between text-xs text-gray-300 mt-1">
                            <span className="px-2 py-1 bg-blue-600 rounded">IMAGE</span>
                            {item.bytes && (
                              <span>{Math.round(item.bytes / 1024)} KB</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
              <div className="flex flex-wrap justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Showing</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {media.length} {filterType === 'all' ? 'media items' : filterType + 's'}
                  </p>
                  <div className="flex gap-4 mt-2">
                    <span className="text-sm text-gray-600">
                      Images: {media.filter(m => m.resource_type === 'image').length}
                    </span>
                    <span className="text-sm text-gray-600">
                      Videos: {media.filter(m => m.resource_type === 'video').length}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Gallery</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {galleries.find(g => g.id === activeGallery)?.name}
                    </p>
                  </div>
                  <button 
                    onClick={fetchMedia}
                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!loading && media.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-2xl text-gray-900 mb-2">No media found</h3>
            <p className="text-gray-600 mb-6">
              {filterType === 'video' ? 'No videos found. Upload some videos!' : 
               filterType === 'image' ? 'No images found. Upload some images!' : 
               'No media found. Upload images or videos to get started!'}
            </p>
            <a
              href="/upload"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
            >
              Upload Media
            </a>
          </div>
        )}

        {/* Upload Promo */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">🎬 Upload Videos & Images</h3>
              <p className="text-gray-700">
                Upload your videos (MP4, MOV, AVI, WebM) and images to share with the gallery.
              </p>
            </div>
            <a
              href="/upload"
              className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              Upload Media
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox />
    </div>
  );
};

export default Gallery;