import Button from "../../../components/Button/Button";
import styled from "styled-components";
import Link from "../../../components/Link/Link";
import { useToggle } from "../../../hooks/useToggle";
import { Folder as FolderIcon, FolderOpen as OpenFolderIcon } from "@styled-icons/boxicons-solid";
import { CaretRight } from "@styled-icons/fa-solid";
import { useRef } from "react";
import { getBookmarkChildren } from "./helpers";
import { useClickOutside } from "../../../hooks/useClickOutside";

export default function Folder({ folder, data, dispatch }) {
	const [isList, toggleIsList] = useToggle(false);
	const buttonRef = useRef(null);
	const buttonPositionLeft = buttonRef.current && buttonRef.current.offsetLeft;
	const buttonPositionTop = buttonRef.current && buttonRef.current.offsetTop;
	const buttonWidth = buttonRef.current && buttonRef.current.clientWidth;
	const buttonHeight = buttonRef.current && buttonRef.current.clientHeight;

	return (
		<>
			<Button
				innerRef={buttonRef}
				onClick={e => {
					toggleIsList();
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
					toggleIsList={toggleIsList}
					dispatch={dispatch}
					folder={folder}
					positionTop={buttonPositionTop + buttonHeight + 16}
					positionLeft={buttonPositionLeft - buttonWidth / 2}
					data={data}
				/>
			)}
		</>
	);
}

function List({ folder, positionTop, positionLeft, data, dispatch, toggleIsList }) {
	const folderChildren = getBookmarkChildren(folder, data.bookmarks);
	const listClickOutsideRef = useRef();
	useClickOutside(listClickOutsideRef, () => {
		toggleIsList(false);
	});
	return (
		<div ref={listClickOutsideRef}>
			<ListDiv
				dispatch={dispatch}
				positionTop={positionTop}
				positionLeft={positionLeft}
				onClick={e => {
					e.stopPropagation();
				}}
			>
				{folderChildren.map(child => {
					if (child.type === "link") {
						return (
							<Link
								data={data}
								dispatch={dispatch}
								key={child.name}
								href={child.url}
								title={child.name}
								bookmark={child}
							>
								{child.name}
							</Link>
						);
					}
					return (
						<ListFolder key={child.name} folder={child} data={data}>
							{child.name}
						</ListFolder>
					);
				})}
			</ListDiv>
		</div>
	);
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
	position: absolute;
	top: ${props => props.positionTop + "px"};
	left: ${props => props.positionLeft + "px"};
`;

function ListFolder(props) {
	const [isNestedList, toggleIsNestedList] = useToggle(false);
	const listFolderRef = useRef();
	const listFolderPosisionTop = listFolderRef.current && listFolderRef.current.offsetTop;
	const listFolderPosisionLeft = listFolderRef.current && listFolderRef.current.offsetLeft;
	const listFolderWidth = listFolderRef.current && listFolderRef.current.clientWidth;
	const listFolderHeight = listFolderRef.current && listFolderRef.current.clientHeight;
	const windowWidth = window.innerWidth;

	return (
		<>
			<ListFolderContainer onClick={toggleIsNestedList} ref={listFolderRef}>
				{isNestedList && (
					<List
						folder={props.folder}
						data={props.data}
						positionLeft={
							listFolderPosisionLeft < windowWidth / 2
								? listFolderPosisionLeft - listFolderWidth
								: listFolderPosisionLeft + listFolderWidth
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
	);
}

const Container = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

const ListFolderContainer = styled.div`
	width: 100%;
	padding: 0.25rem 1rem;
	margin: 0.25rem;
	font-size: 12px;
	background-color: #171717;
	color: white;
	position: relative;
`;
