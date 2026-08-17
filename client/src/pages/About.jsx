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
              <span className="eyebrow">Behind the Channel</span>
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

      {/* 2. Channel Milestones */}
      <motion.div
        className="trust-strip"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="container trust-row">
          <div className="trust-item">
            <span className="trust-num">2.4M+</span>
            <span className="trust-label">Subscribers</span>
          </div>
          <div className="trust-item">
            <span className="trust-num">403+</span>
            <span className="trust-label">Videos Published</span>
          </div>
          <div className="trust-item">
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
          <div className="grid-2">
            <div className="poster-card">
              <span className="tag mb-16">Co-Founder &amp; Trainer</span>
              <h3>Sam</h3>
              <p className="muted mt-12">
                Language educator, YouTuber, and IELTS specialist. Sam focuses on analytical writing structures, cohesion markers, and reading comprehension strategies that eliminate second-guessing.
              </p>
            </div>

            <div className="poster-card">
              <span className="tag mb-16">Co-Founder &amp; Trainer</span>
              <h3>Ash</h3>
              <p className="muted mt-12">
                Communication coach and IELTS trainer. Ash specializes in natural speaking fluency, lexical precision, accent neutralization, and overcoming exam anxiety in face-to-face interviews.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 4. Teaching Philosophy */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow text-center">
          <div className="poster-card bg-pastel-yellow">
            <span className="eyebrow dark">Core Methodology</span>
            <h2>Our Teaching Philosophy</h2>
            <p className="muted mt-16" style={{ fontSize: 17, lineHeight: 1.7 }}>
              Simple explanations. Authentic examples. Structured preparation. Continuous diagnostic practice. We believe learner confidence is built through understanding exam rubrics — not through gimmicks or false promises.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 5. Final CTA */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to learn with us?</h2>
            <p>Take the structured next step beyond our free YouTube lessons.</p>
            <div className="cta-banner-actions">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "about_final" })}
              >
                Start the Recorded Course (₹5,000)
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
