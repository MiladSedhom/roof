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

export default function BookmarksBar({ roofData, toggleIsSettings, dispatch }) {
	const [isAdd, toggleIsAdd] = useToggle(false)
	const addButtonRef = useRef()
	const addButtonPosition = usePosition(addButtonRef)

	const theme = useContext(ThemeContext)

	const toggleSettings = e => {
		toggleIsSettings()
	}

	const toggleAddBookmarkContainer = () => {
		toggleIsAdd()
	}

	// getting the children of the bar whos id is 0
	const bookmarksBarChildren = getBookmarkChildren(0, roofData.bookmarks)
	return (
		<>
			<StyledDiv backgroundColor={theme.containersColor}>
				<Container>
					{bookmarksBarChildren.map(bookmark => {
						if (bookmark.type === "link") {
							return (
								<Link roofData={roofData} key={bookmark.id} bookmark={bookmark} dispatch={dispatch}>
									{bookmark.name}
								</Link>
							)
						}
						return <Folder key={bookmark.id} folder={bookmark} roofData={roofData} dispatch={dispatch} />
					})}
				</Container>

				<Container>
					<Button innerRef={addButtonRef} onClick={toggleAddBookmarkContainer} backgroundColor={theme.fieldsColor}>
						<Plus style={{ width: "1em", color: "white" }} />
					</Button>
					<Folder folder={roofData.bookmarks[1]} roofData={roofData} />
					<Button onClick={toggleSettings} backgroundColor={theme.fieldsColor}>
						<Cog style={{ width: "1.3em", color: "white" }} />
					</Button>
				</Container>
			</StyledDiv>

			{isAdd && (
				<BookmarkForm
					parentPosition={addButtonPosition}
					currentCount={roofData.count}
					bookmarks={roofData.bookmarks}
					toggleForm={toggleIsAdd}
					dispatch={dispatch}
					dispatchType={"addBookmark"}
				/>
			)}
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
