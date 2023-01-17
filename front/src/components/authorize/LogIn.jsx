import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from '../../store/main'
import { setUser } from "../../store/settings";
import { useNavigate } from "react-router-dom";

import styles from './LogIn.module.scss'

const LogIn = () => {

    const refLoginInput = useRef()
    const refSubmitButton = useRef()

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        refLoginInput.current.focus()
    }, [])

    useEffect(() => {
        if(login && password) {
            refSubmitButton.current.disabled = false
        }
        else {
            refSubmitButton.current.disabled = true
        }
    }, [login, password])

    const submit = async (event) => {
        event.preventDefault()
        const raw = await fetch('http://localhost:8888/login', {
            method: 'post',
            body: JSON.stringify({
                login: 'newuser1', 
                password: 'newuser1'
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

   return <form onSubmit={(e) => submit(e)} className={styles.form}>
        <label>
            <span>login</span>
            <input autoComplete="false" type="text" value={login} onChange={e => setLogin(e.target.value)} ref={refLoginInput}/>
        </label>
        <label>
            <span>password</span>
            <input autoComplete="false" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button ref={refSubmitButton} disabled>log in</button>
   </form> 
}

export default LogIn