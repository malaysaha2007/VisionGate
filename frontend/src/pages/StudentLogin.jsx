import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import API from "../services/api";
import "../styles/StudentLogin.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import StudentPortalHeader from "../components/StudentPortalHeader";


function StudentLogin() {

  const navigate = useNavigate();   
  const [studentid, setStudentid] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

const response = await API.post("/student/login", {
  studentid,
  password,
});

localStorage.clear();

localStorage.setItem(
  "roll_no",
  response.data.roll_no
);

localStorage.setItem(
  "role",
  "student"
);

localStorage.setItem(
  "roll_no",
  response.data.roll_no
);

navigate("/StudentProfile");

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.detail ||
        "Login failed"
      );
    }
  };

   const handleGoogleSuccess = async (

    credentialResponse

  ) => {

    try {

      const token =
        credentialResponse.credential;

      const response = await API.post(

        "/student/google-login",

        {
          token
        }

      );

      const data = response.data;

      alert(data.message);

      // =========================
      // REDIRECT LOGIC
      // =========================

      if (

        data.redirect ===
        "face_registration"

      ) {

        navigate(

          "/face-registration",

          {
            state: {

              student:
                data.student

            }
          }

        );

      } else {

        navigate(

          "/StudentProfile",

          {
            state: {

              student:
                data.student

            }
          }

        );

      }

    } catch (error) {

      console.error(error);

      alert(

        error.response?.data?.detail ||

        "Google Login Failed"

      );

    }

  };

  const handleGoogleError = () => {

    alert(

      "Google Authentication Failed"

    );

  };



  return (
    <div className="student-login-page">


    <Navbar />
    <StudentPortalHeader showProfile={false} />

     
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

            <div className="password-wrapper">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <span
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword
                  ? <FaEyeSlash />
                  : <FaEye />}
              </span>

            </div>

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
    type="button"
    className="forgot-btn"
    onClick={() => navigate("/reset-password")}
  >
    Forgot Password
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
        <div className="or-divider">
  <span>OR</span>
</div>

<div className="google-signup-section">

  <p>
    New Student Registration
  </p>

  <div className="google-btn-wrapper">

    <GoogleLogin
      onSuccess={handleGoogleSuccess}
      onError={handleGoogleError}
    />

  </div>

</div>

      </div>

      {/* FOOTER */}
      <Footer/>

    </div>
  );
}

export default StudentLogin;