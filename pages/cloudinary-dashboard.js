import { useEffect, useState } from 'react';

export default function CloudinaryDashboard() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchCloudinaryData();
  }, []);

  const fetchCloudinaryData = async () => {
    try {
      setLoading(true);
      
      // Fetch from all folders
      const [allRes, uploadsRes, natureRes, portraitsRes] = await Promise.all([
        fetch('/api/images?folder=all'),
        fetch('/api/images?folder=uploads'),
        fetch('/api/images?folder=nature'),
        fetch('/api/images?folder=portraits')
      ]);

      const allData = await allRes.json();
      
      setImages(allData);
      
      // Calculate stats
      const statsData = {
        total: allData.length,
        uploads: (await uploadsRes.json()).length,
        nature: (await natureRes.json()).length,
        portraits: (await portraitsRes.json()).length,
        totalSize: allData.reduce((sum, img) => sum + (img.bytes || 0), 0)
      };
      
      setStats(statsData);
      
    } catch (error) {
      console.error('Error fetching Cloudinary data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Cloudinary Dashboard</h1>
          <p className="text-gray-600">View and manage your Cloudinary images</p>
        </header>

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">Total Images</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">UPLOADS</p>
              <p className="text-3xl font-bold text-blue-600">{stats.uploads}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">NATURE</p>
              <p className="text-3xl font-bold text-green-600">{stats.nature}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-sm text-gray-500">PORTRAITS</p>
              <p className="text-3xl font-bold text-purple-600">{stats.portraits}</p>
            </div>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading Cloudinary data...</p>
            </div>
          </div>
        )}

        {/* Images Grid */}
        {!loading && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">All Images ({images.length})</h2>
              <button
                onClick={fetchCloudinaryData}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
              >
                Refresh
              </button>
            </div>

            {images.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="aspect-square relative">
                      <img
                        src={image.secure_url || image.url}
                        alt={image.public_id}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-medium text-gray-900 truncate">
                        {image.public_id.split('/').pop()}
                      </p>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>{image.format?.toUpperCase()}</span>
                        <span>{image.bytes ? Math.round(image.bytes / 1024) + ' KB' : ''}</span>
                      </div>
                      {image.folder && (
                        <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                          {image.folder}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-2xl text-gray-900 mb-2">No images found</h3>
                <p className="text-gray-600 mb-6">Upload some images to get started!</p>
                <a
                  href="/upload"
                  className="inline-block bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg"
                >
                  Upload Images
                </a>
              </div>
            )}
          </>
        )}

        {/* Quick Links */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="/" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">🖼️</div>
            <h3 className="font-bold text-gray-900 mb-2">View Gallery</h3>
            <p className="text-gray-600">See your images in the gallery view</p>
          </a>
          <a href="/upload" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📤</div>
            <h3 className="font-bold text-gray-900 mb-2">Upload Images</h3>
            <p className="text-gray-600">Upload new images to Cloudinary</p>
          </a>
          <a href="/status" className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-bold text-gray-900 mb-2">System Status</h3>
            <p className="text-gray-600">Check app and Cloudinary status</p>
          </a>
        </div>
      </div>
    </div>
  );
}