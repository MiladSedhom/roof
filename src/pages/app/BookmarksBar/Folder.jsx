import Link from "../../../components/Link/Link";
import Button from "../../../components/Button/Button";
import styled from "styled-components";
import { useToggle } from "../../../hooks/useToggle";
import { Folder as FolderIcon, FolderOpen as OpenFolderIcon } from "@styled-icons/boxicons-solid";

export default function Folder({ folder }) {
	const [isList, toggleIsList] = useToggle(false);

	return (
		<Container>
			<Button
				onClick={(e) => {
					toggleIsList();
				}}
			>
				{isList ? <OpenFolderIcon width={"1.1em"} /> : <FolderIcon width={"1em"} />} {folder.name}
			</Button>
			{isList && (
				<StyledDiv>
					{folder.children.map((child) => {
						if (child.type === "link") {
							return (
								<Link key={child.name} {...child}>
									{child.name}
								</Link>
							);
						} else return <Folder folder={child} />;
					})}
				</StyledDiv>
			)}
		</Container>
	);
}

const Container = styled.div`
	align-self: flex-start;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: #363636;
	margin-top: 0.375rem;
	border-radius: 1rem;
`;

const StyledDiv = styled.div`
	margin: 0 0.5rem 0.5rem 0.5rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border: 1px solid #545353;
	border-radius: 1rem;
`;
