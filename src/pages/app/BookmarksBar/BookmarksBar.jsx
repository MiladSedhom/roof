import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useContext } from "react";
import Folder from "./Folder";
import { Plus } from "@styled-icons/fa-solid";
import { Cog } from "@styled-icons/boxicons-solid";
import { getBookmarkChildren } from "./helpers";
import { useToggle } from "../../../hooks/useToggle";
import AddBookmarkForm from "./AddBookmarkForm";
import { getFolders } from "./helpers";

export default function BookmarksBar({ data, toggleIsSettings, dispatch }) {
	const [isAdd, toggleIsAdd] = useToggle(false);

	const theme = useContext(ThemeContext);

	const toggleSettings = e => {
		toggleIsSettings();
	};

	const toggleAddBookmarkContainer = () => {
		toggleIsAdd();
	};

	const bookmarksBarChildren = getBookmarkChildren(data.bookmarks[0], data.bookmarks);

	return (
		<>
			<StyledDiv backgroundColor={theme.containersColor}>
				<Container>
					{bookmarksBarChildren.map(bookmark => {
						if (bookmark.type === "link") {
							return (
								<Link key={bookmark.id} {...bookmark} dispatch={dispatch}>
									{bookmark.name}
								</Link>
							);
						}
						return <Folder key={bookmark.id} folder={bookmark} data={data} />;
					})}
				</Container>

				<Container>
					<Button onClick={toggleAddBookmarkContainer} backgroundColor={theme.fieldsColor}>
						<Plus style={{ width: "1em", color: "white" }} />
					</Button>
					<Folder folder={data.bookmarks[1]} data={data} />
					<Button onClick={toggleSettings} backgroundColor={theme.fieldsColor}>
						<Cog style={{ width: "1.3em", color: "white" }} />
					</Button>
				</Container>
			</StyledDiv>

			{isAdd && (
				<AddBookmarkForm
					currentCount={data.count}
					foldersList={getFolders(data.bookmarks)}
					toggleIsAdd={toggleIsAdd}
					dispatch={dispatch}
				/>
			)}
		</>
	);
}

const StyledDiv = styled.div`
	background-color: ${props => props.backgroundColor || "#383535 "};
	height: 2.5rem;
	max-height: 2.5rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	height: rem;
	overflow: visible;
`;
