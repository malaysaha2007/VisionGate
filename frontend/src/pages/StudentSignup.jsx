import { GoogleLogin } from "@react-oauth/google";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import "../styles/studentSignup.css";

import Footer from "../components/Footer";

function StudentSignup() {

  const navigate = useNavigate();

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

    <div className="student-signup-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="page-top">

        <div className="header-left">

          <img
            src="/student_logo.png"
            alt="logo"
          />

        </div>

        <div className="header-center portal-name">

          <h1>

            Student Registration

          </h1>

          <p>

            Register Using Your
            Institute Google Account

          </p>

        </div>

      </div>

      {/* =========================
          SIGNUP BOX
      ========================= */}

      <div className="signup-box">

        <h2>

          Continue with Google

        </h2>

        <p className="signup-text">

          Only
          {" "}
          <strong>

            @iiitdmj.ac.in

          </strong>
          {" "}
          email IDs are allowed

        </p>

        {/* GOOGLE LOGIN */}

        <div className="google-btn-wrapper">

          <GoogleLogin

            onSuccess={
              handleGoogleSuccess
            }

            onError={
              handleGoogleError
            }

          />

        </div>

      </div>

      {/* =========================
          FOOTER
      ========================= */}

      <Footer />

    </div>

  );

}

export default StudentSignup;