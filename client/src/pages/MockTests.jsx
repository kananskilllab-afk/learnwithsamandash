import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import AssessmentForm from "../components/AssessmentForm.jsx";

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

export default function MockTests() {
  usePageView("view_mock_tests");

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
              <span className="eyebrow blue">Diagnostic Toolset</span>
              <motion.span
                className="sticker-callout"
                animate={{ y: [0, -4, 0], rotate: [-2.5, 1.5, -2.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                Meaningful practice 🎯
              </motion.span>
            </div>
            <h1>Try our methods with <span className="marker-highlight">free resources</span>.</h1>
            <p className="lede mt-16">
              Evaluate your current preparation level with a short diagnostic quiz, preview a full masterclass lesson, and download your 30/60/90-day study blueprint.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Free Resource Cards */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div variants={childVariant} className="poster-card">
              <span className="tag mb-16">2-Min Diagnostic</span>
              <h3>IELTS Readiness Assessment</h3>
              <p className="muted small mt-8">
                Answer a few targeted questions to understand your baseline score profile and receive a custom prep strategy.
              </p>
              <a href="#assessment" className="btn btn-secondary btn-block mt-24">
                Take Free Assessment
              </a>
            </motion.div>

            <motion.div variants={childVariant} className="poster-card bg-pastel-yellow">
              <span className="tag mb-16">Watch Free Lesson</span>
              <h3>Sample Masterclass Video</h3>
              <p className="muted small mt-8">
                Experience Sam &amp; Ash's structured teaching style firsthand through a full sample recorded lesson.
              </p>
              <div className="mt-24 p-16" style={{ background: "var(--ink)", borderRadius: "var(--radius-md)", color: "var(--white)", textAlign: "center", border: "2px solid var(--ink)" }}>
                <div style={{ fontSize: 24, marginBottom: 4 }}>▶</div>
                <strong style={{ fontSize: 14 }}>Sample Lesson Preview</strong>
                <p className="small" style={{ opacity: 0.75, marginTop: 4 }}>15 Mins · Task 2 Strategy</p>
              </div>
            </motion.div>

            <motion.div variants={childVariant} className="poster-card bg-pastel-green">
              <span className="tag mb-16">Custom Timelines</span>
              <h3>30 / 60 / 90-Day Study Plans</h3>
              <p className="muted small mt-8">
                Get a week-by-week study roadmap built specifically for your remaining preparation timeline.
              </p>
              <a href="#assessment" className="btn btn-secondary btn-block mt-24">
                Build My Study Plan
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Assessment Form Box */}
      <motion.section
        id="assessment"
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow">
          <div className="form-card">
            <span className="eyebrow green">Free Assessment</span>
            <h2>Get your personalized preparation profile</h2>
            <p className="muted mt-8 small">
              This short diagnostic provides study guidance and a tailored timeline recommendation.
            </p>
            <AssessmentForm />
          </div>
        </div>
      </motion.section>

      {/* Full Mock Test Upgrade Banner */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow text-center">
          <div className="poster-card bg-pastel-blue">
            <h2>Looking for the complete 7-Mock Test series?</h2>
            <p className="muted mt-16">
              7 full-length timed mock exams and 7 one-on-one speaking evaluations are included in the Recorded IELTS Course.
            </p>
            <div className="mt-24">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "mock_tests_page" })}
              >
                View the Recorded Course (₹5,000)
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
