import React from "react";
import { useState } from "react";

const Main = () => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [errors, setErrors] = useState([])

    const submit = (event) => {
        event.preventDefault()
        setErrors([])
        const err = []
        if(!login || login.length > 15 || login.length < 4 || !([...login].some(char => Number.isInteger(parseInt(char))))){
            err.push('login is incorrect')
        }
        if(!pass || pass.length < 8){
            err.push('pass is incorrect')
        }
        setErrors([...err])
    }

    return <form onSubmit={event => submit(event)}>
        {errors.length > 0 && errors.map(error => <div style={{color: 'red'}}>{error}</div>)}
        <label>
            <span>login</span>
            <input name="login" onChange={(event) => setLogin(event.target.value)}/>
        </label>
        <label>
            <span>password</span>
            <input name="password" type="password" onChange={(event) => setPass(event.target.value)}/>
        </label>
        <button>login</button>
    </form>
}

export default Main