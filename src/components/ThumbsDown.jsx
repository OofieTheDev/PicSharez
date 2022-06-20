import { ACTIONS } from "../pages/Pictures";

export default function ThumbsDown(props) {

    function dislike() {
        props.dispatch({ type: ACTIONS.DISLIKE_POST, payload: {id: props.picID, user: props.user}})
    }
    return (
        <>
            {props.dislikeArray.includes(props.user) && <><p className='count'>{props.dislikeArrayLength}</p><i className="fas fa-thumbs-down post-icon" onClick={dislike}></i></>}
            {!props.dislikeArray.includes(props.user) && <><p className='count'>{props.dislikeArrayLength}</p><i className="far fa-thumbs-down post-icon" onClick={dislike}></i></>}
        </>
    )
}