import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


import CountUpModule from "react-countup";
const CountUp = CountUpModule.default;

import { ScanFace } from "lucide-react";
import wireframeFace from "../assets/wireframe.png";


import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaUserShield,
  FaChartLine,
  FaHistory,
  FaServer,
  FaShieldAlt,
  FaTachometerAlt,
  FaArrowRight,
  FaArrowDown
} from "react-icons/fa";

import API from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "../styles/Home.css";

import Tilt from "react-parallax-tilt";


import reactLogo from "../assets/tech/react.svg";
import viteLogo from "../assets/tech/vite.svg";
import jsLogo from "../assets/tech/javascript.svg";
import htmlLogo from "../assets/tech/html.svg";
import cssLogo from "../assets/tech/css.svg";

import pythonLogo from "../assets/tech/python.svg";
import fastapiLogo from "../assets/tech/fastapi.svg";
import flaskLogo from "../assets/tech/flask.svg";

import mongodbLogo from "../assets/tech/mongodb.svg";

import opencvLogo from "../assets/tech/opencv.svg";
import faceLogo from "../assets/tech/facerecog.svg";

import expoLogo from "../assets/tech/expo.svg";

import gitLogo from "../assets/tech/git.svg";
import githubLogo from "../assets/tech/github.svg";
import postmanLogo from "../assets/tech/postman.svg";
import vscodeLogo from "../assets/tech/vscode.png";

import cloudinaryLogo from "../assets/tech/cloudinary.svg";
import googleLogo from "../assets/tech/google.png";
import androidLogo from "../assets/tech/android.png";




import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";




