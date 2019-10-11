import styled from 'styled-components';

export const PaginationWrapper = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;

	margin: 10px 0;
`;

export const CustomPaginationButton = styled.button`
	pointer-events: ${(props) => (props.disable ? 'none' : 'auto')};
	opacity: ${(props) => (props.disable ? '0.5' : '1')};

	font-size: 12px;

	padding: 4px 8px;

	margin-right: 5px;

	background-color: rgb(21, 22, 61);
	color: rgb(236, 236, 236);

	border: none;

	border-radius: 4px;

	transition: 0.5s opacity;

	:hover {
		cursor: pointer;
		opacity: .8;
	}

	&:last-of-type {
		margin-right: 0;
	}
`;
