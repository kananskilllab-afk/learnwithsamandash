import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics.js";

// Comprehensive Encyclopedia of Genuine Answers based on verified data and real learner advice
const GENUINE_QA_PAIRS = [
  // GREETINGS & PERSONAL CHECK-IN
  {
    patterns: [/^(hi|hello|hey|hii|heyy|namaste|good morning|good evening|good afternoon)/i],
    answers: [
      "Hello! How are you doing today? Tell me what you're working on right now — are you aiming for an IELTS exam date soon, or looking to get comfortable speaking in English?",
      "Hi there! Glad you reached out. What is your current goal or biggest challenge at the moment?",
      "Hey! Welcome. Whether you have a specific question about test scores, speaking hesitation, or course details, I'm here to give you genuine answers."
    ]
  },

  // IELTS DURATION & STUDY TIMELINE
  {
    patterns: [/how (long|many months|many days|much time).*(prepare|study|ielts|crack|clear)/i, /preparation time/i, /study schedule/i],
    answers: [
      "For most learners, an effective IELTS preparation takes between 4 to 8 weeks if you dedicate 1 to 2 focused hours daily. If your baseline is already around Band 6.0 and you need Band 7.5+, 30 to 45 days of structured practice with regular mock tests is usually the sweet spot.",
      "If you're studying 1–2 hours a day, 4 to 6 weeks is plenty of time when you follow a structured plan rather than guessing. What band score do you currently need for your university or visa?"
    ]
  },

  // IELTS WRITING (TASK 1 & TASK 2)
  {
    patterns: [/how to improve writing/i, /task 1/i, /task 2/i, /essay/i, /writing band 7/i, /writing band 8/i, /writing tips/i, /stuck.*(6|6.5).*writing/i],
    answers: [
      "The reason most students get stuck at Band 6.0–6.5 in Writing isn't their vocabulary — it's Task Achievement and Coherence. For Task 2, examiners look for a clear thesis statement in the introduction, 2 well-developed main body paragraphs with specific examples, and no new ideas in the conclusion. In our course, our certified trainers read and grade your actual essays so you know your exact weak spots.",
      "To score 7+ in Task 2: spend the first 5 minutes planning your 2 main body arguments. Keep your paragraphs to 4–5 sentences (Topic Sentence -> Explanation -> Example -> Impact). Avoid memorized idioms that sound artificial, and focus on clear topic-specific collocations."
    ]
  },

  // IELTS SPEAKING & CUE CARDS
  {
    patterns: [/how to improve speaking/i, /cue card/i, /speaking part 2/i, /speaking part 3/i, /nervous.*speaking/i, /fluency tips/i, /speaking band 7/i, /speaking band 8/i],
    answers: [
      "For Part 2 (Cue Card), use the Past-Present-Future framework during your 1-minute prep. It guarantees you can speak for the full 2 minutes without running out of ideas. In Part 3, give structured answers: state your direct opinion, give a reason, provide a real-life example, and conclude with the broader social impact.",
      "Examiners do not penalize your natural mother-tongue accent! They only evaluate Fluency & Coherence, Lexical Resource, Grammatical Range, and Pronunciation Clarity. Slow down slightly, use natural linkers (like 'Having said that...', 'On the flip side...'), and answer directly without hesitating."
    ]
  },

  // IELTS READING & TIME MANAGEMENT
  {
    patterns: [/reading/i, /true false not given/i, /matching headings/i, /time management.*reading/i, /reading passage 3/i, /improve reading/i],
    answers: [
      "In IELTS Reading, never read the full passage first! Spend 30 seconds skimming the headings and first sentences, then jump straight to the questions and circle keywords (names, dates, unique nouns). For True/False/Not Given: 'False' means the passage directly contradicts the statement; 'Not Given' means the fact might be true in real life, but the text simply doesn't confirm or deny it.",
      "Passage 3 is always the most complex, so aim for 15 mins on Passage 1, 18 mins on Passage 2, and save 25 mins for Passage 3. Never spend more than 90 seconds on a single question — mark a guess and move on."
    ]
  },

  // IELTS LISTENING
  {
    patterns: [/listening/i, /spelling mistake/i, /accent.*listening/i, /distractor/i, /listening tips/i],
    answers: [
      "In IELTS Listening, read the questions and underline keywords during the 30-second pause *before* each audio track plays. Watch out for 'distractors' where the speaker says one thing (e.g. 'Let's meet on Tuesday... oh wait, I forgot I have a flight, make it Thursday'). Always write down what is confirmed at the end.",
      "Be careful with singular/plural endings (e.g. 'book' vs 'books') and standard British vs American spelling. In our portal mock tests, you can practice with authentic audio tracks at varying speeds."
    ]
  },

  // ACADEMIC VS GENERAL TRAINING
  {
    patterns: [/academic.*general/i, /general.*academic/i, /which ielts.*(should i|take|choose)/i, /difference.*academic.*general/i],
    answers: [
      "Here is the simple distinction:\n\n• **IELTS Academic**: Required if you are applying for University Bachelor's, Master's, PhD programs, or healthcare professional registrations (doctors, nurses).\n• **IELTS General Training**: Required for PR migration (like Canada Express Entry, Australia PR) and work permits.\n\nListening and Speaking are 100% identical in both tests; only Reading texts and Writing Task 1 (Report vs Letter) are different."
    ]
  },

  // OVERALL COURSE PRICING & FEES
  {
    patterns: [/fee/i, /price/i, /cost/i, /how much/i, /pricing/i, /charges/i],
    answers: [
      "Here are the exact fees for our programs:\n\n• **Recorded IELTS Strategy Course**: ₹5,000 (one-time fee · 30h lessons, 7 mock exams, personal writing & speaking evaluations, 3 months access)\n• **32-Day Spoken English Level Up**: ₹2,999 (one-time cohort fee · daily speaking missions & live rooms)\n• **Speak with Ash Speaking Club**: ₹499 / month (ongoing weekly speaking practice)\n• **English for Job Seekers (Interview Blueprint)**: ₹1,999 (4-week intensive)\n• **Diagnostic Mock Tests**: 100% Free on our website.",
      "Our Recorded IELTS Course is ₹5,000 (one-time enrollment), Ash's 32-Day English Level Up is ₹2,999, the monthly Speaking Club is ₹499/month, and the Interview Blueprint is ₹1,999."
    ]
  },

  // 32-DAY ENGLISH LEVEL UP WITH ASH
  {
    patterns: [/32 day/i, /level up/i, /how does 32 day work/i],
    answers: [
      "The **32-Day English Level Up (₹2,999)** is built specifically for learners who understand English in their heads but struggle to speak spontaneously. It combines short daily video masterclasses on sentence building and pronunciation, daily 90-second voice speaking tasks reviewed on WhatsApp, live trainer practice rooms, and a baseline vs. final /25 fluency score comparison."
    ]
  },

  // SPEAK WITH ASH MONTHLY CLUB
  {
    patterns: [/speak with ash/i, /speaking club/i, /monthly club/i, /weekly rhythm/i],
    answers: [
      "**Speak with Ash (₹499/mo)** is an ongoing speaking community designed to keep you practicing every single week. The weekly rhythm includes:\n• *Monday*: Daily Speaking Mission\n• *Tuesday*: Live Room with Ash\n• *Wednesday*: Peer Partner Practice\n• *Thursday*: Vocabulary & Phrasing Workshop\n• *Friday*: Trainer Guided Room\n• *Weekend*: Reviewed WhatsApp Voice Tasks."
    ]
  },

  // INTERVIEW SUCCESS BLUEPRINT
  {
    patterns: [/interview/i, /job seeker/i, /hr round/i, /star/i, /salary negotiation/i, /elevator pitch/i],
    answers: [
      "The **Interview Success Blueprint (₹1,999)** is a 4-week intensive where you master the 60-90 second introduction pitch, learn the STAR formula (Situation, Task, Action, Result) for behavioral questions, participate in 10 live mock interviews, and receive an official /35 hiring evaluation scorecard."
    ]
  },

  // MOCK TESTS & DIAGNOSTIC
  {
    patterns: [/mock test/i, /sample test/i, /free test/i, /diagnostic/i, /quiz/i, /practice test/i],
    answers: [
      "You can take our **Free 2-Minute IELTS Readiness Quiz** or complete authentic diagnostic mock tests directly on our website under the 'Mock Tests' tab with instant score analysis."
    ]
  },

  // STUDY ABROAD & VISAS
  {
    patterns: [/study abroad/i, /university/i, /visa/i, /canada/i, /uk/i, /usa/i, /australia/i, /sop/i, /admissions/i],
    answers: [
      "Our Study Abroad counselors help you from start to finish — shortlisting top universities across the UK, Canada, US, Australia, and Europe based on your budget, reviewing your Statement of Purpose (SOP) essays, and guiding your student visa application."
    ]
  },

  // VALIDITY & DEVICE ACCESS
  {
    patterns: [/validity/i, /how long.*access/i, /duration/i, /device/i, /phone/i, /laptop/i],
    answers: [
      "You get **3 full months of unlimited access** to the course portal. You can log in 24/7 from your mobile browser, tablet, or laptop, re-watch video lessons as many times as you like, and submit practice exercises on your schedule."
    ]
  },

  // CONNECT WITH COUNSELOR / WHATSAPP
  {
    patterns: [/talk to.*(human|person|counselor|support|team|ash|sam)/i, /whatsapp/i, /phone/i, /call/i, /help desk/i],
    answers: [
      "You can chat directly with our senior counseling team on WhatsApp anytime at +91 99999 99999 to discuss your exact score targets or batch timings!"
    ]
  }
];

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "👋 Hi! What is your current goal or biggest challenge right now — are you preparing for an IELTS exam, building spoken English confidence, or getting ready for job interviews?",
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

  function getRandomAnswer(answers) {
    if (!answers || answers.length === 0) return "";
    const index = Math.floor(Math.random() * answers.length);
    return answers[index];
  }

  function getSmartDirectAnswer(query) {
    const text = query.trim().toLowerCase();

    // 1. Direct Regex Pattern Matching
    for (const item of GENUINE_QA_PAIRS) {
      if (item.patterns && item.patterns.some((p) => p.test(text))) {
        return getRandomAnswer(item.answers);
      }
    }

    // 2. Multi-token scoring for natural phrased questions
    const words = text.replace(/[^a-z0-9 ]/g, "").split(/\s+/).filter(Boolean);
    let bestItem = null;
    let highestScore = 0;

    for (const item of GENUINE_QA_PAIRS) {
      if (!item.patterns) continue;
      let score = 0;
      for (const w of words) {
        if (["the", "is", "a", "an", "and", "or", "in", "on", "for", "to", "how", "what", "can", "i", "do", "you", "me", "my", "tell"].includes(w)) continue;
        for (const p of item.patterns) {
          if (p.test(w)) {
            score += 1;
          }
        }
      }
      if (score > highestScore) {
        highestScore = score;
        bestItem = item;
      }
    }

    if (bestItem && highestScore > 0) {
      return getRandomAnswer(bestItem.answers);
    }

    // 3. Conversational Human Response
    return "That's a great question! Could you tell me a little more about what you're targeting (for example, your target IELTS band or specific speaking difficulty) so I can give you the exact advice you need?";
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
      const answer = getSmartDirectAnswer(userText);

      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        text: answer,
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

  function handleWhatsAppRedirect(message = "Hi Sam & Ash team! I have a question regarding courses.") {
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
                  <div className="chat-subtitle">Online · Ask any question</div>
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

            {/* Quick Action Suggestion Bar */}
            <div className="chat-pills-bar">
              <button
                className="chat-pill"
                onClick={() => handleSend("How much are the course fees?")}
              >
                💰 Course Fees
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("How can I score Band 7+ in IELTS Writing Task 2?")}
              >
                ✍️ Writing Task 2 Tips
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("How does Speak with Ash club work?")}
              >
                🗣️ Spoken English
              </button>
              <button
                className="chat-pill"
                onClick={() => handleSend("What is the difference between Academic and General IELTS?")}
              >
                📘 Academic vs General
              </button>
            </div>

            {/* Text Input Footer */}
            <div className="chat-input-footer">
              <input
                type="text"
                className="chat-text-input"
                placeholder="Ask any question about IELTS, Speaking, Fees..."
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
