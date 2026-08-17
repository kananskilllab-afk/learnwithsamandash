import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { FaqGroup } from "../components/FaqAccordion.jsx";
import Quiz from "../components/Quiz.jsx";

const FAQS = [
  { q: "Do I need IELTS Academic or General?", a: "Academic is typically required for undergraduate or postgraduate university admission and professional licensing. General Training is required for Express Entry / PR migration, secondary school, and workplace visas. Always verify the specific requirement with your receiving institution." },
  { q: "What band score do I need?", a: "Requirements range from Band 6.0 to Band 8.0+ depending on the country, university, course tier, or immigration stream. Confirm the specific score cutoff before starting your prep." },
  { q: "How long should I prepare for?", a: "Most candidates who prepare for 3–6 weeks with a structured module-by-module system achieve a 0.5 to 1.5 band improvement compared to unguided study." }
];

export default function WhatIsIelts() {
  usePageView("view_what_is_ielts");
  const [selectedFormat, setSelectedFormat] = useState("academic");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="flex items-center gap-12 mb-16">
            <span className="eyebrow blue">IELTS Fundamentals</span>
            <span className="sticker-callout">Step-by-step guide 🧭</span>
          </div>
          <h1>New to IELTS? Here is your <span className="marker-highlight">clear roadmap</span>.</h1>
          <p className="lede mt-16">
            Understand test formats, compare Academic vs. General Training, decode band calculation criteria, and find your ideal study route.
          </p>
          <div className="hero-ctas mt-24">
            <a href="#quiz" className="btn btn-primary">Find My IELTS Path</a>
            <a href="#modules" className="btn btn-secondary">Explore 4 Modules</a>
          </div>
        </div>
      </section>

      {/* Why IELTS is required */}
      <section>
        <div className="container container-narrow">
          <div className="poster-card">
            <span className="tag mb-16">Global Standard</span>
            <h2>Why people take IELTS</h2>
            <p className="muted mt-16">
              IELTS is accepted by over 12,000 organisations worldwide — including universities, employers, immigration authorities, and professional bodies in Canada, UK, Australia, New Zealand, USA, and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* Academic vs General Training Track Selector */}
      <section className="bg-alt">
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="eyebrow dark">Exam Versions</span>
            <h2>Academic vs. General Training</h2>
            <p className="muted mt-8">Select a test version to inspect how the sections diverge.</p>
          </div>

          <div className="track-selector-grid">
            <div
              className={`track-card${selectedFormat === "academic" ? " active" : ""}`}
              onClick={() => setSelectedFormat("academic")}
            >
              <span className="track-badge">
                {selectedFormat === "academic" ? "✓ Selected Format" : "View Details"}
              </span>
              <h3>IELTS Academic</h3>
              <p className="muted small mt-8">
                University degree admissions (Undergraduate / Masters / PhD) and professional registration (Doctors, Nurses, Lawyers).
              </p>
            </div>

            <div
              className={`track-card${selectedFormat === "general" ? " active" : ""}`}
              onClick={() => setSelectedFormat("general")}
            >
              <span className="track-badge">
                {selectedFormat === "general" ? "✓ Selected Format" : "View Details"}
              </span>
              <h3>IELTS General Training</h3>
              <p className="muted small mt-8">
                Permanent residency pathways (Canada Express Entry, Australian PR), skilled worker visas, and vocational training.
              </p>
            </div>
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
                      ? "3 long academic articles sourced from books, journals, and magazines. Analytical questions."
                      : "Section 1 (everyday texts), Section 2 (workplace notices), Section 3 (general interest passage)."}
                  </td>
                  <td>60 Mins (40 questions)</td>
                </tr>
                <tr>
                  <td>Writing</td>
                  <td>
                    {selectedFormat === "academic"
                      ? "Task 1: Describe a chart, graph, table or map (150 words). Task 2: Discursive essay (250 words)."
                      : "Task 1: Formal / Semi-formal / Personal letter (150 words). Task 2: Discursive essay (250 words)."}
                  </td>
                  <td>60 Mins (2 tasks)</td>
                </tr>
                <tr>
                  <td>Speaking</td>
                  <td>1-on-1 interview with examiner: Part 1 Intro, Part 2 Cue Card, Part 3 Discussion. Identical for both.</td>
                  <td>11–14 Mins</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* The 4 Modules */}
      <section id="modules">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">Four Pillars</span>
            <h2>The Four IELTS Modules</h2>
          </div>
          <div className="grid-4">
            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-blue)", color: "var(--blue)" }}>L</div>
              <h3>Listening</h3>
              <p className="muted small mt-8">4 sections, 40 questions. Focus on signposting, accents, spelling, and distractors.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-green)", color: "var(--green)" }}>R</div>
              <h3>Reading</h3>
              <p className="muted small mt-8">3 passages, 40 questions. Master skimming, scanning, True/False/Not Given &amp; summary completion.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-yellow)", color: "var(--ink)" }}>W</div>
              <h3>Writing</h3>
              <p className="muted small mt-8">Task 1 &amp; Task 2. Evaluated on Task Achievement, Coherence &amp; Cohesion, Lexical Resource, Grammatical Accuracy.</p>
            </div>
            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-pink)", color: "#BE185D" }}>S</div>
              <h3>Speaking</h3>
              <p className="muted small mt-8">3 parts in 11–14 minutes. Assessed on Fluency, Pronunciation, Lexical Range, and Complex Grammatical Structures.</p>
            </div>
          </div>
          <div className="text-center mt-32">
            <Link to="/recorded-ielts-course#whats-inside" className="btn btn-secondary">
              See How We Teach Each Module
            </Link>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="bg-alt">
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="eyebrow green">Interactive Quiz</span>
            <h2>Which IELTS path matches your timeline?</h2>
            <p className="muted mt-8">Answer 3 simple questions to receive your personalized preparation recommendation.</p>
          </div>
          <Quiz />
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <div className="container container-narrow">
          <div className="section-head">
            <h2>Frequently Asked Questions</h2>
          </div>
          <FaqGroup items={FAQS} />
          <div className="text-center mt-32">
            <Link to="/mock-tests" className="btn btn-primary">
              Take the Free IELTS Readiness Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
