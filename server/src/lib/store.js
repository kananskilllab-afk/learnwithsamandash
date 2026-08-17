/**
 * Lead persistence.
 *
 * Primary store is MongoDB Atlas (the `leads` collection). If the database
 * is unreachable, leads are written to server/data/leads.json instead so
 * nothing is lost — that file is a safety net, not the source of truth.
 *
 * TODO(production): CRM_WEBHOOK_URL forwards every lead to your real CRM in
 * addition to the database write, if set.
 */
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDb } from "./db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FALLBACK_FILE = path.join(__dirname, "..", "..", "data", "leads.json");

async function readFallback() {
  try {
    const raw = await fs.readFile(FALLBACK_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function appendFallback(record) {
  const leads = await readFallback();
  leads.push(record);
  await fs.mkdir(path.dirname(FALLBACK_FILE), { recursive: true });
  await fs.writeFile(FALLBACK_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function saveLead(lead) {
  const record = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...lead };

  try {
    const db = await getDb();
    await db.collection("leads").insertOne({ ...record });
  } catch (err) {
    console.warn("MongoDB write failed, saving to local fallback file:", err.message);
    await appendFallback(record);
  }

  const crmUrl = process.env.CRM_WEBHOOK_URL;
  if (crmUrl) {
    try {
      const res = await fetch(crmUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record)
      });
      record.crm_forwarded = res.ok;
    } catch (err) {
      console.warn("CRM webhook forward failed, lead kept in database/local store:", err.message);
      record.crm_forwarded = false;
    }
  }

  return record;
}

export async function listLeads() {
  try {
    const db = await getDb();
    const leads = await db.collection("leads").find().sort({ received_at: -1 }).toArray();
    return leads;
  } catch (err) {
    console.warn("MongoDB read failed, falling back to local file:", err.message);
    return readFallback();
  }
}
