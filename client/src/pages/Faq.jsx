import { Link } from "react-router-dom";
import { usePageView } from "../hooks/usePageView.js";
import { FaqGroup } from "../components/FaqAccordion.jsx";

export default function Faq() {
  usePageView("view_faq");

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow blue">Help center</span>
          <h1>Frequently asked questions</h1>
          <p className="lede mt-16">Grouped by topic so you can jump straight to what you need.</p>
        </div>
      </section>

      <section>
        <div className="container container-narrow">
          <FaqGroup
            title="IELTS basics"
            items={[
              { q: "What is IELTS?", a: "IELTS (International English Language Testing System) measures your English proficiency across Listening, Reading, Writing and Speaking." },
              { q: "Academic vs General Training — what's the difference?", a: "Academic is generally used for university admission; General Training is generally used for work and migration. Confirm with your specific destination." },
              { q: "How are bands scored?", a: "Each module and your overall result are scored on a 0–9 band scale." },
              { q: "Which version do I need?", a: <>It depends on your purpose (study, work, migration). Not sure? <Link to="/study-abroad" style={{ color: "var(--blue)" }}>Talk to an expert</Link>.</> }
            ]}
          />

          <FaqGroup
            title="Recorded course"
            items={[
              { q: "I already watch your YouTube videos. Why should I buy the recorded course?", a: "Our free videos teach individual topics well. The course brings the lessons, materials, sample answers, practice, mock tests and review process into one organised path you can follow module by module." },
              { q: "Does the recorded course include both Academic and General Training IELTS?", a: "The core skills taught apply broadly; exactly which components map to each test type will be confirmed and published here before launch." },
              { q: "Can I join if I have never prepared for IELTS before?", a: "Yes, the course is built to take you from the fundamentals through to test-day readiness." },
              { q: "How do unlimited writing/speaking reviews work?", a: "Submission channel, turnaround time and any limits will be confirmed operationally and published here before launch." },
              { q: "How do I book my one-on-one speaking tests?", a: "Booking method, duration and availability rules will be confirmed and published here before launch." },
              { q: "What happens after my 3-month access ends?", a: "Access-extension or renewal options, if any, will be confirmed and published here before launch." },
              { q: "What devices can I use?", a: "Confirmed device/platform support will be listed here." }
            ]}
          />

          <FaqGroup
            title="Live course"
            items={[
              { q: "When is the next batch?", a: <>See the current schedule on the <Link to="/live-ielts-course" style={{ color: "var(--blue)" }}>Live Course page</Link>.</> },
              { q: "What happens if I miss a class?", a: "Catch-up/recording policy to be confirmed before launch." }
            ]}
          />

          <FaqGroup
            title="Payment"
            items={[
              { q: "What payment methods are supported?", a: "Payments are processed securely through Razorpay, supporting cards, UPI, netbanking and wallets." },
              { q: "Do you provide an invoice?", a: "Yes — a receipt/invoice is generated automatically after successful payment." },
              { q: "What's your refund/cancellation policy?", a: "Full policy to be linked here before payment collection begins." }
            ]}
          />

          <FaqGroup
            id="support"
            title="Support"
            items={[
              { q: "How do I ask a doubt?", a: "Contact us at support@learnwithsamandash.com or WhatsApp +91-00000-00000. Support hours to be confirmed." },
              { q: "How fast will I get a response?", a: "Expected response time to be confirmed by the support team before launch." }
            ]}
          />

          <FaqGroup
            title="Study abroad"
            items={[
              { q: "I'm not sure which IELTS I need for my country or university. Can someone help?", a: <>Yes — <Link to="/study-abroad" style={{ color: "var(--blue)" }}>leave your phone and email</Link> and our study-abroad consultant will connect with you directly.</> },
              { q: "Is study-abroad counselling separate from IELTS preparation?", a: "Yes, it's a separate guidance conversation with our consultant alongside your IELTS course." }
            ]}
          />

          <FaqGroup
            title="Technical"
            items={[
              { q: "I forgot my password.", a: <>Use "Forgot password" on the <Link to="/login" style={{ color: "var(--blue)" }}>login page</Link>.</> },
              { q: "My videos won't play.", a: "Try a different browser or check your connection. If it persists, contact support." }
            ]}
          />
        </div>
      </section>

      <section className="bg-alt">
        <div className="container text-center">
          <div className="section-head center mb-24">
            <span className="eyebrow blue">Support &amp; Advisory</span>
            <h2>Still have questions?</h2>
            <p className="muted mt-8">Our counseling and academic support team is here to assist you.</p>
          </div>
          <div className="flex items-center justify-center gap-16 flex-wrap">
            <Link to="/courses" className="btn btn-primary">Browse All Courses</Link>
            <Link to="/study-abroad" className="btn btn-secondary">Talk to an Advisor</Link>
          </div>
        </div>
      </section>
    </>
  );
}
