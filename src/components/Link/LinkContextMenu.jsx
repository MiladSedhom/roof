import styled from "styled-components";

export default function LinkContextMenu({ dispatch, id, toggleIsForm, ...restOfProps }) {
	return (
		<>
			<Div {...restOfProps}>
				<ContextMenuButton> open url </ContextMenuButton>
				<ContextMenuButton> open url in a new tab </ContextMenuButton>
				<ContextMenuButton
					onClick={() => {
						toggleIsForm(true);
					}}
				>
					edit link
				</ContextMenuButton>
				<ContextMenuButton
					onClick={() => {
						dispatch({ type: "deleteBookmark", payload: { id: id } });
					}}
				>
					delete link
				</ContextMenuButton>
				<ContextMenuButton> about </ContextMenuButton>
			</Div>
		</>
	);
}

const Div = styled.div`
	width: 10rem;
	padding: 5px;
	display: flex;
	flex-direction: column;
	background-color: #514f4d;
	border-radius: 10px;
`;

const ContextMenuButton = styled.button`
	background-color: #514f4d;
	border: none;
	padding: 0.25rem;
	color: white;
	&:hover {
		background-color: #747474;
	}
`;
