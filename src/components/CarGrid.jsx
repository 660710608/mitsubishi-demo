'use client';

import { storyblokEditable } from '@storyblok/react';
import { useState, useEffect, useRef } from 'react';
import styles from './CarGrid.module.css';

const CarGrid = ({ blok }) => {
  const cars = blok?.cars || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef(null);

  // Mark as mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto slide every 6 seconds
  useEffect(() => {
    if (cars.length > 1 && !isHovered && mounted) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % cars.length);
      }, 6000);
    }
    return () => clearInterval(intervalRef.current);
  }, [cars.length, isHovered, mounted]);

  if (cars.length === 0) return null;

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % cars.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  const getCardStyle = (index) => {
    const total = cars.length;
    let diff = index - currentIndex;
    
    // Handle loop - find shortest path
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    
    const absDiff = Math.abs(diff);
    
    let transform = '';
    let opacity = 1;
    let zIndex = 10;
    let filter = 'none';

    if (diff === 0) {
      // Center - Extra big
      transform = 'translateX(0) scale(1.38) rotateY(0deg)';
      zIndex = 10;
      opacity = 1;
      filter = 'none';
    } else if (absDiff === 1) {
      // Adjacent - with gap
      const direction = diff > 0 ? 1 : -1;
      transform = `translateX(${direction * 340}px) scale(0.85) rotateY(${direction * -15}deg)`;
      zIndex = 5;
      opacity = 0.6;
      filter = 'blur(1px)';
    } else if (absDiff === 2) {
      // Second adjacent
      const direction = diff > 0 ? 1 : -1;
      transform = `translateX(${direction * 560}px) scale(0.7) rotateY(${direction * -28}deg)`;
      zIndex = 2;
      opacity = 0.35;
      filter = 'blur(3px)';
    } else {
      // Hidden
      const direction = diff > 0 ? 1 : -1;
      transform = `translateX(${direction * 750}px) scale(0.55) rotateY(${direction * -40}deg)`;
      zIndex = 0;
      opacity = 0;
      filter = 'blur(5px)';
    }

    return { transform, opacity, zIndex, filter };
  };

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        background: '#fff',
        padding: '24px 0 20px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        overflow: 'hidden',
      }}
    >
      {blok?.title && (
        <h2 style={{
          textAlign: 'center',
          fontSize: '0.85rem',
          fontWeight: '700',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          marginBottom: '32px',
          color: '#111',
        }}>
          {blok.title}
        </h2>
      )}

      <div 
        style={{ 
          position: 'relative', 
          height: '340px',
          perspective: '1200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'transparent',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Arrow */}
        <button 
          onClick={prev} 
          className={styles.arrow}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 30,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '16px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.querySelector('svg').style.stroke = '#e60012'}
          onMouseLeave={(e) => e.currentTarget.querySelector('svg').style.stroke = '#666'}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1" style={{ transition: 'stroke 0.3s' }}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Cards */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {cars.map((car, index) => {
            const cardStyle = getCardStyle(index);
            const isCenter = index === currentIndex;
            
            return (
              <div
                key={`${index}-${car._uid}`}
                style={{
                  position: 'absolute',
                  width: '360px',
                  height: '300px',
                  transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: cardStyle.transform,
                  opacity: cardStyle.opacity,
                  zIndex: cardStyle.zIndex,
                  filter: cardStyle.filter,
                  transformStyle: 'preserve-3d',
                }}
              >
                <a
                  href={car.link || '#'}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    textDecoration: 'none',
                    color: '#fff',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Car Image - Full */}
                  {car.image?.filename ? (
                    <img
                      src={car.image.filename}
                      alt={car.name || ''}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: '12px',
                        boxSizing: 'border-box',
                      }}
                    />
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '100%', 
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#f5f5f5',
                      color: '#ccc',
                    }}>No image</div>
                  )}

                  {/* Text Overlay - Inside Image */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 16px',
                    textAlign: 'center',
                  }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#111',
                      margin: '0 0 4px',
                    }}>
                      {car.name}
                    </h3>
                    {car.price && (
                      <p style={{ 
                        fontSize: '0.75rem', 
                        color: '#555', 
                        margin: 0,
                        letterSpacing: '0.5px',
                      }}>
                        {car.price}
                      </p>
                    )}
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button 
          onClick={next} 
          className={styles.arrow}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 30,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '16px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.querySelector('svg').style.stroke = '#e60012'}
          onMouseLeave={(e) => e.currentTarget.querySelector('svg').style.stroke = '#666'}
        >
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="1" style={{ transition: 'stroke 0.3s' }}>
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        paddingTop: '20px',
        marginTop: '20px',
      }}>
        {cars.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: index === currentIndex ? '24px' : '8px',
              height: '3px',
              background: index === currentIndex ? '#e60012' : '#ccc',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.4s ease',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* View All */}
      {blok?.view_all_link && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href={blok.view_all_link} style={{
            fontSize: '0.7rem', fontWeight: '600', letterSpacing: '2px',
            textTransform: 'uppercase', color: '#e60012', textDecoration: 'none',
            borderBottom: '1px solid #e60012', paddingBottom: '2px',
            transition: 'all 0.3s',
          }}>
            {blok.view_all_label || 'View All Models'} →
          </a>
        </div>
      )}
    </div>
  );
};

export default CarGrid;
