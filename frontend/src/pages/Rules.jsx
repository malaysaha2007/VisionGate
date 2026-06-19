import Navbar from "../components/Navbar";
import "../styles/Rules.css";
import Footer from "../components/Footer";
import RulesPortalHeader from "../components/RulesPortalHeader";

function Rules() {

  return (

    <div className="rules-page">

<Navbar showLogin={true} />

      
      <RulesPortalHeader />



      {/* CONTENT */}
      <div className="rules-container">

        <div className="rules-grid">

          {/* CARD 1 */}
          <div className="rule-card">

            <div className="rule-number">
              01
            </div>

            <div className="rule-content">

              <h3>
                Night Curfew Policy
              </h3>

              <p>
                The hostel main gate closes strictly at
                <span className="highlight-time">
                  {" "}10:30 PM
                </span>.
                Any student attempting to enter or exit
                after this time will be flagged by the
                automated system.
              </p>

            </div>

          </div>

          {/* CARD 2 */}
          <div className="rule-card">

            <div className="rule-number">
              02
            </div>

            <div className="rule-content">

              <h3>
                Face Recognition Entry
              </h3>

              <p>
                Entry and exit are permitted only via
                the Face Recognition System. Ensure your
                face is clearly visible while scanning.
              </p>

            </div>

          </div>

          {/* CARD 3 */}
          <div className="rule-card">

            <div className="rule-number">
              03
            </div>

            <div className="rule-content">

              <h3>
                Access Protocol
              </h3>

              <p>
                All students must log exit and entry
                through the portal to maintain accurate
                campus movement records.
              </p>

            </div>

          </div>

          {/* CARD 4 */}
          <div className="rule-card">

            <div className="rule-number">
              04
            </div>

            <div className="rule-content">

              <h3>
                Integrity Policy
              </h3>

              <p>
                Providing false information or bypassing
                security protocols may lead to strict
                disciplinary action.
              </p>

            </div>

          </div>

        </div>

      </div>


      <Footer />

    </div>

  );

}

export default Rules;