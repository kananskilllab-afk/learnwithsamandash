import { useState } from "react";
import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";

export default function Home() {
  usePageView("view_home");
  const [selectedTrack, setSelectedTrack] = useState("academic"); // 'academic' | 'general'

  return (
    <>
      {/* 1. HERO SECTION: Asymmetric Two-Column Editorial Poster Layout */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="flex items-center gap-12 mb-16">
              <span className="eyebrow dark">2.4M+ Community on YouTube</span>
              <span className="sticker-callout">Strategy first ✍️</span>
            </div>

            <h1>
              Master IELTS with a <span className="marker-highlight">clear path</span> &amp; proven strategy.
            </h1>

            <p className="lede mt-24">
              Stop piecing together disconnected advice. Prepare for all four modules with an{" "}
              <span className="marker-highlight">intentional</span>, structured system designed by IELTS trainers
              Sam &amp; Ash.
            </p>

            <div className="hero-ctas">
              <Link
                to="/recorded-ielts-course"
                className="btn btn-primary"
                onClick={() => track("click_recorded_course_cta", { section: "hero" })}
              >
                Start Recorded Course
              </Link>
              <Link to="/what-is-ielts#quiz" className="btn btn-secondary">
                Find My IELTS Path
              </Link>
            </div>

            <div className="flex items-center gap-16 mt-32">
              <span className="sticker-callout alt">Know your goal 🎯</span>
              <p className="hero-tertiary">
                Planning to study abroad? <Link to="/study-abroad">Talk to an expert →</Link>
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Journey Widget */}
          <div>
            <div className="journey-widget">
              <span className="journey-widget-badge">Interactive Roadmap</span>
              <div className="flex items-center justify-between mb-24">
                <div>
                  <h3 style={{ fontSize: 22, margin: 0 }}>Your IELTS Journey</h3>
                  <p className="small muted mt-8">A complete 4-step framework from fundamentals to target band score.</p>
                </div>
              </div>

              <div className="journey-step done">
                <div className="journey-step-node">✓</div>
                <div>
                  <b style={{ fontSize: 16 }}>1. Choose your test track</b>
                  <p className="small muted">Academic (University) vs. General Training (Work/Migration)</p>
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
                    <span className="tag" style={{ background: "var(--blue-50)", color: "var(--blue)", border: "1px solid var(--blue)" }}>In Progress</span>
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
                  <div className="module-progress-fill" style={{ width: "65%", background: "var(--blue)" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STATS STRIP */}
      <div className="trust-strip">
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
      </div>

      {/* 3. INTERACTIVE MODULES & TRACK SELECTOR */}
      <section>
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
            <div
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
            </div>

            <div
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
            </div>
          </div>

          {/* 4 Interactive Module Cards */}
          <div className="module-grid mt-32">
            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-blue)", color: "var(--blue)" }}>
                L
              </div>
              <h3>Listening</h3>
              <p className="muted small mt-8">
                Master 4 sections, 40 questions, multiple accents, and predictive keyword techniques.
              </p>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: "85%" }}></div>
              </div>
              <span className="small muted mt-8">8.5 Target Potential</span>
            </div>

            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-green)", color: "var(--green)" }}>
                R
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
            </div>

            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-yellow)", color: "var(--ink)" }}>
                W
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
            </div>

            <div className="module-card">
              <div className="module-icon-wrap" style={{ background: "var(--pastel-pink)", color: "#BE185D" }}>
                S
              </div>
              <h3>Speaking</h3>
              <p className="muted small mt-8">
                Face-to-face interview simulation across Part 1, Cue Card Part 2, and abstract Part 3 discussion.
              </p>
              <div className="module-progress-bar">
                <div className="module-progress-fill" style={{ width: "90%" }}></div>
              </div>
              <span className="small muted mt-8">8.0 Target Potential</span>
            </div>
          </div>

          <div className="text-center mt-32">
            <Link to="/what-is-ielts" className="btn btn-secondary">
              Understand IELTS in 5 Minutes
            </Link>
          </div>
        </div>
      </section>

      {/* 4. RECOMMENDED PATH SPOTLIGHT (Poster Style) */}
      <section className="bg-alt">
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
      </section>

      {/* 5. TACTILE TESTIMONIAL & REVIEW STICKER SECTION */}
      <section>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow dark">Proven Results</span>
            <h2>What ambitious learners say</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              Join thousands of students who went from guessing question patterns to achieving their target band.
            </p>
          </div>

          <div className="grid-3">
            {/* Review Card 1 (Rotated Left) */}
            <div className="poster-card rotate-left bg-pastel-green">
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
            </div>

            {/* Review Card 2 (Crisp White Center) */}
            <div className="poster-card bg-white">
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
            </div>

            {/* Review Card 3 (Rotated Right) */}
            <div className="poster-card rotate-right bg-pastel-pink">
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
            </div>
          </div>

          <p className="disclaimer text-center">
            Individual results depend on initial foundation, practice consistency, and individual test-day execution.
          </p>
        </div>
      </section>

      {/* 6. HOW IT WORKS / STEPS */}
      <section className="bg-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">5 Simple Steps</span>
            <h2>How the preparation system works</h2>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <b>Enrol in seconds</b>
              <p>Secure instantaneous portal access with our seamless Razorpay checkout.</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <b>Watch video modules</b>
              <p>Work through 30 hours of high-definition video masterclasses.</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <b>Practise with sheets</b>
              <p>Apply methods directly on authentic question sets with sample answers.</p>
            </div>
            <div className="step">
              <div className="step-num">4</div>
              <b>Attempt mock tests</b>
              <p>Benchmark your speed and accuracy across 7 full-length timed tests.</p>
            </div>
            <div className="step">
              <div className="step-num">5</div>
              <b>Get trainer review</b>
              <p>Receive diagnostic feedback on your writing essays and speaking mocks.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CHOOSE YOUR PLAN */}
      <section>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow dark">Choose Your Path</span>
            <h2>Tailored preparation for every timeline</h2>
          </div>

          <div className="plan-grid">
            <div className="plan-card recommended">
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
            </div>

            <div className="plan-card">
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
            </div>

            <div className="plan-card">
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
            </div>
          </div>
        </div>
      </section>

      {/* 8. STUDY ABROAD BRIDGE */}
      <section className="bg-alt">
        <div className="container">
          <div className="bridge-block">
            <div>
              <span className="eyebrow blue">Study Abroad Advisory</span>
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
      </section>

      {/* 9. FINAL POSTER CTA BANNER */}
      <section>
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
              <Link to="/what-is-ielts#quiz" className="btn btn-outline-inverse">
                Find My IELTS Path
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
