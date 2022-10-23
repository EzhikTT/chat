import React from "react"

const Message = ({text, time, isMy}) => {
    return <div className={!!isMy ? 'my' : ''}>
        {text} - {time}
    </div>
}

export default Message