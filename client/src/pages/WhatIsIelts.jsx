import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { FaqGroup } from "../components/FaqAccordion.jsx";
import Quiz from "../components/Quiz.jsx";

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
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }
};

const MISTAKES_FAQS = [
  { q: "Mistake 1: Preparing without knowing which test type you need", a: "Academic and General Training have different Reading and Task 1 Writing requirements. Confirming this first prevents wasted study time." },
  { q: "Mistake 2: Chasing 'tricks' instead of mastering question types", a: "Examiners test true language competence and question logic. Relying solely on shortcuts will break down in complex passages and Part 3 speaking." },
  { q: "Mistake 3: Ignoring writing and speaking diagnostic feedback", a: "Reading and listening can be self-marked, but productive skills (Writing & Speaking) require expert rubric review to identify recurring grammatical or lexical errors." },
  { q: "Mistake 4: Never practicing under authentic timed exam conditions", a: "Many students know the answers but run out of time on Reading Passage 3 or Writing Task 2. Full timed mocks build indispensable test endurance." }
];

export default function WhatIsIelts() {
  usePageView("view_what_is_ielts");
  const [selectedFormat, setSelectedFormat] = useState("academic");

  return (
    <>
      {/* 1. Page Hero */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-12 mb-16">
              <span className="eyebrow blue">
                <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                IELTS Fundamentals
              </span>
              <motion.span
                className="sticker-callout"
                animate={{ y: [0, -4, 0], rotate: [-2.5, -1, -2.5] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                Step-by-step roadmap 🧭
              </motion.span>
            </div>
            <h1>New to IELTS? Here is your <span className="marker-highlight">clear roadmap</span>.</h1>
            <p className="lede mt-16">
              Understand test formats, compare Academic vs. General Training, decode band calculation criteria, and find your ideal study route.
            </p>
            <div className="hero-ctas mt-24">
              <a href="#quiz" className="btn btn-primary">
                <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
                Find My IELTS Path
              </a>
              <a href="#modules" className="btn btn-secondary">
                Explore 4 Modules
                <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Global Acceptance Box */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow">
          <div className="poster-card">
            <div className="flex items-center gap-8 mb-16">
              <img src="/images/icons/icon-study-abroad.webp" alt="Global" className="sticker-icon-md" />
              <span className="tag">Global Standard</span>
            </div>
            <h2>Why people take IELTS</h2>
            <p className="muted mt-16">
              IELTS is accepted by over 12,000 organisations worldwide — including prestigious universities, professional licensing bodies, and immigration authorities in Canada, the UK, Australia, the USA, and New Zealand.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 3. Academic vs General Training Track Selector */}
      <motion.section
        className="bg-alt"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="eyebrow">Exam Versions</span>
            <h2>Academic vs. General Training</h2>
            <p className="muted mt-8">Select a test version to inspect how the sections diverge.</p>
          </div>

          <div className="track-selector-grid">
            <motion.div
              whileHover={{ y: -3 }}
              className={`track-card${selectedFormat === "academic" ? " active" : ""}`}
              onClick={() => setSelectedFormat("academic")}
            >
              <span className="track-badge">
                {selectedFormat === "academic" ? "✓ Selected Format" : "View Details"}
              </span>
              <h3>IELTS Academic</h3>
              <p className="muted small mt-8">
                For undergraduate, postgraduate university admissions, and professional registration (Doctors, Nurses, Pharmacists, Lawyers).
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -3 }}
              className={`track-card${selectedFormat === "general" ? " active" : ""}`}
              onClick={() => setSelectedFormat("general")}
            >
              <span className="track-badge">
                {selectedFormat === "general" ? "✓ Selected Format" : "View Details"}
              </span>
              <h3>IELTS General Training</h3>
              <p className="muted small mt-8">
                For Express Entry / PR migration, work permits, secondary education, and vocational training in English-speaking nations.
              </p>
            </motion.div>
          </div>

          <div className="table-wrap mt-32">
            <table className="compare">
              <thead>
                <tr>
                  <th>Section</th>
                  <th>{selectedFormat === "academic" ? "Academic Format" : "General Training Format"}</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Listening</td>
                  <td>4 recorded sections (Monologues &amp; conversations). Identical for Academic and GT.</td>
                  <td>~30 Mins (+10m transfer)</td>
                </tr>
                <tr>
                  <td>Reading</td>
                  <td>
                    {selectedFormat === "academic"
                      ? "3 long academic articles sourced from research journals, books, and magazines. Analytical questions."
                      : "Section 1 (everyday social texts), Section 2 (workplace notices), Section 3 (general interest passage)."}
                  </td>
                  <td>60 Mins (40 questions)</td>
                </tr>
                <tr>
                  <td>Writing</td>
                  <td>
                    {selectedFormat === "academic"
                      ? "Task 1: Describe a chart, graph, table, or diagram (150 words). Task 2: Formal discursive essay (250 words)."
                      : "Task 1: Formal / Semi-formal / Personal letter (150 words). Task 2: Discursive essay (250 words)."}
                  </td>
                  <td>60 Mins (2 tasks)</td>
                </tr>
                <tr>
                  <td>Speaking</td>
                  <td>1-on-1 interview with an examiner: Part 1 Intro, Part 2 Cue Card, Part 3 Discussion. Identical for both.</td>
                  <td>11–14 Mins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      {/* 4. Four Modules Grid with Sliced Sticker Icons */}
      <motion.section
        id="modules"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">Four Pillars</span>
            <h2>The Four IELTS Modules</h2>
          </div>
          <motion.div
            className="grid-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            <motion.div variants={childVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-listening.webp" alt="Listening" className="sticker-icon-lg" />
              </div>
              <h3>Listening</h3>
              <p className="muted small mt-8">4 sections, 40 questions. Focus on signposting, accents, spelling, and distractors.</p>
            </motion.div>
            <motion.div variants={childVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-reading.webp" alt="Reading" className="sticker-icon-lg" />
              </div>
              <h3>Reading</h3>
              <p className="muted small mt-8">3 passages, 40 questions. Master skimming, scanning, True/False/Not Given &amp; summary completion.</p>
            </motion.div>
            <motion.div variants={childVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-writing.webp" alt="Writing" className="sticker-icon-lg" />
              </div>
              <h3>Writing</h3>
              <p className="muted small mt-8">Task 1 &amp; Task 2. Evaluated on Task Achievement, Coherence &amp; Cohesion, Lexical Resource, Grammatical Range.</p>
            </motion.div>
            <motion.div variants={childVariant} className="module-card">
              <div className="module-icon-wrap">
                <img src="/images/icons/icon-speaking.webp" alt="Speaking" className="sticker-icon-lg" />
              </div>
              <h3>Speaking</h3>
              <p className="muted small mt-8">3 parts in 11–14 minutes. Assessed on Fluency, Pronunciation, Lexical Range, and Grammatical Accuracy.</p>
            </motion.div>
          </motion.div>
          <div className="text-center mt-32">
            <Link to="/recorded-ielts-course#whats-inside" className="btn btn-secondary">
              See How We Teach Each Module
              <img src="/images/icons/icon-arrow-right.webp" alt="Arrow" className="sticker-icon-sm" />
            </Link>
          </div>
        </div>
      </motion.section>

      {/* 5. Common Beginner Mistakes Accordion */}
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
              Avoid Pitfalls
            </span>
            <h2>Common Beginner Mistakes</h2>
            <p className="muted mt-8">Click to understand the critical errors candidates make during initial preparation.</p>
          </div>
          <FaqGroup items={MISTAKES_FAQS} />
        </div>
      </motion.section>

      {/* 6. Interactive Quiz Section */}
      <motion.section
        id="quiz"
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="eyebrow green">
              <img src="/images/icons/icon-target.webp" alt="Target" className="sticker-icon-sm" />
              Interactive Quiz
            </span>
            <h2>Which IELTS path matches your timeline?</h2>
            <p className="muted mt-8">Answer 3 simple questions to receive your personalized preparation recommendation.</p>
          </div>
          <Quiz />
        </div>
      </motion.section>
    </>
  );
}
