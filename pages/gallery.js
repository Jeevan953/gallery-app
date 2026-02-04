import ImageGallery from '@/components/ImageGallery';

export default function GalleryPage() {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Gallery</h1>
      <ImageGallery folder="gallery" />
    </div>
  );
}
