import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, verifyPayment } from "../lib/api.js";
import { loadRazorpayScript } from "../lib/loadRazorpay.js";
import { track } from "../lib/analytics.js";

const SUPPORT_EMAIL = "support@learnwithsamandash.com";
const SUPPORT_WHATSAPP = "+91-00000-00000";

export default function Checkout({ course = "Recorded IELTS Course", priceLabel = "₹5,000" }) {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ full_name: "", email: "", country_code: "+91", phone: "" });
  const [status, setStatus] = useState("idle"); // idle | processing | error
  const [error, setError] = useState(null);

  function update(name, value) {
    setFields((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    if (!fields.full_name.trim()) return "Please enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(fields.email)) return "Please enter a valid email.";
    if (!/^[0-9\s]{7,15}$/.test(fields.phone)) return "Please enter a valid phone number.";
    return null;
  }

  async function handleEnrol() {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setStatus("error");
      return;
    }

    setStatus("processing");
    setError(null);
    track("start_checkout", { course, price: priceLabel });

    try {
      await loadRazorpayScript();
      const order = await createOrder(course);

      const rzp = new window.Razorpay({
        key: order.key_id,
        amount: order.amount,
        currency: order.currency,
        order_id: order.order_id,
        name: "Learn With Sam & Ash",
        description: course,
        image: "/images/logo-mark.svg",
        prefill: {
          name: fields.full_name,
          email: fields.email,
          contact: `${fields.country_code}${fields.phone}`
        },
        theme: { color: "#0f9d58" },
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              course,
              student: fields
            });
            track("purchase", { course, revenue: priceLabel, transaction_id: response.razorpay_payment_id });
            navigate(`/thank-you?payment_id=${encodeURIComponent(response.razorpay_payment_id)}`);
          } catch (err) {
            setError(`Payment succeeded but verification failed — contact ${SUPPORT_EMAIL} with payment ID ${response.razorpay_payment_id}.`);
            setStatus("error");
          }
        },
        modal: {
          ondismiss: () => {
            track("checkout_abandoned", { course });
            setStatus("idle");
          }
        }
      });

      rzp.on("payment.failed", (response) => {
        track("payment_failed", { course, error: response.error?.description });
        setError(`Payment failed: ${response.error?.description || "please try again"}. If money was deducted, contact ${SUPPORT_EMAIL}.`);
        setStatus("error");
      });

      rzp.open();
      setStatus("idle");
    } catch (err) {
      setError(err.message || `Payment is temporarily unavailable. Contact ${SUPPORT_EMAIL} or WhatsApp ${SUPPORT_WHATSAPP} to enrol.`);
      setStatus("error");
    }
  }

  return (
    <div className="form-card">
      <span className="eyebrow">Enrol now</span>
      <h2>Start the Recorded IELTS Course</h2>
      <p className="muted mt-8">One-time course fee. Access period and included support shown above.</p>

      <div className="mt-24">
        <div className="field-row">
          <div className="field">
            <label htmlFor="full_name">Full name</label>
            <input id="full_name" type="text" value={fields.full_name} onChange={(e) => update("full_name", e.target.value)} autoComplete="name" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={fields.email} onChange={(e) => update("email", e.target.value)} autoComplete="email" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="phone">WhatsApp / mobile number</label>
          <div className="phone-field">
            <select aria-label="Country code" value={fields.country_code} onChange={(e) => update("country_code", e.target.value)}>
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+971">+971</option>
            </select>
            <input id="phone" type="tel" placeholder="98765 43210" value={fields.phone} onChange={(e) => update("phone", e.target.value)} autoComplete="tel" />
          </div>
        </div>
      </div>

      <div className="divider" style={{ margin: "28px 0" }}></div>

      <div className="flex items-center" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="small muted">{course}</div>
          <div className="price-current">{priceLabel}</div>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleEnrol} disabled={status === "processing"}>
          {status === "processing" ? "Starting checkout…" : `Enrol Now — Pay ${priceLabel}`}
        </button>
      </div>

      {status === "error" && error && <p className="form-msg show error">{error}</p>}

      <p className="small muted mt-16">
        Secure payment via Razorpay. By enrolling you agree to our <a href="#" style={{ color: "var(--blue)" }}>Terms</a> and{" "}
        <a href="#" style={{ color: "var(--blue)" }}>Refund Policy</a>.
      </p>
    </div>
  );
}
