import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from '../firebase'
import './Navbar.css';

function Navbar() {
  const [user] = useAuthState(auth);
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <i className='fab fa-typo3' />
            KC LOFT
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            {
              user ? <li className='nav-item'>
                <Link to='/dashboard' className='nav-links' onClick={closeMobileMenu}>
                  Dashboard
                </Link>
              </li>
                :
                <li className='nav-item'>
                  <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                    Home
                  </Link>
                </li>
            }

            <li className='nav-item'>
              <Link
                to='/accessories'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Home Accessories
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/projects'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Projects
              </Link>
            </li>


            {
              !user ? <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Login
              </Link>
            </li>
            :
            <li className='nav-item'>
              <Link
                to='/login'
                className='nav-links'
                onClick={logout}
              >
                Log out
              </Link>
            </li>
            }

            <li>
              <Link to='/contact'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                CONTACT US
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>CONTACT</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;