import styled from "styled-components";

export default function Input(props) {
	return <StyledInput {...props} />;
}

const StyledInput = styled.input`
	height: 2rem;
	padding: 0 1rem;
	margin: 0.5rem 0 0 0;
	border: none;
	border-radius: 10px;
	background-color: ${(props) => props.backgroundColor || "#514F4D"};
	color: white;
	&:focus {
		outline: 1px #d2d2d2 solid;
	}
	&::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #878787;
		opacity: 1; /* Firefox */
	}
`;
