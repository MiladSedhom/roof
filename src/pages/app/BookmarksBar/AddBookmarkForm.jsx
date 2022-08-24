import { useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Select from "../../../components/Select/Select";
import BackDrop from "../../../components/BackDrop/BackDrop";
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

export default function AddBookmarkForm({ currentCount, setData, foldersList, toggleIsAdd }) {
	const [url, setUrl] = useState("");
	const [name, setName] = useState("");
	const [target, setTarget] = useState(0);
	const [type, setType] = useState("link");
	const theme = useContext(ThemeContext);

	function submitHandler(e) {
		e.preventDefault();
		const newBookmark =
			type === "folder"
				? { id: currentCount, type, name, childrenIds: [], parentId: target - 0 }
				: { id: currentCount, type, url, name, parentId: target - 0 };

		// const targetFolder = foldersList.filter(element => element.id == target)[0];
		// const updatedFolder = { ...targetFolder, children: [...targetFolder.children, currentCount] };

		setData(prevState => {
			const newState = { ...prevState, bookmarks: [...prevState.bookmarks, newBookmark], count: currentCount + 1 };

			newState.bookmarks.map(obj => {
				if (obj.id == target) {
					obj.childrenIds = [...obj.childrenIds, currentCount];
					return obj;
				} else return obj;
			});
			return newState;
		});
		//TODO: validaton
		toggleIsAdd();
	}

	return (
		<>
			<BackDrop onClick={toggleIsAdd} style={{ backgroundColor: "transparent" }} />

			<StyledDiv backgroundColor={theme.containersColor}>
				<Form action="none">
					<Input
						value={name}
						onInput={e => {
							setName(e.target.value);
						}}
						type="text"
						placeholder="Name"
					/>
					{type === "link" ? (
						<Input
							value={url}
							onInput={e => {
								setUrl(e.target.value);
							}}
							type="text"
							placeholder="url"
						/>
					) : null}

					<div>
						<Select
							label={"location: "}
							value={target}
							onChange={e => {
								setTarget(e.target.value);
							}}
						>
							{foldersList.map(element => (
								<option value={element.id} key={element.id}>
									{element.name}
								</option>
							))}
						</Select>
					</div>

					<div>
						<Select
							label={"type: "}
							value={type}
							onChange={e => {
								setType(e.target.value);
							}}
						>
							<option value="link">Link</option>
							<option value="folder">Folder</option>
						</Select>
					</div>
					<Button
						style={{ outline: "solid 1px black" }}
						onClick={e => {
							submitHandler(e);
						}}
					>
						Add
					</Button>
				</Form>
			</StyledDiv>
		</>
	);
}

const StyledDiv = styled.div`
	position: absolute;
	right: 5rem;
	width: 15rem;
	max-height: 85vh;
	overflow-y: auto;
	margin: 0.5rem;
	padding: 1rem;
	border-radius: 1rem;
	background-color: ${props => props.backgroundColor || "#383535 "};
	color: white;
`;

const Form = styled.form`
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: flex-start;
	width: 100%;
	height: 100%;
`;
