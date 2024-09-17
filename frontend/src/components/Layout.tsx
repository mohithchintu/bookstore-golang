import React from 'react'
import NavBar from './NavBar'

type layoutProps = {
    children: React.ReactNode
}

const Layout: React.FC<layoutProps> = ({ children }) => {
    return (
        <div className="font-sans">
            <NavBar />
            <main className='p-5 min-h-screen'>
                {children}
            </main>
        </div>
    )
}

export default Layout
