import { useState } from "react";
import { useNavigate } from "react-router-dom";
const axios = require("axios");

const headers = {
    'Content-Type' : 'application/json'
};

export default function Post({ user }) {
    const navigate = useNavigate();
    const [ link, setLink ] = useState('');
    const [ descript, setDescript ] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;
        if (name === 'imgLink') {
            setLink(value);
        } else if (name === 'imgDescript') {
            setDescript(value);
        }
    }
    const submitPost = (e) => {
        e.preventDefault();
        let finalUser = ''
        if (user !== null){
            finalUser = user // warning, this references the same var in memory
        }
        const post = {
            link,
            descript,
            author: finalUser
        }
        axios.post("http://localhost:3001/posts", post, headers);
        navigate("/pictures");
    }

    return (
        <div className='post-div'>
            <h1>Submit your <span className='red'>moment</span> here!</h1>
            <form className='post-form' action="post" onSubmit={submitPost}>
                <p>Image Link</p>
                <input autoComplete='off' name='imgLink' type="text" value={link} onChange={handleChange} />
                <p>Description</p>
                <input autoComplete='off' name='imgDescript' type="text" value={descript} onChange={handleChange} />
                <br />
                <button className='post-btn' type='submit'>Submit</button>
            </form>
            
        </div>
    )
}