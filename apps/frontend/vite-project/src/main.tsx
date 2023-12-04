import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//import App from './App.tsx'
import './index.css'
import SignUp from "./routes/signup";
import Login from "./routes/login";
import Home from "./routes/home";


const router = createBrowserRouter([
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
