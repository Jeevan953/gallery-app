import { useState, useEffect, useRef } from 'react';

const MediaLightbox = ({ media, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const videoRef = useRef(null);
  const currentMedia = media[currentIndex];

  useEffect(() => {
    // Reset video when index changes
    if (videoRef.current && currentMedia.resource_type === 'video') {
      videoRef.current.load();
    }

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === ' ' && currentMedia.resource_type === 'video') {
        e.preventDefault();
        if (videoRef.current) {
          if (videoRef.current.paused) videoRef.current.play();
          else videoRef.current.pause();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, currentMedia]);

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + media.length) % media.length);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % media.length);
  };

  const handleVideoEnded = () => {
    // Auto-play next video if available
    if (currentIndex < media.length - 1) {
      setTimeout(goToNext, 1000);
    }
  };

  if (!currentMedia) return null;

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
      >
        ✕
      </button>

      {/* Navigation buttons */}
      {media.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
          >
            →
          </button>
        </>
      )}

      {/* Media container */}
      <div className="max-w-6xl w-full max-h-[80vh]">
        {currentMedia.resource_type === 'video' ? (
          <div className="relative">
            <video
              ref={videoRef}
              src={currentMedia.secure_url}
              controls
              autoPlay
              onEnded={handleVideoEnded}
              className="w-full h-auto max-h-[70vh] rounded-lg"
            />
            <div className="mt-4 text-white text-center">
              <p className="text-lg font-medium">{currentMedia.public_id}</p>
              <p className="text-sm text-gray-300 mt-1">
                Video • {currentMedia.format?.toUpperCase()}
                {currentMedia.duration && ` • ${Math.round(currentMedia.duration)}s`}
              </p>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={currentMedia.secure_url}
              alt={currentMedia.public_id}
              className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-white text-center">
              <p className="text-lg font-medium">{currentMedia.public_id}</p>
              <p className="text-sm text-gray-300 mt-1">
                Image • {currentMedia.format?.toUpperCase()}
                {currentMedia.width && currentMedia.height && 
                  ` • ${currentMedia.width}×${currentMedia.height}`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail strip */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 overflow-x-auto px-4 py-2">
          {media.map((item, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden ${
                index === currentIndex ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-75'
              }`}
            >
              {item.resource_type === 'video' ? (
                <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                  <span className="text-xs">🎬</span>
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

      {/* Counter */}
      <div className="absolute top-4 left-4 text-white">
        {currentIndex + 1} / {media.length}
      </div>
    </div>
  );
};

export default MediaLightbox;