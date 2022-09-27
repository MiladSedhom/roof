import styled from "styled-components"

export default function Input(props) {
	return <StyledInput {...props} />
}

const StyledInput = styled.input`
	width: 2em;
	height: 2em;
	padding: 0;
	margin: 0.5rem;
	border: 0;
	background: none;
	appearance: none;
	-moz-appearance: none;
	-webkit-appearance: none;
	cursor: pointer;

	&:focus {
		border-radius: 0;
		outline: none;
	}

	::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	::-webkit-color-swatch {
		border: 2px solid black;
		border-radius: 50%;
	}

	::-moz-color-swatch,
	::-moz-focus-inner {
		border: 0;
	}

	::-moz-focus-inner {
		padding: 0;
	}
`
