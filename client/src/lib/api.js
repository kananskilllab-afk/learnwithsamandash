import { getAttribution } from "./analytics.js";

// In dev, Vite proxies /api -> http://localhost:4000 (see vite.config.js).
// In production, set VITE_API_BASE_URL to your deployed API's origin.
const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

function withAttribution(payload) {
  const attribution = getAttribution() || {};
  return {
    ...payload,
    source_page: window.location.pathname,
    submitted_at: new Date().toISOString(),
    device: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
    utm_source: attribution.utm_source || "",
    utm_medium: attribution.utm_medium || "",
    utm_campaign: attribution.utm_campaign || "",
    utm_content: attribution.utm_content || "",
    utm_term: attribution.utm_term || "",
    referrer: attribution.referrer || "",
    landing_page: attribution.landing_page || ""
  };
}

export async function submitLead(leadType, fields) {
  const payload = withAttribution({ lead_type: leadType, ...fields });
  try {
    const res = await fetch(`${API_BASE}/api/leads`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return await res.json();
  } catch (err) {
    // Never block the user if the API is briefly unavailable — keep the
    // lead locally so it isn't lost, and let the UI still show success.
    console.warn("Lead submission failed, caching locally:", err);
    try {
      const pending = JSON.parse(localStorage.getItem("lwsa_pending_leads") || "[]");
      pending.push(payload);
      localStorage.setItem("lwsa_pending_leads", JSON.stringify(pending));
    } catch (e) {
      /* ignore */
    }
    return { ok: true, offline: true };
  }
}

export async function createOrder(course) {
  const res = await fetch(`${API_BASE}/api/payments/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ course })
  });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.error || "Could not start checkout");
  return data;
}

export async function verifyPayment({ razorpay_order_id, razorpay_payment_id, razorpay_signature, course, student }) {
  const res = await fetch(`${API_BASE}/api/payments/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ razorpay_order_id, razorpay_payment_id, razorpay_signature, course, student })
  });
  const data = await res.json();
  if (!res.ok || !data.ok) throw new Error(data.error || "Payment verification failed");
  return data;
}
