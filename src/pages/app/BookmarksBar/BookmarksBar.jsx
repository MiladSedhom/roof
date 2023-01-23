import styled from "styled-components"
import Button from "../../../components/Button/Button"
import Link from "../../../components/Link/Link"
import Folder from "./Folder"
import BookmarkForm from "./BookmarkForm"
import { useRef } from "react"
import { Plus } from "@styled-icons/fa-solid"
import { Cog } from "@styled-icons/boxicons-solid"
import { getBookmarkChildren } from "./helpers"
import { useToggle } from "../../../hooks/useToggle"
import { usePosition } from "../../../hooks/usePosition"
import { useBookmarksStore } from "../../../stores/useBookmarksStore"
import { useThemeStore } from "../../../stores/useThemeStore"

export default function BookmarksBar({ toggleIsSettings }) {
	const [isAddFrom, toggleIsAddForm] = useToggle(false)
	const addButtonRef = useRef()
	const addButtonPosition = usePosition(addButtonRef)
	const theme = useThemeStore()

	const bookmarks = useBookmarksStore()

	// getting the children of the bar whos id is 0
	const bookmarksBarChildren = getBookmarkChildren(0, bookmarks)
	return (
		<>
			<StyledDiv backgroundColor={theme.containersColor}>
				<Container>
					{bookmarksBarChildren.map(bookmark => {
						if (bookmark.type === "link") {
							return (
								<Link key={bookmark.id} bookmark={bookmark}>
									{bookmark.name}
								</Link>
							)
						}
						return <Folder key={bookmark.id} folder={bookmark} />
					})}
				</Container>

				<Container>
					<Folder folder={bookmarks[1]} />
					<div onClick={toggleIsAddForm} style={{ cursor: "pointer" }}>
						<Plus ref={addButtonRef} style={{ width: ".8em", margin: "0.5rem", color: "white" }} />
					</div>
					<div onClick={toggleIsSettings} style={{ cursor: "pointer" }}>
						<Cog style={{ width: "1em", margin: "0.5rem", color: "white" }} />
					</div>
				</Container>
			</StyledDiv>

			{isAddFrom && <BookmarkForm parentPosition={addButtonPosition} toggleForm={toggleIsAddForm} />}
		</>
	)
}

const StyledDiv = styled.div`
	background-color: ${props => props.backgroundColor || "#383535 "};
	height: 2.5rem;
	max-height: 2.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
`

const Container = styled.div`
	display: flex;
	align-items: center;
	height: rem;
	overflow: visible;
`
