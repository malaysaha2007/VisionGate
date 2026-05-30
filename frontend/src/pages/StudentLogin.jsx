import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "../styles/StudentLogin.css";
import Footer from "../components/Footer";

function StudentLogin() {

  const navigate = useNavigate();   
  const [studentid, setStudentid] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await API.post("/student/login", {
        studentid,
        password,
      });
navigate("/StudentProfile", {
  state: {
    student: response.data.student
  }
});

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Login failed"
      );
    }
  };

  return (
    <div className="student-login-page">

      {/* TOP AREA */}
      <div className="page-top">

        <div className="header-left">
          <img
            src="/student_logo.png"
            alt="logo"
          />
        </div>

        <div className="header-center portal-name">

          <h1>Student Portal</h1>

          <p>
            Access Your Profile & Activity Logs
          </p>

        </div>

      </div>

      {/* LOGIN BOX */}
      <div className="login-box">

        <h2>Student Login</h2>

        <form onSubmit={handleLogin} autoComplete="off">

          <label>Student ID</label>

          <input
            type="text"
            placeholder="e.g. 24BCS137"
            value={studentid}
            onChange={(e) => setStudentid(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="actions">

            <button
              type="reset"
              className="reset"
              onClick={() => {
                setStudentid("");
                setPassword("");
              }}
            >
              Reset
            </button>

            <button
              type="submit"
              className="login"
            >
              Login
            </button>

          </div>

        </form>

        {/* SIGNUP */}
        <div className="signup-link">

          <Link to="/student-signup">
            Sign Up for New Student
          </Link>

        </div>

      </div>

      {/* FOOTER */}
      <footer>
        <h4>
          &copy; 2026 Student Portal.
          All Rights Reserved.
        </h4>
      </footer>

    </div>
  );
}

export default StudentLogin;