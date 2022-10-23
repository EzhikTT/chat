import React from "react";
import { useDispatch } from "react-redux";

import blank from '../../assets/avatar.png'
import { setChatByUser } from "../../store/messanger";

import '../../style/dialogue.css'

const Dialogue = ({userName, message, count, time, avatar, userId}) => {
    const dispatch = useDispatch()

    return <div className='dialogue' onClick={() => dispatch(setChatByUser(userId))}>
        <img src={avatar || blank}/>
        <div>
            <div>{userName}</div>
            <div>{message}</div>
        </div>
        {count > 0 && <span className='count'>{count}</span>}
        <span className='time'>{time}</span>
    </div>
}

export default Dialogue