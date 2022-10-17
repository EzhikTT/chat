import React from "react";

import avatar from '../../assets/avatar.png'

import '../../style/dialogue.css'

const Dialogue = ({userName, message, count, time}) => {
    // useSelector(store => store)
    return <div className='dialogue'>
        <img src={avatar}/>
        <div>
            <div>{userName}</div>
            <div>{message}</div>
        </div>
        {count > 0 && <span className='count'>{count}</span>}
        <span className='time'>{time}</span>
    </div>
}

export default Dialogue