import styled from "styled-components";
import BackDrop from "../../../components/BackDrop/BackDrop";

export default function SettingsPage({ toggleIsSettings }) {
	return (
		<BackDrop onClick={toggleIsSettings}>
			<Div>
				<SideBar> hii</SideBar>
			</Div>
		</BackDrop>
	);
}

const Div = styled.div`
	background-color: #383535;
	width: 60%;
	height: 60%;
	border-radius: 1rem;
`;
const SideBar = styled.div`
	width: 30%;
	height: 100%;
	float: left;
	border-right: 2px #474343 solid;
`;
