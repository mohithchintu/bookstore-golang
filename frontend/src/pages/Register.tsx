import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        username: '',
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
            username: '',
            email: '',
            password: '',
        });
    };

    return (
        <div className='flex items-center justify-center'>
            <div className='flex flex-col items-center p-8 rounded-lg shadow-md w-96 bg-sky-50'>
                <p className='text-4xl font-bold mb-6'>Register</p>
                <form className='flex flex-col w-full' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block mb-2 text-sm font-semibold' htmlFor='username'>Username</label>
                        <input
                            type='text'
                            id='username'
                            name='username'
                            value={formData.username}
                            onChange={handleChange}
                            className='w-full p-2 border border-gray-300 rounded'
                            required
                        />
                    </div>
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
                        Register
                    </button>
                </form>
                <p className='mt-4 text-sm'>
                    Already have an account? <Link to='/login' className='text-blue-600'>Log in</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;