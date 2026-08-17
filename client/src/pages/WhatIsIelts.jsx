import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { FaqGroup } from "../components/FaqAccordion.jsx";
import Quiz from "../components/Quiz.jsx";

const FAQS = [
  { q: "Do I need IELTS Academic or General?", a: "It depends on why you're taking the test. Academic is typically for university study; General Training is typically for work or migration. Confirm with your destination institution." },
  { q: "What band score do I need?", a: "This varies by university, employer or visa category — there's no universal number. Check the exact requirement for your specific application." },
  { q: "How long should I prepare for?", a: "It depends on your starting level and target band. Most learners benefit from a structured multi-week plan covering all four modules plus mock tests." }
];

export default function WhatIsIelts() {
  usePageView("view_what_is_ielts");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow blue">IELTS basics</span>
          <h1>New to IELTS? Start here.</h1>
          <p className="lede mt-16">Understand what IELTS tests, which version may fit your purpose, how the four modules work and how to build a preparation plan.</p>
          <a href="#quiz" className="btn btn-primary mt-16">Find My IELTS Path</a>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <h2>Why people take IELTS</h2>
          <p className="muted mt-16">
            IELTS is commonly required for study abroad, work opportunities and migration or professional
            registration in English-speaking countries. Exact requirements vary by university, employer and
            immigration authority — always confirm the specific band and test type you need with the destination institution.
          </p>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container container-narrow">
          <h2>Academic vs General Training</h2>
          <div className="table-wrap mt-24">
            <table className="compare">
              <thead><tr><th>Version</th><th>Typically used for</th></tr></thead>
              <tbody>
                <tr><td>IELTS Academic</td><td>University admission and professional registration</td></tr>
                <tr><td>IELTS General Training</td><td>Work, migration and secondary/vocational study</td></tr>
              </tbody>
            </table>
          </div>
          <p className="small muted mt-16">Not sure which one you need? <Link to="/study-abroad" style={{ color: "var(--blue)" }}>Talk to an expert</Link> or take our path quiz below.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="section-head center"><h2>The four modules</h2></div>
          <div className="grid-4">
            <div className="card"><div className="card-icon">L</div><h3>Listening</h3><p className="muted small mt-8">4 recordings, 40 questions, roughly 30 minutes.</p></div>
            <div className="card"><div className="card-icon">R</div><h3>Reading</h3><p className="muted small mt-8">3 passages, 40 questions, 60 minutes.</p></div>
            <div className="card"><div className="card-icon">W</div><h3>Writing</h3><p className="muted small mt-8">2 tasks, 60 minutes, structured responses.</p></div>
            <div className="card"><div className="card-icon">S</div><h3>Speaking</h3><p className="muted small mt-8">3 parts, 11–14 minutes, face-to-face or recorded.</p></div>
          </div>
          <div className="text-center mt-32"><Link to="/recorded-ielts-course#whats-inside" className="btn btn-secondary">Explore the Modules</Link></div>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container container-narrow">
          <h2>Understanding band scores</h2>
          <p className="muted mt-16">
            IELTS is scored on a 0–9 band scale for each module and as an overall band. Different universities,
            employers and immigration pathways ask for different minimum bands — there is no single "required band"
            for everyone, so always confirm the number that applies to your specific application.
          </p>
          <Link to="/recorded-ielts-course" className="btn btn-text mt-8">Set My Preparation Goal</Link>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <h2>Computer-delivered vs paper-based</h2>
          <p className="muted mt-16">
            IELTS is offered in both computer-delivered and paper-based formats in most locations, with slightly
            different Speaking scheduling. For exact availability, dates and registration in your city, always check
            directly with your official IELTS test provider.
          </p>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container container-narrow">
          <h2>How to prepare</h2>
          <div className="steps mt-24" style={{ gridTemplateColumns: "repeat(5,1fr)" }}>
            <div className="step"><div className="step-num">1</div><b>Understand</b><p>Learn the format and what each module tests.</p></div>
            <div className="step"><div className="step-num">2</div><b>Learn strategies</b><p>Module-specific techniques and question types.</p></div>
            <div className="step"><div className="step-num">3</div><b>Practise</b><p>Work through real question types with materials.</p></div>
            <div className="step"><div className="step-num">4</div><b>Review</b><p>Get feedback on your writing and speaking.</p></div>
            <div className="step"><div className="step-num">5</div><b>Mock test</b><p>Simulate the real test under timed conditions.</p></div>
          </div>
          <div className="text-center mt-32"><Link to="/recorded-ielts-course" className="btn btn-primary">Start Recorded Course</Link></div>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <h2>Common beginner mistakes</h2>
          <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            <li className="muted">• Preparing without knowing which test type you actually need.</li>
            <li className="muted">• Chasing "tricks" instead of understanding question types.</li>
            <li className="muted">• Ignoring writing and speaking feedback.</li>
            <li className="muted">• Never practising under timed, test-like conditions.</li>
          </ul>
        </div>
      </section>

      <section id="quiz" className="bg-alt">
        <div className="container container-narrow">
          <div className="section-head center">
            <span className="eyebrow blue">2-minute guide</span>
            <h2>Which IELTS path should I explore?</h2>
            <p className="muted mt-8">This is guidance to point you in the right direction — not an official eligibility decision.</p>
          </div>
          <Quiz />
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <div className="section-head"><h2>FAQ</h2></div>
          <FaqGroup items={FAQS} />
          <div className="text-center mt-32"><Link to="/mock-tests" className="btn btn-primary">Take the Free IELTS Assessment</Link></div>
        </div>
      </section>
    </>
  );
}
