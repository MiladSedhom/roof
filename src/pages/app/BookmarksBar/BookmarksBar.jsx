import styled from "styled-components"
import Button from "../../../components/Button/Button"
import Link from "../../../components/Link/Link"
import { ThemeContext } from "../../../contexts/ThemeContext"
import { useContext, useRef } from "react"
import Folder from "./Folder"
import { Plus } from "@styled-icons/fa-solid"
import { Cog } from "@styled-icons/boxicons-solid"
import { getBookmarkChildren } from "./helpers"
import { useToggle } from "../../../hooks/useToggle"
import BookmarkForm from "./BookmarkForm"
import { usePosition } from "../../../hooks/usePosition"
import { useBookmarksStore } from "../../../stores/useBookmarksStore"

export default function BookmarksBar({ toggleIsSettings }) {
	const [isAdd, toggleIsAdd] = useToggle(false)
	const addButtonRef = useRef()
	const addButtonPosition = usePosition(addButtonRef)
	const theme = useContext(ThemeContext)

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
					<Button innerRef={addButtonRef} onClick={toggleIsAdd} backgroundColor={theme.fieldsColor}>
						<Plus style={{ width: "1em", color: "white" }} />
					</Button>
					<Folder folder={bookmarks[1]} />
					<Button onClick={toggleIsSettings} backgroundColor={theme.fieldsColor}>
						<Cog style={{ width: "1.3em", color: "white" }} />
					</Button>
				</Container>
			</StyledDiv>

			{isAdd && <BookmarkForm parentPosition={addButtonPosition} toggleForm={toggleIsAdd} />}
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
