import { Story } from 'services/stories';

export const selectStoryFields = ({ id = 0, by = '', url = '', title = '' } = {}): Story => ({
	id,
	by,
	url,
	title
});
