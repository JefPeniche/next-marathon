import axios from "axios";

export default function login(request, response) {
    
    const { email, password } = request.body
    if(email && password){
        const options = {
            method: 'POST',
            url: 'http://localhost:3002/api/login/',
            data: {email, password}
          };
          
          axios.request(options).then(function (res) {
            response.statusCode = 200
            response.end(JSON.stringify(res.data))
          }).catch(function ({response : res}) {
            response.statusCode = res.data.status || 500
            response.end(JSON.stringify({ message:  res.data.error || 'Unknown' }))
          });
    }else{
        response.statusCode = 500
        response.end(JSON.stringify({ message: 'email and password are required' }))
    }
};
