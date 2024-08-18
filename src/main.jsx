import React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Router, RouterProvider } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contact/Contact.jsx'
import { Route } from 'react-router-dom'
import User from './components/User/User.jsx'
import GitHub, { GitHubInfo } from './components/GitHub/GitHub.jsx'
import ContactsPage from './components/ContactsPage/ContactsPage.jsx'

//1st way to rout pages
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout/>,
//     children:[
//       {
//         path:"",
//         element:<Home/>
//       },
//       {
//         path:"About",
//         element:<About/>
//       },
//       {
//         path:"Contact",
//         element:<Contact/>
//       }
//     ]
//   }
// ])

//2nd way 
// we can also make childrens also nested inside
const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path='/' element={<Layout/>}>
          <Route path="" element={<Home/>}/>
          <Route path="About" element={<About/>}/>
          <Route path="Contact" element={<Contact/>}/>
          <Route path="User/:id" element={<User/>}/>
          
          <Route  loader={GitHubInfo}
          path="GitHub" 
          element={<GitHub/>}/>
          <Route path="Contactspage" element={<ContactsPage/>}/>
      </Route>
  )
) 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
