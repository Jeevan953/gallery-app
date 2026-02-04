export default function TestPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gallery Test Page</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Test API Endpoints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a 
                href="/api/simple-images?folder=gallery1" 
                target="_blank"
                className="block p-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-center"
              >
                Test Simple API
              </a>
              <a 
                href="/api/images?folder=gallery1" 
                target="_blank"
                className="block p-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-center"
              >
                Test Full API
              </a>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Quick Links</h2>
            <div className="space-y-3">
              <a href="/" className="block p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                🏠 Main Gallery Page
              </a>
              <a href="/upload" className="block p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                📤 Upload Page
              </a>
              <a href="/setup" className="block p-3 bg-gray-700 hover:bg-gray-600 rounded-lg">
                ⚙️ Setup Guide
              </a>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">Environment Check</h2>
            <div className="space-y-2">
              <p>Node Environment: <span className="text-yellow-400">{process.env.NODE_ENV}</span></p>
              <p>Cloudinary Configured: <span className={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'text-green-400' : 'text-red-400'}>
                {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'Yes' : 'No'}
              </span></p>
              <p>Next.js Version: <span className="text-blue-400">16.1.5</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}