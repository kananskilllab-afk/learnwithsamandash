import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";

const sectionVariant = {
  hidden: { opacity: 0, scale: 0.98, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function About() {
  usePageView("view_about");

  return (
    <>
      {/* 1. Page Hero */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-12 mb-16">
              <span className="eyebrow">
                <img src="/images/icons/icon-play.webp" alt="Play" className="sticker-icon-sm" />
                Behind the Channel
              </span>
              <span className="sticker-callout">2.4M Community 🎥</span>
            </div>
            <h1>You may know us from YouTube. Here is what we're <span className="marker-highlight">building</span> next.</h1>
            <p className="lede mt-24">
              Learn With Sam &amp; Ash is dedicated to demystifying IELTS and English proficiency through crystal-clear explanations, exam psychology, and structured rubrics.
            </p>
            <div className="mt-32">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "about_hero" })}
              >
                <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                Explore the Recorded Course
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="poster-card bg-pastel-green">
              <div className="flex items-center gap-16 mb-16">
                <div style={{ width: 52, height: 52, borderRadius: "50%", background: "var(--ink)", color: "var(--white)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 20 }}>
                  S&amp;A
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>Sam &amp; Ash</h3>
                  <p className="small muted">Lead IELTS Instructors</p>
                </div>
              </div>
              <p className="muted small">
                Over 7 years of online and classroom training helping students achieve Bands 7.0, 8.0, and 8.5 in their very first attempts.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Channel Milestones with Sliced Icons */}
      <motion.div
        className="trust-strip"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container trust-row">
          <div className="trust-item">
            <img src="/images/icons/icon-play.webp" alt="Subscribers" className="sticker-icon-md mb-8" />
            <span className="trust-num">2.4M+</span>
            <span className="trust-label">Subscribers</span>
          </div>
          <div className="trust-item">
            <img src="/images/icons/icon-lessons.webp" alt="Lessons" className="sticker-icon-md mb-8" />
            <span className="trust-num">403+</span>
            <span className="trust-label">Videos Published</span>
          </div>
          <div className="trust-item">
            <img src="/images/icons/icon-views.webp" alt="Views" className="sticker-icon-md mb-8" />
            <span className="trust-num">15.7M+</span>
            <span className="trust-label">Flagship Course Views</span>
          </div>
        </div>
      </motion.div>

      {/* 3. Creator Profiles */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">
              <img src="/images/icons/icon-star.webp" alt="Star" className="sticker-icon-sm" />
              The Instructors
            </span>
            <h2>Meet Sam &amp; Ash</h2>
          </div>
          <div className="grid-2">
            <div className="poster-card">
              <span className="tag mb-16">Co-Founder &amp; Instructor</span>
              <h3>Ashish "Ash"</h3>
              <p className="muted small mt-8">
                Specialises in analytical writing frameworks, lexical resource development, and reading question-type mechanics. Known for breaking down complex scoring rubrics into simple step-by-step algorithms.
              </p>
            </div>
            <div className="poster-card">
              <span className="tag mb-16">Co-Founder &amp; Instructor</span>
              <h3>Sam</h3>
              <p className="muted small mt-8">
                Focuses on speaking fluency, accent comprehension, active listening strategies, and exam psychology. Has coached thousands of students to overcome test anxiety and speak with natural authority.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Methodology Section */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="eyebrow">
              <img src="/images/icons/icon-shield-check.webp" alt="Shield" className="sticker-icon-sm" />
              Philosophy
            </span>
            <h2>Our Teaching Philosophy</h2>
          </div>
          <div className="grid-3 mt-32">
            <div className="poster-card bg-pastel-yellow">
              <img src="/images/icons/icon-target.webp" alt="Clarity" className="sticker-icon-md mb-16" />
              <h3>Clarity Over Jargon</h3>
              <p className="muted small mt-8">No confusing grammar terminology where simple rules work.</p>
            </div>
            <div className="poster-card bg-pastel-green">
              <img src="/images/icons/icon-mock-tests.webp" alt="Rubrics" className="sticker-icon-md mb-16" />
              <h3>Rubric-Aligned</h3>
              <p className="muted small mt-8">Every lesson teaches exactly what official examiners score.</p>
            </div>
            <div className="poster-card bg-pastel-pink">
              <img src="/images/icons/icon-hourglass.webp" alt="Efficiency" className="sticker-icon-md mb-16" />
              <h3>Actionable Practice</h3>
              <p className="muted small mt-8">Methods you can test and verify in timed mock sessions.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. Clean Contextual Next Step */}
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
              <img src="/images/icons/icon-play.webp" alt="YouTube" className="sticker-icon-sm" />
              Learn with Sam &amp; Ash
            </span>
            <h2>Ready to start your preparation?</h2>
            <p className="muted mt-8">
              Explore our full catalog of structured IELTS &amp; Spoken English masterclasses.
            </p>
          </div>
          <div className="flex items-center justify-center gap-16 flex-wrap">
            <Link to="/courses" className="btn btn-primary">
              <img src="/images/icons/icon-lessons.webp" alt="Courses" className="sticker-icon-sm" />
              Explore All Courses
            </Link>
            <a
              href="https://www.youtube.com/@LearnWithSamAndAsh"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <img src="/images/icons/icon-play.webp" alt="YouTube" className="sticker-icon-sm" />
              Watch on YouTube (2.4M+)
            </a>
          </div>
        </div>
      </motion.section>
    </>
  );
}
