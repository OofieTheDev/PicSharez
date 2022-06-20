import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
const axios = require("axios");

export default function UserProfile() {
    const { userid } = useParams();
    const [ userName, setUserName ] = useState(null);
    useEffect(() => {
        const getUser = async () => {
            const userInfo = await axios.get(`http://localhost:3001/users/${userid}`)
            console.log(userInfo.data)
            setUserName(userInfo.data);
        }
        getUser()
    }, []);

    return (
        <>
            {/* <div className='user-div'>
                {userName && <h1>{userName}</h1>}
            </div> */}
            <Outlet />
        </>
    )
}