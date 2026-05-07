'use client';

import { storyblokEditable, renderRichText } from '@storyblok/react';
import styles from './NewsArticle.module.css';

// ─────────────────────────────────────────
// Block 1: News Headline
// Storyblok fields: headline (text), date (text)
// ─────────────────────────────────────────
export const NewsHeadline = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className={styles.headlineContainer}>
      {blok?.date && <p className={styles.headlineDate}>{blok.date}</p>}
      {blok?.headline && <h1 className={styles.headlineText}>{blok.headline}</h1>}
    </section>
  );
};

// ─────────────────────────────────────────
// Block 2: News Featured Image
// Storyblok fields: image (asset), caption (text)
// ─────────────────────────────────────────
export const NewsFeaturedImage = ({ blok }) => {
  return (
    <section {...storyblokEditable(blok)} className={styles.imageContainer}>
      {blok?.image?.filename && (
        <img
          src={blok.image.filename}
          alt={blok?.caption || ''}
          className={styles.featuredImage}
        />
      )}
      {blok?.caption && <p className={styles.imageCaption}>{blok.caption}</p>}
    </section>
  );
};

// ─────────────────────────────────────────
// Block 3: News Body (rich text)
// Storyblok fields: content (richtext)
// Supports headings, paragraphs, quotes, ordered/unordered lists
// ─────────────────────────────────────────
export const NewsBody = ({ blok }) => {
  const html = blok?.content ? renderRichText(blok.content) : '';
  return (
    <section {...storyblokEditable(blok)} className={styles.bodyContainer}>
      <div
        className={styles.richText}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
};

// ─────────────────────────────────────────
// Block 4: About Mitsubishi Motors Thailand
// Storyblok fields: title (text), content (richtext)
// ─────────────────────────────────────────
export const NewsAbout = ({ blok }) => {
  const html = blok?.content ? renderRichText(blok.content) : '';
  return (
    <section {...storyblokEditable(blok)} className={styles.aboutContainer}>
      {blok?.title && <h2 className={styles.aboutTitle}>{blok.title}</h2>}
      <div
        className={styles.richText}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </section>
  );
};

// ─────────────────────────────────────────
// Block 5: Contact Channels
// Storyblok fields: title (text), website, facebook, instagram, youtube, line (all text)
// Renders as a two-column table: Platform | Link
// ─────────────────────────────────────────
export const NewsContact = ({ blok }) => {
  const channels = [
    { label: 'Website', value: blok?.website },
    { label: 'Facebook', value: blok?.facebook },
    { label: 'Instagram', value: blok?.instagram },
    { label: 'YouTube', value: blok?.youtube },
    { label: 'LINE', value: blok?.line },
  ].filter((c) => c.value);

  if (!channels.length) return null;

  return (
    <section {...storyblokEditable(blok)} className={styles.contactContainer}>
      {blok?.title && <h2 className={styles.contactTitle}>{blok.title}</h2>}
      <table className={styles.contactTable}>
        <thead>
          <tr>
            <th className={styles.contactTh}>ช่องทาง</th>
            <th className={styles.contactTh}>ลิงก์</th>
          </tr>
        </thead>
        <tbody>
          {channels.map((channel) => (
            <tr key={channel.label} className={styles.contactRow}>
              <td className={styles.contactLabel}>{channel.label}</td>
              <td className={styles.contactValue}>
                <a
                  href={
                    channel.value.startsWith('http')
                      ? channel.value
                      : `https://${channel.value}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactLink}
                >
                  {channel.value}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
