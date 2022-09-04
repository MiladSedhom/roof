import Button from "../../../components/Button/Button"
import styled from "styled-components"
import Link from "../../../components/Link/Link"
import { usePosition } from "../../../hooks/usePosition"
import { useToggle } from "../../../hooks/useToggle"
import { Folder as FolderIcon, FolderOpen as OpenFolderIcon } from "@styled-icons/boxicons-solid"
import { CaretRight } from "@styled-icons/fa-solid"
import { useRef } from "react"
import { getBookmarkChildren } from "./helpers"
import { useClickOutside } from "../../../hooks/useClickOutside"
import { useContextMenu } from "../../../hooks/useContextMenu"
import BackDrop from "../../../components/BackDrop/BackDrop"
import BookmarkContextMenu from "./BookmarkContextMenu"
import BookmarkForm from "./BookmarkForm"

export default function Folder({ folder, roofData, dispatch }) {
	const [isForm, toggleIsForm] = useToggle(false)
	const [isList, toggleIsList] = useToggle(false)
	const buttonRef = useRef(null)
	const buttonPosition = usePosition(buttonRef)

	const [isContextMenu, contextMenuPosition, contextMenuTrigger] = useContextMenu()

	return (
		<>
			{isForm && (
				<BookmarkForm
					currentCount={roofData.count}
					bookmarks={roofData.bookmarks}
					toggleForm={toggleIsForm}
					dispatch={dispatch}
					dispatchType={"updateBookmark"}
					defaultBookmark={folder}
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
			{isList && <BackDrop onClick={toggleIsList} style={{ backgroundColor: "transparent" }} />}

			<Button
				innerRef={buttonRef}
				onContextMenu={e => {
					console.log("button context menu")
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

			{isList && (
				<List
					toggleList={toggleIsList}
					dispatch={dispatch}
					folder={folder}
					positionTop={buttonPosition.top + buttonPosition.height + 16}
					positionLeft={buttonPosition.left - buttonPosition.width / 2}
					roofData={roofData}
				/>
			)}
		</>
	)
}

function List({ folder, positionTop, positionLeft, roofData, dispatch, toggleList, isNested }) {
	const folderChildren = getBookmarkChildren(folder.id, roofData.bookmarks)
	const listRef = useRef()

	if (isNested) {
		useClickOutside(listRef, () => {
			toggleList(false)
		})
	}

	const listPosition = usePosition(listRef)

	return (
		<div style={{ position: "fixed", top: positionTop, left: positionLeft, width: "10rem" }} ref={listRef}>
			<ListDiv
				dispatch={dispatch}
				positionTop={positionTop}
				positionLeft={positionLeft}
				onClick={e => {
					e.stopPropagation()
				}}
			>
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
						<ListFolder key={child.name} folder={child} roofData={roofData}>
							{child.name}
						</ListFolder>
					)
				})}
			</ListDiv>
		</div>
	)
}
const ListDiv = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 10rem;
	min-height: 3rem;
	padding: 0.5rem 0;
	background-color: #373737;
	border-radius: 12px;
	position: fixed;
	top: ${props => props.positionTop + "px"};
	left: ${props => props.positionLeft + "px"};
`

function ListFolder(props) {
	const [isNestedList, toggleIsNestedList] = useToggle(false)
	const listFolderRef = useRef()
	const listFolderPosition = usePosition(listFolderRef)

	const windowWidth = window.innerWidth

	return (
		<>
			<ListFolderContainer onClick={toggleIsNestedList} ref={listFolderRef}>
				{isNestedList && (
					<List
						isNested
						toggleList={toggleIsNestedList}
						folder={props.folder}
						roofData={props.roofData}
						positionLeft={
							listFolderPosition.left < windowWidth / 2
								? listFolderPosition.left + listFolderPosition.width + 2
								: listFolderPosition.left - listFolderPosition.width - 2
						}
					/>
				)}
				<Container>
					<div style={{ maxWidth: "90%" }}>
						<FolderIcon style={{ width: "1em", marginRight: "4px" }} />
						{props.children}
					</div>
					<CaretRight style={{ width: "0.5em" }} />
				</Container>
			</ListFolderContainer>
		</>
	)
}

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`

const ListFolderContainer = styled.div`
	width: 100%;
	padding: 0.25rem 1rem;
	margin: 0.25rem;
	font-size: 12px;
	background-color: #171717;
	color: white;
	position: relative;
`
