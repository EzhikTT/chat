import React from "react"

const Message = ({text, time, isMy, img = null, title = null, onClick = null}) => {

    if(img && title && onClick){
        return <div className={!!isMy ? 'my' : ''}>
            <img src={img}/>
            <div className="content">
                <span onClick={() => onClick()}>{title}</span><br/>
                {text} - {time}
            </div>
        </div>
    }

    return <div className={!!isMy ? 'my' : ''}>
        {text} - {time}
    </div>
}

export default Message