import styled from "styled-components"
import BookmarkContextMenu from "../../pages/app/BookmarksBar/BookmarkContextMenu"
import { useContextMenu } from "../../hooks/useContextMenu"
import { useToggle } from "../../hooks/useToggle"
import { useRef } from "react"
import { usePosition } from "../../hooks/usePosition"
import BookmarkForm from "../../pages/app/BookmarksBar/BookmarkForm"

export default function Link({ roofData, dispatch, bookmark, children }) {
	const [isContextMenuOpen, contextMenuPosition, contextMenuTrigger] = useContextMenu()
	const [isForm, toggleIsForm] = useToggle(false)
	const linkRef = useRef(null)
	const linkPosition = usePosition(linkRef)

	return (
		<>
			<A
				ref={linkRef}
				title={children}
				href={bookmark.url}
				onContextMenu={e => {
					contextMenuTrigger(e)
				}}
			>
				<img
					style={{ margin: "0 8px 0 0" }}
					src={`
					https://www.google.com/s2/favicons?domain=${bookmark.url}&sz=${16}`}
				/>
				<Span>{children}</Span>
			</A>

			{isContextMenuOpen && (
				<BookmarkContextMenu
					style={{ ...contextMenuPosition }}
					bookmark={bookmark}
					dispatch={dispatch}
					toggleIsForm={toggleIsForm}
				/>
			)}
			{isForm && (
				<BookmarkForm
					parentPosition={linkPosition}
					currentCount={roofData.count}
					bookmarks={roofData.bookmarks}
					toggleForm={toggleIsForm}
					dispatch={dispatch}
					dispatchType={"updateBookmark"}
					defaultBookmark={bookmark}
				/>
			)}
		</>
	)
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
	/* background-color: ${props => props.backgroundColor || "#383535"};
	color: ${props => props.textColor || "black"}; */
	font-size: ${props => props.fontSize || "11px"};
	font-family: "Inter", sans-serif;
	text-decoration: none;
`

const Span = styled.span`
	//this prevents text from overflowing and adds
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	//
`
