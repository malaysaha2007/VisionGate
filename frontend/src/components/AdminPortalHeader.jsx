import "../styles/AllPortalHeader.css";

function AdminPortalHeader() {
  return (
    <div className="portal-hero">
      <div className="portal-hero-content">

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
    </div>
  );
}

export default AdminPortalHeader;