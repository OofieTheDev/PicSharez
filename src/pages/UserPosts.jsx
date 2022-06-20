import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThumbsUp from "../components/ThumbsUp";
import ThumbsDown from "../components/ThumbsDown";
const axios = require("axios");

const headers = {
    'Content-Type' : 'application/json'
};

export default function UserPosts({ user }) {
    const [ userPosts, setUserPosts ] = useState(null);
    const { userid } = useParams();
    useEffect(() => {
        const retrievePosts = async () => {
            const url = "http://localhost:3001/userposts";
            const payload = { author: userid }
            const results = await axios.post(url, payload, headers)
            console.log(results.data);
            setUserPosts(results.data);
        }
        retrievePosts();
        // const posts = retrievePosts();
        // setUserPosts(posts);
    }, []);

    return (
        <div className='picture-grid'>
            {userPosts && userPosts.map((data) => {
                return <div key={data._id} className='picture-item'>
                    <img src={data.link} alt='' />
                    <div className='picture-item-lower'>
                        <div className='picture-descript'>
                            <p>{data.descript}</p>
                        </div>
                        
                        <div className='picture-interact'>
                            <ThumbsUp likeArray={data.likeUsers} likeArrayLength={data.likeUsers.length} picID={data._id} user={user} />
                            <ThumbsDown dislikeArray={data.dislikeUsers} dislikeArrayLength={data.dislikeUsers.length} picID={data._id} user={user} />
                        </div>
                    </div>
                    
                </div>
            })}
        </div>
    )
}