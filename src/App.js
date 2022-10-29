import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:7001/users`)
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleSubmit = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };

    fetch(`http://localhost:7001/users`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUsers = [...users, data];
        setUsers(newUsers);
      })
      .catch(error => console.error(error))

    e.target.reset();

  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" name='name' placeholder='Name' />
        <br />
        <input type="email" name="email" id="" placeholder='Email' />
        <br />
        <button type="submit">Add User</button>
      </form>

      <h2>User: {users.length}</h2>
      <div>
        {
          users.map(user => <p key={user._id}>{user.name} <br /> {user.email}</p>)
        }
      </div>
    </div>
  );
}

export default App;
