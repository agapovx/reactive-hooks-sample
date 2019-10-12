import React, { memo } from 'react';
import { Story } from 'services/stories';
import { StoryWrapper, StoryTitleWrapper, StoryMeta } from 'styles/story-styles';

/**
 * Компонент для рендера Story
 * @param {Story} story Объект Story
 */
export const StoryComponent: React.FunctionComponent<Story> = (story) => {
	return (
		<StoryWrapper>
			<StoryTitleWrapper>
				<a href={story.url} target="_blank">
					{story.title}
				</a>
			</StoryTitleWrapper>
			<StoryMeta>
				<span>By: {story.by}</span>
			</StoryMeta>
		</StoryWrapper>
	);
};
