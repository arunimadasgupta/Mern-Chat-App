import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";


const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckbox = (gender) => {
    setUser({ ...user, gender });
  }
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      const res = await axios.post('http://localhost:8080/api/v1/user/register', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "",
    })
  }

  return (
    <div className="min-w-96 mx-auto">
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100'>
        <h1 className='text-3xl font-bold text-center text-gray-900'>Sign Up</h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-950'>Full Name</span>
            </label>
            <input
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className='w-full input input-bordered h-10 bg-white text-black'
              type="text"
              placeholder='Full Name' />
          </div>
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
          <div>
            <label className='label p-2'>
              <span className='text-base label-text text-gray-950'>Confirm Password</span>
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              className='w-full input input-bordered h-10 bg-white text-black'
              type="password"
              placeholder='Confirm Password' />
          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center text-gray-950 mx-14'>
              <p>Male</p>
              <input
                type="checkbox"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox checkbox-success mx-2 bg-slate-300" />
            </div>
            <div className='flex items-center text-gray-950'>
              <p>Female</p>
              <input
                type="checkbox"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox checkbox-success mx-2 bg-slate-300" />
            </div>
          </div>
          <div>
            <button type="submit" className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>
          <br></br>
          <div className='w-full mx-auto text-gray-800 text-center'>
            <p className='text-center text-black'><Link to="/login">Already have an account? Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup