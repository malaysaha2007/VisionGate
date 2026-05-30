import { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [level, setLevel] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    if (loading) return;

    try {

      setLoading(true);

      const response = await API.post(
        "/admin/login",
        {
          username,
          password,
          level
        }
      );

      alert(
        response.data.message
      );

      navigate(
        "/admin-dashboard",
        {
          state: {
            admin:
              response.data.admin
          }
        }
      );

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Login Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <>
    
      <Navbar />

      <div className="admin-login-page">

        <div className="page-top">

          <div className="header-left">

            <img
              src="/student_logo.png"
              alt="logo"
            />

          </div>

          <div className="portal-name">

            <h1>
              Administration Portal
            </h1>

            <p>
              Manage Students, Logs &
              Curfew System
            </p>

          </div>

        </div>

        <div className="login-container">

          <h2>
            Administration Login
          </h2>

          <form
            onSubmit={handleLogin}
          >

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              required
            />

            <select
              value={level}
              onChange={(e) =>
                setLevel(
                  e.target.value
                )
              }
              required
            >

              <option value="">
                Select Access Level
              </option>

              <option value="Director">
                Director
              </option>

              <option value="Dean Academic">
                Dean Academic
              </option>

              <option value="Guard">
                Guard
              </option>

            </select>

            <button
              type="submit"
              disabled={loading}
            >

              {
                loading
                  ? "Logging In..."
                  : "Login"
              }

            </button>

          </form>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default AdminLogin;