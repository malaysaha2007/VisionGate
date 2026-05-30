import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HostelPortalHeader from "../components/HostelPortalHeader";

import API from "../services/api";

import "../styles/StudentStatusPage.css";

function StudentStatusPage() {

  const { type } = useParams();

  const location = useLocation();

  const hostel =
    location.state?.hostel || "Hostel 1";

  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    loadStudents();

  }, [type]);

  const loadStudents = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        `/hostel/logs/${hostel}`
      );

      const data = response.data;

      // =========================
      // INSIDE
      // =========================

      if (type === "inside") {

        const insideCount =
          data.studentsInCampus;

        const outsideRolls =
          data.outsideStudents.map(
            (s) => s.roll
          );

        const insideStudents = [];

        for (let i = 1; i <= insideCount; i++) {

          insideStudents.push({

            name: `Student ${i}`,

            roll: `ROLL-${i}`,

            room: `Room-${i}`,

            purpose: "Inside Campus",

            outTime: "-",

            status: "INSIDE"

          });

        }

        setStudents(insideStudents);

      }

      // =========================
      // OUTSIDE
      // =========================

      else if (type === "outside") {

        const outsideData =
          data.outsideStudents.map(
            (student) => ({

              ...student,

              status: "OUTSIDE"

            })
          );

        setStudents(outsideData);

      }

      // =========================
      // CURFEW
      // =========================

      else if (type === "curfew") {

        const curfewData =
          data.curfewStudents.map(
            (student) => ({

              ...student,

              status: "CURFEW"

            })
          );

        setStudents(curfewData);

      }

      // =========================
      // LEAVE
      // =========================

      else if (type === "leave") {

        const leaveData =
          data.leaveStudents.map(
            (student) => ({

              ...student,

              status: "LEAVE"

            })
          );

        setStudents(leaveData);

      }

      else {

        setStudents([]);

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // PAGE TITLE
  // =========================

  const getTitle = () => {

    if (type === "inside") {
      return "Students Inside Campus";
    }

    if (type === "outside") {
      return "Students Outside Campus";
    }

    if (type === "curfew") {
      return "Outside After Curfew";
    }

    if (type === "leave") {
      return "Leave / Special Purpose";
    }

    return "Student Status";
  };

  return (

    <div className="student-status-page">

      {/* NAVBAR */}
         <Navbar showLogout={true} />

          <HostelPortalHeader />

      
      {/* TITLE */}
      <div className="status-title-section">

        <h1>
          {getTitle()}
        </h1>

        <p>
          {hostel}
        </p>

      </div>

      {/* CONTENT */}
      <div className="status-container">

        <div className="status-card">

          {/* SEARCH */}
          <div className="status-topbar">

            <input
              type="text"
              placeholder="Search by Name, Roll Number or Room..."
            />

            <button onClick={loadStudents}>
              Refresh
            </button>

          </div>

          {/* COUNT */}
          <div className="status-count">

            Showing {students.length} Students

          </div>

          {/* TABLE */}
          <table>

            <thead>

              <tr>

                <th>Name</th>

                <th>Roll No</th>

                <th>Room</th>

                <th>Purpose</th>

                <th>OUT Time</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>

                  <td colSpan="6">

                    Loading...

                  </td>

                </tr>

              ) : students.length === 0 ? (

                <tr>

                  <td colSpan="6">

                    No Students Found

                  </td>

                </tr>

              ) : (

                students.map((student, index) => (

                  <tr key={index}>

                    <td>
                      {student.name}
                    </td>

                    <td>
                      {student.roll}
                    </td>

                    <td>
                      {student.room}
                    </td>

                    <td>
                      {student.purpose || "-"}
                    </td>

                    <td>
                      {student.outTime || "-"}
                    </td>

                    <td>

                      <span className="status-badge">

                        {student.status}

                      </span>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default StudentStatusPage;