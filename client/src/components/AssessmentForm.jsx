import { useState } from "react";
import { Link } from "react-router-dom";
import { useLeadForm } from "../hooks/useLeadForm.js";

export default function AssessmentForm() {
  const { status, error, submit, trackStart } = useLeadForm("free_assessment");
  const [fields, setFields] = useState({ full_name: "", email: "", phone: "", taken_before: "", test_window: "" });

  function update(name, value) {
    setFields((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!fields.full_name || !/^\S+@\S+\.\S+$/.test(fields.email) || !fields.taken_before || !fields.test_window) {
      return;
    }
    submit(fields);
  }

  if (status === "success") {
    return (
      <div>
        <h3>Thanks — here's your preparation profile.</h3>
        <p className="muted mt-8">Based on your answers, a structured recorded course is usually the fastest way to close the gap. You'll also get this by email/WhatsApp if provided.</p>
        <Link to="/recorded-ielts-course" className="btn btn-primary mt-16">View the Recorded Course</Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} onFocus={trackStart} className="mt-24">
      <div className="field-row">
        <div className="field">
          <label htmlFor="a_name">Full name</label>
          <input id="a_name" type="text" required value={fields.full_name} onChange={(e) => update("full_name", e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="a_email">Email</label>
          <input id="a_email" type="email" required value={fields.email} onChange={(e) => update("email", e.target.value)} />
        </div>
      </div>
      <div className="field">
        <label htmlFor="a_phone">WhatsApp number (optional)</label>
        <input id="a_phone" type="tel" placeholder="98765 43210" value={fields.phone} onChange={(e) => update("phone", e.target.value)} />
      </div>
      <div className="field">
        <label htmlFor="a_taken">Have you taken IELTS before?</label>
        <select id="a_taken" required value={fields.taken_before} onChange={(e) => update("taken_before", e.target.value)}>
          <option value="">Select</option>
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="a_window">When do you plan to take the test?</label>
        <select id="a_window" required value={fields.test_window} onChange={(e) => update("test_window", e.target.value)}>
          <option value="">Select</option>
          <option value="<1m">Less than 1 month</option>
          <option value="1-3m">1–3 months</option>
          <option value="3m+">3+ months</option>
          <option value="not_booked">Not booked</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary btn-block" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Get My Preparation Profile"}
      </button>
      {status === "error" && <p className="form-msg show error">{error}</p>}
    </form>
  );
}
