# Learn With Sam & Ash — IELTS Website

React (Vite) frontend + Node/Express API for the IELTS course website.

## Structure

```
client/   React + Vite frontend
server/   Express API — lead capture (CRM-ready) + Razorpay order creation/verification
```

## Setup

**Server**
```
cd server
cp .env.example .env   # fill in RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET / CRM_WEBHOOK_URL
npm install
npm run dev             # http://localhost:4000
```

**Client**
```
cd client
npm install
npm run dev              # http://localhost:5173 (proxies /api to the server)
```

## Before launch

- Set real `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` in `server/.env`.
- Set `CRM_WEBHOOK_URL` in `server/.env` to your real CRM's inbound endpoint (leads are saved to `server/data/leads.json` locally either way, as a fallback).
- Confirm final course price in `server/src/routes/payments.js` (`COURSES` map).
- Replace placeholder hero/about photos, logo, curriculum lesson titles, live batch dates, legal policy links, and testimonials (all clearly marked in the code).
