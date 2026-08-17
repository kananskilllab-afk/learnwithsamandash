import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";

const sectionVariant = {
  hidden: { opacity: 0, scale: 0.98, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

export default function Courses() {
  usePageView("view_courses");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-12 mb-16">
              <span className="eyebrow blue">Preparation Catalog</span>
              <motion.span
                className="sticker-callout"
                animate={{ y: [0, -4, 0], rotate: [-2, 1, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                Built to scale 🚀
              </motion.span>
            </div>
            <h1>How do you want to <span className="marker-highlight">prepare</span> for IELTS?</h1>
            <p className="lede mt-16">
              Choose the learning modality that fits your lifestyle. From our flagship flexible Recorded Course to scheduled Live interactive batches and diagnostic tools.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Course Cards Grid */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <motion.div
            className="plan-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {/* 1. Recorded Course */}
            <motion.div variants={childVariant} className="plan-card recommended">
              <span className="badge-recommended">Most Popular</span>
              <span className="plan-name">Recorded Course</span>
              <span className="plan-for">Learn on your own flexible schedule</span>
              <p className="small muted">
                Comprehensive 4-module video curriculum, 7 full timed mock tests, 7 speaking evaluations, and diagnostic writing reviews.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">₹5,000</span>
                <span className="price-note">one-time fee</span>
              </div>
              <Link to="/recorded-ielts-course" className="btn btn-primary btn-block plan-cta">
                View Recorded Course
              </Link>
            </motion.div>

            {/* 2. Live Course */}
            <motion.div variants={childVariant} className="plan-card">
              <span className="plan-name">Live Batches</span>
              <span className="plan-for">Fixed schedule &amp; real-time accountability</span>
              <p className="small muted">
                Live interactive workshops with trainers, real-time doubts resolution, module materials, and speaking practice.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">Scheduled</span>
                <span className="price-note">by batch</span>
              </div>
              <Link to="/live-ielts-course" className="btn btn-secondary btn-block plan-cta">
                View Live Batches
              </Link>
            </motion.div>

            {/* 3. Free Resources */}
            <motion.div variants={childVariant} className="plan-card">
              <span className="plan-name">Free Resources</span>
              <span className="plan-for">Self-study diagnostics &amp; blueprints</span>
              <p className="small muted">
                2-minute readiness assessment quiz, 30/60/90-day structured study plans, and free sample video lesson.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">Free</span>
                <span className="price-note">instant access</span>
              </div>
              <Link to="/mock-tests" className="btn btn-secondary btn-block plan-cta">
                Explore Free Resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Comparison Matrix */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Direct Comparison</span>
            <h2>Compare All Options Side-by-Side</h2>
            <p className="muted mt-8">Everything you get across our preparation formats.</p>
          </div>

          <div className="table-wrap">
            <table className="compare">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Recorded Course (₹5,000)</th>
                  <th>Live Batches</th>
                  <th>Free Resources</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Teaching Format</td>
                  <td>Recorded, high-definition (Self-paced)</td>
                  <td>Live interactive Zoom classes</td>
                  <td>Sample lesson + diagnostic guides</td>
                </tr>
                <tr>
                  <td>Total Hours</td>
                  <td>30 hours comprehensive lessons</td>
                  <td>Scheduled batch timetable</td>
                  <td>1.5 hours sample materials</td>
                </tr>
                <tr>
                  <td>4-Module Material</td>
                  <td>Included (Templates &amp; vocab banks)</td>
                  <td>Included</td>
                  <td>Core overview guides</td>
                </tr>
                <tr>
                  <td>Writing / Speaking Reviews</td>
                  <td>Included (Diagnostic evaluator feedback)</td>
                  <td>Live teacher feedback in class</td>
                  <td>Self-assessment rubrics</td>
                </tr>
                <tr>
                  <td>Full Mock Tests</td>
                  <td>7 full mock tests + 7 speaking tests</td>
                  <td>Per batch schedule</td>
                  <td>1 diagnostic assessment</td>
                </tr>
                <tr>
                  <td>Access Duration</td>
                  <td>3 months unlimited access</td>
                  <td>Duration of batch</td>
                  <td>Lifetime access</td>
                </tr>
                <tr>
                  <td>Best Suited For</td>
                  <td>Working professionals &amp; self-driven learners</td>
                  <td>Learners needing classroom pacing</td>
                  <td>Learners beginning their exploration</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* Path Quiz CTA */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <div className="cta-banner">
            <h2>Still wondering which option fits best?</h2>
            <p>Take our 2-minute diagnostic quiz to receive a customized recommendation.</p>
            <div className="cta-banner-actions">
              <Link to="/what-is-ielts#quiz" className="btn btn-primary">
                Find My IELTS Path
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
