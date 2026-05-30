import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#071126,#071024)",
        color: "white"
      }}
    >

      <Navbar />

      <div
        style={{
          padding: "60px 40px",
          textAlign: "center"
        }}
      >

        <h1>Contact Page</h1>

      </div>

      <Footer />

    </div>

  );

}

export default Contact;