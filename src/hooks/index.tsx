import { Observable, Subscription } from 'rxjs';
import { useState, useEffect } from 'react';
import { IStoryService, Story } from 'services/stories';

interface StoryState {
	stories: Story[];
	isLoading: boolean;
	currentPage: number;
	pages: number[];
}

function onEmit<T>(source$: Observable<T>, nextFn: (value: T) => void): Subscription {
	return source$.subscribe(nextFn, (err) => console.error(`Stream error: ${err}`));
}

export function useStoriesFacade(StoryService: IStoryService): [StoryState, (number) => void] {
	const setPage = (pageNumber: number) => {
		setState((state) => {
			return { ...state, isLoading: true, currentPage: pageNumber };
		});
		StoryService.setCurrentPage(pageNumber);
	};
	const [ state, setState ] = useState<StoryState>({
		stories: [],
		currentPage: 1,
		isLoading: false,
		pages: []
	});

	useEffect(() => {
		StoryService.loadStories();
		setState((state) => ({ ...state, isLoading: true }));

		const subscriptions: Subscription[] = [
			onEmit<Story[]>(StoryService.stories$, (stories) =>
				setState((state) => {
					return { ...state, stories, isLoading: false };
				})
			),
			onEmit<number[]>(StoryService.avaliablePages$, (pages) =>
				setState((state) => ({
					...state,
					pages
				}))
			)
		];

		return () => {
			subscriptions.map((s) => s.unsubscribe());
		};
	}, []);

	return [ state, setPage ];
}
