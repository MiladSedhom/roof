import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useContext } from "react";
import Folder from "./Folder";

export default function BookmarksBar({ data, toggleIsAdd, toggleIsOthers, toggleIsSettings }) {
	const theme = useContext(ThemeContext);

	const toggleSettings = (e) => {
		toggleIsSettings();
	};

	const toggleOthersContainer = () => {
		toggleIsAdd(false);
		toggleIsSettings(false);
		toggleIsOthers();
	};

	const toggleAddBookmarkContainer = () => {
		toggleIsOthers(false);
		toggleIsAdd();
	};

	return (
		<StyledDiv backgroundColor={theme.containersColor}>
			<Container>
				{data.bookmarks[0].children.map((bookmark) => {
					if (bookmark.type === "link") {
						return (
							<Link key={bookmark.name} {...bookmark}>
								{bookmark.name}
							</Link>
						);
					} else return <Folder folder={bookmark} />;
				})}
			</Container>

			<Container>
				<Button onClick={toggleAddBookmarkContainer} backgroundColor={theme.fieldsColor}>
					+
				</Button>
				<Folder folder={data.bookmarks[1]} />
				<Button onClick={toggleSettings} backgroundColor={theme.fieldsColor}>
					settings
				</Button>
			</Container>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	background-color: ${(props) => props.backgroundColor || "#383535 "};
	height: 3rem;
	max-height: 3rem;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: relative;
`;

const Container = styled.div`
	display: flex;
	align-items: center;
	height: 3rem;
	overflow: visible;
`;
