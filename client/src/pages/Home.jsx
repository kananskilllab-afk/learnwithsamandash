import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";

function TargetDartIcon() {
  return (
    <svg
      className="target-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
    </svg>
  );
}

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

const childCardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function Home() {
  usePageView("view_home");
  const [selectedTrack, setSelectedTrack] = useState("academic");

  return (
    <>
      {/* 1. HERO SECTION: Educational, Honest, Calm & Structured */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="eyebrow-reference">Learn With Sam &amp; Ash:</span>

            <h1>
              We teach{" "}
              <motion.span
                className="ref-sticker rot-right"
                animate={{ y: [0, -5, 0], rotate: [2.5, 4, 2.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ verticalAlign: "middle", margin: "0 8px 6px 4px" }}
              >
                <TargetDartIcon /> Strategy first
              </motion.span>
              <br />
              <span className="ref-marker-block">IELTS preparation</span> that feels
              <br />
              clear &amp; simple.
              <motion.span
                className="ref-sticker rot-left-lg"
                animate={{ y: [0, 4, 0], rotate: [-3.5, -2, -3.5] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.4 }}
                style={{ verticalAlign: "middle", margin: "0 6px 6px 12px", fontSize: 15 }}
              >
                <TargetDartIcon /> Learn at your pace
              </motion.span>
              <br />
              From <b style={{ fontStyle: "italic" }}>basics</b> to test day.
            </h1>

            <div className="flex items-center gap-16 mt-24">
              <motion.span
                className="ref-sticker rot-right-lg"
                animate={{ y: [0, -4, 0], rotate: [3, 1.5, 3] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.8 }}
              >
                <TargetDartIcon /> 4 Modules Covered
              </motion.span>
              <p className="hero-tertiary">
                2.4M+ YouTube Community · <Link to="/what-is-ielts">Understand IELTS →</Link>
              </p>
            </div>

            <p className="lede mt-24">
              A calm, structured course covering Listening, Reading, Writing, and Speaking with practical lessons, materials, sample answers, and mock tests.
            </p>

            <div className="hero-ctas">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "hero" })}
              >
                Explore Recorded Course
              </Link>
              <Link to="/what-is-ielts#quiz" className="btn btn-secondary">
                Find My IELTS Path
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Journey Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="journey-widget">
              <span className="journey-widget-badge">Study Roadmap</span>
              <div className="flex items-center justify-between mb-24">
                <div>
                  <h3 style={{ fontSize: 22, margin: 0 }}>Your IELTS Journey</h3>
                  <p className="small muted mt-8">A clear 4-step framework from format basics to test day.</p>
                </div>
              </div>

              <div className="journey-step done">
                <div className="journey-step-node">✓</div>
                <div>
                  <b style={{ fontSize: 16 }}>1. Choose your test type</b>
                  <p className="small muted">Academic (University study) vs. General Training (Work &amp; Migration)</p>
                </div>
              </div>

              <div className="journey-step done">
                <div className="journey-step-node">✓</div>
                <div>
                  <b style={{ fontSize: 16 }}>2. Understand the 4 modules</b>
                  <p className="small muted">Question types and how each module is evaluated</p>
                </div>
              </div>

              <div className="journey-step active">
                <div className="journey-step-node">3</div>
                <div>
                  <div className="flex items-center gap-8">
                    <b style={{ fontSize: 16, color: "var(--blue)" }}>3. Set your target band</b>
                    <span className="tag" style={{ background: "var(--blue-50)", color: "var(--blue)", border: "1.5px solid var(--blue)" }}>In Progress</span>
                  </div>
                  <p className="small muted mt-8">Understand score requirements for your application</p>
                </div>
              </div>

              <div className="journey-step">
                <div className="journey-step-node">4</div>
                <div>
                  <b style={{ fontSize: 16 }}>4. Follow a preparation plan</b>
                  <p className="small muted">Structured video lessons, practice exercises &amp; mock tests</p>
                </div>
              </div>

              <div className="mt-24 pt-16" style={{ borderTop: "2px dashed var(--gray-200)" }}>
                <div className="flex items-center justify-between small">
                  <span className="muted">Preparation Progress: <b>Step 3 of 4</b></span>
                  <Link to="/what-is-ielts" className="btn-text">Read guide</Link>
                </div>
                <div className="module-progress-bar" style={{ marginTop: 8 }}>
                  <motion.div
                    className="module-progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. TRUST STATS STRIP */}
      <motion.div
        className="trust-strip"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container trust-row">
          <div className="trust-item">
            <span className="trust-num">2.4M+</span>
            <span className="trust-label">YouTube Subscribers</span>
          </div>
          <div className="trust-item">
            <span className="trust-num">15.7M+</span>
            <span className="trust-label">Views on 10-Hr Course</span>
          </div>
          <div className="trust-item">
            <span className="trust-num">403+</span>
            <span className="trust-label">Free Lessons Published</span>
          </div>
          <div className="trust-item">
            <span className="trust-num">4 / 4</span>
            <span className="trust-label">IELTS Modules Covered</span>
          </div>
        </div>
      </motion.div>

      {/* 3. UNDERSTANDING IELTS */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">IELTS Basics</span>
            <h2>First, understand the exam you are taking.</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              IELTS tests your Listening, Reading, Writing, and Speaking skills. Your required test type and band score depend on where you are applying.
            </p>
          </div>

          {/* Academic vs General Training Toggle */}
          <div className="track-selector-grid mb-32">
            <motion.div
              whileHover={{ y: -3 }}
              className={`track-card${selectedTrack === "academic" ? " active" : ""}`}
              onClick={() => setSelectedTrack("academic")}
            >
              <span className="track-badge">
                {selectedTrack === "academic" ? "✓ Viewing Academic" : "View Academic"}
              </span>
              <h3>IELTS Academic</h3>
              <p className="muted small mt-8">
                Typically required for university admission (undergraduate and postgraduate) and professional registration.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className={`track-card${selectedTrack === "general" ? " active" : ""}`}
              onClick={() => setSelectedTrack("general")}
            >
              <span className="track-badge">
                {selectedTrack === "general" ? "✓ Viewing General" : "View General"}
              </span>
              <h3>IELTS General Training</h3>
              <p className="muted small mt-8">
                Typically required for work opportunities, permanent residency visas, and secondary or vocational education.
              </p>
            </motion.div>
          </div>

          {/* 4 Module Cards */}
          <motion.div
            className="module-grid mt-32"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">L</div>
              <h3>Listening</h3>
              <p className="muted small mt-8">
                4 recordings, 40 questions (~30 minutes). Learn question types, accents, prediction, and answer accuracy.
              </p>
            </motion.div>

            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">R</div>
              <h3>Reading</h3>
              <p className="muted small mt-8">
                {selectedTrack === "academic"
                  ? "3 academic texts, 40 questions (60 minutes). Build reading speed, locate evidence, and handle True/False/Not Given."
                  : "Everyday and workplace texts, 40 questions (60 minutes). Practice fast information scanning and table completion."}
              </p>
            </motion.div>

            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">W</div>
              <h3>Writing</h3>
              <p className="muted small mt-8">
                {selectedTrack === "academic"
                  ? "Task 1 (Report/Chart, 150 words) + Task 2 (Essay, 250 words, 60 minutes). Learn essay structure, planning, and grammar."
                  : "Task 1 (Letter, 150 words) + Task 2 (Essay, 250 words, 60 minutes). Master tone, purpose, and clear organization."}
              </p>
            </motion.div>

            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">S</div>
              <h3>Speaking</h3>
              <p className="muted small mt-8">
                3 parts (11–14 minutes). Prepare for Part 1 introduction, Part 2 cue cards, and Part 3 discussion with structured practice.
              </p>
            </motion.div>
          </motion.div>

          <div className="text-center mt-32">
            <Link to="/what-is-ielts" className="btn btn-secondary">
              Understand IELTS in 5 Minutes
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 4. THE RECORDED COURSE (Calm Overview) */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="spotlight-poster">
            <div>
              <span className="tag" style={{ marginBottom: 16 }}>
                Recommended Path
              </span>
              <h2>The Recorded IELTS Course</h2>
              <p className="lede mt-16">
                A flexible self-paced preparation path. Follow a complete 4-module curriculum with lessons, study materials, practice sets, mock tests, and review support.
              </p>
              <div className="mt-32">
                <Link
                  to="/recorded-ielts-course"
                  className="btn btn-primary"
                  onClick={() => track("click_recorded_course_cta", { section: "spotlight" })}
                >
                  View Recorded Course
                </Link>
              </div>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>30 Hours of Recorded Lessons</b>
                  <span>A complete structured learning path you can revisit anytime.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>Materials for All 4 Modules</b>
                  <span>Practise alongside the teaching, not just watching videos.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>7 Full Mock Tests + 7 Speaking Tests</b>
                  <span>Practise under realistic test conditions.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>Writing &amp; Speaking Reviews</b>
                  <span>Get direct input and feedback on your work.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>3-Month Course Access</b>
                  <span>A defined window to complete and review your preparation.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. LEARNER EXPERIENCES */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">Learner Feedback</span>
            <h2>What learners say about the course</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Experiences from students who prepared for IELTS with Sam &amp; Ash.
            </p>
          </div>

          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={childCardVariant} className="poster-card rotate-left">
              <span className="tag mb-16">Academic Preparation</span>
              <p className="testi-quote">
                "The writing templates and structure explanations helped me organize my Task 2 essays clearly and avoid getting stuck on introductions."
              </p>
              <div className="testi-who">
                <span className="testi-avatar">P</span>
                <div>
                  <div className="testi-name">Priya Sharma</div>
                  <div className="testi-course">Recorded IELTS Course</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={childCardVariant} className="poster-card">
              <span className="tag mb-16">General Training</span>
              <p className="testi-quote">
                "The speaking mock sessions gave me a clear idea of how examiners evaluate fluency and how to answer Part 3 questions without pausing."
              </p>
              <div className="testi-who">
                <span className="testi-avatar">R</span>
                <div>
                  <div className="testi-name">Rahul Mehta</div>
                  <div className="testi-course">Recorded Course + Speaking Review</div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={childCardVariant} className="poster-card rotate-right">
              <span className="tag mb-16">Self-Paced Learner</span>
              <p className="testi-quote">
                "Simple explanations without unnecessary tricks. The Reading passage strategies helped me manage my timing across all three sections."
              </p>
              <div className="testi-who">
                <span className="testi-avatar">A</span>
                <div>
                  <div className="testi-name">Ananya Deshmukh</div>
                  <div className="testi-course">Recorded IELTS Course</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <p className="disclaimer text-center">
            Individual results depend on starting English proficiency, preparation time, practice consistency, and test-day performance.
          </p>
        </div>
      </motion.section>

      {/* 6. HOW PREPARATION WORKS */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">How It Works</span>
            <h2>How the course is structured</h2>
          </div>
          <motion.div
            className="steps"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">1</div>
              <b>Enrol</b>
              <p>Choose the recorded course and complete registration.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">2</div>
              <b>Get access</b>
              <p>Receive access and start with the recommended module order.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">3</div>
              <b>Learn &amp; practise</b>
              <p>Watch lessons, use study materials, and work through question types.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">4</div>
              <b>Test yourself</b>
              <p>Use full mock tests and speaking practice to identify gaps.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">5</div>
              <b>Get review</b>
              <p>Use the included writing and speaking review workflow.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 7. CHOOSE YOUR PATH */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">Choose Your Path</span>
            <h2>Every learner prepares differently</h2>
          </div>

          <motion.div
            className="plan-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={childCardVariant} className="plan-card recommended">
              <span className="badge-recommended">Recommended</span>
              <span className="plan-name">Recorded Course</span>
              <span className="plan-for">Best for flexible, self-paced learners</span>
              <p className="small muted">
                30 hours recorded lessons · All 4 modules · 7 mock tests · Writing &amp; speaking review support.
              </p>
              <Link to="/recorded-ielts-course" className="btn btn-primary btn-block plan-cta">
                View Recorded Course
              </Link>
            </motion.div>

            <motion.div variants={childCardVariant} className="plan-card">
              <span className="plan-name">Live Course</span>
              <span className="plan-for">Best for scheduled, accountable learners</span>
              <p className="small muted">
                Live sessions · Fixed batch timetable · Classroom interaction.
              </p>
              <Link to="/live-ielts-course" className="btn btn-secondary btn-block plan-cta">
                View Live Batches
              </Link>
            </motion.div>

            <motion.div variants={childCardVariant} className="plan-card">
              <span className="plan-name">Free Resources</span>
              <span className="plan-for">Best for practice and self-assessment</span>
              <p className="small muted">
                Free IELTS readiness assessment · Sample study plan · Overview guides.
              </p>
              <Link to="/mock-tests" className="btn btn-secondary btn-block plan-cta">
                Explore Resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 8. STUDY ABROAD BRIDGE */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="bridge-block">
            <div>
              <span className="tag mb-16">Study Abroad Guidance</span>
              <h2>Planning to study abroad?</h2>
              <p className="muted mt-8">
                IELTS is one part of the journey. If you need help with university applications or visa guidance, our consultant can talk through your plan.
              </p>
            </div>
            <Link
              to="/study-abroad"
              className="btn btn-secondary"
              style={{ flex: "none" }}
              onClick={() => track("study_abroad_cta", { section: "home_bridge" })}
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 9. FINAL CTA BANNER */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to start preparing?</h2>
            <p>
              Follow a structured system for Listening, Reading, Writing, and Speaking at your own pace.
            </p>
            <div className="cta-banner-actions">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "final_cta" })}
              >
                Start Recorded Course
              </Link>
              <Link to="/what-is-ielts#quiz" className="btn btn-secondary" style={{ background: "transparent", color: "var(--white)", borderColor: "var(--white)" }}>
                Find My IELTS Path
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
