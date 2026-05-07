'use client';

import { storyblokEditable } from '@storyblok/react';

const HighlightBanner = ({ blok }) => {
  const defaultTitle = 'All-New XFORCE HEV Wins Thailand Car of The Year 2025';
  const defaultDescription = 'The All-New XFORCE HEV has been awarded Thailand Car of The Year 2025 by the Thai Automotive Journalists Association, reaffirming its exceptional performance with outstanding scores across every category—solidifying its status as a truly premium and all-rounded SUV.';
  const defaultImage = 'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/site-images/xforce/xforce-hev-banner.jpg?width=1440&auto=webp&quality=80';

  const title = blok?.title || defaultTitle;
  const description = blok?.description || defaultDescription;
  const imageSrc = blok?.image?.filename || defaultImage;

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      width: "100%",
      padding: "40px 20px",
      boxSizing: "border-box",
    }}>
      <section
        {...storyblokEditable(blok)}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          width: "100%",
          maxWidth: "80%",
          minHeight: "660px",
          height: "85vh",
          maxHeight: "750px",
          backgroundColor: "#fff",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          overflow: "hidden",
          borderRadius: "0",
          boxShadow: "none",
        }}
      >
        {/* Left: Image - Full height */}
        <div style={{ 
          flex: '1 1 50%', 
          position: 'relative',
          height: '100%',
          minHeight: '600px',
        }}>
          <img
            src={imageSrc}
            alt={title}
            style={{
              position: 'absolute',
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
        </div>

        {/* Right: Text Content */}
        <div
          style={{
            flex: "1 1 50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "60px 72px",
            backgroundColor: "#fff",
            boxSizing: "border-box",
          }}
        >
          {blok?.tag && (
            <span style={{
              fontSize: '0.7rem',
              fontWeight: '600',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#e60012',
              marginBottom: '16px',
              display: 'block',
            }}>
              {blok.tag}
            </span>
          )}

          <h2 style={{
            color: "#1a1a1a",
            fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)",
            fontWeight: "700",
            lineHeight: 1.25,
            margin: "0 0 20px",
            maxWidth: "500px",
          }}>
            {title}
          </h2>

          <p style={{
            color: "#555",
            fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
            lineHeight: 1.75,
            margin: "0 0 32px",
            fontWeight: "400",
            maxWidth: "480px",
          }}>
            {description}
          </p>

          {blok?.button_label && (
            <a
              href={blok.button_link || "#"}
              style={{
                display: "inline-block",
                padding: "14px 36px",
                background: "transparent",
                color: "#1a1a1a",
                border: "2px solid #1a1a1a",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "0.8rem",
                letterSpacing: "2px",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => { 
                e.currentTarget.style.background = '#1a1a1a'; 
                e.currentTarget.style.color = '#fff'; 
              }}
              onMouseLeave={(e) => { 
                e.currentTarget.style.background = 'transparent'; 
                e.currentTarget.style.color = '#1a1a1a'; 
              }}
            >
              {blok.button_label}
            </a>
          )}
        </div>
      </section>
    </div>
  );
};

export default HighlightBanner;
