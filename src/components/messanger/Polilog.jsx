import React from "react";

import blank from '../../assets/avatar.png'

import '../../style/polilog.css'

const Polilog = ({title, message, count, time, logo, chatId}) => {
    return <div className='polilog'>
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