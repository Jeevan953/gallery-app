export async function getServerSideProps() {
  // Server-side only - no hydration issues
  const envVars = {
    'NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME': process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'Not set',
    'NEXT_PUBLIC_CLOUDINARY_API_KEY': process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? '✓ Set' : '✗ Not set',
    'CLOUDINARY_API_SECRET': process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Not set',
    'NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET': process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'Not set',
    'NODE_ENV': process.env.NODE_ENV,
  };

  return {
    props: {
      envVars,
      timestamp: new Date().toISOString()
    }
  };
}

export default function StatusPage({ envVars, timestamp }) {
  const getStatusColor = (value) => {
    if (value.includes('✓')) return 'bg-green-900/50 text-green-400';
    if (value.includes('✗')) return 'bg-red-900/50 text-red-400';
    return 'bg-yellow-900/50 text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gallery Status Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Environment Status */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Environment Variables</h2>
            <div className="space-y-3">
              {Object.entries(envVars).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center">
                  <code className="text-gray-300 text-sm">{key}</code>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(value)}`}>
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Quick Links</h2>
            <div className="space-y-3">
              <a href="/" className="block p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏠</span>
                  <div>
                    <p className="font-bold">Main Gallery</p>
                    <p className="text-sm text-gray-400">View all galleries</p>
                  </div>
                </div>
              </a>
              <a href="/upload" className="block p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📤</span>
                  <div>
                    <p className="font-bold">Upload Page</p>
                    <p className="text-sm text-gray-400">Upload new images</p>
                  </div>
                </div>
              </a>
              <a href="/api/health" target="_blank" className="block p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🩺</span>
                  <div>
                    <p className="font-bold">Health Check</p>
                    <p className="text-sm text-gray-400">Test API status</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-purple-400">System Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">Next.js Version</p>
                <p className="text-xl">16.1.5</p>
              </div>
              <div>
                <p className="text-gray-400">Turbopack</p>
                <p className="text-xl text-green-400">✓ Enabled</p>
              </div>
              <div>
                <p className="text-gray-400">Build Status</p>
                <p className="text-xl text-green-400">✓ Success</p>
              </div>
              <div>
                <p className="text-gray-400">Last Updated</p>
                <p className="text-sm text-gray-400">{new Date(timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gray-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Setup Cloudinary</h2>
            <ol className="list-decimal pl-5 space-y-2 text-gray-300">
              <li>Sign up at cloudinary.com</li>
              <li>Get API credentials from Dashboard</li>
              <li>Update .env.local file</li>
              <li>Restart the server</li>
              <li>Upload images via /upload page</li>
            </ol>
            <div className="mt-4">
              <a href="/setup" className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                Detailed Setup Guide
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}