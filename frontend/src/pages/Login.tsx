import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("foo")
        setFormData({
            email: '',
            password: '',
        });
    };

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center p-8 rounded-lg shadow-md w-96 bg-sky-50'>
                <p className='text-4xl font-bold mb-6'>Log In</p>
                <form className='flex flex-col w-full' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block mb-2 text-sm font-semibold' htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block mb-2 text-sm font-semibold' htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={formData.password}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition duration-150'
                    >
                        Log In
                    </button>
                </form>
                <p className='mt-4 text-sm'>
                    Don't have an account? <Link to='/register' className='text-blue-600'>Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;