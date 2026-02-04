import { useState } from 'react';
import Lightbox from 'lightbox-react';
import 'lightbox-react/style.css';

const LightboxGallery = ({ images, galleryName }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const goToPrevious = () => {
    setPhotoIndex((photoIndex + images.length - 1) % images.length);
  };

  const goToNext = () => {
    setPhotoIndex((photoIndex + 1) % images.length);
  };

  return (
    <div>
      {/* Grid Layout - Modern design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {images.map((image, index) => (
          <div
            key={image.public_id || image.url}
            className="group relative overflow-hidden rounded-xl cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-square relative overflow-hidden bg-gray-200">
              <img
                src={image.secure_url || image.url}
                alt={image.public_id || `Image ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 text-white">
                  <p className="font-medium truncate">
                    {image.public_id ? image.public_id.split('/').pop().replace(/_/g, ' ') : `Image ${index + 1}`}
                  </p>
                  {image.bytes && (
                    <p className="text-sm text-gray-300 mt-1">
                      {Math.round(image.bytes / 1024)} KB
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && images.length > 0 && (
        <Lightbox
          mainSrc={images[photoIndex].secure_url || images[photoIndex].url}
          nextSrc={images[(photoIndex + 1) % images.length]?.secure_url || images[(photoIndex + 1) % images.length]?.url}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]?.secure_url || images[(photoIndex + images.length - 1) % images.length]?.url}
          onCloseRequest={closeLightbox}
          onMovePrevRequest={goToPrevious}
          onMoveNextRequest={goToNext}
          imageTitle={`${galleryName.toUpperCase()} - Image ${photoIndex + 1} of ${images.length}`}
          imageCaption={images[photoIndex].public_id || `Image ${photoIndex + 1}`}
          enableZoom={true}
        />
      )}
    </div>
  );
};

export default LightboxGallery;