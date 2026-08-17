import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import StudyAbroadForm from "../components/StudyAbroadForm.jsx";

export default function StudyAbroad() {
  usePageView("view_study_abroad");

  return (
    <>
      <section className="page-hero">
        <div className="container container-narrow text-center">
          <span className="eyebrow blue">Study abroad</span>
          <h1>IELTS is only one part of your study-abroad plan.</h1>
          <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Leave your phone number and email below. Our study-abroad consultant will connect with you directly to talk through your plan.
          </p>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <div className="form-card">
            <h2>Talk to a Study Abroad Expert</h2>
            <p className="muted mt-8 small">Just two details — nothing lengthy. Takes about 30 seconds.</p>
            <StudyAbroadForm />
          </div>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container container-narrow text-center">
          <h2>Still want to keep preparing while you wait?</h2>
          <p className="muted mt-16">IELTS prep doesn't have to pause. Start the recorded course today.</p>
          <Link to="/recorded-ielts-course" className="btn btn-secondary mt-16" onClick={() => track("click_recorded_course_cta", { section: "study_abroad_bridge" })}>
            Start the Recorded Course
          </Link>
        </div>
      </section>
    </>
  );
}
