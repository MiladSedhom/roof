import { useId } from "react"
import styled from "styled-components"

export default function Select({ label, children, onChange, ...restOfProps }) {
	const id = useId()
	return (
		<Wrapper disabled={restOfProps.disabled}>
			<StyledLabel htmlFor={id}> {label} </StyledLabel>
			<StyledSelect id={id} onChange={onChange} {...restOfProps}>
				{children}
			</StyledSelect>
		</Wrapper>
	)
}

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	margin: 0 0 0.5rem 0;
	opacity: ${props => (props.disabled ? "40%" : null)};
`

const StyledLabel = styled.label`
	/* display: block */
	font-size: 14px;
`

const StyledSelect = styled.select`
	max-width: 12.5rem;
	width: 9rem;
	height: 1.5rem;
	padding: 0 1rem;
	border: none;
	border-radius: 10px;
	background-color: ${props => props.backgroundColor || "#514F4D"};
	color: white;
	&:focus {
		outline: 1px #d2d2d2 solid;
	}
	/* &:disabled {
		opacity: 40%;
	} */
	&::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: #878787;
		opacity: 1; /* Firefox */
	}
	//this prevents text from overflowing and adds
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	//
`
