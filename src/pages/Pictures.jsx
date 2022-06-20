import { useState, useEffect, useReducer } from "react";
import ThumbsUp from "../components/ThumbsUp";
import ThumbsDown from "../components/ThumbsDown";
const axios = require("axios");

export const ACTIONS = {
    LIKE_POST: "like-post",
    DISLIKE_POST: "dislike-post",
    INITIAL_STATE: 'initial-state'
}

const headers = {
    'Content-Type' : 'application/json'
};

export default function Pictures({ user }) {
    
    function reducer(state, action) {
        console.log(`State:`);
        console.log(state);
        
        switch (action.type) {
            case ACTIONS.LIKE_POST:
                let copyOfData = [...state] // copies pictures into copyOfData
                let targetData = copyOfData.find(picture => picture._id === action.payload.id); // isolates target data
                if (targetData.likeUsers.includes(action.payload.user)) { // checks if target data likeArray has user
                    let targetIndex = targetData.likeUsers.indexOf(action.payload.user); // locates the index of the user in the array
                    targetData.likeUsers.splice(targetIndex, 1); // remove the user
                    console.log(copyOfData);
                    const data = {
                        id: action.payload.id,
                        data: targetData
                    }
                    axios.post("http://localhost:3001/data", data, headers);
                    
                    return copyOfData // returns the edited data
                } else if (targetData.dislikeUsers.includes(action.payload.user)) { // checks if target data dislikeArray has user
                    let targetIndex = targetData.dislikeUsers.indexOf(action.payload.user) // locates the index of the user in the array
                    targetData.dislikeUsers.splice(targetIndex, 1); // removes user from dislikeArray
                    targetData.likeUsers.push(action.payload.user); // adds user to likeArray
                    console.log(copyOfData);
                    const data = {
                        id: action.payload.id,
                        data: targetData
                    }
                    axios.post("http://localhost:3001/data", data, headers);
                    
                    return copyOfData
                }
                else {
                    targetData.likeUsers.push(action.payload.user);
                    console.log(copyOfData);
                    const data = {
                        id: action.payload.id,
                        data: targetData
                    }
                    axios.post("http://localhost:3001/data", data, headers);
                    
                    return copyOfData;
                }

            case ACTIONS.DISLIKE_POST:
                let copyOfData2 = [...state] // copies pictures into copyOfData
                let targetData2 = copyOfData2.find(picture => picture._id === action.payload.id) // isolates target data
                if (targetData2.likeUsers.includes(action.payload.user)) { // checks if target data likeArray has user
                    let targetIndex2 = targetData2.likeUsers.indexOf(action.payload.user) // locates the index of the user in the array
                    targetData2.likeUsers.splice(targetIndex2, 1); // remove the user from likeArray
                    targetData2.dislikeUsers.push(action.payload.user); // add the user to dislikeArray
                    console.log(copyOfData2);
                    const data = {
                        id: action.payload.id,
                        data: targetData2
                    }
                    axios.post("http://localhost:3001/data", data, headers);
                    
                    return copyOfData2 // returns the edited data
                } else if (targetData2.dislikeUsers.includes(action.payload.user)) { // checks if target data dislikeArray has user
                    let targetIndex2 = targetData2.dislikeUsers.indexOf(action.payload.user) // locates the index of the user in the array
                    targetData2.dislikeUsers.splice(targetIndex2, 1); // removes user from dislikeArray
                    console.log(copyOfData2);
                    const data = {
                        id: action.payload.id,
                        data: targetData2
                    }
                    axios.post("http://localhost:3001/data", data, headers);
                    
                    return copyOfData2
                }
                else {
                    targetData2.dislikeUsers.push(action.payload.user)
                    console.log(copyOfData2);
                    const data = {
                        id: action.payload.id,
                        data: targetData2
                    }
                    axios.post("http://localhost:3001/data", data, headers)
                    
                    return copyOfData2
                }
            
            case ACTIONS.INITIAL_STATE:
                return action.payload;
            
            default:
                return state;
        }
    }
    
    const [ pictures, dispatch ] = useReducer(reducer, null);

    useEffect(() => {
        console.log("Effect started.")
        const getData = async() => {
            const result = await axios.get("http://localhost:3001/data");
            dispatch({type: ACTIONS.INITIAL_STATE, payload: result.data});
        }
        
        getData();
    }, [])


    // SubsequentRenders(() => {
    //     console.log("Updating picsharez database...");
    //     const postData = async() => {
    //         console.log(pictures)
    //         const result = await axios.post("http://localhost:3001/data", JSON.stringify(pictures))
    //     }
    //     postData();
    // }, [pictures])

    console.log("Part of render")
    

    return (
        <div className='picture-grid'>
            {pictures && pictures.map((data) => {
                return <div key={data._id} className='picture-item'>
                    <img src={data.link} alt='' />
                    <div className='picture-item-lower'>
                        <div className='picture-descript'>
                            <p>{data.descript}</p>
                        </div>
                        
                        <div className='picture-interact'>
                            <ThumbsUp likeArray={data.likeUsers} likeArrayLength={data.likeUsers.length} dispatch={dispatch} picID={data._id} user={user} />
                            <ThumbsDown dislikeArray={data.dislikeUsers} dislikeArrayLength={data.dislikeUsers.length} dispatch={dispatch} picID={data._id} user={user} />
                        </div>
                    </div>
                    
                </div>
            })}
        </div>
        
    )
}
