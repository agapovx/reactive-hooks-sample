import styled from 'styled-components';

export const StoryWrapper = styled.section`
	position: relative;
	display: flex;
	flex-direction: column;

	padding: 2px 16px 16px;

	color: #414554;
	background: #fff;

	width: 450px;
	min-height: 70px;
	max-height: 100px;

	margin: 10px auto;

	box-shadow: 0 1px 15px rgba(27, 31, 35, .15);
	border-radius: 5px;

	&:last-of-type {
		margin-bottom: 0;
	}

	transition: 0.5s box-shadow;

	:hover {
		box-shadow: 0 1px 15px rgba(27, 31, 35, .45);
	}
`;

export const StoryTitleWrapper = styled.h1`
	margin-bottom: 5px;

	text-align: left;

	font-size: 16px;
	line-height: 1.8;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	a {
		text-overflow: ellipsis;

		color: rgb(34, 18, 67);

		overflow: hidden;
	}
`;

export const StoryMeta = styled.div`
	font-size: 12px;

	text-align: left;
`;
