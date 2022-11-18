import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../store/settings";

const Personal = () => {
    const user = useSelector(({settings}) => settings.user)
    const dispatch = useDispatch()
    const [editKey, setEditKey] = useState('')
    const [value, setValue] = useState('')

    const saveUserData = () => {
        dispatch(updateUser({[editKey]: value}))
        setEditKey('')
        setValue('')
    }

    const editMode = (key) => {
        setEditKey(key)
        setValue(user[key])
    }

    return <div>
        {Object.keys(user).map(key => <div key={`user_personal_${key}`}>
                {key}: {editKey && editKey === key ? 
                            <input value={value} 
                                   onChange={(event) => setValue(event.target.value)}
                                   onBlur={() => saveUserData()}/> : 
                            <span onDoubleClick={() => editMode(key)}>{user[key]}</span>
                    }
            </div>
        )}
    </div>
}

export default Personal