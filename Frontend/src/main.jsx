import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.jsx'
import Hotels from './pages/Hotels.jsx'
import Hotel_Details from './pages/Hotel_Details.jsx'
import App from './App.jsx'
import UserProfile from './pages/UserProfile.jsx'
import AdminProfile from './pages/AdminProfile.jsx'
import Booking from './pages/Booking.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },

  {
    path: "/Hotels",
    element: <Hotels />,
  },

  {
    path: "/hotel/:id",
    element: <Hotel_Details />,
  },

  {
    path: "/UserProfile",
    element: <UserProfile />
  },

  {
    path: "/AdminProfile",
    element: <AdminProfile />
  },

  {
    path: "/Booking",
    element : <Booking/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App>
      <RouterProvider router={router} />
    </App>
  </React.StrictMode>,
)

