import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import '../../style/molecules/SliderPanel.css'

const SliderPanel = ({children, isHidden = true, hidePanel, speed = 1, onClosed = () => {}}) => {

    const [translate, setTranslate] = useState(101)
    const [interval, setIntervelState] = useState(null)  

    useEffect(() => {
        if(!isHidden && translate > 0){
            if(!interval){
                setTranslate(translate - getSpeed())
            }
        }
        else if(isHidden && translate < 101){
            if(!interval){
                setTranslate(translate + getSpeed())
            }
        }
    }, [isHidden])

    useEffect(() => {
        if(translate > 0 && translate < 101){
            setIntervelState(
                setTimeout(() => {
                    isHidden ? setTranslate(translate + getSpeed()) : setTranslate(translate - getSpeed())
                }, 100)
            )
        }
        else {
            clearTimeout(interval)
            setIntervelState(null)
        }
        if(translate === 101){
            onClosed()
        }
    }, [translate])

    const getSpeed = () => {
        let res = speed

        if(!isHidden && translate - speed < 0){
            res = translate
        }
        else if(isHidden && translate + speed > 101) {
            res = 101 - translate
        }

        return res
    }

    return <> 
        {!isHidden && <div className="back" onClick={() => hidePanel()}></div>}
        <aside className="slider-panel" style={{'transform': `translateX(${translate}%)`}}>
            {children}
        </aside>
    </>
}

export default SliderPanel;