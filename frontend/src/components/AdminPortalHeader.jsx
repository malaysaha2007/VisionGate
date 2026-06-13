import { useState, useEffect, useRef } from "react";

import "../styles/AllPortalHeader.css";
import PortalHeader from "./PortalHeader";

function AdminPortalHeader({ admin }) {
  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef = useRef(null);

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
    <PortalHeader
      icon="🛡️"
      title="Administration Portal"
      subtitle="Manage Students, Logs & Curfew System"
      rightContent={
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
                  {admin?.username ||
                    "Administrator"}
                </div>

                <div className="profile-role">
                  {admin?.role ||
                    admin?.level ||
                    "Admin"}
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
                    "admin"
                  );

                  sessionStorage.clear();

                  setShowMenu(false);

                  window.location.replace(
                    "/AdminLogin"
                  );
                }}
              >
                🚪 Logout
              </div>

            </div>
          )}
        </div>
      }
    />
  );
}

export default AdminPortalHeader;