import "dotenv/config";
import express from "express";
import cors from "cors";
import leadsRouter from "./routes/leads.js";
import paymentsRouter from "./routes/payments.js";

const app = express();
const PORT = process.env.PORT || 4000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "lwsa-server" }));

app.use("/api/leads", leadsRouter);
app.use("/api/payments", paymentsRouter);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ ok: false, error: "Unexpected server error" });
});

app.listen(PORT, () => {
  console.log(`Learn With Sam & Ash API running at http://localhost:${PORT}`);
  if (!process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID.includes("XXXX")) {
    console.warn("⚠ RAZORPAY_KEY_ID/SECRET not configured — checkout will fail until .env is set.");
  }
  if (!process.env.CRM_WEBHOOK_URL) {
    console.warn("⚠ CRM_WEBHOOK_URL not set — leads are saved to server/data/leads.json only.");
  }
});
