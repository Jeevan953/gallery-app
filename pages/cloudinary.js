export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
};

// Only validate what the browser actually needs
export function validateCloudinaryConfig() {
  const missing = [];

  if (!cloudinaryConfig.cloudName)
    missing.push("NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME");

  if (!cloudinaryConfig.uploadPreset)
    missing.push("NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET");

  if (missing.length > 0) {
    console.warn("⚠️ Missing Cloudinary env variables:", missing.join(", "));
    return false;
  }

  return true;
}

// Run check in browser only
if (typeof window !== "undefined") {
  validateCloudinaryConfig();
}

export default function CloudinaryPage() {
  return (
    <div>
      <h1>Cloudinary Page</h1>
      <p>Cloudinary frontend configuration loaded.</p>
    </div>
  );
}
