import { getStoryblokApi } from '@/lib/storyblok';
import { notFound } from 'next/navigation';
import NewsArticleClient from './NewsArticleClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const storyblokApi = getStoryblokApi();

  // Try fetching from news folder first
  let story = null;
  try {
    const { data } = await storyblokApi.get(`cdn/stories/news/${slug}`, {
      version: 'draft',
    });
    story = data?.story;
  } catch {
    // Try without news prefix
    try {
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
        version: 'draft',
      });
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

export default async function NewsArticlePage({ params }) {
  const { slug } = await params;
  const storyblokApi = getStoryblokApi();

  let story = null;

  // Try fetching from news folder first
  try {
    const { data } = await storyblokApi.get(`cdn/stories/news/${slug}`, {
      version: 'draft',
    });
    story = data?.story;
  } catch {
    // Try without news prefix
    try {
      const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
        version: 'draft',
      });
      story = data?.story;
    } catch {
      return notFound();
    }
  }

  if (!story) return notFound();

  return <NewsArticleClient story={story} />;
}
