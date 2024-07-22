import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import AddNewAdmin from "./Components/AddNewAdmin";
import AddNewDoctor from "./Components/AddNewDoctor";
import Messages from "./Components/Messages";
import Doctors from "./Components/Doctors";
import Sidebar from "./Components/Sidebar";

import { Context } from "./main";
import axios from "axios";
import "./App.css";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/admin/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };
    fetchUser();
  }, [setIsAuthenticated, setUser]);

  return (
    <>
      <Router>
        {isAuthenticated && <Sidebar />}
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!isAuthenticated ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/addnew"
            element={
              isAuthenticated ? <AddNewAdmin /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/doctor/addnew"
            element={
              isAuthenticated ? <AddNewDoctor /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/messages"
            element={isAuthenticated ? <Messages /> : <Navigate to="/login" />}
          />
          <Route
            path="/doctors"
            element={isAuthenticated ? <Doctors /> : <Navigate to="/login" />}
          />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
