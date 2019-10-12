import React, { memo } from 'react';
import { PaginationWrapper, CustomPaginationButton } from 'styles/page-pagination-styles';

interface PagePaginationProps {
	currentPage: number;
	setCurrentPage: (pageNumber: number) => void;
	avaliablePages: number[];
}
/**
 *  Компонент для рендера страниц пагинации
 */
const PagePagination: React.FunctionComponent<PagePaginationProps> = ({
	currentPage,
	setCurrentPage,
	avaliablePages
}) => {
	return (
		<PaginationWrapper>
			{avaliablePages.map((number) => (
				<PaginationButton
					key={number}
					pageNumber={number}
					setPage={setCurrentPage}
					isDisabled={currentPage === number}
				/>
			))}
		</PaginationWrapper>
	);
};

export default PagePagination;

interface IPaginationButtonProps {
	isDisabled: boolean;
	pageNumber: number;
	setPage: (number) => void;
}

/**
 * Мемоизированный компонент для рендера кнопки-страницы пагинации
 */
const PaginationButton = memo<IPaginationButtonProps>(({ isDisabled, pageNumber, setPage }) => {
	const setPageNumber = () => setPage(pageNumber);
	return (
		<CustomPaginationButton type="button" disable={isDisabled} onClick={setPageNumber}>
			{pageNumber}
		</CustomPaginationButton>
	);
});
