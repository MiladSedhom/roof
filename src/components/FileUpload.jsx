export default function FileUpload ({setData}) {

    const onInputHandler = async (e) => {
            const reader = new FileReader();
            reader.readAsText(e.target.files[0])
            reader.onload= () => {
                localStorage.setItem("roofData",reader.result)
                let parsedJSON = JSON.parse(reader.result);
                setData(parsedJSON)
             }
    }

    return (
        <input type="file" accept=".json" onInput={(e)=>{onInputHandler(e)}}  />
            )
}