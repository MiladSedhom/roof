import styled from "styled-components";

export default function BookmarkContextMenu({ dispatch, bookmark, toggleIsForm, ...restOfProps }) {
	return (
		<>
			<Div {...restOfProps}>
				{bookmark.type === "link" && [
					<ContextMenuButton> open url </ContextMenuButton>,
					<ContextMenuButton> open url in a new tab </ContextMenuButton>,
				]}
				<ContextMenuButton
					onClick={() => {
						toggleIsForm(true);
					}}
				>
					edit {bookmark.type}
				</ContextMenuButton>
				<ContextMenuButton
					onClick={() => {
						dispatch({ type: "deleteBookmark", payload: { id: bookmark.id } });
					}}
				>
					delete {bookmark.type}
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
