import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch= useDispatch();
  const navigate = useNavigate();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const res = await axios.post('http://localhost:8080/api/v1/user/login', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      navigate("/");
      dispatch(setAuthUser(res.data));

    }
    catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      username: "",
      password: "",
    })
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-gray-900'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-950'>User Name</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full input input-bordered h-10 bg-white text-black'
              type="text"
              placeholder='User Name' />
          </div>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-950'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full input input-bordered h-10 bg-white text-black'
              type="password"
              placeholder='Password' />
          </div>
          <br></br>
          <div>
            <button type="submit" className='btn btn-block btn-sm mt-2 border border-slate-700'>Login</button>
          </div>
          <br></br>
          <div className='w-full mx-auto text-gray-800 text-center'>
            <p className='text-center text-black'><Link to="/signup">Don't have an account? Sign Up</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login