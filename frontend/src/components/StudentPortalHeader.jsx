import { useEffect, useRef, useState } from "react";

import "../styles/AllPortalHeader.css";

function StudentPortalHeader({ student, logs = [] }) {

  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef = useRef(null);

  const studentImage =
    student?.face_images?.length > 0
      ? student.face_images[0]
      : null;

  let isInsideCampus = true;

  if (logs.length > 0) {

    const latestLog = [...logs].sort((a, b) => {

      const aTime = new Date(
        a.outTime || a.inTime || 0
      );

      const bTime = new Date(
        b.outTime || b.inTime || 0
      );

      return bTime - aTime;

    })[0];

    console.log("All Logs:", logs);
console.log("Latest Log:", latestLog);

    isInsideCampus =
  latestLog.inTime &&
  latestLog.inTime.trim() !== "-";
  }

  

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  const handleChangePassword = () => {

    alert(
      "Navigate to Change Password Page"
    );

    setShowMenu(false);
  };

  return (

    <div className="portal-hero">

      <div className="student-portal-hero-content">

        <div className="portal-info">

          <div className="portal-hero-icon">
            🎓
          </div>

          <div>
            <h2>
              Student Portal
            </h2>

            <p>
              View Profile & Monitor Status
            </p>
          </div>

        </div>

        <div
          className="student-avatar-wrapper"
          ref={menuRef}
        >

          <div
            className="student-header-avatar"
            onClick={() =>
              setShowMenu(!showMenu)
            }
          >

            {studentImage ? (

              <img
                src={studentImage}
                alt="Student"
                className="student-header-image"
              />

            ) : (

              <div className="student-header-fallback">
                👤
              </div>

            )}

            <span
              className={`status-dot ${
                isInsideCampus
                  ? "status-green"
                  : "status-red"
              }`}
            />
          </div>

          {showMenu && (

            <div className="student-dropdown">

              <div className="student-status">

                <span
                  className={`status-indicator ${
                    isInsideCampus
                      ? "status-green"
                      : "status-red"
                  }`}
                />

                {isInsideCampus
                  ? "Inside Campus"
                  : "Outside Campus"}

              </div>

              <div
                className="dropdown-item"
                onClick={
                  handleChangePassword
                }
              >
                Change Password
              </div>

            </div>

          )}

        </div>

      </div>

    </div>

  );
}

export default StudentPortalHeader;