import { useLocation, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/HostelDashboard.css";

function HostelDashboard() {

  const location = useLocation();

  const user = location.state?.user;

  const movementLogs = location.state?.movementLogs || [];

  const vacationLogs = location.state?.vacationLogs || [];

  if (!user) {
    return (
      <div className="hostel-dashboard-page">

        <Navbar />

        <div className="dashboard-error">
          No Hostel Data Found
        </div>

        <Footer />

      </div>
    );
  }

  return (

    <div className="hostel-dashboard-page">

      <Navbar />

      {/* TOP SECTION */}

      <div className="dashboard-top">

        <div className="dashboard-header-left">

          <img
            src="/hostel_logo.jpg"
            alt="Hostel Logo"
          />

        </div>

        <div className="dashboard-header-center">

          <h1>
            Hostel Dashboard
          </h1>

          <p>
            Access Student Records & Monitoring
          </p>

        </div>

      </div>

      {/* ROLE SECTION */}

      <div className="role-section">

        <div className="role-box">

          <div className="role-icon">

            {
              user.role?.charAt(0)?.toUpperCase()
            }

          </div>

          <div className="role-text">

            <div className="role-title">
              {user.role}
            </div>

            <div className="role-sub">
              Hostel Staff
            </div>

          </div>

        </div>

      </div>

      {/* MOVEMENT LOG */}

      <div className="dashboard-container">

        <div className="dashboard-section">

          <h2 className="section-title">
            Movement Log
          </h2>

          <p className="section-desc">
            Records for {user.hostel}
          </p>

          <div className="table-box">

            <table>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Room</th>
                  <th>Purpose</th>
                  <th>In</th>
                  <th>Out</th>
                </tr>

              </thead>

              <tbody>

                {
                  movementLogs.length > 0 ? (

                    movementLogs.map((log, index) => (

                      <tr key={index}>

                        <td>{log.name}</td>

                        <td>{log.roll}</td>

                        <td>{log.room}</td>

                        <td>{log.purpose}</td>

                        <td>{log.inTime}</td>

                        <td>{log.outTime}</td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="6">
                        No movement records
                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

        {/* VACATION LOG */}

        <div className="dashboard-section">

          <h2 className="section-title">
            Vacation Log
          </h2>

          <div className="table-box">

            <table>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Roll</th>
                  <th>Room</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                </tr>

              </thead>

              <tbody>

                {
                  vacationLogs.length > 0 ? (

                    vacationLogs.map((log, index) => (

                      <tr key={index}>

                        <td>{log.name}</td>

                        <td>{log.roll}</td>

                        <td>{log.room}</td>

                        <td>{log.outTime}</td>

                        <td>{log.inTime}</td>

                        <td>{log.purpose}</td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td colSpan="6">
                        No vacation records
                      </td>

                    </tr>

                  )
                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default HostelDashboard;