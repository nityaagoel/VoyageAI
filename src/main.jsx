import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App.jsx';
import CreateTrip from './create-trip/index.jsx';
import ViewTrip from './view-trip/[tripId]/index.jsx';
import MyTrips from './my-trips/index.jsx';
import Layout from './components/layout/Layout.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><App /></Layout>,
  },
  {
    path: '/create-trip',
    element: <Layout><CreateTrip /></Layout>,
  },
  {
    path: '/view-trip/:tripId',
    element: <Layout><ViewTrip /></Layout>,
  },
  {
    path: '/my-trips',
    element: <Layout><MyTrips /></Layout>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OUTH_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
