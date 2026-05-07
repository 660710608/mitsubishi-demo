'use client';

import { storyblokEditable } from '@storyblok/react';
import styles from './HighlightBanner.module.css';

const HighlightBanner = ({ blok }) => {
  const defaultTitle = 'All-New XFORCE HEV Wins Thailand Car of The Year 2025';
  const defaultDescription = 'The All-New XFORCE HEV has been awarded Thailand Car of The Year 2025 by the Thai Automotive Journalists Association, reaffirming its exceptional performance with outstanding scores across every category—solidifying its status as a truly premium and all-rounded SUV.';
  const defaultImage = 'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/site-images/xforce/xforce-hev-banner.jpg?width=1440&auto=webp&quality=80';

  const title = blok?.title || defaultTitle;
  const description = blok?.description || defaultDescription;
  const imageSrc = blok?.image?.filename || defaultImage;

  return (
    <div className={styles.wrapper}>
      <section {...storyblokEditable(blok)} className={styles.container}>
        {/* Left: Image - Full height */}
        <div className={styles.imageContainer}>
          <img
            src={imageSrc}
            alt={title}
            className={styles.image}
          />
        </div>

        {/* Right: Text Content */}
        <div className={styles.content}>
          {blok?.tag && (
            <span className={styles.tag}>
              {blok.tag}
            </span>
          )}

          <h2 className={styles.title}>
            {title}
          </h2>

          <p className={styles.description}>
            {description}
          </p>

          {blok?.button_label && (
            <a
              href={blok.button_link || "#"}
              className={styles.button}
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
