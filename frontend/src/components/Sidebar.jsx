import React, { useState } from 'react'
import { ImSearch } from "react-icons/im";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

const Sidebar = () => {

    const [search, setSearch] = useState("");
    const {otherUsers} =useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
        }
        catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }
        else{
            toast.error("User Not Found!");
        }
    }
    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-1'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md bg-gray-100'
                    type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-800 text-white'>
                    <ImSearch size='20px' />
                </button>
            </form>
            <div className="divider my-3 py-0 h-2 bg-zinc-600"></div>
            <OtherUsers />
            <div className='mt-5 flex'>
                <button onClick={logoutHandler} className='btn btn-sm mx-24 bg-zinc-800 text-white'>Log Out</button>
            </div>
        </div>
    )
}

export default Sidebar