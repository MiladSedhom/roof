import styled from "styled-components"
import { searchPrefixes } from "../../data"

export default function SearchBar(props) {


    const submitHandler = (e) => {
        if (e.key === 'Enter')
        {
            let query = e.target.value
            const prefix = query.split(" ")[0]

            if ( prefix in searchPrefixes) {
                //removing the prefix from the query
                query = query.replace(prefix,"")
                window.location.href = searchPrefixes[prefix].replace("%query",query)
                return
            }
            window.location.href = `https://www.google.com/search?q=${query}`
        }
    }

    return(
        <Input onKeyDown={(e)=>{submitHandler(e)}} type="search" placeholder={"Search with "+props.searchEngine+"..."} />
    )
}

const Input = styled.input`
    width: 40%;
    max-width: 600px;
    height: 3rem;
    border: 2px solid black;
    border-radius: 100rem;
    color: black;
    font-size: 1.2rem;
    padding: 0 2em;
    &:focus {
        outline: none
    }


`