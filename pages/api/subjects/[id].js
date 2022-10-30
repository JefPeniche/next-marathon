import axios from "axios";

export default function subjects(req, response) {
    const { token } = req.headers
    const { id } = req.query
    const options = {
        method: 'GET',
        url: 'http://localhost:3002/api/subjects/',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`
        },
        data: {created_by: id}
      };
      
      axios.request(options).then(function (res) {
        response.statusCode = 200
        response.setHeader('Content-type', 'application/json')
        response.end(JSON.stringify(res.data))
      }).catch(function (error) {
        response.statusCode = error.status || 500
        response.end(JSON.stringify({ message: error.error || 'Unknown' }))
      });
  }
  