'use client';

import { storyblokEditable } from '@storyblok/react';
import { useState, useEffect } from 'react';

const FeatureColumns = ({ blok }) => {
  const items = blok?.item || [];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (items.length === 0) return null;

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        display: 'flex',
        width: '100%',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        flexDirection: isMobile ? 'column' : 'row',
      }}
    >
      {items.map((item, i) => (
        <a
          key={item._uid || i}
          href={item.cta_link || '#'}
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
          style={{
            flex: '1 1 0',
            position: 'relative',
            overflow: 'hidden',
            minHeight: isMobile ? '80vw' : '80vh',
            textDecoration: 'none',
            display: 'block',
            marginTop: isMobile ? '10px' : 0,
            marginBottom: isMobile ? '10px' : 0,
          }}
        >
          {/* Background Image */}
          {item.image?.filename && (
            <img
              src={item.image.filename}
              alt={item.heading || ''}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transition: 'transform 0.6s ease',
                transform: hoveredIndex === i ? 'scale(1.04)' : 'scale(1)',
              }}
            />
          )}

          {/* Gradient overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)',
          }} />

          {/* Text */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '0 36px 96px',
            color: '#fff',
          }}>
            {item.eyebrow && (
              <p style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '2.5px',
                textTransform: 'uppercase',
                margin: '0 0 10px',
                opacity: 0.85,
              }}>
                {item.eyebrow}
              </p>
            )}
            {item.heading && (
              <h2 style={{
                fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                fontWeight: '800',
                margin: '0 0 10px',
                lineHeight: 1.2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                {item.heading}
              </h2>
            )}
            {item.description && (
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                margin: '0 0 20px',
                opacity: 0.85,
                fontWeight: '300',
                maxWidth: '80%',
              }}>
                {item.description}
              </p>
            )}
            {item.cta_label && (
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: '#fff',
                borderBottom: '1px solid #fff',
                paddingBottom: '2px',
              }}>
                {item.cta_label} →
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};

export default FeatureColumns;
