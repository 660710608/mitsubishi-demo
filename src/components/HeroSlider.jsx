'use client';

import { useState, useEffect, useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';

const defaultVideo = 'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/video-assets/jun-2025/GENERIC_Mitsubishi%20XForce_%E0%B8%A2%E0%B8%B4%E0%B8%99%E0%B8%B4%E0%B8%94%E0%B8%B5%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A3%E0%B9%89%E0%B8%A7%E0%B8%87%E0%B8%88%E0%B8%B1%E0%B8%94_15sec_OOH_4x5_Online%20(1)_RVE_Pages.mp4';
const defaultPoster = 'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/site-images/homepage/Desktop%20Hero%20Banner.jpg?width=1440&auto=webp&quality=70';

const HeroSlider = ({ blok }) => {
  const slides = blok?.slides || [];
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const slide = slides.length > 0 ? slides[current] : null;
  const videoSrc = slide?.video?.filename || defaultVideo;
  const imageSrc = slide?.image?.filename;
  const posterSrc = slide?.poster?.filename || imageSrc || defaultPoster;

  const goTo = (index) => {
    setCurrent((index + slides.length) % slides.length);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    if (slides.length > 1) {
      timerRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
      }, 7000);
    }
  };

  useEffect(() => {
    if (slides.length > 1) startTimer();
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '600px',
        maxHeight: '100vh',
        overflow: 'hidden',
        background: '#0a0a0a',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* VIDEO BACKGROUND */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        poster={posterSrc}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      >
        <source src={videoSrc} />
      </video>

      {/* GRADIENT OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
        pointerEvents: 'none',
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 24px 80px',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '100%',
        color: '#fff',
        pointerEvents: 'none',
      }}>
        {slide?.logo?.filename && (
          <img
            src={slide.logo.filename}
            alt="logo"
            style={{ width: '100%', maxWidth: '320px' }}
          />
        )}

        {slide?.badge && (
          <span style={{
            display: 'inline-block',
            fontSize: '0.7rem',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#fff',
            borderLeft: '3px solid #e60012',
            paddingLeft: '10px',
            marginBottom: '16px',
            opacity: 0.9,
          }}>
            {slide.badge}
          </span>
        )}

        {slide?.title && (
          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: '700',
            margin: '0 0 12px',
            lineHeight: 1.15,
            letterSpacing: '-0.3px',
            textTransform: 'uppercase',
          }}>
            {slide.title}
          </h1>
        )}

        {slide?.subtitle && (
          <p style={{
            fontSize: 'clamp(0.9rem, 1.8vw, 1.25rem)',
            margin: '0 0 24px',
            opacity: 0.85,
            lineHeight: 1.5,
            maxWidth: '480px',
            fontWeight: '400',
          }}>
            {slide.subtitle}
          </p>
        )}

        {slide?.button_label && (
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', pointerEvents: 'auto' }}>
            <a
              href={slide.button_link || '#'}
              style={{
                display: 'inline-block',
                padding: 'clamp(8px, 1.5vw, 14px) clamp(20px, 3vw, 32px)',
                background: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
            >
              {slide.button_label}
            </a>
            {slide?.button2_label && (
              <a
                href={slide.button2_link || '#'}
                style={{
                  display: 'inline-block',
                  padding: '8px 24px',
                  background: 'transparent',
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: '500',
                  fontSize: '0.75rem',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.5)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
              >
                {slide.button2_label}
              </a>
            )}
          </div>
        )}
      </div>

      {/* PLAY / PAUSE BUTTON */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause' : 'Play'}
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '16px',
          width: '44px',
          height: '44px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.4)',
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
          transition: 'background 0.2s',
          zIndex: 10,
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
      >
        {isPlaying ? '⏸' : '▶'}
      </button>

      {/* SLIDE INDICATORS */}
      {slides.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => { goTo(i); startTimer(); }}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? '32px' : '8px',
                height: '3px',
                background: i === current ? '#e60012' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
      )}

      {/* PREV / NEXT ARROWS */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => { goTo(current - 1); startTimer(); }}
            aria-label="Previous"
            style={arrowBtn('left')}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={() => { goTo(current + 1); startTimer(); }}
            aria-label="Next"
            style={arrowBtn('right')}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

const arrowBtn = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: '20px',
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.3)',
  border: '1px solid rgba(255,255,255,0.2)',
  color: '#fff',
  width: '48px',
  height: '48px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.2s',
  zIndex: 10,
});

export default HeroSlider;
