import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";

export default function Courses() {
  usePageView("view_courses");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow blue">Choose your path</span>
          <h1>How do you want to learn?</h1>
          <p className="lede mt-16">Most flexible learners do best with the Recorded Course. Pick the option that matches how you actually want to study.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="plan-grid">
            <div className="plan-card recommended">
              <span className="badge-recommended">Recommended</span>
              <span className="plan-name">Recorded Course</span>
              <span className="plan-for">I want to learn on my own schedule</span>
              <p className="small muted">Complete self-paced preparation — 30 hrs, all 4 modules, 7 mocks, review support.</p>
              <Link to="/recorded-ielts-course" className="btn btn-primary btn-block plan-cta">View Recorded Course</Link>
            </div>
            <div className="plan-card">
              <span className="plan-name">Live Course</span>
              <span className="plan-for">I want scheduled classes</span>
              <p className="small muted">Live teaching with a fixed timetable and classroom accountability.</p>
              <Link to="/live-ielts-course" className="btn btn-secondary btn-block plan-cta">View Live Course</Link>
            </div>
            <div className="plan-card">
              <span className="plan-name">Material &amp; Mock Tests</span>
              <span className="plan-for">I already know the concepts, I need practice</span>
              <p className="small muted">Practice-focused option: full mocks, sample answers, study plan.</p>
              <Link to="/mock-tests" className="btn btn-secondary btn-block plan-cta">Explore Resources</Link>
            </div>
            <div className="plan-card">
              <span className="plan-name">Study Abroad Guidance</span>
              <span className="plan-for">I need help beyond IELTS</span>
              <p className="small muted">Talk to our study-abroad consultant about your bigger plan.</p>
              <Link to="/study-abroad" className="btn btn-secondary btn-block plan-cta">Talk to an Expert</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="section-head center"><h2>Compare the courses</h2></div>
          <div className="table-wrap">
            <table className="compare">
              <thead><tr><th>Feature</th><th>Recorded Course</th><th>Live Course</th><th>Mock Tests</th></tr></thead>
              <tbody>
                <tr><td>Teaching format</td><td>Recorded, self-paced</td><td>Live, scheduled</td><td>Practice only</td></tr>
                <tr><td>Total teaching hours</td><td>30 hrs</td><td>Per batch schedule</td><td>—</td></tr>
                <tr><td>4-module material</td><td>Included</td><td>Included</td><td>Not included</td></tr>
                <tr><td>Writing / speaking review</td><td>Included</td><td>Included</td><td>Add-on</td></tr>
                <tr><td>Full mock tests</td><td>7</td><td>Per plan</td><td>Available separately</td></tr>
                <tr><td>Access duration</td><td>3 months</td><td>Per batch</td><td>Per purchase</td></tr>
                <tr><td>Schedule requirement</td><td>None — anytime</td><td>Fixed batch timing</td><td>None</td></tr>
                <tr><td>Best for</td><td>Flexible, self-paced learners</td><td>Learners needing accountability</td><td>Learners needing extra practice</td></tr>
              </tbody>
            </table>
          </div>
          <p className="small muted mt-16">This is a simplified comparison. The full commercial matrix — pricing, exact review durations and any additional plans — must be signed off by the product owner before development locks the page.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <h2>Still not sure which one fits?</h2>
            <p>Take our 2-minute quiz and we'll point you to the right path.</p>
            <div className="cta-banner-actions">
              <Link to="/what-is-ielts#quiz" className="btn btn-primary">Find My IELTS Path</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
