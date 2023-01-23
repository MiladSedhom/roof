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
	margin: 0 0.5em 0 0;
	border: none;
	border-radius: 5px;
	background-color: ${props => props.theme.primaryColor || "#30302f"};
	color: ${props => props.color || "white"};
	font-size: ${props => props.fontSize || "11px"};
	font-family: "Inter", sans-serif;
	cursor: pointer;
	//this prevents text from overflowing and adds
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	//
	display: flex;
	justify-content: center;
	align-items: center;
`
