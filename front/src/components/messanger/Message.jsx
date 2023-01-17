import React from "react"
import DateTime from "../../utils/DateTime"

import styles from './Message.module.scss'

const Message = ({text, time, isMy, img = null, title = null, onClick = null}) => {

    const date = new DateTime(time)

    if(img && title && onClick) {
        return <div className={`${styles.message} ${!!isMy ? 'my' : ''}`}>
            <img src={img}/>
            <div className="content">
                <span onClick={() => onClick()}>{title}</span><br/>
                {text} - {date.format()}
            </div>
        </div>
    }

    return <div className={`${styles.message} ${!!isMy ? 'my' : ''}`}>
        {text} - {date.format()}
    </div>
}

export default Message