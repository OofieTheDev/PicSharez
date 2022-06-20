import { useParams } from "react-router-dom";
const axios = require("axios");

export default function Test() {
    // axios.get("http://localhost:3001/test")
    // .then((res) => {
    //     console.log(res);
    // })
    const params = useParams();
    console.log(params)
    return (
        <h1>You have arrived at the Testing page.</h1>
    )
}