import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react'
import Router from 'next/router'
import useToken from '../hooks/useToken';
import useUser from '../hooks/useUser';
import {Button, TextField, Card, CardContent, Box, Alert, Typography} from '@mui/material'

const Login = () => {

    const [token, setToken] = useToken()
    const [user, setUser] = useUser()
    const email = useRef()
    const [error, setError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const password = useRef()


    const login = () => {
      const options = {
        method: 'POST',
        url: '/api/login',
        data: {email: email.current.value, password: password.current.value}
      };
      axios.request(options).then(function (response) {
        setToken(response.data.token)
        setUser(response.data.user)   
        Router.push('/subjects')
      }).catch(function (error) {
        if(error.response.status === 403){
          setError('Usuario o contraseña incorrectos')
        }else{
          setError('Ocurrió un problema inesperado')
        }
      });
    }

    const checkForm = (e) => {

        e.preventDefault();
        const emailInput = email.current.value
        const passwordInput = password.current.value
        let emailError = ''
        let passwordError = ''

        if(!emailInput){
          emailError ='Correo electrónico obligatorio'
        }

        if(!passwordInput){
          passwordError ='Contraseña obligatoria'
        }

        if(!emailError && !passwordError) {
          login()
        }

        setEmailError(emailError)
        setPasswordError(passwordError)
    }

    
  return (
    <Card sx={{ maxWidth: 600, m: 'auto' }}>

        <Typography textAlign='center' variant='h5' fontWeight='medium' sx={{py:3}}>Maratón de Conocimientos</Typography>
        <form onSubmit={checkForm}>
          <Box sx={{
            display: 'flex', 
            flexDirection: 'column', 
            gap: 4, 
            px:8,
            py:5, 
            background: (theme) => theme.palette.grey[100]
          }}>
          {error && <Alert severity="error">{error}</Alert>}
          <Typography textAlign='center' variant='subtitle2' color={theme => theme.palette.text.secondary}>Inicia sesión con tus credenciales</Typography>
            <TextField 
              error={!!emailError}  
              helperText={emailError} 
              type="text" 
              label='Correo Electrónico' 
              id="email" 
              inputRef={email}
            />
            <TextField 
              error={!!passwordError}  
              helperText={passwordError} 
              type="password" 
              label='Contraseña' 
              id="password" 
              inputRef={password}
            />
            <Button type="submit" variant='contained' size='large'>INICIAR SESIÓN</Button>
            <Typography textAlign='center' variant='subtitle2' color={theme => theme.palette.text.secondary}>¿Aún no tienes una cuenta? <a href="#">Registrate aquí</a> </Typography>
     
          </Box>
        </form>
    </Card>
   
  )
}

export default Login