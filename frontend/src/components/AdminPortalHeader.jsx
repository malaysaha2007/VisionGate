import "../styles/AllPortalHeader.css";
import { useLocation } from "react-router-dom";
import {
  useState,
  useEffect,
  useRef
} from "react";

function AdminPortalHeader() {

  const [showMenu, setShowMenu] =
    useState(false);

  const menuRef = useRef(null);

  const location = useLocation();

  const isLoginPage =
  location.pathname === "/AdminLogin";

  let user = null;

  try {

    user = JSON.parse(
      localStorage.getItem("adminUser")
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

              <div className="portal-avatar">

                {user.username
                  ? user.username.charAt(0).toUpperCase()
                  : "W"}

              </div>

              <div className="portal-user-info">

                <h4>
                  {user.username || "Admin"}
                </h4>

                <p>
                  {user.level || "Admin"}
                </p>

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
    "adminUser"
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

        )}

      </div>

    </div>

  );

}

export default AdminPortalHeader;