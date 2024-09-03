import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Layout() {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Rohit Mahadik", email: "rohitmahadik@gmail.com" });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081")
      .then((response) => {
        if (response.data.Status === "Success") {
          setAuth(true);
          console.log(response.data.name, response.data.email);
          setUser({ name: response.data.name, email: response.data.email });
        } 
        else {
          setAuth(false);
          setUser({});
          console.log(response.data.Status);
          navigate("/login");
        }
      })
      .catch((error) => console.log(error));
  }, [navigate]);

  console.log(auth);

  return (
    <>
      <Header user={user} />
      <Outlet />
      <Footer />
    </>
  );
}
