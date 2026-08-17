import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";

export default function About() {
  usePageView("view_about");

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Behind the channel</span>
            <h1>You may already know us from YouTube. Here's what we're building beyond the videos.</h1>
            <p className="lede mt-16">
              Learn With Sam &amp; Ash teaches IELTS, English and related international-test content through
              practical explanations designed to make difficult topics easier to understand.
            </p>
            <Link to="/recorded-ielts-course" className="btn btn-primary mt-24" onClick={() => track("click_recorded_course_cta", { section: "about_hero" })}>
              Explore Our IELTS Course
            </Link>
          </div>
          <div className="hero-media">
            <div className="photo-placeholder">
              <div className="avatars"><span className="avatar-circle s">S</span><span className="avatar-circle a">A</span></div>
              <strong>Sam &amp; Ash</strong><small>Photo placeholder</small>
            </div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container trust-row">
          <div className="trust-item"><span className="trust-num">2.4M+</span><span className="trust-label">subscribers</span></div>
          <div className="trust-item"><span className="trust-num">403+</span><span className="trust-label">videos published</span></div>
          <div className="trust-item"><span className="trust-num">15.7M+</span><span className="trust-label">views on our flagship 10-hour course</span></div>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="grid-2">
            <div className="card">
              <h3>Sam</h3>
              <p className="muted mt-8">Language trainer, YouTuber and language enthusiast, and a key voice behind Learn With Sam &amp; Ash's IELTS teaching.</p>
              <p className="small muted mt-16"><em>Bio, exact credentials and title pending final approval from the team before launch.</em></p>
            </div>
            <div className="card">
              <h3>Ash</h3>
              <p className="muted mt-8">Language trainer, YouTuber and communicator who makes English learning enjoyable and accessible.</p>
              <p className="small muted mt-16"><em>Bio, exact credentials and title pending final approval from the team before launch.</em></p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container hero-grid">
          <div className="hero-media" style={{ aspectRatio: "16/9" }}>
            <div className="photo-placeholder">
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>▶</div>
              <strong>IELTS Full Course in 10 Hours</strong><small>15.7M+ views · embed placeholder</small>
            </div>
          </div>
          <div>
            <span className="eyebrow blue">Flagship content</span>
            <h2>The video that started it for millions of learners.</h2>
            <p className="lede mt-16">Our 10-hour IELTS Full Course is the foundation of how we teach — clear explanations, practical examples and a structured walk-through of every module.</p>
          </div>
        </div>
      </section>

      <section>
        <div className="container container-narrow text-center">
          <h2>Our teaching philosophy</h2>
          <p className="muted mt-16">Simple explanations. Practical examples. Structured preparation. Useful practice. Learner confidence — built one module at a time, not through shortcuts or guarantees.</p>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to learn with us?</h2>
            <p>Take the structured next step after discovering us on YouTube.</p>
            <div className="cta-banner-actions">
              <Link to="/recorded-ielts-course" className="btn btn-primary" onClick={() => track("click_recorded_course_cta", { section: "about_final" })}>
                Start the Recorded Course
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
