import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './header.css';

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className='container'>
      <div id='main'>
        <div className={`AdminHeader_container ${sidebarOpen ? 'shrink' : ''}`}>
          {!sidebarOpen && (
            <button
              className='w3-button w3-black w3-xlarge'
              onClick={openSidebar}>
              &#9776;
            </button>
          )}
          <div className='w3-container w3-center'>
            <h1>Admin Panel</h1>
          </div>
        </div>
        <div
          className={`w3-sidebar w3-bar-block w3-card w3-animate-left ${
            sidebarOpen ? 'w3-show' : 'w3-hide'
          }`}
          id='mySidebar'>
          <button
            className='w3-bar-item w3-button w3-large'
            onClick={closeSidebar}>
            Close &times;
          </button>

          <Link to='/member-form' className='w3-bar-item w3-button'>
            Member-Form
          </Link>
          <Link to='/link2' className='w3-bar-item w3-button'>
            Link 2
          </Link>
          <Link to='/link3' className='w3-bar-item w3-button'>
            Link 3
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
