// pages/index.js
import { useState, useEffect } from "react";

// Define the Modal component FIRST
function Modal({ image, onClose, onNext, onPrev, isMobile }) {
  if (!image) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.97)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        cursor: "pointer",
        padding: isMobile ? "10px" : "0",
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: "relative",
          maxWidth: isMobile ? "100vw" : "95vw",
          maxHeight: isMobile ? "100vh" : "95vh",
          cursor: "default",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: isMobile ? "20px" : "20px",
            right: isMobile ? "20px" : "20px",
            background: "rgba(0,0,0,0.8)",
            border: "2px solid white",
            color: "white",
            fontSize: isMobile ? "1.8rem" : "2.2rem",
            cursor: "pointer",
            width: isMobile ? "50px" : "60px",
            height: isMobile ? "50px" : "60px",
            borderRadius: "50%",
            zIndex: 1001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
          }}
        >
          ×
        </button>
        
        {/* Navigation buttons for mobile - placed at bottom */}
        {isMobile ? (
          <div style={{
            position: "absolute",
            bottom: "30px",
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            zIndex: 1001,
          }}>
            <button
              onClick={onPrev}
              style={{
                background: "rgba(0,0,0,0.8)",
                color: "white",
                border: "2px solid white",
                fontSize: "1.8rem",
                padding: "15px 20px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              }}
            >
              ‹
            </button>
            <button
              onClick={onNext}
              style={{
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              }}
            >
              ›
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={onPrev}
              style={{
                position: "absolute",
                left: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.8)",
                color: "white",
                border: "2px solid white",
                fontSize: "2rem",
                padding: "20px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              }}
            >
              ‹
            </button>
            <button
              onClick={onNext}
              style={{
                position: "absolute",
                right: "30px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(0,0,0,0.8)",
                color: "white",
                border: "2px solid white",
                fontSize: "2rem",
                padding: "20px",
                cursor: "pointer",
                borderRadius: "50%",
                width: "70px",
                height: "70px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
              }}
            >
              ›
            </button>
          </>
        )}

        <div style={{
          width: "100%",
          height: isMobile ? "calc(100vh - 140px)" : "calc(95vh - 100px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "20px" : "40px",
        }}>
          <img
            src={image.secure_url || image.url}
            alt={image.display_name || image.public_id}
            style={{
              width: "auto",
              height: "auto",
              maxWidth: "100%",
              maxHeight: "100%",
              display: "block",
              borderRadius: "12px",
              boxShadow: "0 20px 50px rgba(0,0,0,0.8)",
              objectFit: "contain",
            }}
          />
        </div>
        
        <div
          style={{
            color: "white",
            textAlign: "center",
            marginTop: "15px",
            fontSize: isMobile ? "1rem" : "1.2rem",
            fontFamily: "Arial, sans-serif",
            padding: isMobile ? "0 15px" : "0",
            maxWidth: "100%",
            wordBreak: "break-word",
            backgroundColor: "rgba(0,0,0,0.7)",
            padding: "10px 20px",
            borderRadius: "10px",
            margin: "0 20px",
          }}
        >
          {image.display_name || image.public_id}
        </div>
      </div>
    </div>
  );
}

// ADD PSALM 1 TO CATEGORIES
const categories = ["all", "uploads", "nature", "portraits", "psalm1"];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      // SPECIAL CASE: For Psalm 1, load local images
      if (category === "psalm1") {
  const psalmImages = [];
  for (let i = 1; i <= 30; i++) {  // Changed from 7 to 30
    psalmImages.push({
      secure_url: `/Psalm 1/psalm1_${i}.png`,
      public_id: `psalm1_${i}`,
      display_name: `Psalm 1 - Verse ${i}`
    });
  }
  setImages(psalmImages);
  setLoading(false);
  return;
}

      // For Cloudinary galleries
      const folderMap = {
        all: "gallery",
        uploads: "gallery/uploads",
        nature: "gallery/nature",
        portraits: "gallery/portraits",
      };

      const folder = folderMap[category];

      const res = await fetch(`/api/images?folder=${encodeURIComponent(folder)}`);
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
    <div style={{ 
      padding: isMobile ? "20px" : "40px", 
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      minHeight: "100vh"
    }}>
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
          0% { box-shadow: 0 0 25px rgba(255, 0, 0, 0.8), 0 0 50px rgba(255, 0, 0, 0.5); }
          16% { box-shadow: 0 0 25px rgba(255, 128, 0, 0.8), 0 0 50px rgba(255, 128, 0, 0.5); }
          33% { box-shadow: 0 0 25px rgba(255, 255, 0, 0.8), 0 0 50px rgba(255, 255, 0, 0.5); }
          50% { box-shadow: 0 0 25px rgba(0, 255, 0, 0.8), 0 0 50px rgba(0, 255, 0, 0.5); }
          66% { box-shadow: 0 0 25px rgba(0, 128, 255, 0.8), 0 0 50px rgba(0, 128, 255, 0.5); }
          83% { box-shadow: 0 0 25px rgba(75, 0, 130, 0.8), 0 0 50px rgba(75, 0, 130, 0.5); }
          100% { box-shadow: 0 0 25px rgba(255, 0, 0, 0.8), 0 0 50px rgba(255, 0, 0, 0.5); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
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
          border-radius: 20px;
          overflow: hidden;
          border: 5px solid transparent;
          animation: rainbowBorder 3s linear infinite, float 4s ease-in-out infinite;
          transition: transform 0.3s ease;
        }

        .image-container:hover {
          animation: rainbowShadow 2s linear infinite, float 4s ease-in-out infinite;
          transform: scale(1.08) rotate(3deg);
          border: none;
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
        }

        .image-container::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082, #ff0000);
          background-size: 400% 400%;
          z-index: -1;
          border-radius: 23px;
          animation: gradientFlow 3s ease infinite;
        }

        .rainbow-text {
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082, #ff0000);
          background-size: 400% 400%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: gradientFlow 3s ease infinite;
          text-shadow: 3px 3px 6px rgba(0,0,0,0.3);
          font-weight: 800;
        }

        .rainbow-button {
          background: linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082);
          background-size: 400% 400%;
          border: 2px solid white;
          color: white;
          text-shadow: 2px 2px 3px rgba(0,0,0,0.5);
          animation: gradientFlow 3s ease infinite;
          transition: all 0.3s ease;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .rainbow-button:hover {
          transform: scale(1.15);
          box-shadow: 0 0 30px rgba(255,255,255,0.6);
        }

        /* Special style for Psalm 1 button */
        .psalm1-button {
          background: linear-gradient(45deg, #8B00FF, #4B0082, #9400D3, #8A2BE2);
          background-size: 400% 400%;
          border: 2px solid white;
          color: white;
          text-shadow: 2px 2px 3px rgba(0,0,0,0.5);
          animation: gradientFlow 3s ease infinite;
          transition: all 0.3s ease;
          font-weight: bold;
          letter-spacing: 1px;
        }

        .psalm1-button:hover {
          transform: scale(1.15);
          box-shadow: 0 0 30px rgba(139, 0, 255, 0.8);
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
          .image-container {
            border-width: 4px;
            animation: rainbowBorder 3s linear infinite, float 3s ease-in-out infinite;
          }
          
          .image-container:hover {
            transform: scale(1.05) rotate(2deg);
          }
          
          .image-container::before {
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
          }
        }

        @media (max-width: 480px) {
          .rainbow-text {
            font-size: 2.5rem !important;
          }
          
          .image-container {
            border-width: 3px;
          }
        }

        /* Disable hover effects on touch devices */
        @media (hover: none) and (pointer: coarse) {
          .image-container:hover {
            transform: none;
            animation: rainbowBorder 3s linear infinite, float 4s ease-in-out infinite;
          }
          
          .rainbow-button:hover, .psalm1-button:hover {
            transform: none;
            box-shadow: none;
          }
        }
      `}</style>

      <h1 className="rainbow-text" style={{ 
        fontSize: isMobile ? "2.5rem" : "3.5rem", 
        textAlign: "center", 
        marginBottom: isMobile ? "30px" : "50px",
        padding: isMobile ? "0 15px" : "0",
        letterSpacing: "1px"
      }}>
        🌈 Rainbow Image Gallery 📸
      </h1>
  
      {/* Tag Buttons */}
      <div style={{ 
        marginBottom: isMobile ? "30px" : "50px", 
        display: "flex", 
        justifyContent: "center", 
        gap: isMobile ? "10px" : "15px", 
        flexWrap: "wrap",
        padding: isMobile ? "0 10px" : "0"
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={cat === "psalm1" ? "psalm1-button" : "rainbow-button"}
            style={{
              margin: isMobile ? "5px" : "8px",
              padding: isMobile ? "12px 20px" : "15px 30px",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: isMobile ? "16px" : "18px",
              position: "relative",
              overflow: "hidden",
              minWidth: isMobile ? "90px" : "auto",
              flex: isMobile ? "1 0 auto" : "none",
              maxWidth: isMobile ? "140px" : "none",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
            }}
          >
            {cat === "psalm1" ? (isMobile ? "📖 PSALM 1" : "📖 PSALM 1") : 
             isMobile && cat === "uploads" ? "UPLOADS" :
             isMobile && cat === "nature" ? "NATURE" :
             isMobile && cat === "portraits" ? "PORTRAITS" :
             cat.toUpperCase()}
          </button>
        ))}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: isMobile ? "30px" : "50px" }}>
          <div className="rainbow-text" style={{ fontSize: isMobile ? "1.5rem" : "1.8rem" }}>
            {active === "psalm1" ? "📖 Loading Psalm 1 verses..." : "✨ Loading magic rainbow images..."}
          </div>
          <div style={{ 
            width: isMobile ? "70px" : "80px", 
            height: isMobile ? "70px" : "80px", 
            margin: "30px auto",
            border: "6px solid transparent",
            borderImage: "linear-gradient(45deg, #ff0000, #ff8000, #ffff00, #00ff00, #0080ff, #4b0082, #ff0000) 1",
            borderImageSlice: 1,
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            boxShadow: "0 0 20px rgba(255,255,255,0.3)",
          }} />
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? 
            (images.length === 1 ? "1fr" : "repeat(auto-fill, minmax(180px, 1fr))") : 
            "repeat(auto-fill, minmax(320px, 1fr))",
          gap: isMobile ? "20px" : "30px",
          padding: isMobile ? "15px" : "25px",
        }}
      >
        {images.map((img, index) => {
          const altText = img.display_name || img.public_id || "Rainbow image";
          return (
            <div key={img.asset_id || img.public_id || index} className="image-container"
              onClick={() => handleImageClick(img, index)}
              style={{
                aspectRatio: "1/1",
              }}
            >
              <img
                src={img.secure_url || img.url}
                alt={altText}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '15px',
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
                background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                color: "white",
                padding: isMobile ? "12px" : "15px",
                fontSize: isMobile ? "14px" : "16px",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
                lineHeight: "1.4",
                fontWeight: "bold",
              }}>
                {altText}
              </div>
              {active === "psalm1" && (
                <div style={{
                  position: "absolute",
                  top: isMobile ? "10px" : "15px",
                  left: isMobile ? "10px" : "15px",
                  background: "rgba(139, 0, 255, 0.9)",
                  color: "white",
                  padding: isMobile ? "6px 12px" : "8px 16px",
                  borderRadius: "25px",
                  fontSize: isMobile ? "12px" : "14px",
                  fontWeight: "bold",
                  backdropFilter: "blur(3px)",
                  border: "2px solid white",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                }}>
                  {isMobile ? "📖 Psalm 1" : "📖 Psalm 1 Scripture"}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info message when Psalm 1 is selected */}
      {active === "psalm1" && images.length > 0 && (
        <div style={{
          marginTop: isMobile ? "30px" : "40px",
          padding: isMobile ? "20px" : "25px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "15px",
          textAlign: "center",
          color: "white",
          maxWidth: "900px",
          marginLeft: "auto",
          marginRight: "auto",
          fontSize: isMobile ? "14px" : "16px",
          lineHeight: "1.6",
          backdropFilter: "blur(10px)",
          border: "2px solid rgba(255,255,255,0.2)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
        }}>
          <h3 style={{ 
            marginBottom: "15px", 
            color: "#E6E6FA",
            fontSize: isMobile ? "18px" : "22px",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          }}>
            📖 THE ISRAEL BIBLE - PSALM 1
          </h3>
          <p style={{ margin: 0, fontStyle: "italic" }}>
            "Happy is the man who has not followed the counsel of the wicked, or taken the path of sinners, 
            or joined with the company of the insolent. Rather, the teaching of Hashem is his delight, 
            and he studies that teaching day and night."
          </p>
          <p style={{ 
            marginTop: "15px", 
            fontSize: isMobile ? "12px" : "14px",
            opacity: 0.9
          }}>
            <strong>Showing {images.length} scripture images</strong>
          </p>
        </div>
      )}

      {/* Footer */}
      <div style={{
        marginTop: isMobile ? "40px" : "60px",
        textAlign: "center",
        color: "rgba(255, 255, 255, 0.8)",
        fontSize: isMobile ? "13px" : "15px",
        padding: isMobile ? "0 15px 25px" : "0 0 40px",
      }}>
        <p style={{ fontSize: isMobile ? "16px" : "18px", marginBottom: "10px", fontWeight: "bold" }}>
          {active === "psalm1" ? 
            "📖 Scripture Gallery - Psalm 1" : 
            "🌐 Rainbow Image Gallery"}
        </p>
        <p style={{ marginTop: "5px", fontSize: isMobile ? "12px" : "14px" }}>
          {images.length} {active === "psalm1" ? "Psalm verses" : "images"} loaded • Tap to view larger
        </p>
      </div>

      {/* Modal rendered here */}
      {selectedImage && (
        <Modal
          image={selectedImage}
          onClose={handleCloseModal}
          onNext={handleNext}
          onPrev={handlePrev}
          isMobile={isMobile}
        />
      )}
    </div>
  );
}