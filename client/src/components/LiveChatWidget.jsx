import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics.js";

// Comprehensive, granular knowledge base for accurate, legitimate contextual answers
const QA_KNOWLEDGE_BASE = [
  // 1. GREETINGS & CASUAL
  {
    intent: "greeting",
    patterns: [/^(hi|hello|hey|hola|good morning|good evening|namaste|salam)/i],
    reply: "Hello! 😊 I'm here to help you with IELTS preparation, Spoken English with Ash, Mock Tests, or Study Abroad admissions. What would you like to know?",
  },
  {
    intent: "who_are_you",
    patterns: [/who are you/i, /what can you do/i, /who is sam and ash/i, /about sam and ash/i],
    reply: "We are **Learn With Sam & Ash** — an education community of 2.4M+ learners. Sam & Ash provide exam-tested IELTS masterclasses, speaking fluency cohorts, and university admissions advisory.",
    link: "/about",
    linkText: "Learn More About Sam & Ash"
  },

  // 2. PRICING & FEES (Granular breakdown)
  {
    intent: "ielts_price",
    patterns: [/how much.*(ielts|recorded)/i, /(fee|price|cost).*(ielts|recorded)/i, /5000/i, /recorded.*(cost|fee|price)/i],
    reply: "The **Recorded IELTS Course is ₹5,000 (one-time fee)**.\n\nIncluded:\n• 30+ hours of video lessons across all 4 modules\n• 7 Full timed mock tests\n• 7 Speaking evaluations\n• Personalized writing feedback\n• 3 months unlimited access.",
    link: "/recorded-ielts-course",
    linkText: "Enroll in Recorded IELTS (₹5,000)"
  },
  {
    intent: "english_price",
    patterns: [/how much.*(spoken|english|ash|level up)/i, /(fee|price|cost).*(spoken|english|ash|level up)/i, /2999|499/i],
    reply: "Here is the pricing for our Spoken English programs:\n\n1. **32-Day English Level Up**: ₹2,999 (one-time cohort fee with daily missions & live rooms)\n2. **Speak with Ash Club**: ₹499 / month (ongoing speaking practice membership)\n3. **Interview Success Blueprint**: ₹1,999 (one-time 4-week intensive).",
    link: "/courses",
    linkText: "View Spoken English Plans"
  },
  {
    intent: "all_pricing",
    patterns: [/(fee|cost|price|pricing|rates|charges)/i],
    reply: "Here is our official course fee structure:\n\n• **Recorded IELTS Course**: ₹5,000 (one-time)\n• **32-Day Spoken English Level Up**: ₹2,999 (one-time)\n• **Speak with Ash Speaking Club**: ₹499 / month\n• **English for Job Seekers**: ₹1,999 (one-time)\n• **Diagnostic Mock Tests**: 100% Free.",
    link: "/courses",
    linkText: "Compare All Course Fees"
  },

  // 3. IELTS MODULE SPECIFICS
  {
    intent: "ielts_writing",
    patterns: [/writing/i, /task 1/i, /task 2/i, /essay/i, /letter/i, /graph/i],
    reply: "For **IELTS Writing (Task 1 & Task 2)**, our course covers band-9 structural templates, vocabulary banks, coherence methods, and includes **direct evaluation of your essays** by expert trainers.",
    link: "/recorded-ielts-course",
    linkText: "See IELTS Writing Curriculum"
  },
  {
    intent: "ielts_speaking",
    patterns: [/ielts speaking/i, /cue card/i, /speaking part 1/i, /speaking part 2/i, /speaking part 3/i],
    reply: "For **IELTS Speaking**, you get structured frameworks for Part 1, 2 (Cue Cards), and 3, plus **7 dedicated 1-on-1 speaking evaluation sessions** with certified feedback on fluency, lexical resource, and pronunciation.",
    link: "/recorded-ielts-course",
    linkText: "View Speaking Training Details"
  },
  {
    intent: "ielts_reading_listening",
    patterns: [/reading/i, /listening/i, /true false not given/i, /headings/i, /mcq/i],
    reply: "Our **Reading & Listening Masterclasses** teach keyword mapping, speed-skimming techniques, avoiding distractor traps, and tackling difficult question types like True/False/Not Given and Matching Headings.",
    link: "/what-is-ielts",
    linkText: "Read IELTS Module Strategies"
  },
  {
    intent: "academic_vs_general",
    patterns: [/academic.*general/i, /general.*academic/i, /which ielts.*(should i|take|choose)/i, /difference.*academic.*general/i],
    reply: "**IELTS Academic** is for university degree admissions and healthcare professional registration.\n\n**IELTS General Training** is for migration (Canada PR, Australia, UK) and secondary employment visas. Our course covers both streams!",
    link: "/what-is-ielts",
    linkText: "Read Academic vs General Guide"
  },

  // 4. SPOKEN ENGLISH & SPEAK WITH ASH
  {
    intent: "speak_with_ash",
    patterns: [/speak with ash/i, /speaking club/i, /monthly club/i, /weekly rhythm/i],
    reply: "**Speak with Ash (₹499/mo)** is our active practice club with a weekly rhythm:\n• *Monday*: Daily Speaking Mission\n• *Tuesday*: Live Room with Ash\n• *Wednesday*: Peer Conversation Practice\n• *Thursday*: Grammar & Vocab Workshop\n• *Friday*: Live Speaking Room\n• *Weekend*: WhatsApp Voice Review.",
    link: "/courses",
    linkText: "Join Speak with Ash Club"
  },
  {
    intent: "32_day_level_up",
    patterns: [/32 day/i, /level up/i, /hesitation/i, /confidence/i, /shyness/i, /how to speak english/i],
    reply: "The **32-Day English Level Up (₹2,999)** is engineered for learners who understand English but hesitate when speaking. It combines structured video modules, daily WhatsApp missions, live practice rooms, and progress milestone tests.",
    link: "/courses",
    linkText: "Explore 32-Day Level Up"
  },
  {
    intent: "interview_blueprint",
    patterns: [/interview/i, /job/i, /resume/i, /hr round/i, /star/i, /career/i, /job seeker/i],
    reply: "The **Interview Success Blueprint (₹1,999)** includes 15 video lessons + 10 live mock interviews covering the 60-90s elevator pitch, STAR method behavioral answers, salary negotiation, and an official /35 evaluation scorecard.",
    link: "/courses",
    linkText: "View Interview Blueprint"
  },

  // 5. LIVE BATCHES & TIMETABLE
  {
    intent: "live_batches",
    patterns: [/live batch/i, /live class/i, /live course/i, /batch timing/i, /schedule/i, /timetable/i],
    reply: "Our **Live IELTS Batches** feature real-time classroom instruction, fixed timetables, interactive doubt clearance, and live speaking drills with trainers. New batches launch every few weeks.",
    link: "/live-ielts-course",
    linkText: "Check Next Live Batch Dates"
  },

  // 6. MOCK TESTS & DIAGNOSTIC QUIZ
  {
    intent: "mock_tests",
    patterns: [/mock test/i, /free test/i, /sample test/i, /diagnostic/i, /quiz/i, /test my level/i, /practice test/i],
    reply: "We provide **Free Diagnostic Mock Tests** and a **2-Minute IELTS Readiness Assessment** on our website to benchmark your current score before you enroll.",
    link: "/mock-tests",
    linkText: "Attempt Free Mock Tests"
  },

  // 7. STUDY ABROAD & VISAS
  {
    intent: "study_abroad",
    patterns: [/study abroad/i, /university/i, /canada/i, /uk/i, /usa/i, /australia/i, /visa/i, /sop/i, /admission/i, /masters/i, /bachelors/i],
    reply: "Our **Study Abroad Advisory Team** helps you with:\n• University & course shortlisting across UK, Canada, USA, Australia, Europe\n• SOP and Statement of Intent editing\n• Scholarship applications\n• Student visa filing & documentation.",
    link: "/study-abroad",
    linkText: "Book Free Study Abroad Consultation"
  },

  // 8. REFUND, DURATION & ACCESS
  {
    intent: "validity_access",
    patterns: [/validity/i, /how long.*access/i, /duration/i, /device/i, /mobile app/i, /lifetime/i],
    reply: "The Recorded Course gives you **3 months of unlimited 24/7 access** from any laptop, mobile, or tablet browser. You can re-watch videos and retake practice sets anytime.",
    link: "/recorded-ielts-course",
    linkText: "View Course Specifications"
  },
  {
    intent: "contact_human",
    patterns: [/talk to.*(human|person|counselor|support|agent)/i, /whatsapp/i, /phone number/i, /call/i, /help desk/i],
    reply: "You can speak directly with our academic counseling team on WhatsApp or request a callback.",
    showWhatsAppOption: true
  }
];

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hi! I'm the Sam & Ash Assistant. Ask me anything about IELTS course fees, Spoken English batches, mock tests, or study abroad admissions!",
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  function toggleChat() {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      track("open_live_chat_widget", { source: "floating_button" });
    }
  }

  function findBestAnswer(query) {
    const text = query.trim().toLowerCase();

    // 1. Check strict regex patterns
    for (const item of QA_KNOWLEDGE_BASE) {
      if (item.patterns && item.patterns.some((pattern) => pattern.test(text))) {
        return item;
      }
    }

    // 2. Word token match scoring
    const tokens = text.replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
    let bestMatch = null;
    let highestScore = 0;

    for (const item of QA_KNOWLEDGE_BASE) {
      if (!item.patterns) continue;
      let score = 0;
      for (const token of tokens) {
        if (["the", "is", "a", "an", "and", "or", "in", "on", "for", "to", "how", "what", "can", "i"].includes(token)) continue;
        for (const pattern of item.patterns) {
          if (pattern.test(token)) {
            score += 1;
          }
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch && highestScore > 0) {
      return bestMatch;
    }

    // Fallback response with helpful recommendations
    return {
      reply: `I want to make sure you get the exact answer for "${query}". Here are our primary programs, or you can speak directly with our team:`,
      link: "/courses",
      linkText: "Browse All Courses (IELTS & Spoken English)",
      showWhatsAppOption: true
    };
  }

  function handleSend(userText = inputValue) {
    if (!userText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userText.trim(),
      timestamp: "Just now"
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    track("send_chat_message", { query: userText });

    setTimeout(() => {
      const match = findBestAnswer(userText);

      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        text: match.reply,
        link: match.link,
        linkText: match.linkText,
        showWhatsAppOption: match.showWhatsAppOption,
        timestamp: "Just now"
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 450);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  function handleWhatsAppRedirect(message = "Hi Sam & Ash team! I have a question from the website chat.") {
    track("click_whatsapp_direct_chat", { message });
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/919999999999?text=${encoded}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="live-chat-container" aria-label="Live Chat Support">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chat-modal"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Modal Header */}
            <div className="chat-modal-header">
              <div className="flex items-center gap-10">
                <div className="chat-avatar-group">
                  <span className="chat-avatar-badge">S&amp;A</span>
                  <span className="chat-online-dot" />
                </div>
                <div>
                  <div className="chat-title">Sam &amp; Ash Assistant</div>
                  <div className="chat-subtitle">Instant Answers &amp; Counselor Chat</div>
                </div>
              </div>
              <button
                className="chat-close-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close Chat"
              >
                ✕
              </button>
            </div>

            {/* Interactive Chat Stream */}
            <div className="chat-stream">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`chat-bubble-row ${m.sender === "user" ? "user-row" : "bot-row"}`}
                >
                  <div className={`chat-bubble ${m.sender === "user" ? "sent" : "received"}`}>
                    <p style={{ margin: 0, whiteSpace: "pre-line" }}>{m.text}</p>
                    {m.link && (
                      <Link
                        to={m.link}
                        className="chat-bubble-cta"
                        onClick={() => setIsOpen(false)}
                      >
                        {m.linkText} →
                      </Link>
                    )}
                    {m.showWhatsAppOption && (
                      <button
                        className="chat-bubble-wa-btn mt-8"
                        onClick={() => handleWhatsAppRedirect()}
                      >
                        💬 Connect with Counselor on WhatsApp
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="chat-bubble-row bot-row">
                  <div className="chat-bubble received typing-indicator">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Pills */}
            <div className="chat-pills-bar">
              <button
                className="chat-pill"
                onClick={() => handleSend("What is the fee for Recorded IELTS?")}
              >
                💰 IELTS Fee (₹5,000)
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("Tell me about Speak with Ash Spoken English")}
              >
                🗣️ Spoken English
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("Do you have free diagnostic mock tests?")}
              >
                📝 Free Mocks
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("Help with study abroad admission")}
              >
                ✈️ Study Abroad
              </button>
            </div>

            {/* Text Input Footer */}
            <div className="chat-input-footer">
              <input
                type="text"
                className="chat-text-input"
                placeholder="Ask about fees, writing, speaking, mocks..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
              />
              <button
                className="chat-send-btn"
                onClick={() => handleSend()}
                disabled={!inputValue.trim()}
                aria-label="Send Message"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <motion.button
        className="live-chat-toggle-btn"
        onClick={toggleChat}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Toggle Live Chat Support"
      >
        <span className="live-chat-pulse" />
        {isOpen ? (
          <span className="live-chat-icon-close">✕</span>
        ) : (
          <svg className="live-chat-icon-msg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        )}
        <span className="live-chat-badge-text">Live Chat</span>
      </motion.button>
    </div>
  );
}
