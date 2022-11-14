import React from "react";
import { useDispatch } from "react-redux";
import { setChatById } from "../../store/messanger";
import blank from '../../assets/avatar.png'

import '../../style/polilog.css'

const Polilog = ({title, message, count, time, logo, chatId}) => {
    const dispatch = useDispatch()

    return <div className='polilogue' onClick={() => dispatch(setChatById(chatId))}>
        <img src={logo || blank}/>
        <div>
            <div>{title}</div>
            <div>{message}</div>
        </div>
        {count > 0 && <span className='count'>{count}</span>}
        <span className='time'>{time}</span>
    </div>
}

export default Polilog