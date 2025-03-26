import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails';
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import loginpage from '../assets/loginpage.png'

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const validInput = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios({ ...SummaryApi.login, data });
            if (response.data.error) toast.error(response.data.message);
            if (response.data.success) {
                toast.success(response.data.message);
                localStorage.setItem('accesstoken', response.data.data.accesstoken);
                localStorage.setItem('refreshToken', response.data.data.refreshToken);
                const userDetails = await fetchUserDetails();
                dispatch(setUserDetails(userDetails.data));
                setData({ email: "", password: "" });
                navigate("/");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <div className='w-full h-screen flex flex-col md:flex-row'>
            <div className='w-full md:w-1/2 flex justify-center items-center bg-white px-6 md:px-10'>
                <div className='max-w-md w-full'>
                    <h2 className='text-2xl md:text-3xl font-bold mb-4'>Welcome back</h2>
                    <p className='text-gray-600 mb-6'>Please enter your details</p>
                    <form className='grid gap-4' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='email'>Email address</label>
                            <input type='email' id='email' className='w-full p-2 border rounded bg-blue-100' name='email' value={data.email} onChange={handleChange} placeholder='Enter your email' />
                        </div>
                        <div>
                            <label htmlFor='password'>Password</label>
                            <div className='w-full p-2 border rounded flex items-center bg-blue-100'>
                                <input type={showPassword ? "text" : "password"} id='password' className='w-full outline-none' name='password' value={data.password} onChange={handleChange} placeholder='Enter your password' />
                                <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </div>
                            </div>
                            <Link to="/forgot-password" className='block text-right text-[#2cb8cb] hover:text-[#5dbcc8] mt-1'>Forgot password?</Link>
                        </div>
                        <button disabled={!validInput} className={`w-full py-2 rounded text-white font-semibold tracking-wide ${validInput ? "bg-[#2cb8cb] hover:bg-[#5dbcc8]" : "bg-gray-500"}`}>Sign in</button>
                        <button className='w-full py-2 rounded border flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100'>
                            <img src='/google-icon.svg' alt='Google' className='w-5 h-5' /> Sign in with Google
                        </button>
                    </form>
                    <p className='mt-4 text-center'>Don't have an account? <Link to='/register' className='text-[#2cb8cb] font-semibold hover:text-[#5dbcc8]'>Sign up</Link></p>
                </div>
            </div>
            <div className='w-full md:w-1/2 bg-[#b2ebf2] flex justify-center items-center'>
                <img src={loginpage} alt='Illustration' className='max-w-xs md:max-w-sm' />
            </div>
        </div>
    );
};

export default Login;
