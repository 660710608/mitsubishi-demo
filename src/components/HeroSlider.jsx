'use client';

import { useState, useEffect, useRef } from 'react';
import { storyblokEditable } from '@storyblok/react';

const HeroSlider = ({ blok }) => {
  const slides = blok?.slides || [];
  const [current, setCurrent] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  const goTo = (index) => {
    setCurrent((index + slides.length) % slides.length);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
  };

  useEffect(() => {
    if (slides.length > 1) startTimer();
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => { });
    }
  }, [current]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      clearInterval(timerRef.current);
    } else {
      videoRef.current.play();
      startTimer();
    }
    setIsPlaying(!isPlaying);
  };

  if (slides.length === 0) {
    return (
      <div style={{ width: '100%', height: '600px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
        <p>No slides yet — add slides in Storyblok</p>
      </div>
    );
  }

  const slide = slides[current];
  const videoSrc = slide?.video?.filename;
  const imageSrc = slide?.image?.filename;

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        position: 'relative',
        width: '100vw',
        left: 0,
        height: '1920px',
        minHeight: '600px',
        maxHeight: '1920px',
        overflow: 'hidden',
        background: '#0a0a0a',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* VIDEO BACKGROUND */}
      {videoSrc ? (
        <video
          ref={videoRef}
          key={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imageSrc ? (
        <img
          key={imageSrc}
          src={imageSrc}
          alt={slide?.title || ''}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : null}

      {/* GRADIENT OVERLAY */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
      }} />

      {/* CONTENT */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 60px 80px',
        alignItems: 'center',
        textAlign: 'center',
        maxWidth: '100%',
        color: '#fff',
      }}>
        {/* Logo */}
        {slide?.logo?.filename && (
          <img
            src={slide.logo.filename}
            alt="logo"
            style={{ width: '720px' }}
          />
        )}

        {/* Badge / Tag */}
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

        {/* Title */}
        {slide?.title && (
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: '800',
            margin: '0 0 16px',
            lineHeight: 1.05,
            letterSpacing: '-0.5px',
            textTransform: 'uppercase',
          }}>
            {slide.title}
          </h1>
        )}

        {/* Subtitle */}
        {slide?.subtitle && (
          <p style={{
            fontSize: '1.75rem',
            margin: '0 0 36px',
            opacity: 0.8,
            lineHeight: 1.6,
            maxWidth: '500px',
            fontWeight: '750',
          }}>
            {slide.subtitle}
          </p>
        )}

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {slide?.button_label && (
            <a
              href={slide.button_link || '#'}
              style={{
                display: 'inline-block',
                padding: '24px 48px',
                background: 'transparent',
                color: '#fff',
                border: '1px solid #fff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '1.5rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.color = '#000000'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#fff'; e.currentTarget.style.color = '#ffffff'; }}
            >
              {slide.button_label}
            </a>
          )}
          {slide?.button2_label && (
            <a
              href={slide.button2_link || '#'}
              style={{
                display: 'inline-block',
                padding: '13px 36px',
                background: 'transparent',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '0.8rem',
                letterSpacing: '2px',
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
      </div>

      {/* PLAY / PAUSE BUTTON (แบบ Mitsubishi) */}
      {videoSrc && (
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '60px',
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
      )}

      {/* SLIDE INDICATORS */}
      {slides.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '60px',
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
