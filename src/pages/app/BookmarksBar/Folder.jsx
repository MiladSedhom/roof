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
import BackDrop from "../../../components/BackDrop/BackDrop"
import BookmarkContextMenu from "./BookmarkContextMenu"
import BookmarkForm from "./BookmarkForm"
import { useClickOutside } from "../../../hooks/useClickOutside"

export default function Folder({ folder, roofData, dispatch, isNested }) {
	const [isForm, toggleIsForm] = useToggle(false)
	const [isList, toggleIsList] = useToggle(false)
	const buttonRef = useRef(null)
	const buttonPosition = usePosition(buttonRef)

	const listPosition = getListPosition(buttonPosition, isNested)

	const [isContextMenu, contextMenuPosition, contextMenuTrigger] = useContextMenu()

	return (
		<>
			{isList && !isNested && <BackDrop onClick={toggleIsList} style={{ backgroundColor: "transparent" }} />}
			{!isNested ? (
				<Button
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
				</Button>
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
					roofData={roofData}
					dispatch={dispatch}
					positionLeft={listPosition.left}
					positionTop={listPosition.top}
					toggleIsList={toggleIsList}
				/>
			)}

			{isForm && (
				<BookmarkForm
					parentPosition={buttonPosition}
					currentCount={roofData.count}
					bookmarks={roofData.bookmarks}
					toggleForm={toggleIsForm}
					dispatch={dispatch}
					dispatchType={"updateBookmark"}
					bookmarkBeingEdited={folder}
				/>
			)}
			{isContextMenu && (
				<BookmarkContextMenu
					style={{ ...contextMenuPosition }}
					bookmark={folder}
					dispatch={dispatch}
					toggleIsForm={toggleIsForm}
				/>
			)}
		</>
	)
}

function List({ folder, roofData, dispatch, positionLeft, positionTop, toggleIsList }) {
	const folderChildren = getBookmarkChildren(folder.id, roofData.bookmarks)
	const listRef = useRef(null)
	console.log(listRef.current)
	useClickOutside(listRef, toggleIsList)

	return (
		<ListWrapper ref={listRef} positionTop={positionTop} positionLeft={positionLeft}>
			{folderChildren.map(child => {
				if (child.type === "link") {
					return (
						<Link
							roofData={roofData}
							dispatch={dispatch}
							key={child.name}
							href={child.url}
							title={child.name}
							bookmark={child}
						>
							{child.name}
						</Link>
					)
				}
				return (
					<Folder key={child.name} folder={child} roofData={roofData} isNested>
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
	border-radius: 12px;
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
