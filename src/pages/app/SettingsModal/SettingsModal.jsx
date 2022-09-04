import { useState } from "react"
import styled from "styled-components"
import { downloadroofData, shareroofData } from "./helper"
import FileUpload from "../../../components/FileUpload"
import { useRef } from "react"
import { useClickOutside } from "../../../hooks/useClickOutside"

export default function SettingsPage({ roofData, setStoredRoofData, toggleIsSettings }) {
	const [currentPanel, setCurrentPanel] = useState("shortcuts")
	const clickOutsideRef = useRef()
	useClickOutside(clickOutsideRef, toggleIsSettings)
	return (
		<>
			<Div ref={clickOutsideRef}>
				<SideBar>
					<button
						onClick={e => {
							setCurrentPanel("bookmarks")
						}}
					>
						bookmarks and roofData
					</button>
					<button
						onClick={e => {
							setCurrentPanel("shortcuts")
						}}
					>
						shortcuts
					</button>
					<button
						onClick={e => {
							setCurrentPanel("apperance")
						}}
					>
						apperance
					</button>
				</SideBar>

				{currentPanel === "bookmarks" ? (
					<Main>
						<h3>roofData: </h3>
						<div>
							<button
								onClick={e => {
									downloadroofData(roofData, "roofBookmarks.json")
								}}
							>
								Download
							</button>
							<button>
								<FileUpload setStoredRoofData={setStoredRoofData} />
							</button>
							<button
								onClick={e => {
									shareroofData(roofData, "bookmarks.json")
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
	)
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
`
const SideBar = styled.div`
	display: flex;
	flex-flow: column;
	width: 25%;
	height: 100%;
	float: left;
	border-right: 2px #474343 solid;
`

const Main = styled.main`
	padding: 2rem;
`
