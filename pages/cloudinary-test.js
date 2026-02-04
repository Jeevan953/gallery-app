import { useEffect, useState } from 'react';

export default function CloudinaryTest() {
  const [folders, setFolders] = useState([]);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const folderOptions = [
    { id: 'all', name: 'ALL Images' },
    { id: 'uploads', name: 'UPLOADS Folder' },
    { id: 'nature', name: 'NATURE Folder' },
    { id: 'portraits', name: 'PORTRAITS Folder' }
  ];

  useEffect(() => {
    fetchImages();
  }, [selectedFolder]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/cloudinary-images?folder=${selectedFolder}`);
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cloudinary Connection Test</h1>
          <p className="text-gray-600">Testing connection to your Cloudinary account</p>
        </header>

        {/* Folder Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Select Folder</h2>
          <div className="flex flex-wrap gap-3">
            {folderOptions.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  selectedFolder === folder.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {folder.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Images in {selectedFolder.toUpperCase()}
              </h2>
              <p className="text-gray-600">
                {images.length} image{images.length !== 1 ? 's' : ''} found
              </p>
            </div>
            <button
              onClick={fetchImages}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading images from Cloudinary...</p>
            </div>
          ) : images.length > 0 ? (
            <>
              {/* Image Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="aspect-square bg-gray-100 relative">
                      <img
                        src={image.secure_url}
                        alt={image.public_id}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-gray-900 truncate text-sm">
                        {image.public_id}
                      </p>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>{image.format?.toUpperCase()}</span>
                        <span>{image.bytes ? Math.round(image.bytes / 1024) + ' KB' : ''}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Image Details Table */}
              <div className="mt-8 overflow-x-auto">
                <h3 className="text-lg font-bold mb-4">Image Details</h3>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Public ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Format</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dimensions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {images.map((image, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm text-gray-900">{index + 1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 font-mono">{image.public_id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{image.format?.toUpperCase()}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{image.bytes ? Math.round(image.bytes / 1024) + ' KB' : 'N/A'}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">
                          {image.width && image.height ? `${image.width} × ${image.height}` : 'N/A'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="text-center py-10">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No images found</h3>
              <p className="text-gray-600 mb-6">No images found in {selectedFolder} folder.</p>
              <div className="space-y-2 text-sm text-gray-500">
                <p>Your Cloudinary folders: UPLOADS, NATURE, PORTRAITS</p>
                <p>Upload images to these folders to see them here.</p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/" className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="font-bold text-gray-900 mb-2">View Gallery</h3>
            <p className="text-gray-600">See your images in the main gallery</p>
          </a>
          <a href="/upload" className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📤</div>
            <h3 className="font-bold text-gray-900 mb-2">Upload Images</h3>
            <p className="text-gray-600">Upload new images to Cloudinary</p>
          </a>
          <a href="/status" className="block p-6 bg-white rounded-xl shadow hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900 mb-2">System Status</h3>
            <p className="text-gray-600">Check system and Cloudinary status</p>
          </a>
        </div>
      </div>
    </div>
  );
}