import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { track } from "../lib/analytics.js";

const SAMPLES = [
  { tag: "Sample — Recorded Course", course: "Recorded Course", initial: "R" },
  { tag: "Sample — Live Course", course: "Live Course", initial: "L" },
  { tag: "Sample — Writing feedback", course: "Recorded Course — Writing Review", initial: "W" },
  { tag: "Sample — Speaking practice", course: "Recorded Course — Speaking", initial: "S" },
  { tag: "Sample — Retaker", course: "Recorded Course", initial: "M" },
  { tag: "Sample — Study abroad", course: "Recorded Course + Study Abroad", initial: "A" }
];

export default function StudentSuccess() {
  usePageView("view_success_stories");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow blue">Learner proof</span>
          <h1>Real learners. Real preparation journeys.</h1>
          <p className="lede mt-16">Every story here needs explicit learner consent and a source record before it goes live. This page currently uses placeholder layouts pending that content.</p>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="notice mb-24">
            <strong>Content team action needed:</strong> Replace the sample cards below with real testimonials — name
            (with consent), course used, quote, and outcome evidence where a band score is mentioned. Do not publish
            scores or results without permission and proof.
          </div>
          <div className="grid-3">
            {SAMPLES.map((s) => (
              <div className="testi-card" key={s.tag}>
                <span className="tag">{s.tag}</span>
                <p className="testi-quote mt-16">"[Add a real, consented quote before launch.]"</p>
                <div className="testi-who">
                  <span className="testi-avatar">{s.initial}</span>
                  <div><div className="testi-name">Learner name</div><div className="testi-course">{s.course}</div></div>
                </div>
              </div>
            ))}
          </div>
          <p className="disclaimer text-center mt-24">Individual results vary and depend on starting level, preparation, practice and test-day performance.</p>
        </div>
      </section>

      <section className="bg-alt">
        <div className="container text-center">
          <div className="section-head center mb-24">
            <span className="eyebrow green">Your Turn to Succeed</span>
            <h2>Ready to achieve your target band?</h2>
            <p className="muted mt-8">Explore our step-by-step masterclasses or take a diagnostic test.</p>
          </div>
          <div className="flex items-center justify-center gap-16 flex-wrap">
            <Link to="/courses" className="btn btn-primary" onClick={() => track("click_courses_cta", { section: "success_stories" })}>
              Explore All Courses
            </Link>
            <Link to="/mock-tests" className="btn btn-secondary">
              Free Readiness Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
