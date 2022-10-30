import axios from 'axios';
import React, {useEffect, useState} from 'react'
import useToken from '../../hooks/useToken';
import useUser from '../../hooks/useUser';

const Subjects = () => {
    const [token] = useToken()
    const [user] = useUser()
    const [subjects, setSubjects] = useState([])
    useEffect(() => {
        if(token){
            const options = {
                url: `/api/subjects/${user.id}`,
                headers: {
                    'token': token,},
                data: {
                    token
                }
            }
            axios.request(options).then(({data}) => setSubjects(data.subjects))
        }
    }, [token]);

  return (
    <>
        <h1>Asignaturas:</h1>
        <ul>
            {subjects.map(({id, name}) => <li key={id}>{name}</li> )}
        </ul>
    </>
  )
}

export default Subjects