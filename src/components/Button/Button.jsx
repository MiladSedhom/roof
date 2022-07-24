import styled from "styled-components";

export default function Button(props) {
	return <StyledButton {...props}> {props.children} </StyledButton>;
}

const StyledButton = styled.button`
	padding: 0.25em 1em;
	margin: 0.5em;
	border: none;
	border-radius: 10px;
	background-color: ${(props) => props.backgroundColor || "#514F4D"};
	color: ${(props) => props.color || "white"};
	font-size: ${(props) => props.fontSize || "14px"};
	font-family: "Inter", sans-serif;
	cursor: pointer;
`;
