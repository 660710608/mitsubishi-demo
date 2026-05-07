import { storyblokInit, apiPlugin } from '@storyblok/react/rsc';
import Page from '@/components/Page';
import Feature from '@/components/Feature';
import Grid from '@/components/Grid';
import Teaser from '@/components/Teaser';
import Slide from '@/components/Slide';
import HeroSlider from '@/components/HeroSlider';
import CarGrid from '@/components/CarGrid';
import HighlightBanner from '@/components/HighlightBanner';
import FeatureColumns from '@/components/FeatureColumns';
import { DealerBanner, ServiceBanner, AirbagBanner, JoinUsBanner, NewsSection } from '@/components/Sections';
import {
	NewsHeadline,
	NewsFeaturedImage,
	NewsBody,
	NewsAbout,
	NewsContact,
} from '@/components/NewsArticle';

const getStoryblokApi = storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_TOKEN,
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
		AirbagBanner: AirbagBanner,
		JoinUsBanner: JoinUsBanner,
		NewsSection: NewsSection,
		news_headline: NewsHeadline,
		news_featured_image: NewsFeaturedImage,
		news_body: NewsBody,
		news_about: NewsAbout,
		news_contact: NewsContact,
	},
	apiOptions: {
		region: process.env.STORYBLOK_REGION || 'eu',
	},
});

export { getStoryblokApi };
