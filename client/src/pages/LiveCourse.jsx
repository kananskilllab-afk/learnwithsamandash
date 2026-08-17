import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import { FaqGroup } from "../components/FaqAccordion.jsx";

const FAQS = [
  { q: "What if I miss a class?", a: "Recording/catch-up policy to be confirmed by the operations team before launch." },
  { q: "Are sessions recorded?", a: "To be confirmed — if yes, access duration for recordings will be listed here." },
  { q: "How do I get support?", a: "Support channel and hours will be listed here once confirmed." },
  { q: "Can I reschedule to a later batch?", a: "Rescheduling policy to be confirmed by the operations team." }
];

export default function LiveCourse() {
  usePageView("view_live_course");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow blue">Scheduled learning</span>
          <h1>Prefer a fixed schedule and live classes?</h1>
          <p className="lede mt-16">Join the live IELTS preparation option for scheduled expert sessions, course material, practice and review support.</p>
          <a href="#batch" className="btn btn-primary mt-16">View the Next Live Batch</a>
        </div>
      </section>

      <section id="batch">
        <div className="container container-narrow">
          <div className="card">
            <span className="tag">CMS-controlled batch</span>
            <h3 className="mt-16">Upcoming batch</h3>
            <div className="table-wrap mt-16">
              <table className="compare">
                <tbody>
                  <tr><td>Start date</td><td>To be scheduled — connect this field to the batch CMS record</td></tr>
                  <tr><td>Days &amp; time</td><td>To be confirmed</td></tr>
                  <tr><td>Time zone</td><td>IST</td></tr>
                  <tr><td>Total hours</td><td>To be confirmed</td></tr>
                  <tr><td>Platform</td><td>To be confirmed</td></tr>
                  <tr><td>Seats</td><td>Limited</td></tr>
                </tbody>
              </table>
            </div>
            <p className="small muted mt-16">This block should be wired to a single CMS entry so the date never needs to be hard-coded in more than one place. Expired batches must be hidden automatically.</p>
            <Link to="/study-abroad" className="btn btn-primary mt-16">Reserve My Seat</Link>
          </div>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="section-head center"><h2>What's included</h2></div>
          <div className="grid-3">
            <div className="card"><h3>Live sessions</h3><p className="muted small mt-8">Scheduled expert-led classes across all 4 modules.</p></div>
            <div className="card"><h3>Course material</h3><p className="muted small mt-8">Same structured materials as the recorded course.</p></div>
            <div className="card"><h3>Practice &amp; review</h3><p className="muted small mt-8">Guided practice with feedback support — exact plan to be confirmed.</p></div>
          </div>
          <p className="small muted mt-24 text-center">Exact features shown here must match the approved commercial plan before launch.</p>
        </div>
      </section>

      <section>
        <div className="container container-narrow text-center">
          <h2>Who should choose live?</h2>
          <p className="muted mt-16">Learners who need a schedule and real-time classroom interaction to stay accountable — rather than studying independently.</p>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="bridge-block">
            <div>
              <span className="eyebrow blue">Need more flexibility?</span>
              <h2>Choose the Recorded Course instead.</h2>
            </div>
            <Link to="/recorded-ielts-course" className="btn btn-primary" style={{ flex: "none" }} onClick={() => track("click_recorded_course_cta", { section: "live_bridge" })}>
              View Recorded Course
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <div className="section-head"><h2>FAQ</h2></div>
          <FaqGroup items={FAQS} />
        </div>
      </section>
    </>
  );
}
