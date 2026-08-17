import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import { FaqGroup } from "../components/FaqAccordion.jsx";

const FAQS = [
  { q: "What happens if I miss a live session?", a: "All live sessions are recorded in high-definition and uploaded to your student portal within 24 hours with full access for the duration of your batch." },
  { q: "What is the batch size for live classes?", a: "Batches are capped at 25 students to ensure interactive speaking participation and personalized query resolution." },
  { q: "What platform are the live classes conducted on?", a: "Classes are held via Zoom with interactive breakout rooms for speaking mock drills and live essay teardowns." },
  { q: "Can I transfer to a subsequent batch if my exam date shifts?", a: "Yes, you can request a one-time batch transfer up to 5 days before the scheduled start date by contacting student support." }
];

export default function LiveCourse() {
  usePageView("view_live_course");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="tag mb-16">Scheduled Classroom Pacing</span>
            <h1>Prefer a fixed schedule and <span className="ref-marker-block">live interactive</span> classes?</h1>
            <p className="lede mt-16">
              Join our small-group live IELTS preparation batches for real-time instruction, live speaking drills, interactive doubt clearance, and complete course materials.
            </p>
            <div className="hero-ctas mt-24">
              <a href="#batch" className="btn btn-primary">View Next Batch Schedule</a>
              <Link to="/recorded-ielts-course" className="btn btn-secondary">Compare with Recorded Course</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Batch Card */}
      <section id="batch">
        <div className="container container-narrow">
          <div className="poster-card">
            <span className="tag mb-16">Upcoming Cohort</span>
            <h3>Next Live Batch Details</h3>
            <div className="table-wrap mt-24">
              <table className="compare">
                <tbody>
                  <tr><td>Schedule</td><td>Weekday Evening Batch (Monday to Thursday)</td></tr>
                  <tr><td>Timing</td><td>8:00 PM – 9:30 PM IST</td></tr>
                  <tr><td>Duration</td><td>4 Weeks (24 Hours of Live Instruction)</td></tr>
                  <tr><td>Class Size</td><td>Capped at 25 Students per Cohort</td></tr>
                  <tr><td>Platform</td><td>Interactive Zoom Classroom with Breakout Rooms</td></tr>
                  <tr><td>Inclusions</td><td>Full Course Material, 7 Mock Tests &amp; Writing Feedback</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-24">
              <Link to="/study-abroad" className="btn btn-primary">
                Reserve Seat in Next Batch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Inclusions */}
      <section className="bg-alt">
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">Live Advantage</span>
            <h2>What is included in the Live Course</h2>
          </div>
          <div className="grid-3">
            <div className="poster-card">
              <h3>Live Interactive Instruction</h3>
              <p className="muted small mt-8">Real-time walk-throughs of every question type with live teacher Q&amp;A.</p>
            </div>
            <div className="poster-card">
              <h3>Speaking Breakout Drills</h3>
              <p className="muted small mt-8">Practice 1-on-1 speaking cue cards with peers and receive instant trainer scoring.</p>
            </div>
            <div className="poster-card">
              <h3>Essay Teardowns</h3>
              <p className="muted small mt-8">Live reviews of student essays on-screen to identify grammar and coherence traps.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge Back to Recorded */}
      <section>
        <div className="container">
          <div className="bridge-block">
            <div>
              <span className="tag mb-16">Need Maximum Flexibility?</span>
              <h2>Prefer studying on your own timetable?</h2>
              <p className="muted mt-8">The 30-hour Recorded IELTS Course lets you start immediately and learn at your own pace.</p>
            </div>
            <Link to="/recorded-ielts-course" className="btn btn-primary" style={{ flex: "none" }} onClick={() => track("click_recorded_course_cta", { section: "live_bridge" })}>
              View Recorded Course (₹5,000)
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-alt">
        <div className="container container-narrow">
          <div className="section-head">
            <span className="tag mb-16">Frequently Asked Questions</span>
            <h2>Live Batch FAQs</h2>
          </div>
          <FaqGroup items={FAQS} />
        </div>
      </section>
    </>
  );
}
