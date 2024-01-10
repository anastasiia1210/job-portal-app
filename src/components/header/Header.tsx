import './Header.scss'
import {NavLink} from "react-router-dom";
function Header() {

    return (
        <>
            <div>
              <header className='firstHeader'>
                  <p className='headerText' style={{ fontSize: '1.5em' }}>У лавах</p>
                  <p className='headerText'>Увійти</p>
              </header>
            </div>
            <div>
            <header className='secondHeader'>
                <NavLink to='/' className='headerText'>Вакансії</NavLink>
                <NavLink to='/companies' className='headerText'>Підрозділи</NavLink>
                <NavLink to='/contacts' className='headerText'>Контакти</NavLink>
            </header>
            </div>
        </>
    )
}

export default Header
