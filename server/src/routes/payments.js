import { Router } from "express";
import { getRazorpayClient, verifyPaymentSignature } from "../lib/razorpay.js";
import { saveLead } from "../lib/store.js";

const router = Router();

// Fixed, server-side price list — never trust an amount sent from the client.
// TODO: replace with the confirmed price once the product owner signs off.
const COURSES = {
  "Recorded IELTS Course": 5000
};

router.post("/create-order", async (req, res) => {
  const { course } = req.body || {};
  const amountRupees = COURSES[course];

  if (!amountRupees) {
    return res.status(400).json({ ok: false, error: "Unknown course" });
  }

  try {
    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountRupees * 100, // paise
      currency: "INR",
      receipt: `lwsa_${Date.now()}`,
      notes: { course }
    });

    res.json({
      ok: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID
    });
  } catch (err) {
    console.error("Razorpay order creation failed:", err.message);
    res.status(500).json({
      ok: false,
      error: "Could not start checkout. Please try again or contact support.",
      support_email: process.env.SUPPORT_EMAIL,
      support_whatsapp: process.env.SUPPORT_WHATSAPP
    });
  }
});

router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    course,
    student
  } = req.body || {};

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ ok: false, error: "Missing payment verification fields" });
  }

  const valid = verifyPaymentSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature
  });

  if (!valid) {
    return res.status(400).json({ ok: false, error: "Payment signature verification failed" });
  }

  // Signature verified — safe to treat this as a confirmed purchase.
  // TODO(production): trigger LMS account creation / course access grant here.
  const record = await saveLead({
    lead_type: "course_purchase",
    course,
    amount: COURSES[course] || null,
    razorpay_order_id,
    razorpay_payment_id,
    ...student,
    verified_at: new Date().toISOString()
  });

  res.json({ ok: true, id: record.id });
});

export default router;
