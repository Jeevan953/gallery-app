"use client";
import { CldImage } from 'next-cloudinary';

// By default, the CldImage component applies auto-format and auto-quality to all delivery URLs for optimized delivery.
export default function Page() {
  return (
    <CldImage
  src="cld-sample-5"
  width="500"
  height="500"
  alt="Sample gallery image"
  crop={{ type: "auto", source: true }}
/>
  );
}