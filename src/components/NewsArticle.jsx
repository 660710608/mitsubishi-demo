'use client';

import { storyblokEditable } from '@storyblok/react';
import styles from './NewsArticle.module.css';

// ─────────────────────────────────────────
// Block 1: News Article Hero
// Fields: headline, subheading, date, breadcrumb, featured_image (asset)
// ─────────────────────────────────────────
export const NewsArticleHero = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className={styles.heroContainer}>
      {blok?.breadcrumb && (
        <nav className={styles.breadcrumb}>{blok.breadcrumb}</nav>
      )}
      <div className={styles.heroContent}>
        {blok?.date && <p className={styles.heroDate}>{blok.date}</p>}
        {blok?.headline && <h1 className={styles.heroHeadline}>{blok.headline}</h1>}
        {blok?.subheading && <p className={styles.heroSubheading}>{blok.subheading}</p>}
      </div>
      {blok?.featured_image?.filename && (
        <div className={styles.heroImageWrapper}>
          <img
            src={blok.featured_image.filename}
            alt={blok.headline || ''}
            className={styles.heroImage}
          />
        </div>
      )}
    </section>
  );
};

// ─────────────────────────────────────────
// Block 2: News Article Content
// Fields: content (textarea — one paragraph per block instance)
// ─────────────────────────────────────────
export const NewsArticleContent = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className={styles.contentContainer}>
      {blok?.content && <p className={styles.contentText}>{blok.content}</p>}
    </section>
  );
};

// ─────────────────────────────────────────
// Block 3: News Article Quote
// Fields: quote, attribution_name, attribution_title
// ─────────────────────────────────────────
export const NewsArticleQuote = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className={styles.quoteContainer}>
      {blok?.quote && (
        <blockquote className={styles.quoteText}>"{blok.quote}"</blockquote>
      )}
      <footer className={styles.quoteAttribution}>
        {blok?.attribution_name && (
          <strong className={styles.quoteName}>{blok.attribution_name}</strong>
        )}
        {blok?.attribution_title && (
          <span className={styles.quoteTitle}>{blok.attribution_title}</span>
        )}
      </footer>
    </section>
  );
};

// ─────────────────────────────────────────
// Block 4: News Vehicle Showcase
// Fields: title, description, vehicles (nested blocks: name, image)
// ─────────────────────────────────────────
export const NewsVehicleShowcase = ({ blok }) => {
  const vehicles = blok?.vehicles || [];
  return (
    <section {...storyblokEditable(blok)} className={styles.vehicleContainer}>
      {blok?.title && <h2 className={styles.vehicleTitle}>{blok.title}</h2>}
      {blok?.description && (
        <p className={styles.vehicleDescription}>{blok.description}</p>
      )}
      {vehicles.length > 0 && (
        <div className={styles.vehicleGrid}>
          {vehicles.map((vehicle, i) => (
            <div key={vehicle._uid || i} className={styles.vehicleCard}>
              {vehicle.image?.filename && (
                <img
                  src={vehicle.image.filename}
                  alt={vehicle.name || ''}
                  className={styles.vehicleImage}
                />
              )}
              {vehicle.name && (
                <p className={styles.vehicleName}>{vehicle.name}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ─────────────────────────────────────────
// Block 5: News CSR Highlights (At a Glance)
// Fields: title, csr_pillars, partners, items (nested blocks: text)
// ─────────────────────────────────────────
export const NewsCsrHighlights = ({ blok }) => {
  const items = blok?.items || [];
  return (
    <section {...storyblokEditable(blok)} className={styles.csrContainer}>
      {blok?.title && <h2 className={styles.csrTitle}>{blok.title}</h2>}
      {blok?.csr_pillars && (
        <p className={styles.csrPillars}>
          <strong>CSR Pillars:</strong> {blok.csr_pillars}
        </p>
      )}
      {blok?.partners && (
        <p className={styles.csrPartners}>
          <strong>Partners:</strong> {blok.partners}
        </p>
      )}
      {items.length > 0 && (
        <ul className={styles.csrList}>
          {items.map((item, i) => (
            <li key={item._uid || i} className={styles.csrItem}>
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

// ─────────────────────────────────────────
// Block 6: News Hospital List
// Fields: title, hospitals (nested blocks: name, location)
// ─────────────────────────────────────────
export const NewsHospitalList = ({ blok }) => {
  const hospitals = blok?.hospitals || [];
  return (
    <section {...storyblokEditable(blok)} className={styles.hospitalContainer}>
      {blok?.title && <h2 className={styles.hospitalTitle}>{blok.title}</h2>}
      {hospitals.length > 0 && (
        <div className={styles.hospitalGrid}>
          {hospitals.map((hospital, i) => (
            <div key={hospital._uid || i} className={styles.hospitalCard}>
              <span className={styles.hospitalNumber}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                {hospital.name && (
                  <p className={styles.hospitalName}>{hospital.name}</p>
                )}
                {hospital.location && (
                  <p className={styles.hospitalLocation}>{hospital.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
