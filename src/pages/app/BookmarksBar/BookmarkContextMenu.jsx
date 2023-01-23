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
	width: 12rem;
	padding: 5px 0;
	display: flex;
	flex-direction: column;
	background-color: #4b4949;
	border-radius: 5px;
`

const ContextMenuButton = styled.button`
	background-color: #4b4949;
	text-align: left;
	border: none;
	padding: 0.4rem 0.25rem 0.4rem 1rem;
	color: white;
	&:hover {
		background-color: #5f5c5a;
	}
`
