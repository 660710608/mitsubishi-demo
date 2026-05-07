'use client';

import { useEffect } from 'react';

export default function StoryblokBridgeLoader({ storyId }) {
	useEffect(() => {
		const isInIframe = typeof window !== 'undefined' && window.self !== window.top;
		const hasStoryblokParam = typeof window !== 'undefined' && window.location.search.includes('_storyblok');

		if (!isInIframe || !hasStoryblokParam || !storyId) return;

		const existingScript = document.querySelector('script[src*="storyblok"]');
		if (existingScript) return;

		const script = document.createElement('script');
		script.src = 'https://app.storyblok.com/f/storyblok-v2-latest.js';
		script.type = 'text/javascript';
		script.charset = 'UTF-8';
		script.onload = () => {
			if (typeof window.StoryblokBridge !== 'undefined') {
				const storyblokInstance = new window.StoryblokBridge();
				storyblokInstance.on(['input', 'change', 'published'], (event) => {
					if (event.action === 'published') {
						window.location.reload();
					} else {
						window.location.reload();
					}
				});
			}
		};
		document.head.appendChild(script);
	}, [storyId]);

	return null;
}