function Home() {


const todayData = [
  { time: "08:00", scans: 320 },
  { time: "10:00", scans: 450 },
  { time: "12:00", scans: 620 },
  { time: "14:00", scans: 580 },
  { time: "16:00", scans: 520 },
  { time: "18:00", scans: 410 },
  { time: "20:00", scans: 280 },
  { time: "22:00", scans: 180 },
  { time: "00:00", scans: 90 },
  { time: "02:00", scans: 40 },
  { time: "04:00", scans: 20 },
  { time: "06:00", scans: 60 },
  { time: "08:00", scans: 300 }
];

const weekData = [
  { day: "Mon", scans: 420 },
  { day: "Tue", scans: 380 },
  { day: "Wed", scans: 510 },
  { day: "Thu", scans: 460 },
  { day: "Fri", scans: 620 },
  { day: "Sat", scans: 240 },
  { day: "Sun", scans: 190 }
];

const monthData = [
  { week: "W1", scans: 2200 },
  { week: "W2", scans: 2600 },
  { week: "W3", scans: 3100 },
  { week: "W4", scans: 2800 }
];




  const [stats, setStats] = useState({
    total: 0,
    inside: 0,
    outside: 0,
  });

  const [activities, setActivities] = useState([]);

  const [currentTime, setCurrentTime] = useState("");

useEffect(() => {
  fetchLogs();
  updateClock();

  AOS.init({
    duration: 1000,
    once: true,
  });

  const timer = setInterval(updateClock, 1000);

  return () => clearInterval(timer);
}, []);

  const fetchLogs = async () => {
    try {
const response = await API.get("/activity-logs");
const logs = response.data.logs || [];



      const total = logs.length;

      const inside = logs.filter(
        (log) => log.inTime && log.inTime !== null
      ).length;

      const outside = total - inside;

      setStats({
        total,
        inside,
        outside,
      });

      setActivities(logs.slice(-5).reverse());
    } catch (error) {
      console.error(error);
    }
  };

  const updateClock = () => {
    const now = new Date();

    setCurrentTime(
      now.toLocaleDateString() +
      " | " +
      now.toLocaleTimeString()
    );
  };

  const [analyticsView, setAnalyticsView] = useState("today");

  return (


    
    <div className="homepage-page">

      <Navbar showLogin={true} />


      <div className="homepage-grid-background"></div>



      {/* HERO */}

      <section className="homepage-hero-section">

<div className="homepage-hero-layout">

  <div className="homepage-hero-left">

  
          <div className="homepage-visiongate-badge">
            VISIONGATE
          </div>

          <h1>
            Smart Campus Entry–Exit Monitoring System
          </h1>

          <p>
            AI-powered student movement monitoring platform
            designed for secure campus access, automated
            verification, vacation approval workflows,
            and real-time security tracking.
          </p>




<div className="homepage-hero-metrics">

<div className="homepage-metric">
  <h3>
    <CountUp
      end={5000}
      duration={2}
      separator=","
    />
    +
  </h3>
  <span>Logs Recorded</span>
</div>

<div className="homepage-metric">
  <h3>
    <CountUp
      end={99.9}
      duration={2}
      decimals={1}
    />
    %
  </h3>
  <span>Recognition Accuracy</span>
</div>

<div className="homepage-metric">
  <h3>
    <CountUp
      end={7}
      duration={2}
    />
  </h3>
  <span>Hostels Connected</span>
</div>

</div>


        </div>

     

  <div className="homepage-hero-right">

<Tilt
  tiltMaxAngleX={15}
  tiltMaxAngleY={15}
  perspective={1200}
  scale={1.04}
  glareEnable={true}
  glareMaxOpacity={0.15}
>
  <div className="homepage-face-card">

  <div className="homepage-scan-line"></div>

  <div className="homepage-corner tl"></div>
  <div className="homepage-corner tr"></div>
  <div className="homepage-corner bl"></div>
  <div className="homepage-corner br"></div>

  <div className="homepage-face-wrapper">
    <img
      src={wireframeFace}
      alt="AI Face"
      className="homepage-ai-face"
    />
  </div>

</div>
</Tilt>
</div>


</div>

      </section>

      {/* Workflow */}

<section className="homepage-workflow-section">

  <h2
    className="homepage-section-title"
    data-aos="fade-up"
  >
    How VisionGate Works
  </h2>

  <p
    className="homepage-workflow-subtitle"
    data-aos="fade-up"
  >
    Seamless AI-powered verification from student
    authentication to secure campus access.
  </p>

  <div className="homepage-workflow">

    <div className="homepage-step-card">
      <div className="homepage-step-number">01</div>
      <h3>Student</h3>
      <p>Approaches campus gate</p>
    </div>

    <div className="homepage-workflow-arrow">→</div>

    <div className="homepage-step-card">
      <div className="homepage-step-number">02</div>
      <h3>Face Scan</h3>
      <p>Identity captured instantly</p>
    </div>

    <div className="homepage-workflow-arrow">→</div>

    <div className="homepage-step-card">
      <div className="homepage-step-number">03</div>
      <h3>Verification</h3>
      <p>AI validates student profile</p>
    </div>

    <div className="homepage-workflow-arrow">→</div>

    <div className="homepage-step-card">
      <div className="homepage-step-number">04</div>
      <h3>Permission</h3>
      <p>Approval workflow checked</p>
    </div>

    <div className="homepage-workflow-arrow">→</div>

    <div className="homepage-step-card">
      <div className="homepage-step-number">05</div>
      <h3>Access</h3>
      <p>Gate entry or exit allowed</p>
    </div>

  </div>

</section>

<section className="homepage-dashboard-section">

  {/* System Intelligence */}

  <div className="homepage-intelligence-box">

    <h2 className="homepage-section-title">
      System Intelligence
    </h2>

    <div className="homepage-performance-bars">

      <div className="homepage-performance-item">

        <div className="homepage-performance-header">
          <span>Face Recognition Accuracy</span>

          <strong>
            <CountUp
              end={99.9}
              duration={2}
              decimals={1}
            />
            %
          </strong>
        </div>

        <div className="homepage-progress">
          <div className="homepage-fill homepage-accuracy"></div>
        </div>

      </div>

      <div className="homepage-performance-item">

        <div className="homepage-performance-header">
          <span>Verification Speed</span>

          <strong>
            <CountUp
              end={95}
              duration={2}
            />
            %
          </strong>
        </div>

        <div className="homepage-progress">
          <div className="homepage-fill homepage-speed"></div>
        </div>

      </div>

      <div className="homepage-performance-item">

        <div className="homepage-performance-header">
          <span>System Availability</span>

          <strong>
            <CountUp
              end={100}
              duration={2}
            />
            %
          </strong>
        </div>

        <div className="homepage-progress">
          <div className="homepage-fill homepage-uptime"></div>
        </div>

      </div>

    </div>

  </div>




{/* Graph */}

<div className="homepage-analytics-box">

  <h2 className="homepage-section-title">
    Campus Analytics
  </h2>

  <div className="homepage-analytics-tabs">

    <button
      className={analyticsView === "today" ? "active" : ""}
      onClick={() => setAnalyticsView("today")}
    >
      Today
    </button>

    <button
      className={analyticsView === "week" ? "active" : ""}
      onClick={() => setAnalyticsView("week")}
    >
      This Week
    </button>

    <button
      className={analyticsView === "month" ? "active" : ""}
      onClick={() => setAnalyticsView("month")}
    >
      This Month
    </button>

  </div>

  {/* TODAY */}

  {analyticsView === "today" && (
    <>
      <div className="homepage-analytics-summary">

        <div className="homepage-summary-card">
          <span>Total Scans</span>
          <h3>645</h3>
        </div>

        <div className="homepage-summary-card">
          <span>Peak Hour</span>
          <h3>12 PM</h3>
        </div>

        <div className="homepage-summary-card">
          <span>Average/Hour</span>
          <h3>53</h3>
        </div>

      </div>

      <div className="homepage-analytics-content">

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={todayData}>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,.08)"
            />

            <XAxis
              dataKey="time"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(10,20,50,.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(56,189,248,.3)",
                borderRadius: "14px",
                boxShadow: "0 0 25px rgba(0,140,255,.15)"
              }}
              labelStyle={{
                color: "#60a5fa",
                fontWeight: 600
              }}
              itemStyle={{
                color: "#ffffff"
              }}
            />

            <Line
              type="monotone"
              dataKey="scans"
              stroke="#38bdf8"
              strokeWidth={4}
              dot={{
                fill: "#38bdf8",
                stroke: "#ffffff",
                strokeWidth: 2,
                r: 5
              }}
              activeDot={{
                r: 8,
                fill: "#38bdf8",
                stroke: "#ffffff",
                strokeWidth: 3
              }}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>
    </>
  )}

  {/* WEEK */}

  {analyticsView === "week" && (
    <>
      <div className="homepage-analytics-summary">

        <div className="homepage-summary-card">
          <span>Weekly Scans</span>
          <h3>4,820</h3>
        </div>

        <div className="homepage-summary-card">
          <span>Busiest Day</span>
          <h3>Monday</h3>
        </div>

        <div className="homepage-summary-card">
          <span>Daily Average</span>
          <h3>688</h3>
        </div>

      </div>

      <div className="homepage-analytics-content">

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={weekData}>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,.08)"
            />

            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(10,20,50,.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(56,189,248,.3)",
                borderRadius: "14px",
                boxShadow: "0 0 25px rgba(0,140,255,.15)"
              }}
              labelStyle={{
                color: "#60a5fa",
                fontWeight: 600
              }}
              itemStyle={{
                color: "#ffffff"
              }}
            />

            <Bar
              dataKey="scans"
              fill="#38bdf8"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </>
  )}

  {/* MONTH */}

  {analyticsView === "month" && (
    <>
      <div className="homepage-analytics-summary">

        <div className="homepage-summary-card">
          <span>Monthly Scans</span>
          <h3>18,650</h3>
        </div>

        <div className="homepage-summary-card">
          <span>Peak Week</span>
          <h3>Week 2</h3>
        </div>

        <div className="homepage-summary-card">
          <span>Weekly Average</span>
          <h3>4,662</h3>
        </div>

      </div>

      <div className="homepage-analytics-content">

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthData}>

            <CartesianGrid
              vertical={false}
              stroke="rgba(255,255,255,.08)"
            />

            <XAxis
              dataKey="week"
              tick={{ fill: "#94a3b8" }}
            />

            <YAxis
              tick={{ fill: "#94a3b8" }}
            />

            <Tooltip
              contentStyle={{
                background: "rgba(10,20,50,.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(56,189,248,.3)",
                borderRadius: "14px",
                boxShadow: "0 0 25px rgba(0,140,255,.15)"
              }}
              labelStyle={{
                color: "#60a5fa",
                fontWeight: 600
              }}
              itemStyle={{
                color: "#ffffff"
              }}
            />

            <Bar
              dataKey="scans"
              fill="#38bdf8"
              radius={[8, 8, 0, 0]}
            />

          </BarChart>
        </ResponsiveContainer>

      </div>
    </>
  )}


  

