
import { useEffect, useState } from 'react';
import './App.css';
import SERVER_URL from './config/SERVER_URL';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    axios.get(SERVER_URL + '/users').then((res)=>{
      if(res.status===200){
        setUsers(res.data)
      }
    })
  },[])


function handleSubmit(){
  axios.post(SERVER_URL + '/register', {
    username: username,
    password: password
  }).then((res)=>{
    if(res.status===200){
      console.log(res.data)
      setUsers([...users,res.data.user])
      setUsername('')
      setPassword('')
    }
  }).catch((err)=>{
    console.log(err)
  })
}
  return (
    <div className="App">
    <div className="form">
      <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username}/>
      <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
      <button onClick={handleSubmit}>Submit</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Password</th>
        </tr>
      </thead>
      <tbody>
  {users?.map((user) => (
    <tr key={user._id}>
      <td>{user.username}</td>
      <td>{user.password}</td>
    </tr>
  ))}
</tbody>

    </table>
    </div>
  );
}

export default App;
