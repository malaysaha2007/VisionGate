import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";
import StudentPortalHeader from "../components/StudentPortalHeader";
import Footer from "../components/Footer";

import "../styles/ApplyVacation.css";

function ApplyVacation() {

  const navigate = useNavigate();
  const rollNo = localStorage.getItem("roll_no");

const [student, setStudent] = useState(null);
const [logs, setLogs] = useState([]);
  useEffect(() => {

  const fetchProfile = async () => {

    try {

      const res = await API.get(
        `/student/profile/${rollNo}`
      );

      setStudent(res.data.student || null);
      setLogs(res.data.logs || []);

    }
    catch (error) {

      console.error(error);

    }

  };

  if (rollNo) {
    fetchProfile();
  }

}, [rollNo]);

const [formData, setFormData] = useState({
  reason: "",
  destination: "",
  leaveDate: "",
  returnDate: ""
});

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      console.log(formData);

      // API CALL HERE

      alert(
        "Vacation request submitted successfully!"
      );

      navigate("/StudentProfile");

    }
    catch (err) {

      console.error(err);

      alert(
        "Failed to submit request"
      );

    }

  };

  if (!student) {
  return (
    <div className="student-profile-page">
      <h2>Loading...</h2>
    </div>
  );
}

  return (

    <>

     <Navbar showLogout={true} />

     <StudentPortalHeader
  student={student}
  logs={logs}
  showProfile={true}
  showVacationButtons={false}
/>

      <div className="apply-vacation-page">

        <div className="vacation-container">

          <h1>
            Apply For Vacation
          </h1>

          <div className="vacation-student-info">

  <div className="student-info-card">
    <strong>Name :</strong> {student?.name}
  </div>

  <div className="student-info-card">
    <strong>Roll No :</strong> {student?.roll}
  </div>

</div>

          <form onSubmit={handleSubmit}>

  <div className="form-group">

    <label>
      Destination
    </label>

    <input
      type="text"
      name="destination"
      value={formData.destination}
      onChange={handleChange}
      placeholder="Enter destination"
      required
    />

  </div>

  <div className="form-group">

    <label>
      Leave Date
    </label>

    <input
      type="date"
      name="leaveDate"
      value={formData.leaveDate}
      onChange={handleChange}
      required
    />

  </div>

  <div className="form-group">

    <label>
      Return Date
    </label>

    <input
      type="date"
      name="returnDate"
      value={formData.returnDate}
      onChange={handleChange}
      required
    />

  </div>

  <div className="form-group">

    <label>
      Reason
    </label>

    <textarea
      rows="5"
      name="reason"
      value={formData.reason}
      onChange={handleChange}
      placeholder="Enter reason for vacation"
      required
    />

  </div>

  <div className="button-group">

    <button
      type="button"
      className="cancel-btn"
      onClick={() =>
        navigate("/StudentProfile")
      }
    >
      Cancel
    </button>

    <button
      type="submit"
      className="submit-btn"
    >
      Submit Request
    </button>

  </div>

</form>
        </div>

      </div>

      <Footer />

    </>

  );

}

export default ApplyVacation;