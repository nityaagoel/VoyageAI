import React from 'react';
import Header from '../custom/header.jsx';
import { Toaster } from '../ui/sonner.jsx';

function Layout({ children }) {
  return (
    <>
      <Header />
      <Toaster />
      <main>{children}</main>
    </>
  );
}

export default Layout;
