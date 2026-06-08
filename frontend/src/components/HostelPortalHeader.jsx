import "../styles/AllPortalHeader.css";
import { useLocation } from "react-router-dom";

import {
  useState,
  useEffect,
  useRef
} from "react";

function HostelPortalHeader() {

  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef = useRef(null);

  const location = useLocation();

  const isLoginPage =
  location.pathname === "/HostelLogin";

  let user = null;

  try {

    user = JSON.parse(
      localStorage.getItem("hostelUser")
    );

  } catch {

    user = null;

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

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);

  return (

    <div className="portal-hero">

      <div className="portal-hero-content">

        {/* LEFT SIDE */}

        <div className="portal-info">

          <div className="portal-hero-icon">
            🏠
          </div>

          <div>

            <h2>
              Hostel Portal
            </h2>

            <p>
              Manage Students & Monitor Activity
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        {user && !isLoginPage && (

          <div
            className="portal-user-wrapper"
            ref={menuRef}
          >

            <div
              className="portal-user"
              onClick={() =>
                setShowMenu(!showMenu)
              }
            >

           

  


<div className="profile-card">

 

  <div className="profile-details">

    <div className="profile-name">
      {user?.name}
    </div>

    <div className="profile-role">
      {user?.designation}
    </div>

  </div>

</div>
            </div>

            {showMenu && (

              <div className="portal-dropdown">

                <div
                  className="dropdown-item"
                  onClick={() => {
                    alert(
                      "Profile Page Coming Soon"
                    );
                  }}
                >
                  👤 Profile
                </div>

                <div
                  className="dropdown-item logout"
                  onClick={() => {

  localStorage.removeItem(
    "hostelUser"
  );

  sessionStorage.clear();

  localStorage.removeItem(
    "hostelStudents"
  );

  localStorage.removeItem(
    "hostelData"
  );

  setShowMenu(false);

  window.location.replace(
    "/HostelLogin"
  );

}}
                >
                  🚪 Logout
                </div>

              </div>

            )}

          </div>

        )}

      </div>

    </div>

  );

}

export default HostelPortalHeader;