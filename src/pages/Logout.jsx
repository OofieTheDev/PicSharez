import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Logout(props) {
    useEffect(() => {
        axios.get("http://localhost:3001/logout").then((res) => {
            console.log("Logged out.");
        })
        props.setUser(null);
    }, [])
    
    return (
        <div className='logout-div'>
            <h1>You have successfully logged out.</h1>
            <br />
            <Link to="/">Back to Home</Link>
        </div>
    )
}