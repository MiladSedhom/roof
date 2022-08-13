import styled from "styled-components";
import { useState } from "react";

export default function Link(props) {
	const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
	return (
		<>
			<A
				{...props}
				title={props.children}
				href={props.url}
				onContextMenu={(e) => {
					e.preventDefault();
					setAnchorPoint({ x: e.pageX, y: e.pageY });
				}}
			>
				<img
					style={{ margin: "0 8px 0 0" }}
					src={`
					https://www.google.com/s2/favicons?domain=${props.url}&sz=${16}`}
				/>
				<Span>{props.children}</Span>
			</A>
		</>
	);
}

const A = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 7rem;
	padding: 0.25em 1em;
	margin: 0 0.5em 0 0;
	border-radius: 10rem;
	/* outline: 2px solid black; */
	background-color: "#383535";
	color: white;
	/* background-color: ${(props) => props.backgroundColor || "#383535"};
	color: ${(props) => props.textColor || "black"}; */
	font-size: ${(props) => props.fontSize || "11px"};
	font-family: "Inter", sans-serif;
	text-decoration: none;
`;

const Span = styled.span`
	//this prevents text from overflowing and adds
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	//
`;
