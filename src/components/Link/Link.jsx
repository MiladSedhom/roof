import styled from "styled-components";
import LinkContextMenu from "./LinkContextMenu";
import { useContextMenu } from "../../hooks/useContextMenu";
import { useToggle } from "../../hooks/useToggle";
import BookmarkForm from "../../pages/app/BookmarksBar/BookmarkForm";
import { getFolders } from "../../pages/app/BookmarksBar/helpers";

export default function Link({ data, dispatch, bookmark, children }) {
	const [isContextMenuOpen, contextMenuPosition, contextMenuTrigger] = useContextMenu();
	const [isForm, toggleIsForm] = useToggle(false);

	return (
		<>
			{isForm && (
				<BookmarkForm
					currentCount={data.count}
					foldersList={getFolders(data.bookmarks)}
					toggleIsAdd={toggleIsForm}
					dispatch={dispatch}
					dispatchType={"updateBookmark"}
					defaultBookmark={bookmark}
				/>
			)}

			<A
				title={children}
				href={bookmark.url}
				onContextMenu={e => {
					contextMenuTrigger(e);
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
				<LinkContextMenu
					style={{ ...contextMenuPosition }}
					data={data}
					id={bookmark.id}
					dispatch={dispatch}
					isForm={isForm}
					toggleIsForm={toggleIsForm}
				/>
			)}
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
	/* background-color: ${props => props.backgroundColor || "#383535"};
	color: ${props => props.textColor || "black"}; */
	font-size: ${props => props.fontSize || "11px"};
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
