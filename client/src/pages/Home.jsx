import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";

export default function Home() {
  usePageView("view_home");

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <span className="eyebrow">2.4M+ learners on YouTube</span>
            <h1>Prepare for IELTS with Sam &amp; Ash — at Your Pace</h1>
            <p className="lede mt-16">
              A structured IELTS course covering Listening, Reading, Writing and Speaking, with recorded lessons,
              practice material, sample answers, mock tests and support — from the creators behind a
              2.4M-subscriber learning community.
            </p>
            <div className="hero-ctas">
              <Link to="/recorded-ielts-course" className="btn btn-primary" onClick={() => track("click_recorded_course_cta", { section: "hero" })}>
                Start the Recorded Course
              </Link>
              <Link to="/recorded-ielts-course#whats-inside" className="btn btn-text">See What's Inside</Link>
            </div>
            <p className="hero-tertiary mt-24">
              Planning to study abroad? <Link to="/study-abroad">Talk to an expert →</Link>
            </p>
          </div>
          <div className="hero-media">
            <div className="photo-placeholder">
              <div className="avatars">
                <span className="avatar-circle s">S</span><span className="avatar-circle a">A</span>
              </div>
              <strong style={{ fontSize: 18 }}>Sam &amp; Ash</strong>
              <small>Photo placeholder — final image pending</small>
            </div>
            <div className="dash-chip c1"><span className="dot"></span> Module 3 · Writing</div>
            <div className="dash-chip c2">✓ 7/7 mock tests</div>
          </div>
        </div>
      </section>

      <div className="trust-strip">
        <div className="container trust-row">
          <div className="trust-item"><span className="trust-num">2.4M+</span><span className="trust-label">YouTube subscribers</span></div>
          <div className="trust-item"><span className="trust-num">15.7M+</span><span className="trust-label">views on our 10-hour IELTS course</span></div>
          <div className="trust-item"><span className="trust-num">403+</span><span className="trust-label">IELTS &amp; English videos</span></div>
          <div className="trust-item"><span className="trust-num">4/4</span><span className="trust-label">IELTS modules covered</span></div>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">IELTS basics</span>
            <h2>First, understand the exam you are preparing for.</h2>
            <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
              IELTS tests your Listening, Reading, Writing and Speaking skills. Your required test type and target band depend on why and where you are applying.
            </p>
          </div>
          <div className="grid-4">
            <div className="card"><div className="card-icon">L</div><h3>Listening</h3><p className="muted small mt-8">Understand question types, accents, prediction and answer accuracy.</p></div>
            <div className="card"><div className="card-icon">R</div><h3>Reading</h3><p className="muted small mt-8">Build speed, locate evidence and handle common IELTS question types.</p></div>
            <div className="card"><div className="card-icon">W</div><h3>Writing</h3><p className="muted small mt-8">Learn task structure, planning, coherence, grammar and scoring.</p></div>
            <div className="card"><div className="card-icon">S</div><h3>Speaking</h3><p className="muted small mt-8">Prepare for Parts 1, 2 and 3 with structured practice and feedback.</p></div>
          </div>
          <div className="text-center mt-32">
            <Link to="/what-is-ielts" className="btn btn-secondary">Understand IELTS in 5 Minutes</Link>
          </div>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="spotlight">
            <div>
              <span className="eyebrow">Recommended path</span>
              <h2>The Recorded IELTS Course — our flexible preparation path</h2>
              <p className="lede mt-16">
                Study on your own schedule without building your preparation from random videos. Follow a complete
                four-module learning path, practise with course material and use the included review/support components.
              </p>
              <Link to="/recorded-ielts-course" className="btn btn-primary mt-24" onClick={() => track("click_recorded_course_cta", { section: "spotlight" })}>
                View Recorded Course
              </Link>
            </div>
            <div className="feature-list">
              <div className="feature-item"><span className="feature-check">✓</span><span className="feature-text"><b>30 hours of recorded lessons</b><span>A complete structured learning path you can revisit.</span></span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span className="feature-text"><b>Materials for all 4 modules</b><span>Practice alongside the teaching, not just watching videos.</span></span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span className="feature-text"><b>7 full mock tests + 7 speaking tests</b><span>Practise under test-like conditions.</span></span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span className="feature-text"><b>Writing &amp; speaking reviews</b><span>Get expert input on your productive skills.</span></span></div>
              <div className="feature-item"><span className="feature-check">✓</span><span className="feature-text"><b>3-month course access</b><span>A defined window to complete your preparation.</span></span></div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container container-narrow text-center">
          <span className="eyebrow blue">Common question</span>
          <h2>YouTube helps you learn. The course helps you follow a system.</h2>
          <p className="lede mt-16" style={{ marginLeft: "auto", marginRight: "auto" }}>
            Our free videos are designed to teach and explain. The paid course brings the lessons, materials, sample
            answers, practice, mock tests and review process into one organised path.
          </p>
          <Link to="/recorded-ielts-course#whats-inside" className="btn btn-text mt-16">See the Full Course Structure</Link>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container hero-grid">
          <div className="hero-media" style={{ aspectRatio: "16/9" }}>
            <div className="photo-placeholder">
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>▶</div>
              <strong>IELTS Full Course in 10 Hours</strong>
              <small>15.7M+ views · embed placeholder</small>
            </div>
          </div>
          <div>
            <span className="eyebrow">You may know us from YouTube</span>
            <h2>Millions of learners have discovered our IELTS teaching on YouTube.</h2>
            <p className="lede mt-16">
              The website course is the structured next step for learners who want a complete preparation system —
              the same teaching style, brought together with materials, mocks and review support.
            </p>
            <Link to="/about" className="btn btn-secondary mt-16">Meet Sam &amp; Ash</Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head center"><h2>How the recorded course works</h2></div>
          <div className="steps">
            <div className="step"><div className="step-num">1</div><b>Enrol</b><p>Choose the recorded course and complete registration/payment.</p></div>
            <div className="step"><div className="step-num">2</div><b>Get access</b><p>Receive access and start with the recommended module order.</p></div>
            <div className="step"><div className="step-num">3</div><b>Learn + practise</b><p>Watch lessons, use materials and work through question types.</p></div>
            <div className="step"><div className="step-num">4</div><b>Test yourself</b><p>Use mock tests and speaking practice to identify gaps.</p></div>
            <div className="step"><div className="step-num">5</div><b>Get review</b><p>Use the included writing/speaking review and support workflow.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="section-head center">
            <span className="eyebrow blue">Choose your path</span>
            <h2>Every learner prepares differently.</h2>
          </div>
          <div className="plan-grid" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
            <div className="plan-card recommended">
              <span className="badge-recommended">Recommended</span>
              <span className="plan-name">Recorded Course</span>
              <span className="plan-for">Best for flexible, self-paced learners</span>
              <p className="small muted">30 hrs recordings · all 4 modules · 7 mocks · review support</p>
              <Link to="/recorded-ielts-course" className="btn btn-primary btn-block plan-cta">Enrol Now</Link>
            </div>
            <div className="plan-card">
              <span className="plan-name">Live Course</span>
              <span className="plan-for">Best for scheduled, accountable learners</span>
              <p className="small muted">Live sessions · fixed timetable · classroom interaction</p>
              <Link to="/live-ielts-course" className="btn btn-secondary btn-block plan-cta">View Next Batch</Link>
            </div>
            <div className="plan-card">
              <span className="plan-name">Mock Tests &amp; Resources</span>
              <span className="plan-for">Best for learners who just need practice</span>
              <p className="small muted">Full mocks · sample answers · free study plan</p>
              <Link to="/mock-tests" className="btn btn-secondary btn-block plan-cta">Explore Resources</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head center"><h2>What learners say</h2></div>
          <div className="grid-3">
            {["Recorded Course", "Live Course", "Recorded Course"].map((course, i) => (
              <div className="testi-card" key={i}>
                <span className="tag">Sample layout</span>
                <p className="testi-quote mt-16">"[Placeholder — add a real, consented learner quote before launch.]"</p>
                <div className="testi-who">
                  <span className="testi-avatar">{course[0]}</span>
                  <div><div className="testi-name">Learner name</div><div className="testi-course">{course}</div></div>
                </div>
              </div>
            ))}
          </div>
          <p className="disclaimer text-center">Individual results vary and depend on starting level, preparation, practice and test-day performance.</p>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container">
          <div className="bridge-block">
            <div>
              <span className="eyebrow blue">Also planning to study abroad?</span>
              <h2>IELTS is one part of the journey.</h2>
              <p className="muted mt-8">Leave your phone number and email — our study-abroad consultant will connect with you directly.</p>
            </div>
            <Link to="/study-abroad" className="btn btn-secondary" style={{ flex: "none" }} onClick={() => track("study_abroad_cta", { section: "home_bridge" })}>
              Talk to a Study Abroad Expert
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to stop piecing IELTS together?</h2>
            <p>Start the complete recorded course and move through your preparation one module at a time.</p>
            <div className="cta-banner-actions">
              <Link to="/recorded-ielts-course" className="btn btn-primary" onClick={() => track("click_recorded_course_cta", { section: "final_cta" })}>
                Start My IELTS Preparation
              </Link>
              <Link to="/faq" className="btn btn-outline-inverse">Read FAQs</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
