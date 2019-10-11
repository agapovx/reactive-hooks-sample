import React, { StrictMode } from 'react';
import { StoryComponent } from 'components/story';
import PagePagination from 'components/page-pagination';
import { StoryServices } from 'services/stories';
import { useStoriesFacade } from 'hooks';
import { GlobalStyle } from 'styles/global-styles';
import { StoriesContainerWrapper, Stories } from 'styles/stories-container-styles';
import { Preloader, PreloaderWrapper } from 'styles/preloader-styles';

export const StoriesContainer = () => {
	const [ { stories, currentPage, isLoading, pages }, setPage ] = useStoriesFacade(StoryServices.sharedInstace);

	const renderPreloader = () => {
		return (
			<PreloaderWrapper>
				<Preloader />
			</PreloaderWrapper>
		);
	};

	return (
		<StrictMode>
			<React.Fragment>
				<GlobalStyle />
				<StoriesContainerWrapper>
					<h1>Hacker News Stories</h1>
					{isLoading && renderPreloader()}
					<Stories>
						{!isLoading && stories.map((story, key) => <StoryComponent {...story} key={key} />)}
					</Stories>

					{pages.length && stories.length ? (
						<PagePagination avaliablePages={pages} currentPage={currentPage} setCurrentPage={setPage} />
					) : null}
				</StoriesContainerWrapper>
			</React.Fragment>
		</StrictMode>
	);
};
