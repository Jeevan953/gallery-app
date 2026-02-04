import { useState, useEffect } from "react";

// Define the Modal component FIRST
function Modal({ image, onClose, onNext, onPrev }) {
  if (!image) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        cursor: "pointer",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "90vw",
          maxHeight: "90vh",
          cursor: "default",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "-40px",
            right: "0",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "2rem",
            cursor: "pointer",
          }}
        >
          ×
        </button>
        <button
          onClick={onPrev}
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            fontSize: "1.5rem",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          ‹
        </button>
        <img
          src={image.secure_url || image.url}
          alt={image.display_name || image.public_id}
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "100%",
            maxHeight: "80vh",
            display: "block",
            borderRadius: "8px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          }}
        />
        <button
          onClick={onNext}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.5)",
            color: "white",
            border: "none",
            fontSize: "1.5rem",
            padding: "10px",
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          ›
        </button>
        <div
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "10px",
            fontSize: "0.9rem",
            fontFamily: "monospace",
          }}
        >
          {image.public_id}
        </div>
      </div>
    </div>
  );
}

const categories = ["all", "uploads", "nature", "portraits"];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Add these handler functions
  const handleImageClick = (img, index) => {
    setSelectedImage(img);
    setSelectedIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    const nextIndex = selectedIndex === images.length - 1 ? 0 : selectedIndex + 1;
    setSelectedImage(images[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = selectedIndex === 0 ? images.length - 1 : selectedIndex - 1;
    setSelectedImage(images[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  const fetchImages = async (category) => {
    setLoading(true);

    try {
      const folderMap = {
        all: "gallery",
        uploads: "gallery/uploads",
        nature: "gallery/nature",
        portraits: "gallery/portraits",
      };

      const folder = folderMap[category];

      const res = await fetch(`/api/images?folder=${folder}`);
      const data = await res.json();

      setImages(data);
    } catch (err) {
      console.error("Failed to fetch images", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(active);
  }, [active]);

  return (
    <div style={{ padding: "30px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>
      <style jsx>{`
        @keyframes rainbowBorder {
          0% { border-image: linear-gradient(45deg, #ff0000, #ff8000) 1; }
          16% { border-image: linear-gradient(45deg, #ff8000, #ffff00) 1; }
          33% { border-image: linear-gradient(45deg, #ffff00, #00ff00) 1; }
          50% { border-image: linear-gradient(45deg, #00ff00, #0080ff) 1; }
          66% { border-image: linear-gradient(45deg, #0080ff, #4b0082) 1; }
          83% { border-image: linear-gradient(45deg, #4b0082, #ff0000) 1; }
          100% { border-image: linear-gradient(45deg, #ff0000, #ff8000) 1; }
        }

        @keyframes rainbowShadow {
          0% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.7), 0 0 40px rgba(255, 0, 0, 0.4); }
          16% { box-shadow: 0 0 20px rgba(255, 128, 0, 0.7), 0 0 40px rgba(255, 128, 0, 0.4); }
          33% { box-shadow: 0 0 20px rgba(255, 255, 0, 0.7), 0 0 40px rgba(255, 255, 0, 0.4); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.7), 0 0 40px rgba(0, 255, 0, 0.4); }
          66% { box-shadow: 0 0 20px rgba(0, 128, 255, 0.7), 0 0 40px rgba(0, 128, 255, 0.4); }
          83% { box-shadow: 0 0 20px rgba(75, 0, 130, 0.7), 0 0 40px rgba(75, 0, 130, 0.4); }
          100% { box-shadow: 0 0 20px rgba(255, 0, 0, 0.7), 0 0 40px rgba(255, 0, 0, 0.4); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes gradientFlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); border-image: linear-gradient(45deg, #ff0000, #ff8000, #ffff00) 1; }
          33% { border-image: linear-gradient(45deg, #ffff00, #00ff00, #0080ff) 1; }
          66% { border-image: linear-gradient(45deg, #0080ff, #4b0082, #ff0000) 1; }
          100% { transform: rotate(360deg); border-image: linear-gradient(45deg, #ff0000, #ff8000, #ffff00) 1; }
        }

        .image-container {
          position: relative;
          border-radius: 15px;
          overflow: hidden;
          border: 4px solid transparent;
          animation: rainbowBorder 3s linear infinite, float 4s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .image-container:hover {
          animation: rainbowShadow 2s linear infinite, float 4s ease-in-out infinite;
          transform: scale(1.05) rotate(2deg);
          border: none;
        }

        .image-container::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082, #ff0000);
          background-size: 400% 400%;
          z-index: -1;
          border-radius: 18px;
          animation: gradientFlow 3s ease infinite;
        }

        .rainbow-text {
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082, #ff0000);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientFlow 3s ease infinite;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
        }

        .rainbow-button {
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082);
          background-size: 400% 400%;
          border: none;
          color: white;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          animation: gradientFlow 3s ease infinite;
          transition: all 0.3s ease;
        }

        .rainbow-button:hover {
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(255,255,255,0.4);
        }
      `}</style>

      <h1 className="rainbow-text" style={{ fontSize: "3rem", textAlign: "center", marginBottom: "40px" }}>
        🌈 Rainbow Image Gallery
      </h1>
  
      {/* Tag Buttons */}
      <div style={{ marginBottom: "40px", display: "flex", justifyContent: "center", gap: "10px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className="rainbow-button"
            style={{
              margin: "5px",
              padding: "12px 24px",
              borderRadius: "50px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <div className="rainbow-text" style={{ fontSize: "1.5rem" }}>
            Loading magic rainbow images...
          </div>
          <div style={{ 
            width: "60px", 
            height: "60px", 
            margin: "20px auto",
            border: "5px solid transparent",
            borderImage: "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082, #ff0000) 1",
            borderImageSlice: 1,
            borderRadius: "50%",
            animation: "spin 1s linear infinite"
          }} />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "30px",
          padding: "20px",
        }}
      >
        {images.map((img, index) => {
          const altText = img.display_name || img.public_id || "Rainbow image";
          return (
            <div key={img.asset_id || img.public_id} className="image-container"
              onClick={() => handleImageClick(img, index)}>
              <img
                src={img.secure_url || img.url}
                alt={altText}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  display: 'block',
                  cursor: 'pointer'
                }}
                loading="lazy"
                />
              <div style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                color: "white",
                padding: "10px",
                fontSize: "14px",
                borderBottomLeftRadius: "10px",
                borderBottomRightRadius: "10px",
              }}>
                {altText.length > 25 ? altText.substring(0, 25) + "..." : altText}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal rendered here */}
      {selectedImage && (
        <Modal
          image={selectedImage}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}
    </div>
  );
}