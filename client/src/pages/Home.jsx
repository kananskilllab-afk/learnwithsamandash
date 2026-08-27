import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import GoogleReviewsMarquee from "../components/GoogleReviewsMarquee.jsx";

// Animation Variants for Continuous Scroll Flow & Cascading
const sectionVariant = {
  hidden: { opacity: 0, scale: 0.98, y: 30 },
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
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1
    }
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
  const [selectedTrack, setSelectedTrack] = useState("academic"); // 'academic' | 'general'

  return (
    <>
      {/* 1. HERO SECTION: Asymmetric Two-Column Editorial Poster Layout with Parallax Floating Badges */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-12 mb-16">
              <span className="eyebrow">
                <img src="/images/icons/icon-play.webp" alt="Community" className="sticker-icon-sm" />
                2.4M+ Community on YouTube
              </span>
              <motion.span
                className="sticker-callout"
                animate={{ y: [0, -3, 0] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              >
                Strategy First 🎯
              </motion.span>
            </div>

            <h1>
              Master IELTS with a <span className="marker-highlight">clear path</span> &amp; proven strategy.
            </h1>

            <p className="lede mt-24">
              Stop piecing together disconnected advice. Prepare for all four modules with an{" "}
              <span className="marker-highlight green">intentional</span>, structured system designed by IELTS trainers
              Sam &amp; Ash.
            </p>

            <div className="hero-ctas">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "hero" })}
              >
                <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                Start Recorded Course
              </Link>
              <Link to="/what-is-ielts#quiz" className="btn btn-secondary">
                Find My IELTS Path
                <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
              </Link>
            </div>

            <div className="flex items-center gap-16 mt-32">
              <motion.span
                className="sticker-callout alt"
                animate={{ y: [0, 5, 0], rotate: [2, 3.5, 2] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
              >
                Know your goal 🎯
              </motion.span>
              <p className="hero-tertiary">
                Planning to study abroad? <Link to="/study-abroad">Talk to an expert →</Link>
              </p>
            </div>
          </motion.div>

          {/* Right Column: Interactive Journey Progression Widget */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="journey-widget">
              <span className="journey-widget-badge">Interactive Roadmap</span>
              <div className="flex items-center justify-between mb-24">
                <div>
                  <h3 style={{ fontSize: 22, margin: 0 }}>Your IELTS Journey</h3>
                  <p className="small muted mt-8">A 4-step framework from fundamentals to Band 7.5+.</p>
                </div>
              </div>

              <div className="journey-step done">
                <div className="journey-step-node">✓</div>
                <div>
                  <b style={{ fontSize: 16 }}>1. Choose your test track</b>
                  <p className="small muted">Academic (University) vs. General Training (PR/Work)</p>
                </div>
              </div>

              <div className="journey-step done">
                <div className="journey-step-node">✓</div>
                <div>
                  <b style={{ fontSize: 16 }}>2. Know the 4 modules</b>
                  <p className="small muted">Listening, Reading, Writing &amp; Speaking scoring rubrics</p>
                </div>
              </div>

              <div className="journey-step active">
                <div className="journey-step-node">3</div>
                <div>
                  <div className="flex items-center gap-8">
                    <b style={{ fontSize: 16, color: "var(--blue)" }}>3. Set your target band</b>
                    <span className="tag" style={{ background: "var(--blue-50)", color: "var(--blue)", border: "1.5px solid var(--blue)" }}>In Progress</span>
                  </div>
                  <p className="small muted mt-8">Aiming for Band 7.5+ with structured feedback reviews</p>
                </div>
              </div>

              <div className="journey-step">
                <div className="journey-step-node">4</div>
                <div>
                  <b style={{ fontSize: 16 }}>4. Build &amp; execute your plan</b>
                  <p className="small muted">30 hours recorded lessons + 7 full mock tests</p>
                </div>
              </div>

              <div className="mt-24 pt-16" style={{ borderTop: "2px dashed var(--gray-200)" }}>
                <div className="flex items-center justify-between small">
                  <span className="muted">Readiness Progress: <b>65%</b></span>
                  <Link to="/what-is-ielts" className="btn-text">Explore breakdown</Link>
                </div>
                <div className="module-progress-bar" style={{ marginTop: 8 }}>
                  <motion.div
                    className="module-progress-fill"
                    initial={{ width: "0%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                    style={{ background: "var(--blue)" }}
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
            <img src="/images/icons/icon-play.webp" alt="YouTube" className="sticker-icon-md mb-8" />
            <span className="trust-num">2.4M+</span>
            <span className="trust-label">YouTube Subscribers</span>
          </div>
          <div className="trust-item">
            <img src="/images/icons/icon-views.webp" alt="Views" className="sticker-icon-md mb-8" />
            <span className="trust-num">15.7M+</span>
            <span className="trust-label">Course Video Views</span>
          </div>
          <div className="trust-item">
            <img src="/images/icons/icon-lessons.webp" alt="Lessons" className="sticker-icon-md mb-8" />
            <span className="trust-num">403+</span>
            <span className="trust-label">Masterclass Lessons</span>
          </div>
          <div className="trust-item">
            <img src="/images/icons/icon-shield-check.webp" alt="Modules" className="sticker-icon-md mb-8" />
            <span className="trust-num">4 / 4</span>
            <span className="trust-label">Modules Covered</span>
          </div>
        </div>
      </motion.div>

      {/* 3. INTERACTIVE MODULES & TRACK SELECTOR */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">IELTS Core Structure</span>
            <h2>First, understand the test format you need.</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Every candidate requires a tailored strategy. Choose your stream and explore how all four modules are tested.
            </p>
          </div>

          {/* Academic vs General Toggle Cards */}
          <div className="track-selector-grid mb-32">
            <motion.div
              whileHover={{ y: -3 }}
              className={`track-card${selectedTrack === "academic" ? " active" : ""}`}
              onClick={() => setSelectedTrack("academic")}
            >
              <span className="track-badge">
                {selectedTrack === "academic" ? "✓ Active Selection" : "Select Track"}
              </span>
              <h3>IELTS Academic</h3>
              <p className="muted small mt-8">
                Designed for undergraduate or postgraduate university admissions and professional registration (Medical, Nursing, Law, etc.).
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className={`track-card${selectedTrack === "general" ? " active" : ""}`}
              onClick={() => setSelectedTrack("general")}
            >
              <span className="track-badge">
                {selectedTrack === "general" ? "✓ Active Selection" : "Select Track"}
              </span>
              <h3>IELTS General Training</h3>
              <p className="muted small mt-8">
                Designed for permanent residency (Express Entry, PR visas), vocational training, and work opportunities abroad.
              </p>
            </motion.div>
          </div>

          {/* 4 Interactive Module Cards with Custom Icons */}
          <motion.div
            className="module-grid mt-32"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-listening.webp" alt="Listening Module" className="sticker-icon-lg" />
              </div>
              <h3>Listening</h3>
              <p className="muted small mt-8">
                Master 4 sections, 40 questions, multiple accents, and predictive keyword techniques.
              </p>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: "85%" }}></div>
              </div>
              <span className="small muted mt-8">8.5 Target Potential</span>
            </motion.div>

            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-reading.webp" alt="Reading Module" className="sticker-icon-lg" />
              </div>
              <h3>Reading</h3>
              <p className="muted small mt-8">
                {selectedTrack === "academic"
                  ? "3 long academic research texts. Skimming, scanning, and True/False/Not Given mastery."
                  : "Social, workplace, and general texts. Rapid info retrieval and table completion."}
              </p>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: "80%" }}></div>
              </div>
              <span className="small muted mt-8">8.0 Target Potential</span>
            </motion.div>

            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-writing.webp" alt="Writing Module" className="sticker-icon-lg" />
              </div>
              <h3>Writing</h3>
              <p className="muted small mt-8">
                {selectedTrack === "academic"
                  ? "Task 1 Graph/Diagram analysis + Task 2 250-word discursive essay structure."
                  : "Task 1 Formal/Informal Letter + Task 2 250-word discursive essay structure."}
              </p>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: "75%" }}></div>
              </div>
              <span className="small muted mt-8">7.5+ Target Potential</span>
            </motion.div>

            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-speaking.webp" alt="Speaking Module" className="sticker-icon-lg" />
              </div>
              <h3>Speaking</h3>
              <p className="muted small mt-8">
                Face-to-face interview simulation across Part 1, Cue Card Part 2, and abstract Part 3 discussion.
              </p>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: "90%" }}></div>
              </div>
              <span className="small muted mt-8">8.0 Target Potential</span>
            </motion.div>
          </motion.div>

          <div className="text-center mt-32">
            <Link to="/what-is-ielts" className="btn btn-secondary">
              Understand IELTS in 5 Minutes
              <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 4. RECOMMENDED PATH SPOTLIGHT (Poster Style) */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="spotlight-poster">
            <div>
              <span className="eyebrow" style={{ background: "rgba(255,255,255,0.15)", color: "var(--white)", borderColor: "rgba(255,255,255,0.4)" }}>
                Recommended Course
              </span>
              <h2>The Recorded IELTS Course — Your Complete Strategy</h2>
              <p className="lede mt-16">
                No fluff or confusing rules. Work through 30 hours of comprehensive modular training, download authentic practice sets, and submit your writing &amp; speaking tests for personalized review.
              </p>
              <div className="mt-32">
                <Link
                  to="/recorded-ielts-course"
                  className="btn btn-primary"
                  onClick={() => track("click_recorded_course_cta", { section: "spotlight" })}
                >
                  <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                  View Recorded Course (₹5,000)
                </Link>
              </div>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <img src="/images/icons/icon-hourglass.webp" alt="Hours" className="sticker-icon-md" />
                <div className="feature-text">
                  <b>30 Hours of Step-by-Step Lessons</b>
                  <span>Every question type demystified with clear band-9 criteria.</span>
                </div>
              </div>
              <div className="feature-item">
                <img src="/images/icons/icon-lessons.webp" alt="Materials" className="sticker-icon-md" />
                <div className="feature-text">
                  <b>Materials for All 4 Modules</b>
                  <span>Templates, high-scoring vocabulary banks, and mock papers.</span>
                </div>
              </div>
              <div className="feature-item">
                <img src="/images/icons/icon-mock-tests.webp" alt="Mock Tests" className="sticker-icon-md" />
                <div className="feature-text">
                  <b>7 Full Mock Tests + 7 Speaking Evaluations</b>
                  <span>Simulate real test-day pressures and pinpoint gaps.</span>
                </div>
              </div>
              <div className="feature-item">
                <img src="/images/icons/icon-writing.webp" alt="Reviews" className="sticker-icon-md" />
                <div className="feature-text">
                  <b>Detailed Writing Reviews</b>
                  <span>Direct diagnostic feedback on Task 1 and Task 2 submissions.</span>
                </div>
              </div>
              <div className="feature-item">
                <img src="/images/icons/icon-calendar.webp" alt="Access" className="sticker-icon-md" />
                <div className="feature-text">
                  <b>3 Months Unlimited Access</b>
                  <span>Study on your terms from mobile, tablet, or desktop.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. AUTHENTIC GOOGLE REVIEWS AUTO-SCROLLING MARQUEE */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">
              <img src="/images/icons/icon-star.webp" alt="Star" className="sticker-icon-sm" />
              Verified Student Reviews
            </span>
            <h2>Loved by 10,000+ IELTS test takers worldwide</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              See authentic Google reviews from students who transformed their preparation and achieved Band 7.5 to 8.5+.
            </p>
          </div>

          {/* Infinite Auto-Scrolling Google Reviews Marquee (Pauses on Hover) */}
          <GoogleReviewsMarquee />

          <p className="disclaimer text-center mt-32">
            Verified candidate reviews from official Google Business profile. Individual results depend on consistent practice.
          </p>
        </div>
      </motion.section>

      {/* 6. HOW IT WORKS / STEPS */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">5 Simple Steps</span>
            <h2>How the preparation system works</h2>
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
              <b>Enrol in seconds</b>
              <p>Secure instantaneous portal access with our seamless Razorpay checkout.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">2</div>
              <b>Watch video modules</b>
              <p>Work through 30 hours of high-definition video masterclasses.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">3</div>
              <b>Practise with sheets</b>
              <p>Apply methods directly on authentic question sets with sample answers.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">4</div>
              <b>Attempt mock tests</b>
              <p>Benchmark your speed and accuracy across 7 full-length timed tests.</p>
            </motion.div>
            <motion.div variants={childCardVariant} className="step">
              <div className="step-num">5</div>
              <b>Get trainer review</b>
              <p>Receive diagnostic feedback on your writing essays and speaking mocks.</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. SPOKEN ENGLISH & INTERVIEW BLUEPRINT PROGRAMS */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow green">
              <img src="/images/icons/icon-speaking.webp" alt="Speaking" className="sticker-icon-sm" />
              Spoken English &amp; Fluency
            </span>
            <h2>Transform your spoken English &amp; interview confidence</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Beyond IELTS — master everyday conversational fluency, eliminate hesitation, and perform under job interview pressure with Ash.
            </p>
          </div>

          <motion.div
            className="plan-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* 1. 32-Day English Level Up */}
            <motion.div variants={childCardVariant} className="plan-card recommended">
              <span className="badge-recommended">32-Day Journey</span>
              <span className="plan-name">32-Day English Level Up</span>
              <span className="plan-for">Structured Speaking Transformation</span>
              <p className="small muted">
                Turn grammar, vocabulary, and communication skills into usable spoken English through recorded masterclasses, live rooms &amp; daily missions.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">₹2,999</span>
                <span className="price-note">one-time cohort fee</span>
              </div>
              <Link to="/courses" className="btn btn-primary btn-block plan-cta">
                Explore 32-Day Level Up
              </Link>
            </motion.div>

            {/* 2. Speak with Ash */}
            <motion.div variants={childCardVariant} className="plan-card">
              <span className="google-band-tag">Monthly Club</span>
              <span className="plan-name mt-8">Speak with Ash</span>
              <span className="plan-for">Ongoing Human Speaking Membership</span>
              <p className="small muted">
                2 Live sessions with Ash/week, 1 trainer practice room, daily missions, and reviewed WhatsApp accountability.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">₹499</span>
                <span className="price-note">per month</span>
              </div>
              <Link to="/courses" className="btn btn-secondary btn-block plan-cta">
                Join Speak with Ash
              </Link>
            </motion.div>

            {/* 3. Interview Success Blueprint */}
            <motion.div variants={childCardVariant} className="plan-card">
              <span className="google-band-tag">4-Week Intensive</span>
              <span className="plan-name mt-8">Interview Success</span>
              <span className="plan-for">English-First Interview Performance</span>
              <p className="small muted">
                15 recorded sessions + 10 live mocks, 60–90s pitch, STAR answer framework, and official /35 scorecard.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">₹1,999</span>
                <span className="price-note">one-time fee</span>
              </div>
              <Link to="/courses" className="btn btn-secondary btn-block plan-cta">
                View Interview Course
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 7. CHOOSE YOUR PLAN */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow">Choose Your Path</span>
            <h2>Tailored preparation for every timeline</h2>
          </div>

          <motion.div
            className="plan-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <motion.div variants={childCardVariant} className="plan-card recommended">
              <span className="badge-recommended">Most Popular</span>
              <span className="plan-name">Recorded Course</span>
              <span className="plan-for">Best for self-paced, flexible learners</span>
              <p className="small muted">
                30 hours recorded lessons · All 4 modules · 7 mock tests · Writing &amp; speaking review included.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">₹5,000</span>
                <span className="price-note">one-time</span>
              </div>
              <Link to="/recorded-ielts-course" className="btn btn-primary btn-block plan-cta">
                Enrol in Recorded Course
              </Link>
            </motion.div>

            <motion.div variants={childCardVariant} className="plan-card">
              <span className="plan-name">Live Batches</span>
              <span className="plan-for">Best for structured classroom accountability</span>
              <p className="small muted">
                Live interactive workshops · Fixed batch timetable · Real-time teacher Q&amp;A sessions.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">Scheduled</span>
                <span className="price-note">by batch</span>
              </div>
              <Link to="/live-ielts-course" className="btn btn-secondary btn-block plan-cta">
                View Next Batch
              </Link>
            </motion.div>

            <motion.div variants={childCardVariant} className="plan-card">
              <span className="plan-name">Free Resources</span>
              <span className="plan-for">Best for quick diagnostics and self-study</span>
              <p className="small muted">
                Free IELTS readiness assessment · 30/60/90-day study blueprints · Sample video lesson.
              </p>
              <div className="price-row mt-8">
                <span className="price-current">Free</span>
                <span className="price-note">forever</span>
              </div>
              <Link to="/mock-tests" className="btn btn-secondary btn-block plan-cta">
                Explore Free Resources
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* 8. STUDY ABROAD BRIDGE */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="bridge-block">
            <div>
              <span className="eyebrow blue">
                <img src="/images/icons/icon-study-abroad.webp" alt="Global" className="sticker-icon-sm" />
                Study Abroad Advisory
              </span>
              <h2>Planning university applications overseas?</h2>
              <p className="muted mt-8">
                IELTS is just the first milestone. Speak directly with our study-abroad counselors for university shortlisting, SOP reviews, and visa paperwork.
              </p>
            </div>
            <Link
              to="/study-abroad"
              className="btn btn-secondary"
              style={{ flex: "none" }}
              onClick={() => track("study_abroad_cta", { section: "home_bridge" })}
            >
              Talk to a Study Abroad Expert
              <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 9. FINAL POSTER CTA BANNER */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to achieve your target IELTS score?</h2>
            <p>
              Join 10,000+ successful students. Choose between self-paced masterclasses, live batches, or free readiness tests.
            </p>
            <div className="cta-banner-actions">
              <Link
                to="/courses"
                className="btn btn-primary"
                onClick={() => track("click_courses_cta", { section: "final_cta" })}
              >
                Explore All Courses &amp; Batches
              </Link>
              <Link to="/what-is-ielts#quiz" className="btn btn-outline-inverse">
                Take the 2-Min Readiness Quiz
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
