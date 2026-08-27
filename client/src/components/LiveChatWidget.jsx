import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics.js";

/*
  GENUINE KNOWLEDGE BASE — Short, concise 2-3 line answers
*/
const KNOWLEDGE_BASE = [
  {
    id: "spoken_english_general",
    keywords: ["speak", "english", "speaking", "spoken", "cant", "dont", "know", "learn", "beginner", "start", "basic", "scared", "shy", "hesitate", "hesitation", "freeze", "stuck", "fluent", "fluency", "confidence", "confident", "communicate", "conversation", "improve"],
    patterns: [
      /speak.*english/i, /english.*speak/i, /cant speak/i, /can't speak/i,
      /don'?t know.*speak/i, /don'?t know.*english/i, /learn english/i,
      /improve.*english/i, /english.*improve/i, /want to speak/i,
      /how to speak/i, /scared.*speak/i, /shy.*speak/i, /hesitat/i,
      /freeze.*speak/i, /fluent/i, /fluency/i, /confidence.*english/i,
      /beginner/i, /basic english/i, /start.*english/i, /spoken english/i,
      /communicate/i, /conversation/i, /not good.*english/i, /weak.*english/i,
      /struggle.*speak/i, /unable.*speak/i, /difficult.*speak/i
    ],
    answers: [
      "You already understand English \u2014 what's missing is daily speaking practice. Ash's 32-Day Level Up (\u20b92,999) gives you daily voice tasks + live rooms to build that habit.",
      "Most students know the words but freeze when speaking. The fix is speaking a little every day \u2014 our Speaking Club (\u20b9499/mo) gives you weekly live rooms and daily missions.",
      "Nobody starts fluent! The 32-Day Level Up takes you from sentence building to spontaneous speaking with tracked progress.",
      "The biggest mistake is waiting to be 'ready.' Start with whatever English you have now. Our Speak with Ash Club gives you a safe space to practice weekly.",
      "Many of our students started exactly where you are and now handle meetings and calls confidently. It starts with consistent daily practice \u2014 even 2 minutes a day helps."
    ]
  },
  {
    id: "ielts_general",
    keywords: ["ielts", "exam", "test", "band", "score", "what"],
    patterns: [/what is ielts/i, /about ielts/i, /ielts exam/i, /ielts test/i, /tell.*about.*ielts/i, /explain.*ielts/i],
    answers: [
      "IELTS tests 4 skills \u2014 Listening, Reading, Writing & Speaking. Scores range Band 1\u20139. Most universities need 6.5\u20137.5, Canada PR typically needs 7.0+ per module.",
      "It's the world's most accepted English test \u2014 recognized by 12,000+ organizations in 140+ countries. Two types: Academic (for studies) and General Training (for migration).",
      "IELTS has 4 sections: Listening (30 min), Reading (60 min), Writing (60 min), Speaking (11\u201314 min). Your overall band is the average of all 4."
    ]
  },
  {
    id: "ielts_timeline",
    keywords: ["prepare", "preparation", "months", "weeks", "days", "time", "schedule", "timeline", "long", "duration", "plan"],
    patterns: [
      /how (long|many months|many weeks|many days|much time).*(prepare|study|ielts|crack|clear)/i,
      /preparation time/i, /study schedule/i, /study plan/i, /when.*start.*prepar/i, /how.*start.*ielts/i
    ],
    answers: [
      "4 to 8 weeks with 1\u20132 focused hours daily is enough for most students. Take a diagnostic mock first to know your baseline.",
      "If you're at Band 6.0 targeting 7.0+, plan for about 4\u20136 weeks. The key is consistency \u2014 1 hour daily beats 5 hours on weekends.",
      "Most students reach their target in 30\u201345 days with a structured plan. Start with a free mock test on our website to find your weak areas.",
      "Depends on your starting level. Band 5\u21927 needs ~8 weeks, Band 6\u21927 needs ~4 weeks, Band 6.5\u21927.5 needs ~3 weeks."
    ]
  },
  {
    id: "ielts_writing",
    keywords: ["writing", "essay", "task", "paragraph", "coherence", "vocabulary", "write", "opinion", "graph", "letter", "report"],
    patterns: [
      /writing/i, /task 1/i, /task 2/i, /essay/i, /improve.*writ/i,
      /writing.*band/i, /band.*writing/i, /writing.*score/i,
      /stuck.*(6|6.5).*writ/i, /writ.*stuck/i, /how to write/i, /ielts essay/i
    ],
    answers: [
      "Most get stuck at Band 6 because of weak structure, not vocabulary. Spend 5 mins planning before writing \u2014 clear position + 2 developed body paragraphs with specific examples.",
      "For Task 2: Intro (paraphrase + position), 2 body paragraphs (topic sentence \u2192 explain \u2192 example), conclusion. Simple clear sentences score higher than forced complex ones.",
      "The #1 difference between Band 6 and 7 is specificity. Replace vague statements with concrete reasoning and real-world examples.",
      "If your score isn't improving despite practice, you're likely repeating the same mistakes. Get expert feedback \u2014 our trainers review your actual essays and show where you lose marks.",
      "For Task 1 Academic: Focus on 2\u20133 key trends and always include an overview paragraph. For General: Address all 3 bullet points and match your tone to the audience."
    ]
  },
  {
    id: "ielts_speaking",
    keywords: ["speaking", "cue", "card", "examiner", "nervous", "part", "pronunciation", "accent", "stammer", "ramble"],
    patterns: [
      /ielts speaking/i, /cue card/i, /speaking part/i, /speaking test/i,
      /nervous.*speak/i, /speaking.*nervous/i, /improve.*speaking/i,
      /speaking.*band/i, /band.*speaking/i, /pronunciation/i, /accent/i, /speaking tips/i, /examiner/i
    ],
    answers: [
      "For the Cue Card, use Past-Present-Future during your 1-minute prep \u2014 it guarantees a full 2-minute answer. Examiners don't judge accent, only clarity and fluency.",
      "Don't memorize fancy vocabulary \u2014 examiners can tell and it hurts your fluency score. Speak naturally, use comfortable words, focus on smooth connections.",
      "It's okay to be nervous! The examiner is trained to put you at ease. You can ask 'Could you rephrase that?' without losing marks.",
      "For Part 1: Give 2\u20133 sentence answers, not one-word replies. For Part 3: State your opinion \u2192 give a reason \u2192 real example \u2192 brief conclusion.",
      "Band 7+ tip: Mix simple and complex sentences naturally. Fillers like 'well...', 'actually...', 'to be honest...' are perfectly fine."
    ]
  },
  {
    id: "ielts_reading",
    keywords: ["reading", "passage", "true", "false", "given", "heading", "matching", "skim", "scan"],
    patterns: [
      /reading/i, /true.*false.*not given/i, /matching heading/i,
      /reading.*time/i, /passage 3/i, /improve.*reading/i, /reading.*tips/i, /skim/i, /scan/i
    ],
    answers: [
      "Never read the full passage first! Skim headings \u2192 go to questions \u2192 scan for keywords. Allocate 15 min for Passage 1, 20 for Passage 2, 25 for Passage 3.",
      "True/False/Not Given: TRUE = passage agrees. FALSE = passage directly contradicts. NOT GIVEN = passage doesn't mention it at all, even if it's true in real life.",
      "For Matching Headings: Read the first and last sentence of each paragraph. Match the overall idea, not just a single keyword.",
      "Never spend more than 90 seconds on one question. Mark your best guess and move on \u2014 getting stuck on one costs you easier marks later."
    ]
  },
  {
    id: "ielts_listening",
    keywords: ["listening", "audio", "hear", "spelling", "distractor", "section"],
    patterns: [/listening/i, /listening.*tips/i, /improve.*listening/i, /spelling.*mistake/i, /distractor/i],
    answers: [
      "Audio plays ONCE \u2014 use the 30-second pause to read ahead and underline keywords. Watch for distractors where speakers change their mind mid-sentence.",
      "Common traps: spelling errors (each = wrong answer), singular vs plural mistakes, and getting tricked when speakers correct themselves.",
      "Sections 3 & 4 are harder. Stay engaged by predicting answers. Practice with different accents \u2014 BBC, TED talks, ABC Australia.",
      "Use abbreviations while listening, then write full answers during transfer time. If you miss one, focus on the next question immediately."
    ]
  },
  {
    id: "academic_vs_general",
    keywords: ["academic", "general", "training", "difference", "which", "type", "version", "format"],
    patterns: [/academic.*general/i, /general.*academic/i, /which.*ielts/i, /difference.*academic/i, /academic or general/i],
    answers: [
      "Academic = for university admissions. General Training = for immigration (Canada PR, Australia PR) and work visas. Listening and Speaking are identical in both.",
      "If you're applying to a university abroad, take Academic. If you need PR or a work permit, take General Training. Our course covers both.",
      "Only difference: Reading texts (academic vs everyday) and Writing Task 1 (graph description vs letter). Everything else is the same."
    ]
  },
  {
    id: "pricing",
    keywords: ["fee", "fees", "price", "pricing", "cost", "charge", "money", "pay", "payment", "rupees", "5000", "2999", "499", "1999", "affordable", "budget", "discount", "expensive"],
    patterns: [/fee/i, /price/i, /cost/i, /how much/i, /pricing/i, /charges/i, /affordable/i, /budget/i, /discount/i, /pay/i, /payment/i],
    answers: [
      "IELTS Course: \u20b95,000 (one-time, 3 months). Spoken English 32-Day: \u20b92,999. Speaking Club: \u20b9499/mo. Interview Prep: \u20b91,999. Mock tests: Free.",
      "Our Recorded IELTS Course is \u20b95,000 with 30+ hours of lessons, 7 evaluated mocks, and 3 months access. Spoken English starts at \u20b9499/month.",
      "All fees are one-time except the Speaking Club (\u20b9499/mo). No hidden charges. Full access from Day 1 on any device.",
      "The IELTS course works out to about \u20b955/day for 3 months of complete preparation including trainer evaluations. Mock tests are 100% free."
    ]
  },
  {
    id: "32day_levelup",
    keywords: ["32", "day", "level", "up", "levelup", "transformation", "cohort"],
    patterns: [/32.?day/i, /level.?up/i, /32.*english/i, /transformation/i],
    answers: [
      "32-Day Level Up (\u20b92,999): Daily video lessons + 90-second WhatsApp voice tasks reviewed by a trainer + live practice rooms. Tracks your fluency from Day 0 to Day 32.",
      "It's a step-by-step daily program \u2014 sentence building, pronunciation, real-world conversations \u2014 with a baseline vs final /25 fluency comparison.",
      "Think of it as a speaking gym. You speak every day, get corrected, and track improvement. Built for people who know English on paper but freeze in conversations."
    ]
  },
  {
    id: "speak_with_ash",
    keywords: ["ash", "club", "weekly", "monthly", "subscription", "practice", "partner", "community"],
    patterns: [/speak.*ash/i, /ash.*club/i, /speaking club/i, /monthly.*club/i, /weekly.*practice/i, /join.*ash/i],
    answers: [
      "Speak with Ash (\u20b9499/mo): 2 live rooms/week with Ash, daily speaking missions, peer partner calls, and trainer feedback. Join anytime, cancel anytime.",
      "It's an ongoing weekly speaking community \u2014 live practice, daily voice tasks on WhatsApp, and a monthly fluency scorecard.",
      "Ash leads 2 live sessions/week where you discuss real topics and get live corrections. Most members notice improvement within 2\u20133 weeks."
    ]
  },
  {
    id: "interview_prep",
    keywords: ["interview", "job", "resume", "hr", "behavioral", "salary", "career", "placement", "hired", "fresher", "experienced", "professional"],
    patterns: [/interview/i, /job.*seeker/i, /hr.*round/i, /salary/i, /career/i, /fresher/i, /introduce.*yourself/i, /resume/i],
    answers: [
      "Interview Success Blueprint (\u20b91,999): 4 weeks \u2014 self-intro pitch, STAR formula for behavioral questions, 10 live mock interviews with a /35 evaluation scorecard.",
      "It covers how to structure your intro, handle HR questions, and negotiate salary. Includes 10 live mock interviews so you feel confident before the real thing.",
      "Most candidates fail interviews because they can't express what they know under pressure. This course gives you repeatable frameworks + lots of live practice."
    ]
  },
  {
    id: "mock_tests",
    keywords: ["mock", "test", "diagnostic", "practice", "sample", "quiz", "free", "assessment", "evaluate", "benchmark"],
    patterns: [/mock/i, /diagnostic/i, /free.*test/i, /practice.*test/i, /sample.*test/i, /quiz/i, /assessment/i, /check.*level/i, /current.*score/i],
    answers: [
      "You can take a free diagnostic mock test on our website under the Mock Tests section. It gives you an estimated band score so you know where to focus.",
      "We offer free timed Reading & Listening mocks with instant scoring. For Writing & Speaking, the paid course includes 7 trainer-graded assessments.",
      "Start with the free diagnostic \u2014 takes about 20 minutes and shows you exactly which modules need work. No point preparing blindly!"
    ]
  },
  {
    id: "study_abroad",
    keywords: ["abroad", "university", "universities", "visa", "canada", "uk", "usa", "australia", "europe", "sop", "admission", "scholarship", "immigration", "pr", "migrate"],
    patterns: [/study abroad/i, /university/i, /visa/i, /canada/i, /uk/i, /usa/i, /australia/i, /sop/i, /admission/i, /scholarship/i, /immigration/i, /pr/i, /migrate/i],
    answers: [
      "Our team helps with university shortlisting, SOP review, scholarship search, and visa documentation across UK, Canada, USA, Australia & Europe. Free consultation available.",
      "For Canada PR (Express Entry), you typically need IELTS General Training Band 7.0+ per module. Our counselors can explain the exact requirements for your pathway.",
      "We help from start to finish \u2014 profile evaluation, university matching, SOP essays, and visa filing. Book a free session to discuss your plans."
    ]
  },
  {
    id: "access_validity",
    keywords: ["access", "validity", "device", "mobile", "laptop", "tablet", "login", "rewatch", "download", "certificate"],
    patterns: [/validity/i, /how long.*access/i, /access/i, /device/i, /mobile/i, /laptop/i, /rewatch/i, /download/i, /certificate/i, /expire/i],
    answers: [
      "3 months of unlimited access from enrollment. Works on any device \u2014 phone, tablet, laptop. Re-watch lessons anytime, 24/7.",
      "Everything streams from our portal, no downloads needed. Your progress and scores are saved automatically for 3 full months.",
      "Access is available 24/7 on any browser. Study at 6 AM or midnight \u2014 your schedule, your pace."
    ]
  },
  {
    id: "human_contact",
    keywords: ["whatsapp", "call", "phone", "counselor", "advisor", "human", "person", "support", "contact", "number", "reach"],
    patterns: [/talk.*human/i, /talk.*person/i, /talk.*counselor/i, /whatsapp/i, /phone.*number/i, /call/i, /contact/i, /reach/i, /help desk/i, /real person/i],
    answers: [
      "You can chat with our counselor directly on WhatsApp for personalized advice about your goals and timeline.",
      "Our team is available on WhatsApp \u2014 just message them and they'll get back within a few hours with tailored guidance.",
      "For one-on-one help choosing the right course or planning your prep, reach out to our counselor on WhatsApp anytime."
    ]
  },
  {
    id: "greeting",
    keywords: [],
    patterns: [/^(hi|hello|hey|hii+|heyy+|namaste|salam|good morning|good evening|good afternoon|sup|yo)\s*[!?.]*$/i],
    answers: [
      "Hello! What can I help you with \u2014 IELTS prep, spoken English, or something else?",
      "Hi there! Ask me anything about IELTS, speaking, courses, or fees.",
      "Hey! What's your current goal? I can help with IELTS, speaking confidence, or interview prep.",
      "Hello! Feel free to ask any question \u2014 I'll give you a straight answer."
    ]
  },
  {
    id: "thanks_bye",
    keywords: [],
    patterns: [/^(thanks|thank you|thankyou|thx|bye|goodbye|see you|ok thanks|got it|okay|ok)\s*[!?.]*$/i],
    answers: [
      "You're welcome! Come back anytime if you have more questions.",
      "Glad I could help! All the best with your preparation.",
      "Anytime! Good luck \u2014 you've got this!",
      "Happy to help! Reach out whenever you need."
    ]
  }
];

