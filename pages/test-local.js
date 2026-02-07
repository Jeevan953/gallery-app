// pages/test-local.js
import { useState, useEffect } from 'react';

export default function TestLocal() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/local-images?folder=Psalm%201')
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Local Images Test</h1>
      <p>Total Images: {images.length}</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '10px',
        marginTop: '20px'
      }}>
        {images.map((img, index) => (
          <div key={index} style={{ border: '1px solid #ddd', padding: '5px' }}>
            <img 
              src={img.url} 
              alt={img.filename}
              style={{ width: '100%', height: '150px', objectFit: 'cover' }}
            />
            <p style={{ fontSize: '12px', marginTop: '5px' }}>{img.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
}