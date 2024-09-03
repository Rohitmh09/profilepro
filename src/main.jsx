import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Router,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Contact from "./components/Contact/Contact.jsx";
import { Route } from "react-router-dom";
import Register from "./components/Login/Register.jsx";
import SignIn from "./components/Login/SignIn.jsx";
import ViewContacts from "./components/AddContacts/ViewContacts.jsx";
import RegistrationForm from "./components/AddContacts/RegistrationForm.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<Register />} />

      <Route path="login" element={<SignIn />} />

       <Route path="/" element={   <Layout />  }>
        <Route path="" element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="ViewContact" element={<ViewContacts />} />
        <Route path="AddContacts" element={<RegistrationForm />} />

      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
