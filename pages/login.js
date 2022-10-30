import axios from 'axios';
import React, {useEffect, useRef} from 'react'
import useToken from '../hooks/useToken';
import useUser from '../hooks/useUser';

const Login = () => {

    const [token, setToken] = useToken()
    const [user, setUser] = useUser()
    const email = useRef()
    const password = useRef()

    const handlerSubmit = (e) => {
        e.preventDefault();
        const options = {
            method: 'POST',
            url: '/api/login',
            data: {email: email.current.value, password: password.current.value}
          };
          axios.request(options).then(function (response) {
            setToken(response.data.token)
            setUser(response.data.user)
          }).catch(function (error) {
            console.error(error);
          });
    }
  return (
    <form onSubmit={handlerSubmit}>
        <input type="text" name="" id="name" ref={email}/>
        <input type="text" name="" id="password" ref={password}/>
        <input type="submit" value="INICIAR SESIÓN"/>
    </form>
  )
}

export default Login