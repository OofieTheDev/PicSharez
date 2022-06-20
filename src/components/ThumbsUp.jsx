import { ACTIONS } from "../pages/Pictures";

export default function ThumbsUp(props) {

    function like() {
        props.dispatch({ type: ACTIONS.LIKE_POST, payload: {id: props.picID, user: props.user}})
    }

    return (
        <>
            {props.likeArray.includes(props.user) && <><p className='count'>{props.likeArrayLength}</p><i className="fas fa-thumbs-up post-icon" onClick={like}></i></>}
            {!props.likeArray.includes(props.user) && <><p className='count'>{props.likeArrayLength}</p><i className="far fa-thumbs-up post-icon" onClick={like}></i></>}
        </>
    )
}