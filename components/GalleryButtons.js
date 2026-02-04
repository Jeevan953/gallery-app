import { useState, useEffect } from "react";
import axios from "axios";

export default function GalleryButtons() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [folder, setFolder] = useState("all");
  const [type, setType] = useState("image"); // image | video

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get("/api/images", {
        params: { folder, type },
      });

      setMedia(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("API ERROR:", err);
      setError("Failed to load media");
      setMedia([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, [folder, type]);

  return (
    <div>
      {/* MEDIA TYPE BUTTONS */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setType("image")}>🖼 Images</button>
        <button onClick={() => setType("video")}>🎥 Videos</button>
      </div>

      {/* FOLDER BUTTONS */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => loadFolder('gallery')}>ALL</button>
        <button onClick={() => loadFolder('gallery/uploads')}>UPLOADS</button>
        <button onClick={() => loadFolder('gallery/nature')}>NATURE</button>
        <button onClick={() => loadFolder('gallery/portraits')}>PORTRAITS</button>
      </div>

      {loading && <p>Loading {type}s...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "10px",
        }}
      >
        {media.map((item) =>
          item.resource_type === "image" ? (
            <img
              key={item.public_id}
              src={item.secure_url}
              alt={item.public_id}
              style={{ width: "100%", borderRadius: "8px" }}
            />
          ) : (
            <video
              key={item.public_id}
              src={item.secure_url}
              controls
              style={{ width: "100%", borderRadius: "8px" }}
            />
          )
        )}
      </div>
    </div>
  );
}
