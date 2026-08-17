import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><span className="brand-mark">S&A</span> Learn With Sam & Ash</div>
            <p className="small" style={{ maxWidth: 280, color: "rgba(255,255,255,.6)" }}>
              Practical, structured IELTS teaching from the creators behind a 2.4M-subscriber learning community.
            </p>
          </div>
          <div>
            <h4>IELTS</h4>
            <Link to="/what-is-ielts">What is IELTS?</Link>
            <Link to="/recorded-ielts-course">Recorded Course</Link>
            <Link to="/live-ielts-course">Live Course</Link>
            <Link to="/mock-tests">Mock Tests</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <h4>Learn With Sam & Ash</h4>
            <Link to="/about">About</Link>
            <a href="https://www.youtube.com/@LearnWithSamAndAsh" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <Link to="/faq#support">Contact</Link>
          </div>
          <div>
            <h4>Study Abroad</h4>
            <Link to="/study-abroad">Talk to an Expert</Link>
          </div>
          <div>
            <h4>Student</h4>
            <Link to="/login">Login</Link>
            <Link to="/faq#support">Support</Link>
            <Link to="/login">Password Help</Link>
          </div>
          <div>
            <h4>Legal</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Refund &amp; Cancellation</a>
            <a href="#">Cookie Preferences</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Learn With Sam & Ash. All rights reserved.</span>
          <span>support@learnwithsamandash.com · WhatsApp +91-00000-00000</span>
        </div>
      </div>
    </footer>
  );
}
