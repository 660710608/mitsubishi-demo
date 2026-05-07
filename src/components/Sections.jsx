'use client';

import { storyblokEditable } from '@storyblok/react';
import { useState } from 'react';
import styles from './Sections.module.css';

// ─────────────────────────────────────────
// Section 5: Dealer Locator Banner
// ─────────────────────────────────────────
export const DealerBanner = ({ blok }) => {
	const tag = blok?.tag || 'DEALER LOCATOR';
	const title = blok?.title || 'Mitsubishi Dealer';
	const description =
		blok?.description ||
		'Visit our Mitsubishi Showroom near you. Test drive is available upon request.';
	const buttonLabel = blok?.button_label || 'FIND A DEALER';
	const buttonLink = blok?.button_link || '#';
	const imageSrc =
		blok?.image?.filename ||
		'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/site-images/dealer-locator/dealer-locator-banner.jpg?width=960&auto=webp&quality=80';

	return (
		<div {...storyblokEditable(blok)} className={styles.bannerWrapper}>
			<div className={styles.bannerInner}>
				<div className={styles.dealerContainer}>
					{/* Left: Text */}
					<div className={styles.dealerContent}>
						<span className={styles.tag}>{tag}</span>
						<h2 className={styles.heading}>{title}</h2>
						<p className={styles.description}>{description}</p>
						<a href={buttonLink} className={styles.btn}>
							{buttonLabel}
						</a>
					</div>

					{/* Right: Image */}
					<div className={styles.dealerImage}>
						<img
							src={imageSrc}
							alt="Mitsubishi Dealer"
							className={styles.coverImg}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// ─────────────────────────────────────────
// Section 6: Servicing Banner
// ─────────────────────────────────────────
export const ServiceBanner = ({ blok }) => {
	const tag = blok?.tag || 'SERVICING';
	const title = blok?.title || 'After Sales Service';
	const description =
		blok?.description ||
		"Mitsubishi Motors are delighted to deliver our customers the best care. With our expert technician team, we can promise the finest solutions as well as facilities services in any of our service centers nationwide. Modern-technology, experienced staffs are ready to serve at your visit.";
	const buttonLabel = blok?.button_label || 'LEARN MORE';
	const buttonLink = blok?.button_link || '#';
	const imageSrc =
		blok?.image?.filename ||
		'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/site-images/service/service-banner.jpg?width=960&auto=webp&quality=80';

	return (
		<div {...storyblokEditable(blok)} className={styles.bannerWrapper}>
			<div className={styles.bannerInner}>
				<div className={styles.serviceContainer}>
					{/* Left: Image */}
					<div className={styles.serviceImage}>
						<img
							src={imageSrc}
							alt="Mitsubishi Service"
							className={styles.coverImg}
						/>
					</div>

					{/* Right: Text */}
					<div className={styles.serviceContent}>
						<span className={styles.tag}>{tag}</span>
						<h2 className={styles.headingService}>{title}</h2>
						<p className={styles.descriptionService}>{description}</p>
						<a href={buttonLink} className={styles.btn}>
							{buttonLabel}
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

// ─────────────────────────────────────────
// Section 7: Airbag Banner
// ─────────────────────────────────────────
export const AirbagBanner = ({ blok }) => {
	const tag = blok?.tag || 'SERVICING';
	const title =
		blok?.title ||
		'Airbag Inspection & Replacement for Ultimate Safety — Free of Charge!';
	const description =
		blok?.description ||
		"At Mitsubishi Motors (Thailand) Co., Ltd., quality and safety are our top priorities. We invite our valued customers to visit any Mitsubishi Motors Service Center nationwide for a free airbag inspection and replacement. The process takes only 30 minutes, and you can easily check your vehicle's eligibility by clicking the link below.";
	const buttonLabel = blok?.button_label || 'CHECK NOW';
	const buttonLink = blok?.button_link || '#';
	const imageSrc =
		blok?.image?.filename ||
		'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/site-images/service/airbag-inspection.jpg?width=960&auto=webp&quality=80';

	return (
		<div {...storyblokEditable(blok)} className={styles.bannerWrapper}>
			<div className={styles.bannerInner}>
				<div className={styles.airbagContainer}>
					{/* Left: Text */}
					<div className={styles.airbagContent}>
						<span className={styles.tag}>{tag}</span>
						<h2 className={styles.heading}>{title}</h2>
						<p className={styles.description}>{description}</p>
						<a href={buttonLink} className={styles.btn}>
							{buttonLabel}
						</a>
					</div>

					{/* Right: Image */}
					<div className={styles.airbagImage}>
						<img
							src={imageSrc}
							alt="Airbag Inspection"
							className={styles.coverImg}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// ─────────────────────────────────────────
// Section 8: Join Us Banner
// ─────────────────────────────────────────
export const JoinUsBanner = ({ blok }) => {
	const tag = blok?.tag || 'CAREERS';
	const title =
		blok?.title || 'Join with Mitsubishi Motors (Thailand) Co., Ltd.';
	const description =
		blok?.description ||
		'We are proud of the work that we do and it would not have been successful without our awesome team. We are always looking for new members to strengthen our team. If you are talented, dedicated, and ambitious, you are the person that we are looking for.';
	const buttonLabel = blok?.button_label || 'VIEW POSITIONS';
	const buttonLink = blok?.button_link || '#';
	const imageSrc =
		blok?.image?.filename ||
		'https://www.mitsubishi-motors.co.th/content/dam/mitsubishi-motors-th/images/site-images/careers/careers-banner.jpg?width=960&auto=webp&quality=80';

	return (
		<div {...storyblokEditable(blok)} className={styles.bannerWrapper}>
			<div className={styles.bannerInner}>
				<div className={styles.joinUsContainer}>
					{/* ซ้าย: ข้อความ */}
					<div className={styles.joinUsContent}>
						<span className={styles.tag}>{tag}</span>
						<h2 className={styles.heading}>{title}</h2>
						<p className={styles.description}>{description}</p>
						<a href={buttonLink} className={styles.btn}>
							{buttonLabel}
						</a>
					</div>

					{/* ขวา: รูป */}
					<div className={styles.joinUsImage}>
						<img
							src={imageSrc}
							alt="Join Mitsubishi Motors"
							className={styles.coverImg}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

// ─────────────────────────────────────────
// Section 8: News Section
// ─────────────────────────────────────────
export const NewsSection = ({ blok }) => {
	console.log('blok:', blok);
	const news = blok?.News_items || [];
	const [hovered, setHovered] = useState(null);

	return (
		<div {...storyblokEditable(blok)} className={styles.newsWrapper}>
			<div className={styles.newsInner}>
				<div className={styles.newsContainer}>
					{/* Header */}
					<div className={styles.newsHeader}>
						<h2 className={styles.newsTitle}>
							{blok?.title || 'News & Activities'}
						</h2>
						{blok?.view_all_link && (
							<a href={blok.view_all_link} className={styles.newsViewAll}>
								View All
							</a>
						)}
					</div>

					{/* News Grid */}
					<div className={styles.newsGrid}>
						{news.map((item, i) => {
							let href = '#';
							if (item.link) {
								if (typeof item.link === 'string') {
									href = item.link;
								} else if (item.link.cached_url) {
									const slug = item.link.cached_url.replace(/^news\//, '');
									href = `/news/${slug}`;
								} else if (item.link.url) {
									href = `/news/${item.link.url}`;
								}
							}
							return (
								<a key={item._uid || i} href={href} className={styles.newsCard}>
									{/* Thumbnail */}
									<div className={styles.newsThumb}>
										{item.image?.filename ? (
											<img src={item.image.filename} alt={item.title || ''} />
										) : (
											<div
												style={{
													width: '100%',
													height: '100%',
													background: '#ddd',
												}}
											/>
										)}
									</div>

									{/* Info */}
									<div className={styles.newsInfo}>
										{item.date && (
											<p className={styles.newsDate}>{item.date}</p>
										)}
										<h3 className={styles.newsHeading}>{item.title}</h3>
										<span className={styles.readMore}>Read More</span>
									</div>
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
