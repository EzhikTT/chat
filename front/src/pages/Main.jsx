import React from "react";
import { useState } from "react";
import { useEffect } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SignIn from "../components/authorize/SignIn.jsx";
import LogIn from "../components/authorize/LogIn.jsx";
import { setToken } from '../store/main'

import styles from './Main.module.scss'

const Main = () => {
    // const [login, setLogin] = useState('')
    // const [pass, setPass] = useState('')
    // const [errors, setErrors] = useState([])

    // const dispatch = useDispatch()
    // const navigate = useNavigate()

    // const submit = async (event) => {
    //     event.preventDefault()
    //     setErrors([])
    //     const err = []
    //     if(!login || login.length > 15 || login.length < 4 || !([...login].some(char => Number.isInteger(parseInt(char))))){
    //         err.push('login is incorrect')
    //     }
    //     if(!pass || pass.length < 4){
    //         err.push('pass is incorrect')
    //     }
    //     if(err.length === 0){
    //         try{
    //             const rawData = await fetch('http://localhost:8888/login', {
    //                 method: 'post', 
    //                 body: JSON.stringify({
    //                     login,
    //                     password: pass
    //                 })
    //             })
    //             const data = await rawData.json()
    //             console.log('data', data)
    //             if(data.token){
    //                 dispatch(setToken(data.token))
    //                 navigate('/messanger')
    //             }
    //             else {
    //                 new Throw()
    //             }
    //         }
    //         catch(e) {
    //             err.push('login or pass is incorrect')
    //         }
    //     }
    //     setErrors([...err])
    // }

    const [form, setForm] = useState('login')

    return <div className={styles.wrapper}>
        <div className={styles.body}>
            {/* <div> */}
                {/* <video autoPlay controls src={video}> */}
                {/* </video> */}
            {/* </div> */}

            {form === 'login' && <LogIn/>}
            {form === 'signin' && <SignIn/>}

            <div className={styles.buttons}>
                <span onClick={() => setForm('login')}>log in</span> 
                <span onClick={() => setForm('signin')}>sign in</span>
            </div>
        </div>
    </div>

    // return <form onSubmit={event => submit(event)}>
    //     {errors.length > 0 && errors.map((error, id) => <div key={`error_${id}`} style={{color: 'red'}}>{error}</div>)}
    //     <label>
    //         <span>login</span>
    //         <input name="login" onChange={(event) => setLogin(event.target.value)}/>
    //     </label>
    //     <label>
    //         <span>password</span>
    //         <input name="password" type="password" onChange={(event) => setPass(event.target.value)}/>
    //     </label>
    //     <button>login</button>

        
    // </form>
}

export default Main