import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";

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
  const [refreshing, setRefreshing] =
    useState(false);

  useEffect(() => {

    loadStudents();

  }, [type]);

  const loadStudents = async () => {

  try {

    setLoading(true);

    setRefreshing(true);

      const response = await API.get(
        `/hostel/logs/${hostel}`
      );

      const data = response.data;


      // =========================
      // OUTSIDE
      // =========================

      if (type === "outside") {

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

      setTimeout(() => {

        setRefreshing(false);

      }, 300);

}

  };

  // =========================
  // PAGE TITLE
  // =========================

  const getTitle = () => {

  

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

    <div
      className={`student-status-page ${
        refreshing
          ? "page-refresh"
          : ""
      }`}
    >

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

            <button
              className="icon-btn"
              onClick={loadStudents}
              disabled={refreshing}
              title="Refresh"
            >
              <FaSyncAlt
                className={
                  refreshing
                    ? "spin-icon"
                    : ""
                }
              />
            </button>

          </div>

          {/* COUNT */}
          <div className="status-count">

            Showing {students.length} Students

          </div>
{/* TABLE */}

<div className="table-wrapper">

  <table>

    <thead>

      <tr>

        <th>Name</th>

        <th>Roll No</th>

        <th>Room</th>

        <th>Purpose</th>

        <th>OUT Time</th>

        <th>IN Time</th>

        <th>Status</th>

      </tr>

    </thead>

    <tbody>

      {loading ? (

        <tr>

          <td colSpan="7">

            Loading...

          </td>

        </tr>

      ) : students.length === 0 ? (

        <tr>

          <td colSpan="7">

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
              {student.inTime || "-"}
            </td>

            <td>

              <span
                className={`status-badge ${
                  student.status === "OUTSIDE"
                    ? "status-out"
                    : student.status === "CURFEW"
                    ? "status-curfew"
                    : "status-leave"
                }`}
              >
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

      </div>

      <Footer />

    

     </div>

  );

}

export default StudentStatusPage;