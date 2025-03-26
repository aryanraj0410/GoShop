import React, { useState } from 'react';
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import registerpage from '../assets/registerpage.png'

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validValue = Object.values(data).every(el => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("Password and confirm password must be same");
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.register,
                data: data
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                navigate("/login");
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    return (
        <section className='w-full h-screen flex'>
            <div className='w-1/2 bg-[#b2ebf2] flex items-center justify-center'>
                <img src= {registerpage} alt='Register Illustration' className='max-w-xs md:max-w-sm' />
            </div>
            <div className='w-1/2 flex items-center justify-center'>
                <div className='bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
                    <h2 className='text-2xl font-bold mb-6 text-center'>Create an Account</h2>
                    <form className='grid gap-4' onSubmit={handleSubmit}>
                        <div className='grid gap-1'>
                            <label htmlFor='name'>Name:</label>
                            <input
                                type='text'
                                id='name'
                                className='bg-blue-50 p-2 border rounded outline-none focus:border-[#2cb8cb] w-full'
                                name='name'
                                value={data.name}
                                onChange={handleChange}
                                placeholder='Enter your name'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='email'>Email:</label>
                            <input
                                type='email'
                                id='email'
                                className='bg-blue-50 p-2 border rounded outline-none focus:border-[#2cb8cb] w-full'
                                name='email'
                                value={data.email}
                                onChange={handleChange}
                                placeholder='Enter your email'
                            />
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='password'>Password:</label>
                            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#2cb8cb]'>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id='password'
                                    className='w-full outline-none'
                                    name='password'
                                    value={data.password}
                                    onChange={handleChange}
                                    placeholder='Enter your password'
                                />
                                <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </div>
                            </div>
                        </div>
                        <div className='grid gap-1'>
                            <label htmlFor='confirmPassword'>Confirm Password:</label>
                            <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-[#2cb8cb]'>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id='confirmPassword'
                                    className='w-full outline-none'
                                    name='confirmPassword'
                                    value={data.confirmPassword}
                                    onChange={handleChange}
                                    placeholder='Confirm your password'
                                />
                                <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                                    {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                </div>
                            </div>
                        </div>
                        <button disabled={!validValue} className={`${validValue ? "bg-[#2cb8cb] hover:bg-[#63c2cf]" : "bg-gray-500"} text-white py-2 rounded font-semibold tracking-wide`}>Register</button>
                    </form>
                    <p className='mt-4 text-center'>
                        Already have an account? <Link to="/login" className='font-semibold text-[#2cb8cb] hover:text-[#63c2cf]'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Register;