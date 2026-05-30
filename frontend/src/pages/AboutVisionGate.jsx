import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/AboutVisionGate.css";

function AboutVisionGate() {

  return (

    <div className="about-page">

      <Navbar />

      <div className="about-hero">

        <h1>
          About VisionGate
        </h1>

        <p>
          Smart Entry–Exit Monitoring System
          for PDPM IIITDM Jabalpur
        </p>

      </div>

      <div className="about-container">

        <section className="about-card">

          <h2>
            Project Overview
          </h2>

          <p>
            VisionGate is a centralized
            student movement monitoring
            platform designed to digitize
            campus entry–exit operations.
          </p>

        </section>

        <section className="about-card">

          <h2>
            Objectives
          </h2>

          <ul>

            <li>
              Improve campus security
            </li>

            <li>
              Maintain accurate movement
              records
            </li>

            <li>
              Reduce manual register work
            </li>

            <li>
              Enable real-time monitoring
            </li>

          </ul>

        </section>

        <section className="about-card">

          <h2>
            Features
          </h2>

          <ul>

            <li>Face Recognition</li>

            <li>Role-Based Access</li>

            <li>Activity Logs</li>

            <li>Curfew Monitoring</li>

            <li>Hostel Management</li>

            <li>Real-Time Tracking</li>

          </ul>

        </section>

        <section className="about-card">

          <h2>
            Technology Stack
          </h2>

          <div className="tech-grid">

            <span>React</span>

            <span>FastAPI</span>

            <span>MongoDB</span>

            <span>OpenCV</span>

            <span>Python</span>

            <span>JWT</span>

          </div>

        </section>

        <section className="about-card">

          <h2>
            Developer Details
          </h2>

          <p>
            <strong>
              Lead Developer:
            </strong>
            {" "}
            Malay Saha
          </p>

          <p>
            <strong>
              Developer 1:
            </strong>
            {" "}
            Manvendra Singh
          </p>

          <p>
            <strong>
              Developer 2:
            </strong>
            {" "}
            Aditi Verma
          </p>

          <p>
            <strong>
              Developer 3:
            </strong>
            {" "}
            Aditi Chouhan
          </p>

          <p>
            <strong>
              Institute:
            </strong>
            {" "}
            PDPM IIITDM Jabalpur
          </p>

          <p>
            <strong>
              Department:
            </strong>
            {" "}
            Computer Science &
            Engineering
          </p>

        </section>

        <section className="about-card">

          <h2>
            Project Guide
          </h2>

          <p>
            Dr. Ashish Singh Parihar
          </p>

        </section>

        <section className="about-card">

          <h2>
            Version History
          </h2>

          <p>
            Version 1.0
            <br />
            Initial Release
          </p>

        </section>

        <section className="about-card">

          <h2>
            Project Team
          </h2>

          <ul>

            <li>
              Malay Saha
              –
              Frontend Development
            </li>

            <li>
              Malay Saha
              –
              Face Recognition Integration
            </li>

            <li>
              Malay Saha
              –
              Backend Development
            </li>

          </ul>

        </section>

        
        <section className="about-card">

          <h2>
            Developer Contact
          </h2>

          <p>
            Version 1.0
            <br />
            Initial Release
          </p>

        </section>


      </div>

      <Footer />

    </div>

  );

}

export default AboutVisionGate;