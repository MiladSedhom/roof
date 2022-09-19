import styled from "styled-components"
import { useBookmarksDispatch } from "../../../stores/useBookmarksStore"

export default function BookmarkContextMenu({ bookmark, toggleIsForm, ...restOfProps }) {
	const bookmarksDispatch = useBookmarksDispatch()

	return (
		<>
			<Div {...restOfProps}>
				{bookmark.type === "link" && [
					<ContextMenuButton> open url </ContextMenuButton>,
					<ContextMenuButton> open url in a new tab </ContextMenuButton>,
				]}
				<ContextMenuButton
					onClick={() => {
						toggleIsForm(true)
					}}
				>
					edit {bookmark.type}
				</ContextMenuButton>
				<ContextMenuButton
					onClick={() => {
						bookmarksDispatch({ type: "deleteBookmark", payload: { id: bookmark.id } })
					}}
				>
					delete {bookmark.type}
				</ContextMenuButton>
				<ContextMenuButton> about </ContextMenuButton>
			</Div>
		</>
	)
}

const Div = styled.div`
	width: 10rem;
	padding: 5px;
	display: flex;
	flex-direction: column;
	background-color: #3f3e3d;
	border-radius: 10px;
`

const ContextMenuButton = styled.button`
	background-color: #3f3e3d;
	border: none;
	padding: 0.25rem;
	color: white;
	&:hover {
		background-color: #514f4d;
	}
`
