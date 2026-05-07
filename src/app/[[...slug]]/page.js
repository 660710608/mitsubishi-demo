import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi, getStoryVersion } from '@/lib/storyblok';
import { notFound } from 'next/navigation';

export default async function Page({ params, searchParams }) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const fullSlug = slug ? slug.filter(s => s !== 'en' && s !== 'th').join('/') : 'home';

	const isVisualEditor = resolvedSearchParams?._storyblok !== undefined;
	const version = getStoryVersion(isVisualEditor);

	const storyblokApi = getStoryblokApi();

	let data;
	try {
		const response = await storyblokApi.get(`cdn/stories/${fullSlug}`, { version });
		data = response.data;
	} catch (e) {
		if (version === 'published') {
			try {
				const response = await storyblokApi.get(`cdn/stories/${fullSlug}`, { version: 'draft' });
				data = response.data;
			} catch (e2) {
				return notFound();
			}
		} else {
			return notFound();
		}
	}

	if (!data?.story) return notFound();

	return <StoryblokStory story={data.story} />;
}
