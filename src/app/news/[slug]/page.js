import { getStoryblokApi, getStoryVersion } from '@/lib/storyblok';
import { notFound } from 'next/navigation';
import NewsArticleClient from './NewsArticleClient';

async function fetchNewsStory(slug, version) {
	const storyblokApi = getStoryblokApi();
	try {
		const { data } = await storyblokApi.get(`cdn/stories/news/${slug}`, { version });
		return data?.story || null;
	} catch {
		try {
			const { data } = await storyblokApi.get(`cdn/stories/${slug}`, { version });
			return data?.story || null;
		} catch {
			return null;
		}
	}
}

export async function generateMetadata({ params, searchParams }) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const isVisualEditor = resolvedSearchParams?._storyblok !== undefined;
	const version = getStoryVersion(isVisualEditor);

	let story = await fetchNewsStory(slug, version);
	if (!story && version === 'published') {
		story = await fetchNewsStory(slug, 'draft');
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

	let story = await fetchNewsStory(slug, version);
	if (!story && version === 'published') {
		story = await fetchNewsStory(slug, 'draft');
	}

	if (!story) return notFound();

	return <NewsArticleClient story={story} />;
}
