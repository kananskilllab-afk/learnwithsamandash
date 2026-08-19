import { useState } from "react";
import { Link } from "react-router-dom";
import { track } from "../lib/analytics.js";

const STEPS = [
  {
    key: "need",
    question: "How do you want to prepare?",
    options: [
      { value: "flexible", label: "On my own schedule, whenever I have time" },
      { value: "schedule", label: "With fixed classes and a timetable" },
      { value: "unsure", label: "Not sure yet" }
    ]
  },
  {
    key: "stage",
    question: "Where are you in your preparation?",
    options: [
      { value: "beginner", label: "Just starting out" },
      { value: "retaker", label: "I've taken IELTS before" },
      { value: "practice", label: "I know the concepts, I need practice" }
    ]
  },
  {
    key: "window",
    question: "When do you plan to take the test?",
    options: [
      { value: "soon", label: "Within 1 month" },
      { value: "mid", label: "1–3 months" },
      { value: "later", label: "3+ months / not booked" }
    ]
  }
];

function Result({ answers }) {
  const { need, stage, window } = answers;

  // Case 1: Needs fixed classes and timetable
  if (need === "schedule") {
    return (
      <div>
        <span className="google-band-tag mb-12">Recommended: Live Batch</span>
        <h3>You're a great fit for the Live IELTS Batch.</h3>
        <p className="muted mt-8">
          You indicated that you need structured classes and scheduled accountability. Our live batch gives you real-time trainer interaction, dedicated Q&A, and interactive workshop sessions.
        </p>
        <div className="hero-ctas mt-24">
          <Link className="btn btn-primary" to="/live-ielts-course">
            View Live Batch Schedule
          </Link>
          <Link className="btn btn-secondary" to="/recorded-ielts-course">
            Compare with Recorded
          </Link>
        </div>
      </div>
    );
  }

  // Case 2: Short timeline (less than 1 month) OR needs targeted practice / retaker
  if (window === "soon" || (stage === "practice" && window !== "later")) {
    return (
      <div>
        <span className="google-band-tag mb-12">Recommended: Mock Sprint & Review</span>
        <h3>Targeted Mock Tests & Speaking Sprint</h3>
        <p className="muted mt-8">
          With your test approaching within 1 month and concepts already familiar, your highest return on time is full-length timed mocks, exam simulations, and expert diagnostic reviews for Speaking and Writing.
        </p>
        <div className="hero-ctas mt-24">
          <Link className="btn btn-primary" to="/mock-tests">
            Start Diagnostic Mock Tests
          </Link>
          <Link className="btn btn-secondary" to="/recorded-ielts-course">
            View Full Recorded Course
          </Link>
        </div>
      </div>
    );
  }

  // Case 3: 3+ months / not booked yet OR unsure of test requirements
  if (window === "later" || need === "unsure") {
    return (
      <div>
        <span className="google-band-tag mb-12">Recommended: Study Blueprint + Advisory</span>
        <h3>Start with a Free 60-Day Study Plan</h3>
        <p className="muted mt-8">
          Since your test window is 3+ months out or you're finalizing your target countries, start with our free foundational study roadmap and speak with our study abroad advisors to match your university cutoffs.
        </p>
        <div className="hero-ctas mt-24">
          <Link className="btn btn-primary" to="/study-abroad">
            Talk to a Study Abroad Expert
          </Link>
          <Link className="btn btn-secondary" to="/mock-tests">
            Download Free Study Plan
          </Link>
        </div>
      </div>
    );
  }

  // Case 4: Standard Beginner or Retaker with 1–3 months (The Sweet Spot for Recorded Course)
  return (
    <div>
      <span className="google-band-tag mb-12">Recommended: Complete Strategy Course</span>
      <h3>The Recorded IELTS Course is your best match.</h3>
      <p className="muted mt-8">
        With 1–3 months of prep time, our self-paced course gives you the complete 30-hour step-by-step strategy for all 4 modules, 7 full mock tests, and 7 personalized speaking evaluations on your own schedule.
      </p>
      <div className="hero-ctas mt-24">
        <Link className="btn btn-primary" to="/recorded-ielts-course">
          View Recorded Course (₹5,000)
        </Link>
        <Link className="btn btn-secondary" to="/mock-tests">
          Explore Free Resources
        </Link>
      </div>
    </div>
  );
}

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const done = step >= STEPS.length;

  function choose(key, value) {
    const next = { ...answers, [key]: value };
    setAnswers(next);
    setTimeout(() => {
      const nextStep = step + 1;
      setStep(nextStep);
      if (nextStep >= STEPS.length) {
        track("quiz_complete", next);
      }
    }, 200);
  }

  return (
    <div className="quiz-box">
      {!done && (
        <div className="progress-dots">
          {STEPS.map((_, i) => (
            <span key={i} className={i <= step ? "active" : ""} />
          ))}
        </div>
      )}

      {!done ? (
        <div>
          <h3>{STEPS[step].question}</h3>
          <div className="quiz-options">
            {STEPS[step].options.map((opt) => (
              <button
                key={opt.value}
                className={`quiz-option${answers[STEPS[step].key] === opt.value ? " selected" : ""}`}
                onClick={() => choose(STEPS[step].key, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <Result answers={answers} />
      )}
    </div>
  );
}
