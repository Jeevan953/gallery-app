import { useEffect, useState } from 'react';

export default function ImageGallery({ folder = 'gallery' }) {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(`/api/images?folder=${folder}`);
        if (!res.ok) throw new Error('Failed to fetch images');
        const data = await res.json();
        setImages(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [folder]);

  if (loading) return <p>Loading images...</p>;
  if (!images.length) return <p>No images found in this folder.</p>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
      {images.map(img => (
        <div key={img.id} style={{ width: '200px' }}>
          <img
            src={img.url}
            alt={img.name}
            style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }}
          />
          <p style={{ textAlign: 'center', marginTop: '4px', fontSize: '0.9rem' }}>
            {img.name}
          </p>
        </div>
      ))}
    </div>
  );
}
