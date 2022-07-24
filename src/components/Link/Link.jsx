import styled from "styled-components";

export default function Link(props) {
	return (
		<A {...props} href={props.url}>
			{props.children}
		</A>
	);
}

const A = styled.a`
	padding: 0.25em 1em;
	margin: 0.5em;
	border-radius: 10rem;
	outline: 2px solid black;
	background-color: ${(props) => props.backgroundColor || "wheat"};
	color: ${(props) => props.textColor || "black"};
	font-size: ${(props) => props.fontSize || "14px"};
	font-family: "Inter", sans-serif;
	font-weight: 500;
	text-decoration: none;
`;
