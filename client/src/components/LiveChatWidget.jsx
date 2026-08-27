import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics.js";

const KNOWLEDGE_BASE = [
  {
    keywords: ["ielts", "recorded", "course", "fee", "price", "cost", "5000", "modules", "band 7", "band 8"],
    reply: "Our flagship **Recorded IELTS Course (₹5,000)** includes 30+ hours of modular video strategies across Reading, Writing, Listening & Speaking, 7 full timed mock tests, 7 speaking evaluations, and personalized writing reviews.",
    link: "/recorded-ielts-course",
    linkText: "View Recorded Course (₹5,000)"
  },
  {
    keywords: ["spoken", "english", "speak", "ash", "level up", "32 day", "fluency", "hesitation", "grammar"],
    reply: "We offer two dedicated Spoken English programs led by Ash:\n1. **32-Day English Level Up (₹2,999)**: Step-by-step speaking transformation with daily missions & live rooms.\n2. **Speak with Ash Club (₹499/mo)**: 2 weekly live sessions with Ash, 1 trainer room & reviewed WhatsApp tasks.",
    link: "/courses",
    linkText: "Explore Spoken English Programs"
  },
  {
    keywords: ["interview", "job", "career", "blueprint", "1999", "hr", "star framework", "resume"],
    reply: "The **English for Job Seekers (Interview Success Blueprint - ₹1,999)** gives you 15 recorded sessions, 10 live mock interviews, 60–90s pitch mastery, STAR framework answers, and an official /35 evaluation scorecard.",
    link: "/courses",
    linkText: "View Interview Blueprint (₹1,999)"
  },
  {
    keywords: ["live", "batch", "schedule", "timetable", "trainer", "interactive", "classroom"],
    reply: "Our **Live IELTS Batches** provide scheduled interactive workshops, real-time doubts resolution, module materials, and speaking practice with certified trainers.",
    link: "/live-ielts-course",
    linkText: "View Live Batches"
  },
  {
    keywords: ["mock", "test", "diagnostic", "free", "quiz", "assessment", "readiness", "score"],
    reply: "You can take our **Free 2-Minute IELTS Readiness Quiz** or practice with diagnostic mock tests right now on the website with instant feedback.",
    link: "/mock-tests",
    linkText: "Start Free Diagnostic Mock Tests"
  },
  {
    keywords: ["study abroad", "visa", "university", "canada", "uk", "usa", "australia", "sop", "admissions"],
    reply: "Our **Study Abroad Advisory Team** assists with university shortlisting, SOP & essay reviews, scholarship guidance, and visa paperwork from start to finish.",
    link: "/study-abroad",
    linkText: "Book Study Abroad Consultation"
  }
];

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hi there! I'm the Sam & Ash Learning Assistant. Ask me anything about our IELTS courses, Spoken English club, or study abroad counseling!",
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
      const lower = userText.toLowerCase();
      let match = KNOWLEDGE_BASE.find((k) =>
        k.keywords.some((kw) => lower.includes(kw))
      );

      let botResponse;
      if (match) {
        botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          text: match.reply,
          link: match.link,
          linkText: match.linkText,
          timestamp: "Just now"
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          sender: "bot",
          text: "I can help you explore our IELTS courses (Recorded & Live), Ash's 32-Day Spoken English Level Up, Interview Prep, or connect you with a human academic counselor on WhatsApp.",
          link: "/courses",
          linkText: "Explore All Courses",
          showWhatsAppOption: true,
          timestamp: "Just now"
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 600);
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
                  <div className="chat-subtitle">Instant AI &amp; Counselor Chat</div>
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
                onClick={() => handleSend("Tell me about the Recorded IELTS Course")}
              >
                🎯 IELTS Course (₹5,000)
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("How does Speak with Ash / Spoken English work?")}
              >
                🗣️ Spoken English
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("Do you have free mock tests?")}
              >
                📝 Free Mocks
              </button>
            </div>

            {/* Text Input Footer */}
            <div className="chat-input-footer">
              <input
                type="text"
                className="chat-text-input"
                placeholder="Ask about courses, fees, mocks..."
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
