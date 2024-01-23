import './Header.scss'
import {NavLink, useNavigate} from "react-router-dom";
import SeekerLoginForm from "../login/SeekerLoginForm";
import {useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBell, faUser} from "@fortawesome/free-solid-svg-icons";

function Header() {
    const navigate = useNavigate();
    const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [role, setRole] = useState(null);

    useEffect(() => {
        setToken(localStorage.getItem('token'));
    });

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setRole(decodedToken.role);
            } catch (error) {
                console.error('Error decoding token:', error.message);
            }
    } else {
            setRole(null);
        }}, [token]);

    const handleLogout = () => {
        localStorage.clear();
        setToken(null);
        navigate('/');
    };

    return (
        <div className='headerClass'>
            <div>
              <header className='firstHeader'>
                  <p className='headerText' style={{ fontSize: '1.5em' }}>У лавах</p>
                  <div className='rightSeekerData'>
                  {role == 'seeker' && (<div className='rightSeekerData'>
                      <NavLink to='/notification' className='headerText' >
                          <FontAwesomeIcon icon={faBell} />
                      </NavLink>
                      <NavLink to={`/seeker/data/${localStorage.id}`} className='headerText' >
                          <FontAwesomeIcon icon={faUser} />
                      </NavLink>
                  </div>)}
                      {token ?  <p className='headerText' onClick={handleLogout}>Вийти</p> : <p className='headerText' onClick={() => setIsLoginFormVisible(true)}>Увійти</p>}
                  </div>
              </header>
            </div>
            <div>
            <header className='secondHeader'>
                <NavLink to='/' className='headerText'>Вакансії</NavLink>
                <NavLink to='/companies' className='headerText'>Підрозділи</NavLink>
                <NavLink to='/contacts' className='headerText'>Контакти</NavLink>
                {role == 'seeker' &&
                    (<>
                        <NavLink to='/requests' className='headerText' >Заявки</NavLink>
                        <NavLink to='/cv' className='headerText' >Резюме</NavLink>
                        </>)}

            </header>
            </div>
            <SeekerLoginForm trigger={isLoginFormVisible} setTrigger={setIsLoginFormVisible} setToken={setToken}/>
        </div>
    )
}

export default Header
