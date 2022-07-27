import Link from "../../../components/Link/Link";
import Button from "../../../components/Button/Button";
import styled from "styled-components";
import { useToggle } from "../../../hooks/useToggle";
import { Folder as FolderIcon, FolderOpen as OpenFolderIcon } from "@styled-icons/boxicons-solid";
import { CaretRight } from "@styled-icons/fa-solid";
import { useRef } from "react";

export default function Folder({ folder }) {
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
				onClick={(e) => {
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
					folder={folder}
					positionTop={buttonPositionTop + buttonHeight + 16}
					positionLeft={buttonPositionLeft - buttonWidth / 2}
				/>
			)}
		</>
	);
}

function List({ folder, positionTop, positionLeft }) {
	return (
		<ListDiv
			positionTop={positionTop}
			positionLeft={positionLeft}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			{folder.children.map((child) => {
				if (child.type === "link") {
					return (
						<ListLink key={child.name} href={child.url} title={child.name} {...child}>
							{child.name}
						</ListLink>
					);
				} else
					return (
						<ListFolder key={child.name} folder={child}>
							{child.name}
						</ListFolder>
					);
			})}
		</ListDiv>
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
	top: ${(props) => props.positionTop + "px"};
	left: ${(props) => props.positionLeft + "px"};
`;

function ListFolder(props) {
	const [isNestedList, toggleIsNestedList] = useToggle(false);
	const listFolderRef = useRef();
	const listFolderPosisionTop = listFolderRef.current && listFolderRef.current.offsetTop;
	const listFolderPosisionLeft = listFolderRef.current && listFolderRef.current.offsetLeft;
	const listFolderWidth = listFolderRef.current && listFolderRef.current.clientWidth;
	const listFolderHeight = listFolderRef.current && listFolderRef.current.clientHeight;
	const windowWidth = window.innerWidth;

	console.log(listFolderPosisionTop);
	return (
		<>
			<ListFolderContainer
				onMouseOver={(e) => {
					toggleIsNestedList(true);
				}}
				onMouseOut={(e) => {
					toggleIsNestedList(false);
				}}
				ref={listFolderRef}
			>
				{isNestedList && (
					<List
						folder={props.folder}
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
const ListLink = styled.a`
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	width: 100%;
	padding: 0 1rem;
	margin: 0.25rem;
	font-size: 12px;
	color: white;
	text-decoration: none;
`;
