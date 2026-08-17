import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import AssessmentForm from "../components/AssessmentForm.jsx";

export default function MockTests() {
  usePageView("view_mock_tests");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow blue">Free resources</span>
          <h1>Try before you commit.</h1>
          <p className="lede mt-16">A short readiness assessment, a sample lesson and a free study plan — useful on their own, and a preview of what the full course looks like.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="grid-3">
            <div className="card">
              <span className="tag">2 minutes</span>
              <h3 className="mt-16">Free IELTS Readiness Assessment</h3>
              <p className="muted small mt-8">A few quick questions to understand your preparation stage and get a recommended next step.</p>
              <a href="#assessment" className="btn btn-secondary btn-block mt-16">Take Free Assessment</a>
            </div>
            <div className="card">
              <span className="tag">Watch now</span>
              <h3 className="mt-16">Sample Recorded Lesson</h3>
              <p className="muted small mt-8">See our teaching style before you enrol — a full lesson from the recorded course.</p>
              <div className="hero-media mt-16" style={{ aspectRatio: "16/9" }}>
                <div className="photo-placeholder">
                  <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>▶</div>
                  <small>Video placeholder</small>
                </div>
              </div>
            </div>
            <div className="card">
              <span className="tag">Personalised</span>
              <h3 className="mt-16">Free 30/60/90-Day Study Plan</h3>
              <p className="muted small mt-8">Get a plan based on your test window and current level.</p>
              <a href="#assessment" className="btn btn-secondary btn-block mt-16">Build My Study Plan</a>
            </div>
          </div>
        </div>
      </section>

      <section id="assessment" className="bg-alt">
        <div className="container container-narrow">
          <div className="form-card">
            <span className="eyebrow">Free assessment</span>
            <h2>Get your preparation profile</h2>
            <p className="muted mt-8 small">This short assessment is a preparation guide, not an official IELTS score.</p>
            <AssessmentForm />
          </div>
        </div>
      </section>

      <section>
        <div className="container container-narrow text-center">
          <h2>Want the full mock-test experience?</h2>
          <p className="muted mt-16">7 full mock tests and 7 one-on-one speaking tests are included with the Recorded Course.</p>
          <Link to="/recorded-ielts-course" className="btn btn-primary mt-16" onClick={() => track("click_recorded_course_cta", { section: "mock_tests_page" })}>
            View the Recorded Course
          </Link>
        </div>
      </section>
    </>
  );
}
