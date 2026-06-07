import Navbar from "../components/Navbar";
import ContactPortalHeader from "../components/ContactPortalHeader";
import Footer from "../components/Footer";

import "../styles/Contact.css";

function Contact() {

  return (

    <div className="contact-page">

      <Navbar />

      <ContactPortalHeader />

      <div className="contact-container">

        <div className="contact-card">

          <h2>
            Developer Information
          </h2>

          <p>
            <strong>Name:</strong>
            {" "}
            Malay Saha
          </p>

          <p>
            <strong>Department:</strong>
            {" "}
            Computer Science & Engineering
          </p>

          <p>
            <strong>Institute:</strong>
            {" "}
            PDPM IIITDM Jabalpur
          </p>

          <p>
            <strong>Email:</strong>
            {" "}
            your-email@iiitdmj.ac.in
          </p>

        </div>

        <div className="contact-card">

          <h2>
            Institute Information
          </h2>

          <p>
            PDPM Indian Institute of
            Information Technology,
            Design and Manufacturing,
            Jabalpur
          </p>

          <p>
            Dumna Airport Road,
            Jabalpur,
            Madhya Pradesh
          </p>

          <p>
            PIN: 482005
          </p>

        </div>

        <div className="contact-card">

          <h2>
            VisionGate Support
          </h2>

          <p>
            For technical issues,
            login problems,
            face registration errors,
            or portal related queries,
            contact the project team.
          </p>

        </div>

        <div className="contact-card">

          <h2>
            Emergency Contact
          </h2>

          <p>
            Hostel Office
          </p>

          <p>
            Security Control Room
          </p>

          <p>
            Administration Office
          </p>

        </div>

      </div>

      <Footer />

    </div>

  );

}

export default Contact;