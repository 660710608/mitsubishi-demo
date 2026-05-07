import { getStoryblokApi, getStoryVersion } from '@/lib/storyblok';
import { notFound } from 'next/navigation';
import NewsArticleClient from './NewsArticleClient';

export async function generateMetadata({ params, searchParams }) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const isVisualEditor = resolvedSearchParams?._storyblok !== undefined;
	const version = getStoryVersion(isVisualEditor);
	const storyblokApi = getStoryblokApi();

	let story = null;
	try {
		const { data } = await storyblokApi.get(`cdn/stories/news/${slug}`, { version });
		story = data?.story;
	} catch {
		try {
			const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version });
			story = data?.story;
		} catch {
			return { title: 'News' };
		}
	}

	const content = story?.content;
	return {
		title: content?.headline || story?.name || 'News',
		description: content?.summary || content?.headline || '',
	};
}

export default async function NewsArticlePage({ params, searchParams }) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const isVisualEditor = resolvedSearchParams?._storyblok !== undefined;
	const version = getStoryVersion(isVisualEditor);
	const storyblokApi = getStoryblokApi();

	let story = null;

	try {
		const { data } = await storyblokApi.get(`cdn/stories/news/${slug}`, { version });
		story = data?.story;
	} catch {
		try {
			const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version });
			story = data?.story;
		} catch {
			return notFound();
		}
	}

	if (!story) return notFound();

	return <NewsArticleClient story={story} />;
}
