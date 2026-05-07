import { StoryblokStory } from '@storyblok/react/rsc';
import { getStoryblokApi } from '@/lib/storyblok';
import { notFound } from 'next/navigation';

export default async function Page({ params, searchParams }) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const fullSlug = slug ? slug.filter(s => s !== 'en' && s !== 'th').join('/') : 'home';

	const isPreview = resolvedSearchParams?._storyblok !== undefined;

	let sbParams = {
		version: isPreview ? 'draft' : 'published',
	};

	const storyblokApi = getStoryblokApi();

	let data;
	try {
		const response = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);
		data = response.data;
	} catch (e) {
		if (!isPreview) {
			sbParams.version = 'draft';
			try {
				const response = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);
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
