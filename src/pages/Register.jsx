import { useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require("axios");
axios.defaults.withCredentials = true;

const headers = {
    'Content-Type' : 'application/json'
};

export default function Register() {
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
    const handleSubmit = () => {
        let creds = {
            username: email,
            password: password
        }
        console.log(creds);
        axios.post("http://localhost:3001/register", creds, headers)
        .then(res => {
            console.log(res);
        })
        .catch(err => console.log(err))
        navigate("/login");
    }

    return (
        <div className='register-form-div'>
            <form className='register-form' onSubmit={handleSubmit}>
                <p>Username/Email</p>
                <input type="email" name='email' onChange={handleChange} value={email} />
                <br />
                <p>Password</p>
                <input type="password" name='password' onChange={handleChange} value={password} />
                <br />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}