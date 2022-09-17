import styled from "styled-components"

export default function Input(props) {
	return (
		<>
			<Wrapper>
				{props.label && <StyledSpan>{props.label}</StyledSpan>}
				<StyledInput {...props} />
				{props.errorMessage && <StyledSpan>{props.errorMessage}</StyledSpan>}
			</Wrapper>
		</>
	)
}

const Wrapper = styled.div`
	width: 100%;
	height: 3rem;
	display: flex;
	flex-flow: column;
`

const StyledInput = styled.input`
	height: 2rem;
	padding: 0 1rem;
	border: none;
	border-radius: 10px;
	background-color: ${props => props.backgroundColor || "#514F4D"};
	color: white;
	outline: ${props => (props.errorMessage ? "1px #e64f4f solid " : null)};
	&:focus {
		outline: 1px #d2d2d2 solid;
	}
	&:disabled {
		opacity: 40%;
	}
	&::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #878787;
		opacity: 1; /* Firefox */
	}
`

const StyledSpan = styled.span`
	font-size: 10px;
	color: #e64f4f;
	margin: 0 0 0 10px;
`
