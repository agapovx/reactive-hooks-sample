import { Story } from 'services/stories';
/**
 * Забирает только нужные поля из объекта, полученного через апи
 * @param param0 Объект story, полученный через апи
 */
export const selectStoryFields = ({ id = 0, by = '', url = '', title = '' } = {}): Story => ({
	id,
	by,
	url,
	title
});
