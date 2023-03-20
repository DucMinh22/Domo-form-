import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('yes');

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    AddTask(data)
    console.log(data)
  };

  console.log(watch("example"));

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://localhost:5000/users-array')
      const data = await res.json()
      console.log(data);
      setUsers(data);
    }
    fetchData();
  }, [])


  const AddTask = async (newUser) => {
    const res = await fetch('http://localhost:5000/users-array', 
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(newUser)
    })
    const data = await res.json()
    console.log(data, 'dt')
  }

  const handleChange = event => {
    setSelected(event.target.value);
  };
  return (
    <div className="App">
      <h1>hello Du</h1>
      <h3>
        {users.map((user, index) => (
          <div key={index}>
              {user.name}
              <p>{user.guests}</p>
          </div>
        ))}
      </h3>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Tên" defaultValue="test" {...register("name")} />
        
        <input placeholder="Đi cùng file đính kèm" {...register("guests", { required: true })} />
        {errors.exampleRequired && <span>This field is required</span>}
        
        <input
          type="radio"
          id="yes"
          name="choose"
          value="yes"
          {...register("accepted")}
          checked={selected === 'yes'}
          onChange={handleChange}
        />
        <label htmlFor="yes">mình sẽ tới nha</label>

        <input
          type="radio"
          id="no"
          name="choose"
          value="no"
          {...register("accepted")}
          onChange={handleChange}
          checked={selected === 'no'}
        />
        <label htmlFor="no">Mình không tới được rồi</label>
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
