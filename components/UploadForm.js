import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const [gallery, setGallery] = useState('uploads');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadType, setUploadType] = useState('image'); // 'image' or 'video'

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUploadProgress(0);
    
    // Auto-detect file type
    if (selectedFile.type.startsWith('video/')) {
      setUploadType('video');
    } else if (selectedFile.type.startsWith('image/')) {
      setUploadType('image');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file first!');
      return;
    }

    setUploading(true);
    setUploadProgress(10);
    
    // Map gallery names to Cloudinary folder structure
    const folderMap = {
      'uploads': 'gallery/uploads',
      'nature': 'gallery/nature',
      'portraits': 'gallery/portraits'
    };
    
    const cloudinaryFolder = folderMap[gallery] || 'gallery/uploads';
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', cloudinaryFolder);
    formData.append('tags', `gallery,${gallery},${uploadType}`);
    
    // Set resource type for video
    if (uploadType === 'video') {
      formData.append('resource_type', 'video');
    }

    try {
      setUploadProgress(30);
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/${uploadType}/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(progress);
          }
        }
      );
      
      setUploadProgress(100);
      setUploadedUrl(response.data.secure_url);
      
      alert(`✅ ${uploadType === 'video' ? 'Video' : 'Image'} uploaded successfully!`);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
        setUploadedUrl('');
        document.getElementById('fileInput').value = '';
      }, 3000);
      
    } catch (error) {
      console.error('Upload error:', error);
      alert(`❌ Upload failed: ${error.response?.data?.error?.message || error.message}`);
      setUploadProgress(0);
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">📤 Upload Media</h2>
        <p className="text-gray-600">Upload images and videos to your Cloudinary gallery</p>
      </div>
      
      <div className="space-y-6">
        {/* File Type Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Media Type</label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setUploadType('image')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                uploadType === 'image'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              📷 Image
            </button>
            <button
              type="button"
              onClick={() => setUploadType('video')}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                uploadType === 'video'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              🎬 Video
            </button>
          </div>
        </div>

        {/* Gallery Selection */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Select Gallery</label>
          <div className="flex space-x-2">
            {['uploads', 'nature', 'portraits'].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGallery(g)}
                className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                  gallery === g
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {g.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* File Upload */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Choose {uploadType === 'video' ? 'Video' : 'Image'}
          </label>
          <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            file ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-gray-400'
          }`}>
            <input
              id="fileInput"
              type="file"
              accept={uploadType === 'video' ? 'video/*' : 'image/*'}
              onChange={handleFileChange}
              className="hidden"
            />
            <label htmlFor="fileInput" className="cursor-pointer">
              <div className="text-4xl mb-2">
                {uploadType === 'video' ? '🎬' : '📷'}
              </div>
              {file ? (
                <div className="text-left">
                  <p className="font-medium text-gray-900">{file.name}</p>
                  <p className="text-sm text-gray-500">
                    Type: {uploadType.toUpperCase()} • Size: {formatFileSize(file.size)}
                  </p>
                  <p className="text-sm text-green-600 mt-1">✓ Ready to upload</p>
                </div>
              ) : (
                <>
                  <p className="text-gray-600 mb-1">
                    Click to select {uploadType === 'video' ? 'a video' : 'an image'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {uploadType === 'video' 
                      ? 'MP4, MOV, AVI up to 100MB'
                      : 'PNG, JPG, GIF up to 10MB'}
                  </p>
                </>
              )}
            </label>
          </div>
        </div>

        {/* Progress Bar */}
        {uploadProgress > 0 && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Uploading {uploadType}...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading || !file}
          className={`w-full py-3 rounded-lg font-semibold transition-all ${
            uploading || !file
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg'
          }`}
        >
          {uploading ? 'Uploading...' : `Upload ${uploadType === 'video' ? 'Video' : 'Image'}`}
        </button>

        {/* Preview */}
        {uploadedUrl && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium mb-2">✅ Upload successful!</p>
            {uploadType === 'image' ? (
              <div className="aspect-video relative rounded overflow-hidden">
                <img 
                  src={uploadedUrl} 
                  alt="Uploaded" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video relative rounded overflow-hidden">
                <video 
                  src={uploadedUrl} 
                  controls 
                  className="w-full h-full"
                />
              </div>
            )}
            <p className="mt-2 text-sm text-green-600">
              {uploadType === 'video' ? 'Video' : 'Image'} uploaded to {gallery.toUpperCase()} folder.
            </p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">ℹ️ Video Upload Tips</h3>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Supported formats: MP4, MOV, AVI, WebM</li>
            <li>• Maximum file size: 100MB</li>
            <li>• Videos will appear in your gallery with play buttons</li>
            <li>• Click to play videos in lightbox</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadForm;