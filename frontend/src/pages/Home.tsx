import React from "react"
import { Link } from "react-router-dom"


const Home: React.FC = () => {
    return (
        <div className="space-y-4">
            <h1 className="flex text-4xl font-bold justify-center">Hello User, Welcome</h1>
            <p className="flex justify-center text-lg pb-5">Books are there If u want to see what books visit books</p>
            <Link to='/books' className="flex justify-center text-white mt-5 bg-blue-600 px-4 py-2 rounded-md mx-5">Books</Link>
        </div>
    )
}

export default Home
