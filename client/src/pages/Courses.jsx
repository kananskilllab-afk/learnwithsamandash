import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { ENGLISH_COURSES } from "../data/englishCoursesData.js";

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
  const [activeCategory, setActiveCategory] = useState("all"); // 'all' | 'ielts' | 'english'

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
              <span className="eyebrow blue">
                <img src="/images/icons/icon-lessons.webp" alt="Lessons" className="sticker-icon-sm" />
                Course Catalog
              </span>
              <motion.span
                className="sticker-callout"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                IELTS &amp; Spoken English 🎯
              </motion.span>
            </div>
            <h1>Master <span className="marker-highlight">IELTS &amp; Spoken English</span> with Sam &amp; Ash</h1>
            <p className="lede mt-16">
              Whether you need high-band IELTS exam strategies or day-to-day English speaking confidence, choose the structured program designed for your goal.
            </p>

            {/* Sleek Segmented Category Control */}
            <div className="segmented-control-wrap mt-32">
              <div className="segmented-control">
                <button
                  className={`segment-btn ${activeCategory === "all" ? "active" : ""}`}
                  onClick={() => setActiveCategory("all")}
                >
                  All Courses (6)
                </button>
                <button
                  className={`segment-btn ${activeCategory === "english" ? "active" : ""}`}
                  onClick={() => setActiveCategory("english")}
                >
                  Spoken English &amp; Interview (3)
                </button>
                <button
                  className={`segment-btn ${activeCategory === "ielts" ? "active" : ""}`}
                  onClick={() => setActiveCategory("ielts")}
                >
                  IELTS Preparation (3)
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 1. SPOKEN ENGLISH & INTERVIEW SUCCESS PROGRAMS */}
      {(activeCategory === "all" || activeCategory === "english") && (
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="container">
            <div className="section-head mb-32">
              <span className="eyebrow green">
                <img src="/images/icons/icon-speaking.webp" alt="Speaking" className="sticker-icon-sm" />
                Spoken English &amp; Career
              </span>
              <h2>Spoken English, Fluency &amp; Interview Programs</h2>
              <p className="muted mt-8">
                Designed to build real-life speaking confidence, eliminate hesitation, and perform under interview pressure.
              </p>
            </div>

            <motion.div
              className="plan-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {ENGLISH_COURSES.map((course) => (
                <motion.div
                  key={course.id}
                  variants={childVariant}
                  className={`plan-card${course.id === "32-day-level-up" ? " recommended" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <img src="/images/icons/icon-speaking.webp" alt={course.title} className="sticker-icon-md" />
                    <span className="google-band-tag">{course.badge}</span>
                  </div>
                  <span className="plan-name mt-8">{course.title}</span>
                  {course.subtitle && <span className="small muted font-bold">{course.subtitle}</span>}
                  <span className="plan-for">{course.role}</span>
                  <p className="small muted mt-4">{course.shortDesc}</p>
                  
                  <div className="feature-list mt-12 mb-16" style={{ gap: "8px" }}>
                    {course.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-8" style={{ fontSize: "13px", color: "var(--ink)" }}>
                        <span style={{ color: "var(--green)", fontWeight: "800" }}>✓</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  <div className="price-row mt-auto">
                    <span className="price-current">{course.price}</span>
                    <span className="price-note">{course.priceNote}</span>
                  </div>
                  <Link
                    to={course.path}
                    className={`btn ${course.id === "32-day-level-up" ? "btn-primary" : "btn-secondary"} btn-block plan-cta mt-16`}
                  >
                    {course.cta}
                    <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>
      )}

      {/* 2. IELTS PREPARATION PROGRAMS */}
      {(activeCategory === "all" || activeCategory === "ielts") && (
        <motion.section
          className={activeCategory === "all" ? "bg-alt" : ""}
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="container">
            <div className="section-head mb-32">
              <span className="eyebrow blue">
                <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                IELTS Examination
              </span>
              <h2>Comprehensive IELTS Masterclasses</h2>
              <p className="muted mt-8">
                Structured strategies across Reading, Writing, Listening, and Speaking to achieve Band 7.5 to 8.5+.
              </p>
            </div>

            <motion.div
              className="plan-grid"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {/* 1. Recorded Course */}
              <motion.div variants={childVariant} className="plan-card recommended">
                <div className="flex items-center justify-between">
                  <img src="/images/icons/icon-play.webp" alt="Recorded Course" className="sticker-icon-md" />
                  <span className="badge-recommended">Flagship</span>
                </div>
                <span className="plan-name mt-8">Recorded Course</span>
                <span className="plan-for">Learn on your own flexible schedule</span>
                <p className="small muted">
                  Comprehensive 4-module video curriculum, 7 full timed mock tests, 7 speaking evaluations, and diagnostic writing reviews.
                </p>
                <div className="price-row mt-8">
                  <span className="price-current">₹5,000</span>
                  <span className="price-note">one-time fee</span>
                </div>
                <Link to="/recorded-ielts-course" className="btn btn-primary btn-block plan-cta">
                  <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                  View Recorded Course
                </Link>
              </motion.div>

              {/* 2. Live Course */}
              <motion.div variants={childVariant} className="plan-card">
                <img src="/images/icons/icon-calendar.webp" alt="Live Batches" className="sticker-icon-md" />
                <span className="plan-name mt-8">Live Batches</span>
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
                  <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
                </Link>
              </motion.div>

              {/* 3. Free Resources */}
              <motion.div variants={childVariant} className="plan-card">
                <img src="/images/icons/icon-mock-tests.webp" alt="Free Diagnostics" className="sticker-icon-md" />
                <span className="plan-name mt-8">Free Diagnostic Mock Tests</span>
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
                  <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      )}

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
            <span className="eyebrow">
              <img src="/images/icons/icon-shield-check.webp" alt="Compare" className="sticker-icon-sm" />
              Direct Comparison
            </span>
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

      {/* Clean Diagnostic Guidance Next Step */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container text-center">
          <div className="section-head center mb-24">
            <span className="eyebrow green">
              <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
              Not Sure Where to Start?
            </span>
            <h2>Get an exact recommendation for your level</h2>
            <p className="muted mt-8">
              Answer 3 simple questions to determine whether you need structured foundation, speaking practice, or mock tests.
            </p>
          </div>
          <div className="flex items-center justify-center gap-16 flex-wrap">
            <Link to="/what-is-ielts#quiz" className="btn btn-primary">
              <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
              Take the 2-Min Readiness Quiz
            </Link>
            <Link to="/mock-tests" className="btn btn-secondary">
              <img src="/images/icons/icon-mock-tests.webp" alt="Mock Tests" className="sticker-icon-sm" />
              Explore Free Mock Tests
            </Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
