import { useState } from "react";
import { Link } from "react-router-dom";
import { useLeadForm } from "../hooks/useLeadForm.js";

export default function StudyAbroadForm() {
  const { status, error, submit, trackStart } = useLeadForm("study_abroad");
  const [fields, setFields] = useState({ email: "", country_code: "+91", phone: "", consent: false });

  function update(name, value) {
    setFields((f) => ({ ...f, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(fields.email) || !/^[0-9\s]{7,15}$/.test(fields.phone) || !fields.consent) {
      e.target.reportValidity?.();
      return;
    }
    submit(fields);
  }

  if (status === "success") {
    return (
      <div style={{ textAlign: "center" }}>
        <h3>Thanks — you're on our list.</h3>
        <p className="muted mt-8">A study-abroad consultant will reach out to you directly on the number/email you shared. In the meantime, feel free to keep exploring your IELTS preparation.</p>
        <Link to="/recorded-ielts-course" className="btn btn-primary mt-16">Explore the Recorded Course</Link>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} onFocus={trackStart} className="mt-24">
      <div className="field">
        <label htmlFor="sa_email">Email address</label>
        <input id="sa_email" type="email" required value={fields.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="sa_phone">Phone number</label>
        <div className="phone-field">
          <select aria-label="Country code" value={fields.country_code} onChange={(e) => update("country_code", e.target.value)}>
            <option value="+91">+91</option>
            <option value="+1">+1</option>
            <option value="+44">+44</option>
            <option value="+971">+971</option>
          </select>
          <input id="sa_phone" type="tel" required placeholder="98765 43210" value={fields.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" />
        </div>
      </div>
      <div className="checkbox-row mt-16">
        <input type="checkbox" id="sa_consent" checked={fields.consent} onChange={(e) => update("consent", e.target.checked)} required />
        <label htmlFor="sa_consent" style={{ margin: 0, fontWeight: 500 }}>
          I agree to be contacted by phone, WhatsApp or email about study-abroad guidance.
        </label>
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-24" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting…" : "Connect Me With a Consultant"}
      </button>
      {status === "error" && <p className="form-msg show error">{error}</p>}
    </form>
  );
}