const FALLBACK_RESPONSES = [
  "Could you be more specific? I can help with IELTS tips, spoken English, course fees, mock tests, or study abroad.",
  "I'd love to help! Try asking about a specific topic \u2014 like Writing tips, Speaking strategies, or course details.",
  "Could you rephrase that? I cover IELTS prep, spoken English, interviews, fees, and study abroad.",
  "Not sure I caught that. You can ask about IELTS modules, course pricing, speaking practice, or mock tests.",
  "Tell me more \u2014 IELTS preparation, English speaking, interview training, or something else?"
];

// --------- COMPONENT ---------

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "\ud83d\udc4b Hi! What can I help you with \u2014 IELTS prep, spoken English, interview training, or something else?",
      timestamp: "Just now"
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const usedAnswersRef = useRef({});
  const fallbackIndexRef = useRef(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  function toggleChat() {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) track("open_live_chat_widget", { source: "floating_button" });
  }

  const pickAnswer = useCallback((topicId, answers) => {
    if (!answers || answers.length === 0) return "";
    if (!usedAnswersRef.current[topicId]) usedAnswersRef.current[topicId] = [];
    const used = usedAnswersRef.current[topicId];
    const available = answers.map((_, i) => i).filter(i => !used.includes(i));
    if (available.length === 0) {
      usedAnswersRef.current[topicId] = [];
      const pick = Math.floor(Math.random() * answers.length);
      usedAnswersRef.current[topicId].push(pick);
      return answers[pick];
    }
    const pick = available[Math.floor(Math.random() * available.length)];
    used.push(pick);
    return answers[pick];
  }, []);

  const getAnswer = useCallback((query) => {
    const text = query.trim().toLowerCase();

    // 1. Direct regex match
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.patterns && entry.patterns.some(p => p.test(text))) {
        return pickAnswer(entry.id, entry.answers);
      }
    }

    // 2. Keyword scoring
    const words = text.replace(/[^a-z0-9' ]/g, "").split(/\s+/).filter(Boolean);
    const stopWords = new Set(["the","is","a","an","and","or","in","on","for","to","of","it","be","am","are","was","were","has","have","had","do","does","did","will","would","shall","should","may","might","can","could","but","if","so","as","at","by","with","from","this","that","there","here","very","just","also","too","not","no","yes","about","some","any","all","much","many","more","most","than","then","when","where","which","who","what","why","please","need","want","like","really","actually","think"]);

    let bestEntry = null;
    let bestScore = 0;

    for (const entry of KNOWLEDGE_BASE) {
      if (!entry.keywords || entry.keywords.length === 0) continue;
      let score = 0;
      for (const word of words) {
        if (stopWords.has(word)) continue;
        for (const kw of entry.keywords) {
          if (word === kw) score += 3;
          else if (word.length > 3 && kw.includes(word)) score += 2;
          else if (kw.length > 3 && word.includes(kw)) score += 2;
        }
      }
      if (score > bestScore) { bestScore = score; bestEntry = entry; }
    }

    if (bestEntry && bestScore >= 3) return pickAnswer(bestEntry.id, bestEntry.answers);

    // 3. Cycling fallback
    const fb = FALLBACK_RESPONSES[fallbackIndexRef.current % FALLBACK_RESPONSES.length];
    fallbackIndexRef.current += 1;
    return fb;
  }, [pickAnswer]);

  function handleSend(userText = inputValue) {
    if (!userText.trim()) return;
    setMessages(prev => [...prev, { id: Date.now(), sender: "user", text: userText.trim(), timestamp: "Just now" }]);
    setInputValue("");
    setIsTyping(true);
    track("send_chat_message", { query: userText });

    const delay = 350 + Math.floor(Math.random() * 300);
    setTimeout(() => {
      const answer = getAnswer(userText);
      setMessages(prev => [...prev, { id: Date.now() + 1, sender: "bot", text: answer, timestamp: "Just now" }]);
      setIsTyping(false);
    }, delay);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") { e.preventDefault(); handleSend(); }
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
            <div className="chat-modal-header">
              <div className="flex items-center gap-10">
                <div className="chat-avatar-group">
                  <span className="chat-avatar-badge">S&amp;A</span>
                  <span className="chat-online-dot" />
                </div>
                <div>
                  <div className="chat-title">Sam &amp; Ash Support</div>
                  <div className="chat-subtitle">Online &middot; Ask any question</div>
                </div>
              </div>
              <button className="chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close Chat">&#10005;</button>
            </div>

            <div className="chat-stream">
              {messages.map((m) => (
                <div key={m.id} className={`chat-bubble-row ${m.sender === "user" ? "user-row" : "bot-row"}`}>
                  <div className={`chat-bubble ${m.sender === "user" ? "sent" : "received"}`}>
                    <p style={{ margin: 0, whiteSpace: "pre-line" }}>{m.text}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="chat-bubble-row bot-row">
                  <div className="chat-bubble received typing-indicator"><span></span><span></span><span></span></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-pills-bar">
              <button className="chat-pill" onClick={() => handleSend("I don't know how to speak in English")}>&#128483;&#65039; Spoken English</button>
              <button className="chat-pill" onClick={() => handleSend("How can I score Band 7+ in IELTS Writing?")}>&#9997;&#65039; Writing Tips</button>
              <button className="chat-pill" onClick={() => handleSend("What are the course fees?")}>&#128176; Course Fees</button>
              <button className="chat-pill" onClick={() => handleSend("How long should I prepare for IELTS?")}>&#128197; Study Timeline</button>
            </div>

            <div className="chat-input-footer">
              <input
                type="text"
                className="chat-text-input"
                placeholder="Ask anything about IELTS, Speaking, Fees..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                autoFocus
              />
              <button className="chat-send-btn" onClick={() => handleSend()} disabled={!inputValue.trim()} aria-label="Send Message">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="live-chat-toggle-btn"
        onClick={toggleChat}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Toggle Live Chat Support"
      >
        <span className="live-chat-pulse" />
        {isOpen ? (
          <span className="live-chat-icon-close">&#10005;</span>
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
