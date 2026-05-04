'use client';

import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';

// ─────────────────────────────────────────
// Section 5: Dealer Locator Banner
// ─────────────────────────────────────────
export const DealerBanner = ({ blok }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '700px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        backgroundColor: '#fff',
      }}
    >
      {/* ซ้าย: ข้อความ */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 72px',
        background: '#fff',
      }}>
        {blok?.tag && (
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '800',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '18px',
            display: 'block',
          }}>
            {blok.tag}
          </span>
        )}
        {blok?.title && (
          <h2 style={{
            fontSize: 'clamp(3rem, 4vw, 4rem)',
            fontWeight: '800',
            margin: '0 0 20px',
            lineHeight: 1,
            color: '#111',
          }}>
            {blok.title}
          </h2>
        )}
        {blok?.description && (
          <p style={{
            fontSize: '1.3rem',
            lineHeight: 1.80,
            color: '#555',
            margin: '0 0 52px',
            fontWeight: '400',
            maxWidth: '1080px',
          }}>
            {blok.description}
          </p>
        )}
        {blok?.button_label && (
          <a
            href={blok.button_link || '#'}
            style={{
              display: 'inline-block',
              padding: '18px 60px',
              border: '3px solid #111',
              color: '#111',
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '1rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              width: 'fit-content',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#111';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#111';
            }}
          >
            {blok.button_label}
          </a>
        )}
      </div>

      {/* ขวา: รูป */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: '1 1 50%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '1080px',
        }}
      >
        {blok?.image?.filename && (
          <img
            src={blok.image.filename}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// Section 6: Servicing Banner
// ─────────────────────────────────────────
export const ServiceBanner = ({ blok }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        display: 'flex',
        minHeight: '700px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        background: '#fff',
      }}
    >
      {/* ซ้าย: รูป */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: '1 1 50%',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '1080px',
        }}
      >
        {blok?.image?.filename && (
          <img
            src={blok.image.filename}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        )}
      </div>

      {/* ขวา: ข้อความ */}
      <div style={{
        flex: '1 1 50%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 72px',
        background: '#fff',
      }}>
        {blok?.tag && (
          <span style={{
            fontSize: '0.8rem',
            fontWeight: '700',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: '16px',
            display: 'block',
          }}>
            {blok.tag}
          </span>
        )}
        {blok?.title && (
          <h2 style={{
            fontSize: 'clamp(3rem, 4vw, 4rem)',
            fontWeight: '800',
            margin: '0 0 20px',
            lineHeight: 1.2,
            color: '#111',
          }}>
            {blok.title}
          </h2>
        )}
        {blok?.description && (
          <p style={{
            fontSize: '1.3rem',
            lineHeight: 1.75,
            color: '#555',
            margin: '0 0 52px',
            fontWeight: '400',
            maxWidth: '480px',
          }}>
            {blok.description}
          </p>
        )}
        {blok?.button_label && (
          <a
            href={blok.button_link || '#'}
            style={{
              display: 'inline-block',
              padding: '18px 60px',
              border: '3px solid #111',
              color: '#111',
              textDecoration: 'none',
              fontWeight: '800',
              fontSize: '1rem',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              width: 'fit-content',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#111';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#111';
            }}
          >
            {blok.button_label}
          </a>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────
// Section 7: News Section
// ─────────────────────────────────────────
export const NewsSection = ({ blok }) => {
  console.log('blok:', blok);
  const news = blok?.News_items || [];
  const [hovered, setHovered] = useState(null);

  return (
    <div
      {...storyblokEditable(blok)}
      style={{
        background: '#fff',
        padding: '80px 60px',
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          margin: 0,
          color: '#111',
        }}>
          {blok?.title || 'News & Activities'}
        </h2>
        {blok?.view_all_link && (
          <a
            href={blok.view_all_link}
            style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: '#e60012',
              textDecoration: 'none',
              borderBottom: '1px solid #e60012',
              paddingBottom: '2px',
            }}
          >
            View All
          </a>
        )}
      </div>

      {/* News Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(1080px, 1fr))',
        gap: '24px',
      }}>
        {news.map((item, i) => (
          <a
            key={item._uid || i}
            href={item.link || '#'}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              textDecoration: 'none',
              color: '#111',
              display: 'block',
              transition: 'transform 0.2s',
              transform: hovered === i ? 'translateY(-4px)' : 'translateY(0)',
            }}
          >
            {/* Thumbnail */}
            <div style={{ overflow: 'hidden', background: '#f0f0f0', aspectRatio: '4/3' }}>
              {item.image?.filename ? (
                <img
                  src={item.image.filename}
                  alt={item.title || ''}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                    transform: hovered === i ? 'scale(1.06)' : 'scale(1)',
                  }}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#ddd' }} />
              )}
            </div>

            {/* Info */}
            <div style={{ padding: '16px 0' }}>
              {item.date && (
                <p style={{
                  fontSize: '1rem',
                  color: '#999',
                  margin: '0 0 8px',
                  letterSpacing: '1px',
                }}>
                  {item.date}
                </p>
              )}
              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: '0 0 8px',
                lineHeight: 1.5,
                color: '#111',
              }}>
                {item.title}
              </h3>
              <span style={{
                fontSize: '1rem',
                fontWeight: '600',
                color: hovered === i ? '#e60012' : '#fff',
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}>
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
