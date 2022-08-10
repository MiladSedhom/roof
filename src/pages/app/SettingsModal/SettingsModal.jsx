import { useState } from "react";
import styled from "styled-components";
import BackDrop from "../../../components/BackDrop/BackDrop";
import { downloadData, shareData } from "./helper";
import FileUpload from "../../../components/FileUpload";

export default function SettingsPage({ data, setData, toggleIsSettings }) {
	const [currentPanel, setCurrentPanel] = useState("shortcuts");

	return (
		<>
			<BackDrop onClick={toggleIsSettings} />
			<Div>
				<SideBar>
					<button
						onClick={(e) => {
							setCurrentPanel("bookmarks");
						}}
					>
						bookmarks and data
					</button>
					<button
						onClick={(e) => {
							setCurrentPanel("shortcuts");
						}}
					>
						shortcuts
					</button>
					<button
						onClick={(e) => {
							setCurrentPanel("apperance");
						}}
					>
						apperance
					</button>
				</SideBar>

				{currentPanel === "bookmarks" ? (
					<Main>
						<h3>Data: </h3>
						<div>
							<button
								onClick={(e) => {
									downloadData(data, "roofBookmarks.json");
								}}
							>
								Download
							</button>
							<button>
								<FileUpload setData={setData} />
							</button>
							<button
								onClick={(e) => {
									shareData(data, "bookmarks.json");
								}}
							>
								share
							</button>
						</div>
					</Main>
				) : currentPanel === "shortcuts" ? (
					<Main>shortcuts</Main>
				) : currentPanel === "apperance" ? (
					<Main>apperance</Main>
				) : null}
			</Div>
		</>
	);
}

const Div = styled.div`
	display: flex;
	width: 60%;
	height: 60%;
	border-radius: 1rem;
	background-color: #383535;
	color: white;
	position: absolute;
	top: 20%;
	left: 20%;
`;
const SideBar = styled.div`
	display: flex;
	flex-flow: column;
	width: 25%;
	height: 100%;
	float: left;
	border-right: 2px #474343 solid;
`;

const Main = styled.main`
	padding: 2rem;
`;
