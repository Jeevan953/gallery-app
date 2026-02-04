import { useEffect, useState } from 'react';

export default function SetupPage() {
  const [isClient, setIsClient] = useState(false);
  const [cloudinaryConfigured, setCloudinaryConfigured] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setCloudinaryConfigured(
      !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && 
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME !== 'your_cloud_name'
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Gallery Setup Instructions</h1>
        
        <div className="space-y-6">
          {/* Status Banner */}
          {isClient && (
            <div className={`p-4 rounded-lg ${cloudinaryConfigured ? 'bg-green-900/30 border border-green-700' : 'bg-yellow-900/30 border border-yellow-700'}`}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{cloudinaryConfigured ? '✅' : '⚠️'}</span>
                <div>
                  <p className="font-bold">{cloudinaryConfigured ? 'Cloudinary Configured!' : 'Cloudinary Not Configured'}</p>
                  <p className="text-sm opacity-75">
                    {cloudinaryConfigured 
                      ? 'Your gallery is connected to Cloudinary.' 
                      : 'Follow the steps below to connect your Cloudinary account.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">1. Cloudinary Setup</h2>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Go to <a href="https://cloudinary.com" className="text-blue-400 underline">cloudinary.com</a> and sign up</li>
              <li>Get your API credentials from Dashboard</li>
              <li>Create upload preset:
                <ul className="list-disc pl-6 mt-2">
                  <li>Settings → Upload → Upload presets</li>
                  <li>Click "Add upload preset"</li>
                  <li>Set signing mode to "Unsigned" (for demo) or "Signed" (production)</li>
                  <li>Save and note the preset name</li>
                </ul>
              </li>
            </ol>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">2. Environment Variables</h2>
            <p className="mb-4">Create <code className="bg-gray-700 px-2 py-1 rounded">.env.local</code> file in your project root:</p>
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
{`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_actual_cloud_name
NEXT_PUBLIC_CLOUDINARY_API_KEY=your_actual_api_key
CLOUDINARY_API_SECRET=your_actual_api_secret
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_preset_name`}
            </pre>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-green-400">3. Quick Test</h2>
            <p className="mb-2">Visit these URLs to test:</p>
            <ul className="space-y-2">
              <li><a href="/api/health" className="text-blue-400 underline">/api/health</a> - Check environment</li>
              <li><a href="/api/images?folder=gallery1" className="text-blue-400 underline">/api/images?folder=gallery1</a> - Test API route</li>
              <li><a href="/" className="text-blue-400 underline">/</a> - View gallery</li>
              <li><a href="/upload" className="text-blue-400 underline">/upload</a> - Upload page</li>
            </ul>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">500 Error in API:</h3>
                <p className="text-gray-300">Check your Cloudinary credentials and ensure the SDK is properly installed.</p>
              </div>
              <div>
                <h3 className="font-bold">No images showing:</h3>
                <p className="text-gray-300">Upload some images first using the upload page or Cloudinary dashboard.</p>
              </div>
              <div>
                <h3 className="font-bold">Hydration errors:</h3>
                <p className="text-gray-300">This page avoids them by using useEffect for client-side rendering.</p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <a
              href="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-bold transition-colors"
            >
              Go to Gallery
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}