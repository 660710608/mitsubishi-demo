'use client';

import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';

const HighlightBanner = ({ blok }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      {...storyblokEditable(blok)}
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "stretch",
        flexWrap: 'wrap',
        width: "100%",
        minHeight: "480px",
        backgroundColor: "#fff",
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* ซ้าย: รูป */}
      <div style={{ flex: '1 1 300px', minWidth: 0 }}>
        {blok?.image?.filename && (
          <img
            src={blok.image.filename}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        )}
      </div>

      {/* ขวา: ข้อความ */}
      <div
        style={{
          flex: "1 1 50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "60px 64px",
          backgroundColor: "#fff",
        }}
      >
        {blok?.title && (
          <h2
            style={{
              color: "#1a1a1a",
              fontSize: "clamp(20px, 3vw, 48px)",
              fontWeight: "800",
              lineHeight: 1.2,
              margin: "0 0 20px",
              whiteSpace: "pre-line",
              maxWidth: "800px",
            }}
          >
            {blok.title}
          </h2>
        )}

        {blok?.description && (
          <p
            style={{
              color: "#555",
              fontSize: "16px",
              lineHeight: 1.75,
              margin: "0 0 20px",
              fontWeight: "300",
              maxWidth: "800px",
            }}
          >
            {blok.description}
          </p>
        )}

        {blok?.button_label && (
          <a
            href={blok.button_link || "#"}
            onMouseEnter={(e) => { e.currentTarget.style.background = '#000000'; e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#000000'; e.currentTarget.style.color = '#000000'; }}
            style={{
              display: "inline-block",
              padding: "12px 36px",
              background: hovered ? "#1a1a1a" : "transparent",
              color: hovered ? "#fff" : "#1a1a1a",
              border: "2px solid #1a1a1a",
              textDecoration: "none",
              fontWeight: "600",
              fontSize: "0.9rem",
              letterSpacing: "2px",
              textTransform: "uppercase",
              transition: "all 0.2s",
            }}
          >
            {blok.button_label}
          </a>
        )}
      </div>
    </section>
  );
};

export default HighlightBanner;
