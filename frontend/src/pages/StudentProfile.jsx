import { useLocation, useNavigate } from "react-router-dom";
import "../styles/StudentProfile.css";
import Footer from "../components/Footer";

function StudentProfile() {

  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state?.student;

  if (!student) {
    return (
      <div className="student-profile-page">
        <h2>No Student Data Found</h2>
      </div>
    );
  }

  const logs = student.logs || [];

  return (

    <div className="student-profile-page">

      {/* NAVBAR */}
      <div className="profile-navbar">

        <div className="profile-brand">

          <img
            src="/Iiitdmj_logo.jpg"
            alt="logo"
          />

          <div>

            <h2>
              PDPM IIITDMJ Entry–Exit Portal
            </h2>

            <p>
              Student Monitoring System
            </p>

          </div>

        </div>

        <div className="profile-nav-links">

          <button>
            Dashboard
          </button>

          <button>
            Rules
          </button>

          <button
            className="logout-btn"
            onClick={() => navigate("/")}
          >
            Logout
          </button>

        </div>

      </div>

      {/* TOP */}
      <div className="student-top">

        <img
          src="/student_logo.png"
          alt="student"
          className="student-logo"
        />

        <div>

          <h1>Student Portal</h1>

          <p>
            Access Your Profile & Activity Logs
          </p>

        </div>

      </div>

      {/* PROFILE */}
      <div className="profile-container">

        <h2 className="details-title">
          Student Details
        </h2>

        <div className="profile-grid">

          <p>
            <strong>Name :</strong>
            {" "}
            {student.name}
          </p>

          <p>
            <strong>Roll No :</strong>
            {" "}
            {student.roll_no}
          </p>

          <p>
            <strong>Branch :</strong>
            {" "}
            {student.branch}
          </p>

          <p>
            <strong>Degree :</strong>
            {" "}
            {student.degree}
          </p>

          <p>
            <strong>Hostel :</strong>
            {" "}
            {student.hostel}
          </p>

          <p>
            <strong>Room :</strong>
            {" "}
            {student.room}
          </p>

         <p>
  <strong>Student Contact :</strong>
  {" "}
  {student.contact?.student_no}
</p>

<p>
  <strong>Parent Contact :</strong>
  {" "}
  {student.contact?.parent_no}
</p>

<p>
  <strong>Email :</strong>
  {" "}
  {student.contact?.email}
</p>
        </div>

        {/* MOVEMENT LOG */}
        <h2 className="table-title">
          Movement Log
        </h2>

        <table>

          <thead>

            <tr>

              <th>Type</th>
              <th>Date</th>
              <th>Time</th>
              <th>Purpose</th>

            </tr>

          </thead>

          <tbody>

            {logs.length === 0 ? (

              <tr>
                <td colSpan="4">
                  No movement records found.
                </td>
              </tr>

            ) : (

              logs.map((log, index) => {

                const outParts = log.outTime
                  ? log.outTime.split(" ")
                  : [];

                const inParts = log.inTime
                  ? log.inTime.split(" ")
                  : [];

                return (

                  <>
                    {log.outTime && (

                      <tr key={`out-${index}`} className="out-row">

                        <td>OUT</td>

                        <td>{outParts[0]}</td>

                        <td>{outParts[1]}</td>

                        <td>{log.purpose}</td>

                      </tr>

                    )}

                    {log.inTime && (

                      <tr key={`in-${index}`} className="in-row">

                        <td>IN</td>

                        <td>{inParts[0]}</td>

                        <td>{inParts[1]}</td>

                        <td>{log.purpose}</td>

                      </tr>

                    )}
                  </>

                );

              })

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default StudentProfile;