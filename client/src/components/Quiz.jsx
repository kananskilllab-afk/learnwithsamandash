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
  const need = answers.need;

  if (need === "schedule") {
    return (
      <div>
        <h3>You're a great fit for the Live IELTS Course.</h3>
        <p className="muted mt-8">You told us you need fixed classes and accountability. Our live course gives you scheduled sessions with the same structured material as the recorded course.</p>
        <div className="hero-ctas mt-24">
          <Link className="btn btn-primary" to="/live-ielts-course">View the Next Live Batch</Link>
          <Link className="btn btn-secondary" to="/recorded-ielts-course">Compare with Recorded Course</Link>
        </div>
      </div>
    );
  }
  if (need === "unsure") {
    return (
      <div>
        <h3>Let's get you clarity first.</h3>
        <p className="muted mt-8">Since you're not sure about your destination or test type yet, our team can help you figure out the right path alongside your IELTS prep.</p>
        <div className="hero-ctas mt-24">
          <Link className="btn btn-primary" to="/study-abroad">Talk to a Study Abroad Expert</Link>
          <Link className="btn btn-secondary" to="/recorded-ielts-course">Start the Recorded Course</Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h3>The Recorded IELTS Course is your best next step.</h3>
      <p className="muted mt-8">Based on your answers, a flexible, self-paced course fits how you want to prepare — all 4 modules, mock tests and review support included.</p>
      <div className="hero-ctas mt-24">
        <Link className="btn btn-primary" to="/recorded-ielts-course">View the Recorded Course</Link>
        <Link className="btn btn-secondary" to="/study-abroad">Also Planning to Study Abroad?</Link>
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
