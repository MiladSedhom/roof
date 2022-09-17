import styled from "styled-components"

export default function Button(props) {
	const { innerRef, children, ...restOfProps } = props
	return (
		<StyledButton ref={innerRef} title={children[1]} {...restOfProps}>
			{children}
		</StyledButton>
	)
}

const StyledButton = styled.button`
	max-width: 12rem;
	padding: 0.25em 1em;
	margin: 0.5em;
	border: none;
	border-radius: 10px;
	background-color: ${props => props.backgroundColor || "#514F4D"};
	color: ${props => props.color || "white"};
	font-size: ${props => props.fontSize || "12px"};
	font-family: "Inter", sans-serif;
	cursor: pointer;
	//this prevents text from overflowing and adds
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	//
`
