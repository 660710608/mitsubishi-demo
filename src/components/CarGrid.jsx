'use client';

import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';

const CarGrid = ({ blok }) => {
  const cars = blok?.cars || [];
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(cars.length);
  const visibleCount = 3;
  const loopCars = [...cars, ...cars, ...cars];

  if (cars.length === 0) return null;

  const cardWidth = 100 / visibleCount;

  const [transitioning, setTransitioning] = useState(true);

  const next = () => {
    setTransitioning(true);
    setCurrentIndex((p) => {
      const next = p + 1;
      if (next >= cars.length * 2) {
        setTimeout(() => {
          setTransitioning(false);
          setCurrentIndex(cars.length);
        }, 400);
      }
      return next;
    });
  };

  const prev = () => {
    setTransitioning(true);
    setCurrentIndex((p) => {
      const next = p - 1;
      if (next < cars.length) {
        setTimeout(() => {
          setTransitioning(false);
          setCurrentIndex(cars.length * 2 - visibleCount);
        }, 400);
      }
      return next;
    });
  };

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        background: '#f2f2f2',
        padding: '48px 0 40px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        overflow: 'hidden',
      }}
    >
      {blok?.title && (
        <h2 style={{
          textAlign: 'center',
          fontSize: '0.75rem',
          fontWeight: '700',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          marginBottom: '36px',
          color: '#111',
        }}>
          {blok.title}
        </h2>
      )}

      <div style={{ position: 'relative' }}>
        {/* Prev Arrow */}
        <button onClick={prev} style={arrowStyle('left')}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e60012'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Track */}
        <div style={{ overflow: 'hidden', margin: '0 60px' }}>
          <div style={{
            display: 'flex',
            transition: transitioning ? 'transform 0.4s ease' : 'none',
            transform: `translateX(-${currentIndex * cardWidth}%)`,
          }}>
            {loopCars.map((car, i) => (
              <div key={`${i}-${car._uid}`} style={{ flex: `0 0 ${cardWidth}%`, padding: '0 8px', boxSizing: 'border-box' }}>
                <a
                  href={car.link || '#'}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    display: 'block',
                    textDecoration: 'none',
                    color: '#111',
                    position: 'relative',
                    overflow: 'hidden',
                    background: '#fff',
                  }}
                >
                  {/* Image */}
                  <div style={{
                    padding: '32px 24px 120px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    height: '480px',
                  }}>
                    {car.image?.filename ? (
                      <img
                        src={car.image.filename}
                        alt={car.name || ''}
                        style={{
                          width: 'auto',
                          objectFit: 'contain',
                          transition: 'transform 0.3s',
                          transform: hoveredIndex === i ? 'scale(1.06)' : 'scale(1)',
                        }}
                      />
                    ) : (
                      <div style={{ color: '#ccc', fontSize: '0.8rem' }}>No image</div>
                    )}
                  </div>

                  {/* Info — absolute กลางล่าง ทับบนรูป */}
                  <div style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: 0,
                    right: 0,
                    textAlign: 'center',
                    padding: '0 16px',
                  }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      margin: '0 0 4px',
                      color: hoveredIndex === i ? '#e60012' : '#111',
                      transition: 'color 0.2s ease',
                    }}>
                      {car.name}
                    </h3>
                    {car.price && (
                      <p style={{ fontSize: '1rem', color: '#555', margin: 0 }}>
                        {car.price}
                      </p>
                    )}
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Next Arrow */}
        <button onClick={next} style={arrowStyle('right')}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = '#e60012'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* View All */}
      {blok?.view_all_link && (
        <div style={{ textAlign: 'center', marginTop: '28px' }}>
          <a href={blok.view_all_link} style={{
            fontSize: '0.75rem', fontWeight: '700', letterSpacing: '2px',
            textTransform: 'uppercase', color: '#111', textDecoration: 'none',
            borderBottom: '1px solid #111', paddingBottom: '2px',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#e60012'; e.currentTarget.style.borderColor = '#e60012'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#111'; e.currentTarget.style.borderColor = '#111'; }}
          >
            {blok.view_all_label || 'View All Models'} →
          </a>
        </div>
      )}
    </div>
  );
};

const arrowStyle = (side) => ({
  position: 'absolute',
  [side]: '16px',
  top: '50%',
  transform: 'translateY(-60%)',
  zIndex: 10,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
});

export default CarGrid;