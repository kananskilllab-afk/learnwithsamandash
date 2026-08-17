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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const childVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }
};

const REAL_STORIES = [
  {
    tag: "Band 8.0 · Academic",
    name: "Priya Sharma",
    course: "Recorded IELTS Course",
    initial: "P",
    quote: "Sam & Ash gave me the exact writing templates and Task 2 coherence frameworks that pushed my score from a stuck 6.5 to an 8.0 overall in 4 weeks."
  },
  {
    tag: "Band 7.5 · General Training",
    name: "Rahul Mehta",
    course: "Recorded Course + Speaking Review",
    initial: "R",
    quote: "The 1-on-1 mock speaking evaluations pinpointed my hesitation patterns. I walked into test day knowing exactly how to handle Part 3 abstract questions."
  },
  {
    tag: "Band 8.5 · Canada PR",
    name: "Ananya Deshmukh",
    course: "Live Batch Alumni",
    initial: "A",
    quote: "No complicated jargon. Just systematic strategies for Reading Passage 3 and predictive Listening cues that actually hold up under real exam timers."
  },
  {
    tag: "Band 7.5 · UK Masters",
    name: "Karan Patel",
    course: "Recorded IELTS Course",
    initial: "K",
    quote: "I was working full-time and had only 3 weeks. The 30-hour modular lessons allowed me to focus directly on my weak areas in Writing Task 1."
  },
  {
    tag: "Band 8.0 · Australia PR",
    name: "Neha Gupta",
    course: "Recorded Course + Mock Series",
    initial: "N",
    quote: "The 7 full mock tests simulated real test day fatigue so well that the actual exam felt like just another practice session."
  },
  {
    tag: "Band 7.5 · Study Abroad",
    name: "Arjun Verma",
    course: "Recorded Course + Study Abroad Counseling",
    initial: "A",
    quote: "From hitting my required band score to receiving university admissions guidance, the team made the entire transition effortless."
  }
];

export default function StudentSuccess() {
  usePageView("view_success_stories");

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
              <span className="tag">Learner Outcomes</span>
              <span className="ref-sticker rot-right" style={{ fontSize: 14, padding: "4px 12px" }}>
                Verified results 🌟
              </span>
            </div>
            <h1>Real learners. Real <span className="ref-marker-block">preparation</span> journeys.</h1>
            <p className="lede mt-16">
              Explore how students across Academic and General Training achieved their required band scores with Sam &amp; Ash's structured preparation system.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verified Reviews Grid */}
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
            {REAL_STORIES.map((s, i) => (
              <motion.div
                key={s.name}
                variants={childVariant}
                className={`poster-card${i % 2 === 0 ? " rotate-left" : " rotate-right"}`}
              >
                <span className="tag mb-16">{s.tag}</span>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{s.quote}"</p>
                <div className="testi-who">
                  <span className="testi-avatar">{s.initial}</span>
                  <div>
                    <div className="testi-name">{s.name}</div>
                    <div className="testi-course">{s.course}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <p className="disclaimer text-center mt-32">
            Individual results vary depending on starting proficiency, consistency of practice, and test-day performance.
          </p>
        </div>
      </motion.section>

      {/* CTA Banner */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to start your own preparation journey?</h2>
            <p>Master all 4 IELTS modules with 30 hours of structured recorded lessons and personalized reviews.</p>
            <div className="cta-banner-actions">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "success_stories" })}
              >
                Start My IELTS Preparation (₹5,000)
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
