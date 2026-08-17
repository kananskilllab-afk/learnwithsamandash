import { useSearchParams, Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";

export default function ThankYou() {
  usePageView();
  const [params] = useSearchParams();
  const paymentId = params.get("payment_id");

  return (
    <section style={{ padding: "88px 0" }}>
      <div className="container container-narrow text-center">
        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--green-50)", color: "var(--green-dark)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, margin: "0 auto 20px" }}>✓</div>
        <h1>Your enrolment is confirmed.</h1>
        <p className="lede mt-16" style={{ margin: "0 auto" }}>
          Check your email and WhatsApp for access instructions. If you don't see it within a few minutes, check spam or contact support.
        </p>
        {paymentId && <p className="small muted mt-16">Payment reference: {paymentId}</p>}

        <div className="card mt-32" style={{ textAlign: "left" }}>
          <h3>What happens next</h3>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <li className="muted">1. You'll receive a confirmation email/WhatsApp with your login details.</li>
            <li className="muted">2. Log in and start with Module 1 — Listening.</li>
            <li className="muted">3. Use the included mock tests and review workflow as you progress.</li>
            <li className="muted">4. Reach out to support any time you have a question.</li>
          </ul>
        </div>

        <div className="hero-ctas mt-32" style={{ justifyContent: "center" }}>
          <Link to="/login" className="btn btn-primary">Go to Login</Link>
          <Link to="/faq#support" className="btn btn-secondary">Contact Support</Link>
        </div>
      </div>
    </section>
  );
}
