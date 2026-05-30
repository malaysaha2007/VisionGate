import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  FaSyncAlt,
  FaEnvelope,
  FaFileCsv
} from "react-icons/fa";


import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/AdminDashboard.css";
import "../styles/CurfewMail.css";

function CurfewMail() {

  const navigate = useNavigate();

  const location = useLocation();

  const admin =
    location.state?.admin;

  const [students, setStudents] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const fetchStudents =
    async () => {

      try {

        const response =
          await API.get(
            "/curfew-mail"
          );

        setStudents(
          response.data.students || []
        );

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

  useEffect(() => {

    fetchStudents();

  }, []);
return (
  <>
    <Navbar
      admin={admin}
      showActivityLogs={true}
      showLogout={true}
    />

    <div className="admin-hero">
      <div className="admin-hero-content">
        <div className="admin-hero-icon">
          🎓
        </div>

        <div>
          <h2>
            Administration Portal
          </h2>

          <p>
            Manage Students, Logs &
            Curfew System
          </p>
        </div>
      </div>
    </div>

    

      <div className="stats-grid">

        <div className="stat-card">

          <p>
            Students Outside
          </p>

          <h2>
            {students.length}
          </h2>

        </div>

      </div>

      <div className="table-container">

        <table>

          <thead>

            <tr>

              <th>Name</th>
              <th>Roll</th>
              <th>Hostel</th>
              <th>Room</th>
              <th>Purpose</th>
              <th>Out Time</th>

            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-row"
                >

                  Loading...

                </td>

              </tr>

            ) : students.length === 0 ? (

              <tr>

                <td
                  colSpan="6"
                  className="empty-row"
                >

                  No Students Outside

                </td>

              </tr>

            ) : (

              students.map(
                (
                  student,
                  index
                ) => (

                  <tr
                    key={index}
                  >

                    <td>{student.name}</td>
                    <td>{student.roll}</td>
                    <td>{student.hostel}</td>
                    <td>{student.room}</td>
                    <td>{student.purpose}</td>
                    <td>{student.outTime}</td>

                  </tr>

                )
              )

            )}

          </tbody>

        </table>

      </div>

   

    <Footer />
  </>
);
}

export default CurfewMail;