import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import CurriculumAccordion from "../components/CurriculumAccordion.jsx";
import { FaqGroup } from "../components/FaqAccordion.jsx";
import Checkout from "../components/Checkout.jsx";

const MODULES = [
  { name: "Listening", items: ["Test structure & scoring criteria", "Accents & prediction strategies", "Form, table & note completion", "Sentence & summary completion", "Multiple Choice Questions (MCQs)", "Map labelling & diagram matching", "Distractor elimination techniques", "Authentic timed practice sets"] },
  { name: "Reading", items: ["Academic vs General reading structure", "Skimming & scanning fundamentals", "True / False / Not Given & Yes / No / Not Given", "Matching headings, features & endings", "Sentence, table & flow-chart completion", "Multiple choice & summary completion", "Time management & rapid evidence location", "Authentic 3-passage mock drills"] },
  { name: "Writing", items: ["Four official scoring criteria explained", "Task 1 Academic: Line graphs, bar charts, tables, maps & processes", "Task 1 General: Formal, semi-formal & informal letter structures", "Task 2: Agree/Disagree, Discussion, Problem-Solution, Advantage-Disadvantage", "Introduction hooks & thesis statement formulas", "Body paragraph coherence & topic sentences", "Band 9 lexical resource & complex grammar patterns", "Diagnostic submission & review workflow"] },
  { name: "Speaking", items: ["Official assessment criteria: Fluency, Lexical, Grammar, Pronunciation", "Part 1: Personal questions & natural conversation flow", "Part 2: 1-minute cue card preparation & 2-minute sustained monologue", "Part 3: Abstract analysis & complex opinion formulation", "Overcoming pauses, fillers & exam anxiety", "High-scoring idioms & topic-specific vocabulary bank", "350+ answered speaking question repository", "1-on-1 mock speaking test evaluation details"] }
];

const OBJECTIONS = [
  { q: "Is this course for Academic or General Training?", a: "Both! The course comprehensively covers the shared Listening and Speaking modules, with dedicated, separate modules for Academic Reading/Writing Task 1 and General Training Reading/Writing Task 1." },
  { q: "Can beginners join this course?", a: "Yes. The course starts from test fundamentals, question types, and scoring rubrics before advancing to high-band techniques." },
  { q: "How long do I get access?", a: "You receive 3 full months of unlimited access from the date of enrolment, accessible from mobile, tablet, or desktop." },
  { q: "Can I watch the lessons on mobile?", a: "Yes, the portal is fully mobile-responsive and accessible on all modern smartphone browsers and desktop devices." },
  { q: "How do writing and speaking reviews work?", a: "You can submit your writing essays and recorded speaking responses through your dashboard to receive detailed diagnostic feedback scored against official band descriptors." },
  { q: "What happens immediately after payment?", a: "You receive instant payment confirmation via Razorpay, instant portal login credentials on screen and via email/WhatsApp, and direct support access." }
];

export default function RecordedCourse() {
  usePageView("view_recorded_course");

  return (
    <>
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container hero-grid">
          <div>
            <span className="tag mb-16">Flagship Self-Paced Masterclass</span>
            <h1>Your Complete IELTS Preparation — <span className="ref-marker-block">Available Anytime</span></h1>
            <p className="lede mt-16">
              Learn all four IELTS modules through 30 hours of structured recorded teaching, authentic practice sets, sample answers, 7 full mock tests, and included writing &amp; speaking reviews.
            </p>
            <div className="hero-ctas">
              <a href="#enrol" className="btn btn-primary" onClick={() => track("click_recorded_course_cta", { section: "hero" })}>
                Enrol Now — Pay ₹5,000
              </a>
              <a href="#whats-inside" className="btn btn-secondary">See Course Curriculum</a>
            </div>
            <div className="price-row mt-24">
              <span className="price-current">₹5,000</span>
              <span className="price-note">one-time full course fee (3 months unlimited access)</span>
            </div>
          </div>

          <div className="hero-media">
            <div className="poster-card" style={{ background: "var(--ink)", color: "var(--white)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--lime)", color: "var(--ink)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 800, marginBottom: 16 }}>▶</div>
              <strong style={{ fontSize: 20 }}>30 Hours Video Masterclass</strong>
              <p className="small" style={{ opacity: 0.75, marginTop: 8 }}>Listening · Reading · Writing · Speaking</p>
              <div className="flex gap-12 mt-16">
                <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "var(--white)", border: "1px solid rgba(255,255,255,0.3)" }}>7 Full Mocks</span>
                <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "var(--white)", border: "1px solid rgba(255,255,255,0.3)" }}>Writing Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats */}
      <div className="trust-strip mt-48">
        <div className="container trust-row">
          <div className="trust-item"><span className="trust-num">2.4M+</span><span className="trust-label">YouTube Subscribers</span></div>
          <div className="trust-item"><span className="trust-num">30 hrs</span><span className="trust-label">Structured Lessons</span></div>
          <div className="trust-item"><span className="trust-num">4 / 4</span><span className="trust-label">Modules Covered</span></div>
          <div className="trust-item"><span className="trust-num">7</span><span className="trust-label">Full Mock Tests</span></div>
          <div className="trust-item"><span className="trust-num">7</span><span className="trust-label">1-on-1 Speaking Tests</span></div>
        </div>
      </div>

      {/* What's Inside */}
      <section id="whats-inside">
        <div className="container">
          <div className="section-head">
            <span className="tag mb-16">Complete Curriculum</span>
            <h2>Everything included in the Recorded Course</h2>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead><tr><th>Course Component</th><th>What You Receive</th></tr></thead>
              <tbody>
                <tr><td>Recorded Video Masterclasses</td><td>30 hours of modular step-by-step video training across all 4 sections</td></tr>
                <tr><td>Writing &amp; Speaking Evaluations</td><td>Personalized diagnostic feedback scored against official band rubrics</td></tr>
                <tr><td>Study Material &amp; Worksheets</td><td>Downloadable templates, high-band vocabulary lists, and practice drills</td></tr>
                <tr><td>Sample Answer Bank</td><td>Model Band 9 responses for every single IELTS question type</td></tr>
                <tr><td>Speaking Question Repository</td><td>350+ answered speaking cue cards and Part 3 abstract questions</td></tr>
                <tr><td>Full-Length Timed Mocks</td><td>7 full computer-delivered/paper mock exams to simulate test day</td></tr>
                <tr><td>1-on-1 Speaking Evaluations</td><td>7 individual speaking mock drills with examiner feedback</td></tr>
                <tr><td>Access Duration</td><td>3 full months unlimited access with all updates included</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Module Breakdown Accordion */}
      <section className="bg-alt">
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="tag mb-16">Detailed Modules</span>
            <h2>Explore the Four Course Modules</h2>
          </div>
          <CurriculumAccordion modules={MODULES} />
        </div>
      </section>

      {/* Enrolment Checkout Form */}
      <section id="enrol">
        <div className="container container-narrow">
          <Checkout course="Recorded IELTS Course" priceLabel="₹5,000" />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-alt">
        <div className="container container-narrow">
          <div className="section-head">
            <span className="tag mb-16">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
          </div>
          <FaqGroup items={OBJECTIONS} />
        </div>
      </section>
    </>
  );
}
