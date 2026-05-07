import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { notFound } from 'next/navigation';

export default async function Page({ params }) {
	const { slug } = await params;
	const fullSlug = slug ? slug.filter(s => s !== 'en' && s !== 'th').join('/') : 'home';


	let sbParams = {
		version: 'draft',
	};

	const storyblokApi = getStoryblokApi();

	let data;
	try {
		const response = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);
		data = response.data;
	} catch (e) {
		return notFound();
	}

	if (!data?.story) return notFound();

	return <StoryblokStory story={data.story} />;
}
