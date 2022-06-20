import { useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
axios.defaults.withCredentials = true;

const headers = {
    'Content-Type' : 'application/json'
};

export default function Login(props) {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const endpoint = "http://localhost:3001/authentication";
        let creds = {
            username: email,
            password: password
        }
        // console.log(creds);
        // fetch(endpoint, {
        //     method: 'POST',
        //     headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
        //     body: JSON.stringify(creds)
        // }).then(res => res.json()).then(json => console.log(json));
        const result = await axios.post(endpoint, creds, headers);
        console.log(result);
        console.log(result.data);
        if (result.data === "Welcome.") {
            console.log("Pictures...")
            props.setUser(email);
            navigate("/pictures");
        } else {
            console.log("Login again...")
            navigate("/login");
        }
        // .then(res => {
        //     console.log(res)
            
        // })
        // .catch(err => console.log(err));
        
        // if (loggedIn) {
        //     console.log("Navigating to pictures...");
        //     navigate("/pictures");
        // } else {
        //     console.log("Re-navigating to login...");
        //     navigate("/login");
        // }
    }
    

    return (
        <div className='login-form-div'>
            <form className='login-form' onSubmit={handleSubmit}>
                <p>Username/Email</p>
                <input autoComplete='off' type="email" name='email' onChange={handleChange} value={email} />
                <br />
                <p>Password</p>
                <input autoComplete='off' type="password" name='password' onChange={handleChange} value={password} />
                <br />
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}