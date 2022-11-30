import React, {useState} from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setToken } from '../../store/main'

const SignIn = () => {
    const [login, setLogin] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [errors, setErrors] = useState([])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = async (event) => {
        event.preventDefault()
        setErrors([])
        const err = []
        if(!login || login.length > 15 || login.length < 4 || !([...login].some(char => Number.isInteger(parseInt(char))))){
            err.push('login is incorrect')
        }
        if(!pass || pass.length < 4){
            err.push('pass is incorrect')
        }
        if(err.length === 0){
            try{
                const rawData = await fetch('http://localhost:8888/users', {
                    method: 'post', 
                    body: JSON.stringify({
                        login,
                        password: pass,
                        email,
                        name
                    })
                })
                const data = await rawData.json()
                console.log('data', data)
                if(data.token){
                    dispatch(setToken(data.token))
                    navigate('/messanger')
                }
                else {
                    new Throw()
                }
            }
            catch(e) {
                err.push('login or pass is incorrect')
            }
        }
        setErrors([...err])
    }

    return <form onSubmit={event => submit(event)}>
    {errors.length > 0 && errors.map((error, id) => <div key={`error_${id}`} style={{color: 'red'}}>{error}</div>)}
    <label>
        <span>name</span>
        <input name="name" onChange={(event) => setName(event.target.value)} required/>
    </label><br/>
    <label>
        <span>login</span>
        <input name="login" onChange={(event) => setLogin(event.target.value)} required/>
    </label><br/>
    <label>
        <span>email</span>
        <input name="email" type="email" onChange={(event) => setEmail(event.target.value)} required/>
    </label><br/>
    <label>
        <span>password</span>
        <input name="password" type="password" onChange={(event) => setPass(event.target.value)} required/>
    </label><br/>
    <button>signin</button>

    
</form>
}

export default SignIn