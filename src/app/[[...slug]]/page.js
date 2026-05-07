import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi, getStoryVersion } from '@/lib/storyblok';
import { notFound } from 'next/navigation';
import StoryblokBridgeLoader from '@/components/StoryblokBridgeLoader';

async function fetchStory(slug, version) {
	const storyblokApi = getStoryblokApi();
	try {
		const response = await storyblokApi.get(`cdn/stories/${slug}`, { version });
		return response.data;
	} catch {
		return null;
	}
}

export default async function Page({ params, searchParams }) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const fullSlug = slug ? slug.filter(s => s !== 'en' && s !== 'th').join('/') : 'home';

	const isVisualEditor = resolvedSearchParams?._storyblok !== undefined;
	const version = getStoryVersion(isVisualEditor);

	let data = await fetchStory(fullSlug, version);

	if (!data?.story && version === 'published') {
		data = await fetchStory(fullSlug, 'draft');
	}

	if (!data?.story) return notFound();

	return (
		<>
			<StoryblokStory story={data.story} />
			<StoryblokBridgeLoader storyId={data.story.id} />
		</>
	);
}
