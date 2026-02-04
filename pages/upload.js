import Head from "next/head";
import UploadForm from "../components/UploadForm";
import Link from "next/link";

export default function UploadPage() {
  return (
    <>
      <Head>
        <title>Upload Images | Gallery App</title>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          <header className="mb-10">
            <h1 className="text-4xl font-bold text-white mb-2">
              Upload Images
            </h1>
            <p className="text-gray-400">
              Upload images to your Cloudinary galleries
            </p>
          </header>

          <UploadForm />

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              ← Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
