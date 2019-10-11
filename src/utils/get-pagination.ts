export const getPagination = (current: number, totalPages: number): number[] => {
	let list: number[] = [];
	let pageLimit = 5;
	let upperLimit, lowerLimit;
	lowerLimit = upperLimit = Math.min(current, totalPages);

	for (let i = 1; i < pageLimit && i < totalPages; ) {
		if (lowerLimit > 1) {
			lowerLimit--;
			i++;
		}
		if (i < pageLimit && upperLimit < totalPages) {
			upperLimit++;
			i++;
		}
	}

	for (let i = lowerLimit; i <= upperLimit; i++) {
		list.push(i);
	}
	return list;
};
