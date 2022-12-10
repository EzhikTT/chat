import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from '../../store/main'
import { setUser } from "../../store/settings";
import { useNavigate } from "react-router-dom";

const LogIn = () => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = async (event) => {
        event.preventDefault()
        const raw = await fetch('http://localhost:8888/login', {
            method: 'post',
            body: JSON.stringify({
                login, password
            })
        })
        const data = await raw.json()
        console.log('login', data)
        if(data.token) {
            dispatch(setToken(data.token))
            const raw = await fetch('http://localhost:8888/users/self', {
                headers: {
                    'authorization': data.token
                }
            })
            const user = await raw.json()
            dispatch(setUser(user))
            navigate('/messanger')
        }
        else {
            new Throw()
        }
    }

   return <form onSubmit={(e) => submit(e)}>
        <label>
            <span>login</span>
            <input type="text" value={login} onChange={e => setLogin(e.target.value)}/>
        </label>
        <label>
            <span>password</span>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button>log in</button>
   </form> 
}

export default LogIn