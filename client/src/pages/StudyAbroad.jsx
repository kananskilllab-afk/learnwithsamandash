import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import StudyAbroadForm from "../components/StudyAbroadForm.jsx";

const sectionVariant = {
  hidden: { opacity: 0, scale: 0.98, y: 28 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function StudyAbroad() {
  usePageView("view_study_abroad");

  return (
    <>
      <section className="page-hero">
        <div className="container container-narrow text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-center gap-12 mb-16">
              <span className="eyebrow blue">
                <img src="/images/icons/icon-study-abroad.webp" alt="Global" className="sticker-icon-sm" />
                Overseas Admissions
              </span>
              <motion.span
                className="sticker-callout"
                animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                Global opportunities 🎓
              </motion.span>
            </div>
            <h1>IELTS is only one milestone in your <span className="marker-highlight">study abroad</span> journey.</h1>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Leave your contact information below. Our experienced study-abroad counselors will reach out to help with university shortlisting, SOP documentation, and visa filings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form Container with Custom Sliced Icon */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow">
          <div className="form-card">
            <span className="eyebrow green">
              <img src="/images/icons/icon-user-login.webp" alt="Counselor" className="sticker-icon-sm" />
              1-on-1 Consultation
            </span>
            <h2>Talk to an Overseas Education Counselor</h2>
            <p className="muted mt-8 small">
              Share your details — takes less than 30 seconds. No spam, just actionable admission guidance.
            </p>
            <StudyAbroadForm />
          </div>
        </div>
      </motion.section>

      {/* Bridge Back to Course */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow text-center">
          <div className="poster-card">
            <img src="/images/icons/icon-graduation-video.webp" alt="Course" className="sticker-icon-lg mb-16" />
            <h2>Preparing for IELTS while finalizing universities?</h2>
            <p className="muted mt-16">
              Don't delay your language preparation. Start our comprehensive recorded IELTS course today.
            </p>
            <div className="mt-24">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "study_abroad_bridge" })}
              >
                <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                Start the Recorded Course (₹5,000)
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
