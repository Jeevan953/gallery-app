export default function handler(req, res) {
  const envVars = {
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret_set: !!process.env.CLOUDINARY_API_SECRET,
    node_env: process.env.NODE_ENV,
  };

  res.status(200).json({
    message: 'Debug Information',
    environment: envVars,
    timestamp: new Date().toISOString(),
    headers: req.headers,
  });
}