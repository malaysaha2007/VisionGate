import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HostelPortalHeader from "../components/HostelPortalHeader";

import API from "../services/api";

import "../styles/EditStudent.css";

function EditStudent() {

  const location = useLocation();

  const navigate = useNavigate();

  const student = location.state?.student;

  const [formData, setFormData] = useState({

    name: "",
    roll_no: "",
    room: "",
    hostel: "",
    email: "",
    phone: "",
    year: ""

  });

  useEffect(() => {

    if (student) {

      setFormData({

        name: student.name || "",
        roll_no: student.roll_no || "",
        room: student.room || "",
        hostel: student.hostel || "",
        email: student.email || "",
        phone: student.phone || "",
        year: student.year || ""

      });

    }

  }, [student]);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(

        `/student/edit/${student._id}`,

        formData

      );

      alert("Student Updated Successfully");

      navigate(-1);

    } catch (error) {

      console.error(error);

      alert("Update Failed");

    }

  };

  return (

    <div className="edit-student-page">

      <Navbar />

       <HostelPortalHeader />

      <div className="edit-container">

        <div className="edit-card">

          <h1>
            Edit Student
          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="roll_no"
              placeholder="Roll Number"
              value={formData.roll_no}
              onChange={handleChange}
            />

            <input
              type="text"
              name="room"
              placeholder="Room"
              value={formData.room}
              onChange={handleChange}
            />

            <input
              type="text"
              name="hostel"
              placeholder="Hostel"
              value={formData.hostel}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="text"
              name="year"
              placeholder="Year"
              value={formData.year}
              onChange={handleChange}
            />

            <button type="submit">

              Update Student

            </button>

          </form>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default EditStudent;