export default function EnvCheckPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Environment Check</h1>
        
        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Current Environment Variables</h2>
            <div className="space-y-3 font-mono text-sm">
              <div className="flex justify-between">
                <span>NODE_ENV:</span>
                <span className="text-blue-400">{process.env.NODE_ENV}</span>
              </div>
              <div className="flex justify-between">
                <span>CLOUDINARY_CLOUD_NAME:</span>
                <span className={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? 'text-green-400' : 'text-red-400'}>
                  {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>CLOUDINARY_API_KEY:</span>
                <span className={process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? 'text-green-400' : 'text-red-400'}>
                  {process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? 'Set' : 'Not set'}
                </span>
              </div>
              <div className="flex justify-between">
                <span>CLOUDINARY_API_SECRET:</span>
                <span className={process.env.CLOUDINARY_API_SECRET ? 'text-green-400' : 'text-red-400'}>
                  {process.env.CLOUDINARY_API_SECRET ? 'Set' : 'Not set'}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Quick Fix</h2>
            <p className="mb-4 text-gray-300">To fix Cloudinary connection:</p>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm">
{`# Edit your .env.local file
nano .env.local

# Add these with YOUR actual credentials:
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dnnailj0a
NEXT_PUBLIC_CLOUDINARY_API_KEY=325398942616615
CLOUDINARY_API_SECRET=b8rhnjuPy_dw3HX8-f31vU7Vmmo
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=gallery_uploads`}
            </pre>
            <p className="mt-4 text-sm text-gray-400">
              Note: The app will work with demo images until you configure Cloudinary.
            </p>
          </div>

          <div className="text-center">
            <a href="/" className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
              Back to Gallery
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}