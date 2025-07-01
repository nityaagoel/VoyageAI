// src/components/Layout.jsx
import React from 'react';
import Header from '../custom/header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Header /> {/* or replace with <Navbar /> if that's the intended name */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
