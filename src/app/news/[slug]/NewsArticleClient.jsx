'use client';

import { storyblokEditable, renderRichText } from '@storyblok/react';
import styles from './NewsArticle.module.css';
import Link from 'next/link';

const renderBodySafely = (body) => {
  if (!body || typeof body !== 'object' || !body.content) return '';
  try {
    return renderRichText(body);
  } catch (e) {
    console.error('Error rendering rich text:', e);
    return '';
  }
};

export default function NewsArticleClient({ story }) {
  const content = story?.content;

  if (!content) return null;

  return (
    <article {...storyblokEditable(content)} className={styles.article}>
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <Link href="/news" className={styles.breadcrumbLink}>News</Link>
        <span className={styles.breadcrumbSep}>/</span>
        <span className={styles.breadcrumbCurrent}>{content.headline || story.name}</span>
      </nav>

      {/* Hero Banner with Headline Overlay */}
      <div className={styles.banner}>
        {content.banner?.filename && (
          <img
            src={content.banner.filename}
            alt={content.headline || ''}
            className={styles.bannerImage}
          />
        )}
        <div className={styles.bannerOverlay} />
        
        {/* Headline Section - Overlay on Banner */}
        <header className={styles.header}>
          {content.date && (
            <time className={styles.date}>{content.date}</time>
          )}
          {content.headline && (
            <h1 className={styles.headline}>{content.headline}</h1>
          )}
          {content.summary && (
            <p className={styles.summary}>{content.summary}</p>
          )}
        </header>
      </div>

      {/* Featured Image */}
      {content.featured_image?.filename && (
        <div className={styles.featuredImageContainer}>
          <img
            src={`${content.featured_image.filename}?width=1200&quality=80`}
            alt={content.headline || ''}
            className={styles.featuredImage}
            width={1200}
            height={675}
          />
          {content.image_caption && (
            <p className={styles.imageCaption}>{content.image_caption}</p>
          )}
        </div>
      )}

      {/* Body Content */}
      {content.body && (
        <div className={styles.bodyContainer}>
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: renderBodySafely(content.body) }}
          />
        </div>
      )}

      {/* Back to News */}
      <div className={styles.backLink}>
        <div className={styles.backLinkInner}>
          <Link href="/#news" className={styles.backButton}>
            ← Back to News
          </Link>
        </div>
      </div>
    </article>
  );
}
