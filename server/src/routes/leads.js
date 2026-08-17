import { Router } from "express";
import { saveLead, listLeads } from "../lib/store.js";

const router = Router();

const VALID_LEAD_TYPES = new Set([
  "study_abroad",
  "free_assessment",
  "course_checkout",
  "course_purchase"
]);

router.post("/", async (req, res) => {
  const body = req.body || {};
  const leadType = body.lead_type;

  if (!leadType || !VALID_LEAD_TYPES.has(leadType)) {
    return res.status(400).json({ ok: false, error: "Missing or invalid lead_type" });
  }
  if (!body.email && !body.phone) {
    return res.status(400).json({ ok: false, error: "At least one of email or phone is required" });
  }

  try {
    const record = await saveLead({ ...body, received_at: new Date().toISOString() });
    res.status(201).json({ ok: true, id: record.id });
  } catch (err) {
    console.error("Failed to save lead:", err);
    res.status(500).json({ ok: false, error: "Could not save lead" });
  }
});

// Simple internal listing endpoint — protect this behind real auth before
// exposing it beyond local development.
router.get("/", async (_req, res) => {
  const leads = await listLeads();
  res.json({ ok: true, count: leads.length, leads });
});

export default router;
