'use client';

import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';
import styles from './Sections.module.css';

// ─────────────────────────────────────────
// Section 5: Dealer Locator Banner
// ─────────────────────────────────────────
export const DealerBanner = ({ blok }) => {
  return (
    <div
      {...storyblokEditable(blok)}
      className={styles.dealerContainer}
    >
      {/* ซ้าย: ข้อความ */}
      <div className={styles.dealerContent}>
        {blok?.tag && (
          <span className={styles.tag}>
            {blok.tag}
          </span>
        )}
        {blok?.title && (
          <h2 className={styles.heading}>
            {blok.title}
          </h2>
        )}
        {blok?.description && (
          <p className={styles.description}>
            {blok.description}
          </p>
        )}
        {blok?.button_label && (
          <a
            href={blok.button_link || '#'}
            className={styles.btn}
          >
            {blok.button_label}
          </a>
        )}
      </div>

      {/* ขวา: รูป */}
      <div className={styles.dealerImage}>
        {blok?.image?.filename && (
          <img
            src={blok.image.filename}
            alt=""
            className={styles.coverImg}
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
  return (
    <div
      {...storyblokEditable(blok)}
      className={styles.serviceContainer}
    >
      {/* ซ้าย: รูป */}
      <div className={styles.serviceImage}>
        {blok?.image?.filename && (
          <img
            src={blok.image.filename}
            alt=""
            className={styles.coverImg}
          />
        )}
      </div>

      {/* ขวา: ข้อความ */}
      <div className={styles.serviceContent}>
        {blok?.tag && (
          <span className={styles.tag}>
            {blok.tag}
          </span>
        )}
        {blok?.title && (
          <h2 className={styles.headingService}>
            {blok.title}
          </h2>
        )}
        {blok?.description && (
          <p className={styles.descriptionService}>
            {blok.description}
          </p>
        )}
        {blok?.button_label && (
          <a
            href={blok.button_link || '#'}
            className={styles.btn}
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
      className={styles.newsContainer}
    >
      {/* Header */}
      <div className={styles.newsHeader}>
        <h2 className={styles.newsTitle}>
          {blok?.title || 'News & Activities'}
        </h2>
        {blok?.view_all_link && (
          <a
            href={blok.view_all_link}
            className={styles.newsViewAll}
          >
            View All
          </a>
        )}
      </div>

      {/* News Grid */}
      <div className={styles.newsGrid}>
        {news.map((item, i) => (
          <a
            key={item._uid || i}
            href={
              !item.link
                ? '#'
                : typeof item.link === 'string'
                ? item.link
                : `/${item.link.cached_url || item.link.url || ''}`
            }
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={styles.newsCard}
          >
            {/* Thumbnail */}
            <div className={styles.newsThumb}>
              {item.image?.filename ? (
                <img
                  src={item.image.filename}
                  alt={item.title || ''}
                />
              ) : (
                <div style={{ width: '100%', height: '100%', background: '#ddd' }} />
              )}
            </div>

            {/* Info */}
            <div className={styles.newsInfo}>
              {item.date && (
                <p className={styles.newsDate}>
                  {item.date}
                </p>
              )}
              <h3 className={styles.newsHeading}>
                {item.title}
              </h3>
              <span className={styles.readMore}>
                Read More →
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
