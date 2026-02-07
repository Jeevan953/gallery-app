// pages/debug.js
import { useState } from 'react';

export default function DebugPage() {
  const [results, setResults] = useState({});

  const testEndpoints = async () => {
    const endpoints = [
      { name: 'Cloudinary ALL', url: '/api/images?folder=gallery' },
      { name: 'Cloudinary PORTRAITS', url: '/api/images?folder=gallery/portraits' },
      { name: 'Cloudinary PSALM 1', url: '/api/images?folder=Psalm%201' },
      { name: 'Local API default', url: '/api/local-images' },
      { name: 'Local API PSALM 1', url: '/api/local-images?folder=Psalm%201' },
    ];

    const results = {};
    for (const endpoint of endpoints) {
      try {
        const res = await fetch(endpoint.url);
        const data = await res.json();
        results[endpoint.name] = {
          success: true,
          count: Array.isArray(data) ? data.length : 'N/A',
          status: res.status
        };
      } catch (error) {
        results[endpoint.name] = {
          success: false,
          error: error.message
        };
      }
    }
    setResults(results);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>API Debug</h1>
      <button onClick={testEndpoints} style={{ padding: '10px 20px', marginBottom: '20px' }}>
        Test All Endpoints
      </button>
      
      <table border="1" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Image Count</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(results).map(([name, data]) => (
            <tr key={name}>
              <td>{name}</td>
              <td style={{ color: data.success ? 'green' : 'red' }}>
                {data.success ? `✅ ${data.status}` : `❌ ${data.error}`}
              </td>
              <td>{data.success ? data.count : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}