/**
 * Lead persistence.
 *
 * TODO(production): replace this file-based store with your real CRM.
 * Two ways to wire a real CRM:
 *   1. Set CRM_WEBHOOK_URL in .env — every lead is POSTed there in addition
 *      to being saved locally.
 *   2. Or replace saveLead() entirely with a direct SDK/API call to your
 *      CRM (HubSpot, Zoho, etc).
 *
 * Local storage is kept either way as a safety net so a lead is never lost
 * if the CRM call fails.
 */
import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "..", "..", "data", "leads.json");

async function readAll() {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT") return [];
    throw err;
  }
}

async function writeAll(leads) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(leads, null, 2), "utf-8");
}

export async function saveLead(lead) {
  const leads = await readAll();
  const record = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, ...lead };
  leads.push(record);
  await writeAll(leads);

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
      console.warn("CRM webhook forward failed, lead kept in local store:", err.message);
      record.crm_forwarded = false;
    }
  }

  return record;
}

export async function listLeads() {
  return readAll();
}
