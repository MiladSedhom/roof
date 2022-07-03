import styled from "styled-components"

export default function BackDrop (props) {
    const { children, ...restProps } = props
    return <Div {...restProps} >
        {children}
    </Div>


}

const Div = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000e1;
`