import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <span className="brand-badge" style={{ width: 34, height: 34, fontSize: 13 }}>S&amp;A</span>
              <span>Learn With Sam &amp; Ash</span>
            </div>
            <p className="small" style={{ maxWidth: 280, color: "rgba(255,255,255,.65)", marginTop: 12 }}>
              Practical, structured IELTS teaching from the creators behind a 2.4M-subscriber learning community.
            </p>
          </div>
          <div>
            <h4>IELTS Preparation</h4>
            <Link to="/what-is-ielts">IELTS Blueprint</Link>
            <Link to="/recorded-ielts-course">Recorded Course (₹5,000)</Link>
            <Link to="/live-ielts-course">Live Batches</Link>
            <Link to="/mock-tests">Mock Tests &amp; Diagnostics</Link>
            <Link to="/faq">FAQ</Link>
          </div>
          <div>
            <h4>Sam &amp; Ash</h4>
            <Link to="/about">Our Story</Link>
            <a href="https://www.youtube.com/@LearnWithSamAndAsh" target="_blank" rel="noopener noreferrer">
              YouTube (2.4M)
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <Link to="/faq#support">Contact &amp; Help</Link>
          </div>
          <div>
            <h4>Global Study</h4>
            <Link to="/study-abroad">Admissions Advisory</Link>
            <Link to="/success-stories">Band Results</Link>
          </div>
          <div>
            <h4>Student Portal</h4>
            <Link to="/login">Account Login</Link>
            <Link to="/faq#support">Technical Support</Link>
            <Link to="/login">Password Reset</Link>
          </div>
          <div>
            <h4>Legal &amp; Trust</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund &amp; Cancellation</a>
            <div className="flex items-center gap-8 mt-12" style={{ opacity: 0.85 }}>
              <img src="/images/icons/icon-lock.webp" alt="Secure" style={{ width: 16, height: 16 }} />
              <span style={{ fontSize: 12 }}>Razorpay 256-bit Encrypted</span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Learn With Sam &amp; Ash. All rights reserved.</span>
          <div className="flex items-center gap-16">
            <span className="flex items-center gap-6">
              <img src="/images/icons/icon-email.webp" alt="Email" style={{ width: 16, height: 16 }} />
              support@learnwithsamandash.com
            </span>
            <span className="flex items-center gap-6">
              <img src="/images/icons/icon-whatsapp.webp" alt="WhatsApp" style={{ width: 16, height: 16 }} />
              +91-00000-00000
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
