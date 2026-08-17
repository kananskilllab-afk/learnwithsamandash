import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";

export default function Login() {
  usePageView("login_click");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section style={{ padding: "72px 0" }}>
      <div className="container container-narrow">
        <div className="form-card">
          <span className="eyebrow blue">Student area</span>
          <h1 style={{ fontSize: 28 }}>Log in to your account</h1>
          <p className="muted mt-8 small">Enter the email you enrolled with.</p>

          <form className="mt-24" onSubmit={(e) => e.preventDefault()} noValidate>
            <div className="field">
              <label htmlFor="l_email">Email</label>
              <input id="l_email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="l_pass">Password</label>
              <input id="l_pass" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Log In</button>
            <p className="small text-center mt-16"><a href="#" style={{ color: "var(--blue)" }}>Forgot password?</a></p>
          </form>

          <div className="notice mt-24">
            This form is a front-end placeholder. Wire it to your LMS authentication API before launch — on success,
            redirect to the student dashboard; on failure, show an inline error.
          </div>
        </div>
        <p className="text-center small muted mt-24">
          Not enrolled yet? <Link to="/recorded-ielts-course" style={{ color: "var(--blue)" }}>Start the Recorded Course</Link>
        </p>
      </div>
    </section>
  );
}
