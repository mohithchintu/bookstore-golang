import React from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
    name: string;
    link: string;
}

const NavBar: React.FC = () => {
    const navitems: NavItem[] = [
        { name: 'Home', link: '/' },
        { name: 'Books', link: '/books' },
        { name: 'Add Book', link: '/add' },
        { name: 'Manage Book', link: '/update' }
    ];

    return (
        <div className="flex items-center justify-between py-2 border-b shadow-sm px-5 h-16">
            <Link to="/" className="flex items-center justify-between space-x-4">
                <h1>Logo</h1>
            </Link>

            <div className='flex items-center justify-center space-x-4'>
                {navitems.map((item, index) => (
                    <Link to={item.link} key={index} className='hover:underline'>{item.name}</Link>
                ))}
            </div>

            <div>

            </div>
        </div>
    );
};

export default NavBar;