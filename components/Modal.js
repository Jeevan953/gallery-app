// components/Modal.js
export default function Modal({ image, onClose, onNext, onPrev }) {
  if (!image) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      cursor: 'pointer'
    }} onClick={onClose}>
      
      {/* Modal Content */}
      <div style={{
        position: 'relative',
        maxWidth: '90vw',
        maxHeight: '90vh',
        cursor: 'default'
      }} onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '-40px', right: '0',
          background: 'none',
          border: 'none',
          color: 'white',
          fontSize: '2rem',
          cursor: 'pointer'
        }}>×</button>
        
        {/* Navigation Buttons */}
        <button onClick={onPrev} style={{
          position: 'absolute',
          left: '10px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          padding: '10px',
          cursor: 'pointer',
          borderRadius: '50%'
        }}>‹</button>
        
        {/* Main Image */}
        <img src={image.secure_url} alt="Enlarged view"
          style={{
            width: 'auto',
            height: 'auto',
            maxWidth: '100%',
            maxHeight: '80vh',
            display: 'block',
            borderRadius: '8px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }} />
        
        <button onClick={onNext} style={{
          position: 'absolute',
          right: '10px', top: '50%',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          border: 'none',
          fontSize: '1.5rem',
          padding: '10px',
          cursor: 'pointer',
          borderRadius: '50%'
        }}>›</button>
        
        {/* Image Info */}
        <div style={{
          color: 'white',
          textAlign: 'center',
          marginTop: '10px',
          fontSize: '0.9rem',
          fontFamily: 'monospace'
        }}>{image.public_id}</div>
      </div>
    </div>
  );
}