</div>
</section>


<section className="homepage-tech-section">

  <h2 className="homepage-section-title">
    Technology Stack
  </h2>

  <div className="homepage-tech-main-card">

    {/* Frontend */}
    <div className="homepage-tech-category">
      <h3>Frontend</h3>

      <div className="homepage-tech-icons">

        <img src={reactLogo} alt="React" />
        <img src={viteLogo} alt="Vite" />
        <img src={jsLogo} alt="JavaScript" />
        <img src={htmlLogo} alt="HTML" />
        <img src={cssLogo} alt="CSS" />

      </div>
    </div>

    {/* Backend */}
    <div className="homepage-tech-category">
      <h3>Backend</h3>

      <div className="homepage-tech-icons">

        <img src={pythonLogo} alt="Python" />
        <img src={fastapiLogo} alt="FastAPI" />
        <img src={flaskLogo} alt="Flask" />

      </div>
    </div>

    {/* Database */}
    <div className="homepage-tech-category">
      <h3>Database & Stroage</h3>

      <div className="homepage-tech-icons">

        <img src={mongodbLogo} alt="MongoDB" />
        <img src={cloudinaryLogo} alt="Cloudinary" />


      </div>
    </div>

    {/* AI & Vision */}
    <div className="homepage-tech-category">
      <h3>AI & Vision</h3>

      <div className="homepage-tech-icons">

        <img src={opencvLogo} alt="OpenCV" />
        <img src={faceLogo} alt="Face Recognition" />

      </div>
    </div>

    {/* Mobile */}
    <div className="homepage-tech-category">
      <h3>Mobile App</h3>

      <div className="homepage-tech-icons">

        <img src={expoLogo} alt="Expo" />
        <img src={androidLogo} alt="Android" />


      </div>
    </div>

    {/* Tools */}
    <div className="homepage-tech-category">
      <h3>Tools & Services</h3>

      <div className="homepage-tech-icons">

        <img src={gitLogo} alt="Git" />
        <img src={githubLogo} alt="GitHub" />
        <img src={postmanLogo} alt="Postman" />
        <img src={vscodeLogo} alt="VSCode" />
        <img src={googleLogo} alt="Google OAuth" />

      </div>
    </div>

  </div>

</section>

     
      



<section className="homepage-lastTwo-boxes-section">
      <div className="homepage-visiongate-highlight"
      data-aos="fade-right"
>

  <h2>
    Built For Modern Campuses
  </h2>

  <p>
    VisionGate combines AI-powered
    verification, automated workflows,
    centralized monitoring and secure
    student tracking into one platform.
  </p>

</div>

<div className="homepage-premium-cta" >

<h2 data-aos="zoom-out">
Ready To Experience
VisionGate?
</h2>

<p data-aos="zoom-in">
Secure your campus with
AI-powered monitoring.
</p>

<div className="homepage-cta-buttons"
data-aos="zoom-in"
>

<Link
to="/student-login"
className="homepage-primary-btn"
>
Student Portal
</Link>

<Link
to="/admin-login"
className="homepage-secondary-btn"
>
Admin Dashboard
</Link>

</div>
</div>

</section>

      <Footer />

    </div>
  );
}

export default Home;