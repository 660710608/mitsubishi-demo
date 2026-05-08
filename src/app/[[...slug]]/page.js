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

export default async function Page({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.filter(s => s !== 'en' && s !== 'th').join('/') : 'home';

	const version = getStoryVersion();

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
