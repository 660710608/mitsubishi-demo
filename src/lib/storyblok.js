import Page from '@/components/Page';
import Feature from '@/components/Feature';
import Grid from '@/components/Grid';
import Teaser from '@/components/Teaser';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';
import Slide from '@/components/Slide';
import HeroSlider from '@/components/HeroSlider';
import CarGrid from '@/components/CarGrid'
import HighlightBanner from '@/components/HighlightBanner'
import FeatureColumns from '@/components/FeatureColumns';
import { DealerBanner, ServiceBanner, NewsSection } from '@/components/Sections'
import {
	NewsArticleHero,
	NewsArticleContent,
	NewsArticleQuote,
	NewsVehicleShowcase,
	NewsCsrHighlights,
	NewsHospitalList,
} from '@/components/NewsArticle'


export const getStoryblokApi = storyblokInit({
	accessToken: process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		page: Page,
		feature: Feature,
		grid: Grid,
		teaser: Teaser,
		slide: Slide,
		hero_slider: HeroSlider,
		CarGrid: CarGrid,
		HighlightBanner: HighlightBanner,
		feature_columns: FeatureColumns,
		DealerBanner: DealerBanner,
		ServiceBanner: ServiceBanner,
		NewsSection: NewsSection,
		news_article_hero: NewsArticleHero,
		news_article_content: NewsArticleContent,
		news_article_quote: NewsArticleQuote,
		news_vehicle_showcase: NewsVehicleShowcase,
		news_csr_highlights: NewsCsrHighlights,
		news_hospital_list: NewsHospitalList,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
