import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from   {
      transform: rotate(0deg);
  }
  to {
      transform: rotate(360deg);
  }
`;

export const Preloader = styled.div`
	display: block;

	position: relative;

	left: 50%;
	top: 50%;

	width: 150px;
	height: 150px;

	margin: -75px 0 0 -75px;

	border-radius: 50%;

	border: 3px solid transparent;
	border-top-color: #9370db;

	animation: ${spin} 2s linear infinite;

	:before {
		content: "";
		position: absolute;

		top: 5px;
		left: 5px;
		right: 5px;
		bottom: 5px;

		border-radius: 50%;

		border: 3px solid transparent;
		border-top-color: #ba55d3;

		animation: ${spin} 3s linear infinite;
	}

	:after {
		content: "";
		position: absolute;

		top: 15px;
		left: 15px;
		right: 15px;
		bottom: 15px;

		border-radius: 50%;

		border: 3px solid transparent;
		border-top-color: rgb(17, 228, 151);

		animation: ${spin} 1.5s linear infinite;
	}
`;

export const PreloaderWrapper = styled.div`
	position: absolute;
	left: 600px;
	top: 30%;
`;
