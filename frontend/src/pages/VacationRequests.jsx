import { useEffect, useState } from "react";

import API from "../services/api";

import Navbar from "../components/Navbar";
import HostelPortalHeader from "../components/HostelPortalHeader";
import Footer from "../components/Footer";

function VacationRequests() {

const [requests, setRequests] = useState([]);

const hostel =
localStorage.getItem("hostel") ||
"Hostel 1";

useEffect(() => {


loadRequests();


}, []);

const loadRequests = async () => {


try {

  const res = await API.get(
    `/vacation/${hostel}`
  );

  setRequests(res.data);

}
catch (error) {

  console.error(error);

}

};

return (

<>
  <Navbar showLogout={true} />

  <HostelPortalHeader />

  <div
    style={{
      padding: "30px",
      minHeight: "70vh"
    }}
  >

    <h1>
      Vacation Requests
    </h1>

    <table
      style={{
        width: "100%",
        marginTop: "20px"
      }}
    >

      <thead>

        <tr>

          <th>Roll No</th>

          <th>Destination</th>

          <th>Leave Date</th>

          <th>Return Date</th>

          <th>Status</th>

        </tr>

      </thead>

      <tbody>

        {requests.map((request, index) => (

          <tr key={index}>

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
              {request.status}
            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

  <Footer />
</>


);

}

export default VacationRequests;
