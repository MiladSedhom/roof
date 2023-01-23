import Button from "../../../components/Button/Button"
import styled from "styled-components"
import Link from "../../../components/Link/Link"
import { usePosition } from "../../../hooks/usePosition"
import { useToggle } from "../../../hooks/useToggle"
import { Folder as FolderIcon, FolderOpen as OpenFolderIcon } from "@styled-icons/boxicons-solid"
import { CaretRight } from "@styled-icons/fa-solid"
import { useRef } from "react"
import { getBookmarkChildren, getListPosition } from "./helpers"
import { useContextMenu } from "../../../hooks/useContextMenu"
import BookmarkContextMenu from "./BookmarkContextMenu"
import BookmarkForm from "./BookmarkForm"
import { useClickOutside } from "../../../hooks/useClickOutside"
import { useBookmarksStore } from "../../../stores/useBookmarksStore"

export default function Folder({ folder, isNestedFolder }) {
	const [isForm, toggleIsForm] = useToggle(false)
	const [isList, toggleIsList] = useToggle(false)
	const buttonRef = useRef(null)
	const buttonPosition = usePosition(buttonRef)

	const [isContextMenu, contextMenuPosition, contextMenuTrigger] = useContextMenu()

	return (
		<>
			{!isNestedFolder ? (
				<FolderButton
					innerRef={buttonRef}
					onContextMenu={e => {
						contextMenuTrigger(e)
					}}
					onClick={e => {
						toggleIsList()
					}}
				>
					{isList ? (
						<OpenFolderIcon style={{ width: "1.2em", marginRight: "4px" }} />
					) : (
						<FolderIcon style={{ width: "1.2em", marginRight: "4px" }} />
					)}
					{folder.name}
				</FolderButton>
			) : (
				<NestedButton
					innerRef={buttonRef}
					onContextMenu={e => {
						contextMenuTrigger(e)
					}}
					onClick={e => {
						toggleIsList()
					}}
				>
					{isList ? (
						<OpenFolderIcon style={{ width: "1.2em", marginRight: "4px" }} />
					) : (
						<FolderIcon style={{ width: "1.2em", marginRight: "4px" }} />
					)}
					{folder.name}
				</NestedButton>
			)}

			{isList && (
				<List
					folder={folder}
					parentPosition={buttonPosition}
					toggleIsList={toggleIsList}
					isNestedList={isNestedFolder}
				/>
			)}

			{isForm && (
				<BookmarkForm parentPosition={buttonPosition} toggleForm={toggleIsForm} bookmarkBeingEdited={folder} />
			)}
			{isContextMenu && (
				<BookmarkContextMenu style={{ ...contextMenuPosition }} bookmark={folder} toggleIsForm={toggleIsForm} />
			)}
		</>
	)
}

function List({ folder, parentPosition, toggleIsList, isNestedList }) {
	const bookmarks = useBookmarksStore()

	const folderChildren = getBookmarkChildren(folder.id, bookmarks)
	const listRef = useRef(null)
	useClickOutside(listRef, toggleIsList)

	const LIST_WIDTH = 80
	const listPosition = getListPosition(parentPosition, isNestedList, LIST_WIDTH)

	return (
		<ListWrapper ref={listRef} positionLeft={listPosition.left} positionTop={listPosition.top}>
			{folderChildren.map(child => {
				if (child.type === "link") {
					return (
						<Link key={child.name} href={child.url} title={child.name} bookmark={child}>
							{child.name}
						</Link>
					)
				}
				return (
					<Folder folder={child} isNestedFolder key={child.name}>
						{child.name}
					</Folder>
				)
			})}
		</ListWrapper>
	)
}

const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 10rem;
	min-height: 3rem;
	padding: 0.5rem 0;
	background-color: #373737;
	border-radius: 10px;
	position: fixed;
	top: ${props => props.positionTop + "px"};
	left: ${props => props.positionLeft + "px"};
`

function NestedButton(props) {
	return (
		<NestedButtonWrapper ref={props.innerRef} {...props}>
			<div style={{ maxWidth: "90%" }}>{props.children}</div>
			<CaretRight style={{ width: "0.5em" }} />
		</NestedButtonWrapper>
	)
}

const NestedButtonWrapper = styled.button`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 0.25rem 1rem;
	margin: 0.25rem;
	font-size: 12px;
	background-color: #171717;
	color: white;
`
const FolderButton = styled(Button)`
	background-color: #383535;
	font-size: 12px;
`
