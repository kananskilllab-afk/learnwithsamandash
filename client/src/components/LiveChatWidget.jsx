import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics.js";

// Humanized, empathetic response variations with randomized selection
const HUMAN_QA_DATABASE = [
  // 1. GREETINGS
  {
    intent: "greeting",
    patterns: [/^(hi|hello|hey|hola|good morning|good evening|namaste|salam|hii|heyy)/i],
    replies: [
      "Hi there! Glad you reached out. How is your preparation going, and what's on your mind today?",
      "Hey! Welcome. Tell me what goal you're working toward — whether it's hitting a target IELTS band or speaking English more naturally, I'm here to help.",
      "Hello! Great to meet you. Tell me what brings you here today — are you planning an upcoming exam or looking to build everyday fluency?"
    ]
  },

  // 2. IELTS PRICING / RECORDED COURSE
  {
    intent: "ielts_pricing",
    patterns: [/how much.*(ielts|recorded)/i, /(fee|price|cost).*(ielts|recorded)/i, /5000/i, /recorded.*(cost|fee|price)/i, /take.*recorded/i],
    replies: [
      "The full Recorded IELTS Course is ₹5,000 as a one-time fee. We built this so you don't have to scramble across random YouTube tips. You get 30+ hours of complete step-by-step methods across all 4 modules, 7 full timed mock tests, and real trainer reviews on your writing essays and speaking tests.",
      "It's a one-time enrollment of ₹5,000. That gives you 3 full months of unlimited access to our complete curriculum (Reading, Writing, Listening, Speaking), plus 7 actual mock exams with 1-on-1 speaking evaluations and writing feedback from certified trainers.",
      "You can join the Recorded IELTS Course for ₹5,000 (one-time). We specifically include 7 evaluated mock tests and personal writing reviews so you get genuine diagnostic feedback before test day."
    ],
    link: "/recorded-ielts-course",
    linkText: "See Full Recorded Course Breakdown"
  },

  // 3. SPOKEN ENGLISH & SPEAK WITH ASH
  {
    intent: "spoken_english_ash",
    patterns: [/spoken english/i, /speak with ash/i, /level up/i, /32 day/i, /hesitation/i, /confidence/i, /shyness/i, /fluent/i],
    replies: [
      "I know how frustrating it feels when you understand English in your head but freeze up when speaking. Ash runs two focused programs for this:\n\n• **32-Day English Level Up (₹2,999)**: A structured daily transformation with guided video lessons, WhatsApp missions, and live practice rooms.\n• **Speak with Ash Club (₹499/mo)**: An active weekly speaking membership with live rooms, peer calls, and trainer feedback.",
      "So many learners know the grammar rules but struggle with real-time conversational hesitation. We have two dedicated paths with Ash:\n\n1. **32-Day Level Up (₹2,999)**: Complete step-by-step speaking habit builder with live practice rooms.\n2. **Speak with Ash (₹499/mo)**: Ongoing weekly community practice with live sessions and voice task reviews.",
      "If hesitation is holding you back in conversations or meetings, Ash's **32-Day Level Up (₹2,999)** or the **Monthly Speaking Club (₹499/mo)** gives you a safe, supportive space to speak daily and build natural rhythm."
    ],
    link: "/courses",
    linkText: "Explore Spoken English Programs"
  },

  // 4. INTERVIEW PREP & JOB SEEKERS
  {
    intent: "interview_prep",
    patterns: [/interview/i, /job/i, /resume/i, /hr round/i, /star framework/i, /career/i, /job seeker/i],
    replies: [
      "Job interviews can be stressful, especially when you need to articulate your experience under pressure in English. The **Interview Success Blueprint (₹1,999)** covers 15 video masterclasses and 10 live mock interviews teaching you how to structure your 60-90s pitch, answer behavioral questions using STAR, and negotiate salary.",
      "To help you speak confidently in front of hiring managers, our **Interview Success Blueprint (₹1,999)** walks you through 10 live mock interviews, behavioral answer frameworks, and personal /35 scorecard evaluations.",
      "Our 4-week **Interview Success Blueprint (₹1,999)** is designed specifically to help working professionals and freshers master HR introductions, technical scenario questions, and executive communication."
    ],
    link: "/courses",
    linkText: "View Interview Success Blueprint"
  },

  // 5. WRITING CONCERNS & EVALUATION
  {
    intent: "writing_module",
    patterns: [/writing/i, /task 1/i, /task 2/i, /essay/i, /letter/i, /graph/i, /stuck.*6/i, /band 7 in writing/i],
    replies: [
      "Writing is where most IELTS candidates get stuck at Band 6.0 or 6.5. In our course, we break down exact Band 9 paragraph structures, cohesive linkers, and task response formulas. Most importantly, you submit your essays to certified trainers who point out exactly why you're losing marks.",
      "If you're worried about IELTS Writing, you're definitely not alone. We teach simple, repeatable templates for Task 1 (graphs/letters) and Task 2 (opinion/discussion essays), and our trainers provide line-by-line diagnostic reviews on your submissions.",
      "To crack Band 7.5+ in Writing, examiners look for clear paragraph progression and precise vocabulary rather than complex, forced words. We guide you step-by-step through our tested essay structures and grade your actual essays."
    ],
    link: "/recorded-ielts-course",
    linkText: "Check Writing Evaluation Details"
  },

  // 6. SPEAKING TEST CONCERNS
  {
    intent: "speaking_test",
    patterns: [/ielts speaking/i, /cue card/i, /speaking part 1/i, /speaking part 2/i, /speaking part 3/i, /nervous.*speaking/i],
    replies: [
      "It's completely normal to feel nervous about IELTS Speaking! The key is having a reliable structure for the Part 2 Cue Card (using the Past-Present-Future storytelling framework). Plus, you get 7 one-on-one evaluations with our trainers so you feel prepared before the real exam.",
      "For Speaking, you'll learn how to expand Part 1 answers without rambling, master 2-minute Cue Card flow, and tackle abstract Part 3 questions. Your package includes 7 full speaking evaluations with actionable feedback.",
      "Examiners don't judge your accent — they look for natural fluency, coherent idea links, and grammatical range. In our course, you practice real exam cue cards and get scored directly by our trainers."
    ],
    link: "/recorded-ielts-course",
    linkText: "Learn How We Train Speaking"
  },

  // 7. READING & LISTENING STRATEGIES
  {
    intent: "reading_listening",
    patterns: [/reading/i, /listening/i, /true false not given/i, /matching headings/i, /time management.*reading/i, /audio/i],
    replies: [
      "Running out of time in Reading is the #1 complaint students have. We teach keyword mapping and selective scanning so you can answer True/False/Not Given and Matching Headings in under 18 minutes per passage.",
      "In Listening, losing focus during Part 3 & 4 conversations is common. Our training shows you how to anticipate audio keywords and spot tricky distractor traps before you hear them.",
      "Both Reading and Listening come down to smart keyword spotting and avoiding trap answers. We walk through authentic Cambridge question sets on screen with you step-by-step."
    ],
    link: "/what-is-ielts",
    linkText: "View Module Strategy Guides"
  },

  // 8. ACADEMIC VS GENERAL TRAINING
  {
    intent: "academic_vs_general",
    patterns: [/academic.*general/i, /general.*academic/i, /which ielts/i, /difference.*academic.*general/i, /pr.*study/i],
    replies: [
      "Here is a quick rule of thumb:\n• **IELTS Academic**: If you are applying for University bachelor's/master's degrees or medical licensing.\n• **IELTS General Training**: If you are applying for Canada PR (Express Entry), Australia migration, or work permits.\n\nOur courses provide tailored practice sets for both versions!",
      "It depends on your goal! If you're heading overseas for higher studies, you'll need **Academic**. If you're targeting immigration, Express Entry, or a job visa, you need **General Training**. We cover both formats thoroughly."
    ],
    link: "/what-is-ielts",
    linkText: "Read Academic vs General Guide"
  },

  // 9. LIVE BATCHES VS RECORDED
  {
    intent: "live_batches",
    patterns: [/live batch/i, /live class/i, /schedule/i, /timetable/i, /difference between live and recorded/i],
    replies: [
      "If you need fixed daily discipline and real-time interaction with a teacher, our **Live Batches** are great. If you work busy hours or prefer learning at your own pace whenever you have time, the **Recorded Course** gives you the exact same curriculum with complete flexibility.",
      "Our **Live Batches** run on scheduled weekly timetables with live Q&A workshops. Both options include mock exams and trainer feedback, so it purely comes down to whether you prefer fixed classroom timing or self-paced study."
    ],
    link: "/live-ielts-course",
    linkText: "View Live Batches"
  },

  // 10. MOCK TESTS & DIAGNOSTIC
  {
    intent: "mock_tests",
    patterns: [/mock test/i, /free test/i, /diagnostic/i, /quiz/i, /test my level/i, /score calculator/i],
    replies: [
      "The best first step before spending money on any course is knowing where you stand. You can take our **Free 2-Minute Diagnostic Assessment** or try a full mock test right here on the website.",
      "We always encourage students to benchmark their current score first. You can attempt our free diagnostic mock test or answer our 2-minute path quiz to see what preparation timeline fits you best."
    ],
    link: "/mock-tests",
    linkText: "Take Free Diagnostic Mock Test"
  },

  // 11. STUDY ABROAD & VISAS
  {
    intent: "study_abroad",
    patterns: [/study abroad/i, /university/i, /canada/i, /uk/i, /usa/i, /australia/i, /visa/i, /sop/i, /admissions/i, /masters/i],
    replies: [
      "Preparing for IELTS is just the first step in your journey overseas. Our study abroad counseling team helps you shortlist universities across the UK, Canada, USA, and Australia, reviews your SOP essays, and assists with visa documentation.",
      "If you're planning your university applications abroad, our advisory team works with you one-on-one for university shortlisting, statement of purpose (SOP) reviews, scholarship assistance, and visa filing."
    ],
    link: "/study-abroad",
    linkText: "Book Free Study Abroad Consultation"
  },

  // 12. VALIDITY, ACCESS & SYSTEM SUPPORT
  {
    intent: "access_validity",
    patterns: [/validity/i, /how long.*access/i, /duration/i, /device/i, /phone/i, /mobile/i, /refund/i],
    replies: [
      "You get **3 full months of unlimited access** from any device (phone, tablet, laptop). You can log in 24/7, re-watch video lessons as many times as you like, and complete your mock tests on your schedule.",
      "Access is open 24/7 for 3 months. Whether you have 30 minutes in the morning or study late at night, the entire portal is ready on your browser with progress tracking."
    ],
    link: "/recorded-ielts-course",
    linkText: "View Course Access Details"
  },

  // 13. HUMAN / COUNSELOR ESCALATION
  {
    intent: "human_contact",
    patterns: [/talk to.*(human|person|counselor|support|agent|sir|maam)/i, /whatsapp/i, /phone number/i, /call/i, /help desk/i, /speak directly/i],
    replies: [
      "Of course! You can chat directly with our senior counseling team on WhatsApp. They can review your background and suggest the exact plan for your goals.",
      "I'd be happy to connect you with our academic advisor on WhatsApp so you can discuss your timeline and target score in detail."
    ],
    showWhatsAppOption: true
  }
];

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hi! What goal are you preparing for right now — is it IELTS, everyday Spoken English, or an upcoming job interview?",
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

  function getRandomReply(replies) {
    if (!replies || replies.length === 0) return "";
    const index = Math.floor(Math.random() * replies.length);
    return replies[index];
  }

  function findHumanizedResponse(query) {
    const text = query.trim().toLowerCase();

    // 1. Direct Pattern Match
    for (const entry of HUMAN_QA_DATABASE) {
      if (entry.patterns && entry.patterns.some((p) => p.test(text))) {
        return {
          reply: getRandomReply(entry.replies),
          link: entry.link,
          linkText: entry.linkText,
          showWhatsAppOption: entry.showWhatsAppOption
        };
      }
    }

    // 2. Token / keyword scoring
    const tokens = text.replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
    let bestEntry = null;
    let highestScore = 0;

    for (const entry of HUMAN_QA_DATABASE) {
      if (!entry.patterns) continue;
      let score = 0;
      for (const token of tokens) {
        if (["the", "is", "a", "an", "and", "or", "in", "on", "for", "to", "how", "what", "can", "i", "me", "my"].includes(token)) continue;
        for (const pattern of entry.patterns) {
          if (pattern.test(token)) {
            score += 1;
          }
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestEntry = entry;
      }
    }

    if (bestEntry && highestScore > 0) {
      return {
        reply: getRandomReply(bestEntry.replies),
        link: bestEntry.link,
        linkText: bestEntry.linkText,
        showWhatsAppOption: bestEntry.showWhatsAppOption
      };
    }

    // 3. Empathetic Conversational Fallback Variations
    const fallbackReplies = [
      `I want to make sure you get the most accurate advice for your timeline. Tell me a bit more about your current band or speaking level, or you can connect with our team directly:`,
      `Every student's starting point is a little different! Are you targeting a specific IELTS score (like Band 7.5+), or looking to improve daily spoken English confidence?`,
      `I'm here to help you navigate the right path! Feel free to ask about our courses, or message our counselor directly on WhatsApp:`
    ];

    return {
      reply: getRandomReply(fallbackReplies),
      link: "/courses",
      linkText: "Explore All Preparation Programs",
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
      const match = findHumanizedResponse(userText);

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
    }, 500);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  }

  function handleWhatsAppRedirect(message = "Hi Sam & Ash team! I have a question regarding preparation.") {
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
                  <div className="chat-title">Sam &amp; Ash Support</div>
                  <div className="chat-subtitle">Online · Instant guidance</div>
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
                        💬 Chat with Counselor on WhatsApp
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
                onClick={() => handleSend("What is the fee for the Recorded IELTS Course?")}
              >
                🎯 IELTS Course (₹5,000)
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("How does Speak with Ash / 32-Day Level Up work?")}
              >
                🗣️ Spoken English
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("Where can I take a free mock test?")}
              >
                📝 Free Diagnostic Mock
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("Tell me about Study Abroad university admissions")}
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
