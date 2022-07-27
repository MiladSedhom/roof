import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Link from "../../../components/Link/Link";
import { ThemeContext } from "../../../contexts/ThemeContext";
import { useContext } from "react";
import Folder from "./Folder";
import { Plus } from "@styled-icons/fa-solid";
import { Cog } from "@styled-icons/boxicons-solid";

export default function BookmarksBar({ data, toggleIsAdd, toggleIsSettings }) {
	const theme = useContext(ThemeContext);

	const toggleSettings = (e) => {
		toggleIsSettings();
	};

	const toggleAddBookmarkContainer = () => {
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
					<Plus style={{ width: "1em", color: "white" }} />
				</Button>
				<Folder folder={data.bookmarks[1]} />
				<Button onClick={toggleSettings} backgroundColor={theme.fieldsColor}>
					<Cog style={{ width: "1.3em", color: "white" }} />
				</Button>
			</Container>
		</StyledDiv>
	);
}

const StyledDiv = styled.div`
	background-color: ${(props) => props.backgroundColor || "#383535 "};
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
