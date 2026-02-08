import { useState } from 'react';
import Head from 'next/head';

export default function Psalm1() {
  // Generate array of 30 image paths
  const imagePaths = Array.from({ length: 30 }, (_, i) => 
    `/Psalm 1/psalm1_${i + 1}.png`
  );

  return (
    <div>
      <Head>
        <title>Psalm 1 Gallery</title>
      </Head>
      <h1>Psalm 1 Gallery</h1>
      <p>Showing {imagePaths.length} images</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {imagePaths.map((path, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <img 
              src={path} 
              alt={`Psalm 1 verse ${index + 1}`}
              style={{ width: '100%', height: 'auto' }}
            />
            <p style={{ textAlign: 'center', marginTop: '5px' }}>
              Verse {index + 1}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 
console.log('Deployment trigger');
