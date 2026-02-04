export default function handler(req, res) {
  const envCheck = {
    cloudinary: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? '✓ Configured' : '✗ Not configured',
      apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ? '✓ Set' : '✗ Not set',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? '✓ Set' : '✗ Not set',
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'Not set',
    },
    system: {
      nodeEnv: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    }
  };

  res.status(200).json(envCheck);
}