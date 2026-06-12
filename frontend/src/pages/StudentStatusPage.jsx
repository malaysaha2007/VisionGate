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

  const [showDenyBox, setShowDenyBox] =
  useState(false);

const [denyReason, setDenyReason] =
  useState("");

  const [selectedRequest, setSelectedRequest] =
  useState(null);

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



      // =========================
      // VACATION
      // =========================



      else if (type === "vacation") {

const response = await API.get(
`/vacation/${hostel}`
);

const vacationData =
response.data.map(
(request) => ({


    ...request,

    status:
      request.status

  })
);


setStudents(vacationData);

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

  

    if (type === "outside") {
      return "Students Outside Campus";
    }

    if (type === "curfew") {
      return "Outside After Curfew";
    }

    if (type === "leave") {
      return "Leave / Special Purpose";
    }

    if (type === "vacation") {
return "Vacation Applications";
}


    return "Student Status";
  };

  const handleApprove = async (rollNo) => {

try {


await API.put(
  `/vacation/approve/${rollNo}`
);

setSelectedRequest(null);
setShowDenyBox(false);
setDenyReason("");

loadStudents();

} catch (error) {


console.error(error);


}

};
const handleDeny = async (rollNo) => {

  if (!denyReason.trim()) {
    alert("Please enter a rejection reason");
    return;
  }

  try {

    await API.put(
      `/vacation/deny/${rollNo}`,
      {
        denialReason: denyReason
      }
    );

    setSelectedRequest(null);
    setShowDenyBox(false);
    setDenyReason("");

    loadStudents();

  } catch (error) {

    console.error(error);

  }

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

<div className="table-wrapper">

  <table>

    <thead>

    {type === "vacation" ? (

<tr>

  <th>Roll No</th>

  <th>Destination</th>

  <th>Leave Date</th>

  <th>Return Date</th>

  <th>Reason</th>

  <th>Status</th>
</tr>


) : (


<tr>

  <th>Name</th>

  <th>Roll No</th>

  <th>Room</th>

  <th>Purpose</th>

  <th>OUT Time</th>

  <th>IN Time</th>

  <th>Status</th>

</tr>


)}


    </thead>

    <tbody>


{loading ? (

  <tr>


<td colSpan={type === "vacation" ? 6 : 7}>
  Loading...

</td>


  </tr>

) : students.length === 0 ? (

  <tr>


<td colSpan={type === "vacation" ? 6 : 7}>
  No Data Found

</td>


  </tr>

) : type === "vacation" ? (

students.map((request, index) => (
  

<tr
  key={index}
 onClick={() => {
  setSelectedRequest(request);
  setShowDenyBox(false);
  setDenyReason("");
}}
  style={{
    cursor: "pointer"
  }}
>

  <td>
    {request.roll_no}
  </td>

  <td>
    {request.destination}
  </td>

  <td>
    {request.leave_date}
  </td>

  <td>
    {request.return_date}
  </td>

  <td>
    {request.reason}
  </td>

  <td>

    <span
      className={`status-badge ${
        request.status === "Approved"
          ? "status-approved"
          : request.status === "Denied"
          ? "status-denied"
          : "status-pending"
      }`}
    >
      {request.status}
    </span>

  </td>

</tr>


))

) : (

students.map((student, index) => (


<tr key={index}>

  <td>{student.name}</td>

  <td>{student.roll}</td>

  <td>{student.room}</td>

  <td>{student.purpose || "-"}</td>

  <td>{student.outTime || "-"}</td>

  <td>{student.inTime || "-"}</td>

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


      {selectedRequest && (

  <div className="vacation-modal-overlay">

    <div className="vacation-modal">

  <h2>
    {selectedRequest.roll_no}
  </h2>

  <div className="vacation-modal-details">

    <div className="detail-card">
      <strong>Destination</strong>
      <span>{selectedRequest.destination}</span>
    </div>

   

    <div className="detail-card">
      <strong>Leave Date</strong>
      <span>{selectedRequest.leave_date}</span>
    </div>

    <div className="detail-card">
      <strong>Return Date</strong>
      <span>{selectedRequest.return_date}</span>
    </div>

    <div
      className="detail-card"
      style={{ gridColumn: "1 / -1" }}
    >
      <strong>Reason</strong>
      <span>{selectedRequest.reason}</span>
    </div>

  </div>

  {showDenyBox && (

  <div className="deny-section">

    <label>
      Reason for Rejection
    </label>

    <textarea
      value={denyReason}
      onChange={(e) =>
        setDenyReason(
          e.target.value
        )
      }
      placeholder="Write reason..."
    />

    <button
      className="confirm-deny-btn"
      onClick={() =>
        handleDeny(
          selectedRequest.roll_no
          
        )
      }
    >
      Confirm Rejection
    </button>

  </div>

)}


<div className="vacation-modal-actions">

  {selectedRequest.status !== "Approved" && (
    <button
      className="approve-btn"
      onClick={() =>
        handleApprove(
          selectedRequest.roll_no
        )
      }
    >
      Approve
    </button>
  )}

  {selectedRequest.status !== "Denied" && (
    <button
      className="deny-btn"
      onClick={() =>
        setShowDenyBox(true)
      }
    >
      Deny
    </button>
  )}

  <button
    className="close-btn"
    onClick={() => {
      setSelectedRequest(null);
      setShowDenyBox(false);
      setDenyReason("");
    }}
  >
    Close
  </button>

</div>
  </div>

</div>
)}

      <Footer />

    

     </div>
     

  );

}

export default StudentStatusPage;