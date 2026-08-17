import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";

// Target Swirl Icon SVG matching reference
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

// Animation Variants
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
      {/* 1. HERO SECTION: Recreating the Exact Reference Layout ("Who We Are:" -> "We build brands that feel intentional") */}
      <section className="hero">
        <div className="container hero-grid">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow matching reference header: "Who We Are:" */}
            <span className="eyebrow-reference">Who We Are:</span>

            {/* Main Headline styled like reference with lime pin-tab highlighter block & sticker callouts */}
            <h1>
              We build{" "}
              <motion.span
                className="ref-sticker rot-right"
                animate={{ y: [0, -5, 0], rotate: [2.5, 4, 2.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                style={{ verticalAlign: "middle", margin: "0 8px 6px 4px" }}
              >
                <TargetDartIcon /> Strategy first
              </motion.span>
              <br />
              <span className="ref-marker-block">brands</span> that feel
              <br />
              intentional.
              <motion.span
                className="ref-sticker rot-left-lg"
                animate={{ y: [0, 4, 0], rotate: [-3.5, -2, -3.5] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.4 }}
                style={{ verticalAlign: "middle", margin: "0 6px 6px 12px", fontSize: 15 }}
              >
                <TargetDartIcon /> Design with meaning
              </motion.span>
              <br />
              From <b style={{ fontStyle: "italic" }}>identity</b> to execution.
            </h1>

            <div className="flex items-center gap-16 mt-24">
              <motion.span
                className="ref-sticker rot-right-lg"
                animate={{ y: [0, -4, 0], rotate: [3, 1.5, 3] }}
                transition={{ repeat: Infinity, duration: 4.2, ease: "easeInOut", delay: 0.8 }}
              >
                <TargetDartIcon /> Built to scale
              </motion.span>
              <p className="hero-tertiary">
                2.4M+ Community · <Link to="/what-is-ielts">Explore the method →</Link>
              </p>
            </div>

            <p className="lede mt-24">
              Stop piecing together disconnected IELTS advice. Prepare for all four modules with an{" "}
              <b style={{ textDecoration: "underline", textUnderlineOffset: 4 }}>intentional, structured system</b> designed by trainers Sam &amp; Ash.
            </p>

            <div className="hero-ctas">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "hero" })}
              >
                Start Recorded Course (₹5,000)
              </Link>
              <Link to="/what-is-ielts#quiz" className="btn btn-secondary">
                Find My IELTS Path
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Interactive Journey Progression Widget in Reference Boxed Style */}
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
            <span className="trust-label">Course Video Views</span>
          </div>
          <div className="trust-item">
            <span className="trust-num">403+</span>
            <span className="trust-label">Masterclass Lessons</span>
          </div>
          <div className="trust-item">
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
            <span className="tag mb-16">IELTS Structure</span>
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
                Designed for undergraduate or postgraduate university admissions and professional licensing (Medical, Nursing, Law).
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

          {/* 4 Interactive Module Cards */}
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
                Master 4 sections, 40 questions, multiple accents, and predictive keyword techniques.
              </p>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: "85%" }}></div>
              </div>
              <span className="small muted mt-8">8.5 Target Potential</span>
            </motion.div>

            <motion.div variants={childCardVariant} className="module-card">
              <div className="module-icon-wrap">R</div>
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
              <div className="module-icon-wrap">W</div>
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
              <div className="module-icon-wrap">S</div>
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
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 4. RECOMMENDED PATH SPOTLIGHT (Poster Style) */}
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
                  View Recorded Course (₹5,000)
                </Link>
              </div>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>30 Hours of Step-by-Step Lessons</b>
                  <span>Every question type demystified with clear band-9 criteria.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>Materials for All 4 Modules</b>
                  <span>Templates, high-scoring vocabulary banks, and mock papers.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>7 Full Mock Tests + 7 Speaking Evaluations</b>
                  <span>Simulate real test-day pressures and pinpoint gaps.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>Detailed Writing Reviews</b>
                  <span>Direct diagnostic feedback on Task 1 and Task 2 submissions.</span>
                </div>
              </div>
              <div className="feature-item">
                <span className="feature-check">✓</span>
                <div className="feature-text">
                  <b>3 Months Unlimited Access</b>
                  <span>Study on your terms from mobile, tablet, or desktop.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 5. TACTILE TESTIMONIAL & REVIEW STICKER SECTION */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">Proven Results</span>
            <h2>What ambitious learners say</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Join thousands of students who went from guessing question patterns to achieving their target band.
            </p>
          </div>

          <motion.div
            className="grid-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Review Card 1 (Rotated Left) */}
            <motion.div variants={childCardVariant} className="poster-card rotate-left">
              <span className="tag mb-16">Band 8.0 · Academic</span>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">
                "Sam &amp; Ash gave me the exact writing templates that pushed my score from a stuck 6.5 to an 8.0 in just 4 weeks."
              </p>
              <div className="testi-who">
                <span className="testi-avatar">P</span>
                <div>
                  <div className="testi-name">Priya Sharma</div>
                  <div className="testi-course">Recorded IELTS Course</div>
                </div>
              </div>
            </motion.div>

            {/* Review Card 2 (Crisp White Center) */}
            <motion.div variants={childCardVariant} className="poster-card">
              <span className="tag mb-16">Band 7.5 · General Training</span>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">
                "The mock speaking evaluations made all the difference. I knew exactly what examiners look for in fluency and coherence."
              </p>
              <div className="testi-who">
                <span className="testi-avatar">R</span>
                <div>
                  <div className="testi-name">Rahul Mehta</div>
                  <div className="testi-course">Recorded Course + Speaking Review</div>
                </div>
              </div>
            </motion.div>

            {/* Review Card 3 (Rotated Right) */}
            <motion.div variants={childCardVariant} className="poster-card rotate-right">
              <span className="tag mb-16">Band 8.5 · Canada PR</span>
              <div className="testi-stars">★★★★★</div>
              <p className="testi-quote">
                "No complicated jargon. Just systematic strategies for Reading and Listening that actually work under real exam timers."
              </p>
              <div className="testi-who">
                <span className="testi-avatar">A</span>
                <div>
                  <div className="testi-name">Ananya Deshmukh</div>
                  <div className="testi-course">Live Batch Alumni</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <p className="disclaimer text-center">
            Individual results depend on initial foundation, practice consistency, and individual test-day execution.
          </p>
        </div>
      </motion.section>

      {/* 6. HOW IT WORKS / STEPS */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">5 Simple Steps</span>
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

      {/* 7. CHOOSE YOUR PLAN */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="tag mb-16">Choose Your Path</span>
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
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="container">
          <div className="bridge-block">
            <div>
              <span className="tag mb-16">Study Abroad Advisory</span>
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
            <h2>Ready to stop piecing IELTS together?</h2>
            <p>
              Start the complete recorded course today and prepare with confidence, clarity, and system.
            </p>
            <div className="cta-banner-actions">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "final_cta" })}
              >
                Start My IELTS Preparation
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
