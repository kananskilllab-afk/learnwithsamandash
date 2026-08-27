import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";
import CurriculumAccordion from "../components/CurriculumAccordion.jsx";
import { FaqGroup } from "../components/FaqAccordion.jsx";
import Checkout from "../components/Checkout.jsx";

const MODULES = [
  { name: "Listening", items: ["Test structure", "Accents", "Form/table/sentence completion", "Note & summary completion", "MCQs", "Map labelling", "Matching", "Short answers", "Practice sets"] },
  { name: "Reading", items: ["Test structure", "Short answers", "MCQs", "Matching headings/features/endings", "True/False/Not Given", "Yes/No/Not Given", "Sentence/table/summary completion", "Timing strategy"] },
  { name: "Writing", items: ["Scoring criteria", "Question types", "Planning", "Introductions", "Body paragraphs", "Conclusions", "Task 1 (Academic/GT)", "Editing & review"] },
  { name: "Speaking", items: ["Assessment criteria", "Part 1", "Part 2", "Part 3", "Fluency & coherence", "Vocabulary", "Grammar", "Pronunciation", "Mock speaking practice"] }
];

const OBJECTIONS = [
  { q: "Is this Academic or General Training?", a: "The course covers the shared skills tested across both versions. The team will confirm exactly which components map to Academic vs General Training before launch." },
  { q: "Can beginners join?", a: "Yes — the course starts from test fundamentals. If you're a true beginner in English itself, reach out to support first to confirm this is the right starting point for you." },
  { q: "How long do I get access?", a: "3 months from the date of enrolment, based on the current plan. This will be displayed clearly at checkout." },
  { q: "Can I watch on mobile?", a: "Device and platform support will be confirmed and listed here before launch." },
  { q: "How do writing/speaking reviews work?", a: "Submission channel, turnaround time and eligible task types will be published here once confirmed operationally." },
  { q: "What happens after payment?", a: "You'll get immediate payment confirmation, access instructions by email/WhatsApp, and a support contact for any questions." },
  { q: "What's the refund/cancellation policy?", a: "The exact policy will be linked here and shown before payment is collected." }
];

export default function RecordedCourse() {
  usePageView("view_recorded_course");

  return (
    <>
      <section className="hero" style={{ paddingBottom: 0 }}>
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">Recommended · self-paced</span>
            <h1>Your Complete IELTS Preparation — Available Anytime</h1>
            <p className="lede mt-16">
              Learn all four IELTS modules through 30 hours of recorded teaching, structured practice, sample answers,
              mock tests and included speaking/writing support. Study at your pace and revisit lessons whenever you
              need them during your access period.
            </p>
            <div className="hero-ctas">
              <a href="#enrol" className="btn btn-primary" onClick={() => track("click_recorded_course_cta", { section: "hero" })}>
                Enrol in the Recorded Course
              </a>
              <a href="#whats-inside" className="btn btn-text">See Course Contents</a>
            </div>
            <div className="price-row mt-24">
              <span className="price-current">₹5,000</span>
              <span className="price-note">current listed price — <a href="#pricing-note">confirm before launch</a></span>
            </div>
          </div>
          <div className="hero-media">
            <div className="photo-placeholder">
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>▶</div>
              <strong>Course dashboard preview</strong>
              <small>Screenshot placeholder — swap with real LMS capture</small>
            </div>
            <div className="dash-chip c1"><span className="dot"></span> 30 hrs recorded</div>
            <div className="dash-chip c2">3-month access</div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container trust-row">
          <div className="trust-item"><span className="trust-num">2.4M+</span><span className="trust-label">YouTube subscribers</span></div>
          <div className="trust-item"><span className="trust-num">30 hrs</span><span className="trust-label">recorded lessons</span></div>
          <div className="trust-item"><span className="trust-num">4/4</span><span className="trust-label">IELTS modules</span></div>
          <div className="trust-item"><span className="trust-num">7</span><span className="trust-label">full mock tests</span></div>
          <div className="trust-item"><span className="trust-num">7</span><span className="trust-label">1-on-1 speaking tests</span></div>
        </div>
      </div>

      <section id="whats-inside">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow blue">What's included</span>
            <h2>Everything you need in one course.</h2>
          </div>
          <div className="table-wrap">
            <table className="compare">
              <thead><tr><th>Inclusion</th><th>What you get</th></tr></thead>
              <tbody>
                <tr><td>Recorded lectures</td><td>30 hours of structured recorded teaching</td></tr>
                <tr><td>Writing &amp; speaking reviews</td><td>Submit your work for expert review — submission channel and turnaround to be confirmed by the team</td></tr>
                <tr><td>Module material</td><td>Materials for all 4 modules, downloadable/online</td></tr>
                <tr><td>Sample answers</td><td>Every question type explained with a sample response</td></tr>
                <tr><td>Speaking bank</td><td>350+ answered speaking questions</td></tr>
                <tr><td>Full mock tests</td><td>7 full-length mock tests</td></tr>
                <tr><td>1-to-1 speaking tests</td><td>7 speaking tests in a test-day format</td></tr>
                <tr><td>Course access</td><td>3 months from enrolment</td></tr>
                <tr><td>Feedback/review period</td><td>2 months from enrolment</td></tr>
              </tbody>
            </table>
          </div>
          <p id="pricing-note" className="small muted mt-16">
            Price, taxes, payment gateway and refund/cancellation terms shown here reflect the current public offer and
            must be reconfirmed by the product owner before launch.
          </p>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="section-head center"><h2>Why this is different from free YouTube</h2></div>
          <div className="table-wrap">
            <table className="compare">
              <thead><tr><th>Free YouTube</th><th>Recorded Course</th></tr></thead>
              <tbody>
                <tr><td>Choose individual videos yourself</td><td>Follow an organised course path</td></tr>
                <tr><td>Great for individual topics</td><td>Designed to cover the full preparation journey</td></tr>
                <tr><td>No single practice workflow</td><td>Materials, samples and mocks brought into the course</td></tr>
                <tr><td>Limited personalised evaluation</td><td>Included review/speaking-test support as per plan</td></tr>
                <tr><td>Public learning content</td><td>Student access environment and preparation resources</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <div className="section-head">
            <span className="eyebrow blue">Curriculum</span>
            <h2>One course. Four modules.</h2>
            <p className="muted mt-8">Exact lesson titles are supplied by the LMS/course owner before launch — this reflects the module structure only.</p>
          </div>
          <CurriculumAccordion modules={MODULES} />
        </div>
      </section>

      <section className="bg-alt">
        <div className="container container-narrow">
          <div className="section-head"><h2>Before you enrol</h2></div>
          <FaqGroup items={OBJECTIONS} />
        </div>
      </section>

      {/* Enrolment Checkout */}
      <section id="enrol">
        <div className="container container-narrow">
          <Checkout course="Recorded IELTS Course" priceLabel="₹5,000" />
        </div>
      </section>
    </>
  );
}
