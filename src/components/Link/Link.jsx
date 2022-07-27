import styled from "styled-components";

export default function Link(props) {
	return (
		<A {...props} title={props.children} href={props.url}>
			{props.children}
		</A>
	);
}

const A = styled.a`
	//this make the prevernt text from overflowing and adds
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	//
	max-width: 7rem;
	padding: 0.25em 1em;
	margin: 0.5em;
	border-radius: 10rem;
	outline: 2px solid black;
	background-color: ${(props) => props.backgroundColor || "wheat"};
	color: ${(props) => props.textColor || "black"};
	font-size: ${(props) => props.fontSize || "12px"};
	font-family: "Inter", sans-serif;
	font-weight: 500;
	text-decoration: none;
`;
