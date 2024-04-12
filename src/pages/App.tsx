import {Outlet} from 'react-router-dom'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from "../components/header/Header";

function App() {
    const location = useLocation();

    useEffect(() => {
        const role = localStorage.getItem('role');
        if (location.pathname === "/" && role === 'admin') {
            localStorage.clear();
        }
    }, [location]);
    return (
        <div className='app'>
            {localStorage["role"] != "admin" && (<Header />)}
            <Outlet />
        </div>
    )
}

export default App
