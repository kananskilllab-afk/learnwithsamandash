import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics.js";

/*
  ─────────────────────────────────────────────────────────
  GENUINE KNOWLEDGE BASE
  Every entry has:
    - keywords: simple lowercase words that get scored
    - patterns: regex for direct phrase matching
    - answers: 4–6 distinct, genuine, humanized answers
  ─────────────────────────────────────────────────────────
*/
const KNOWLEDGE_BASE = [
  // ───── SPOKEN ENGLISH / CAN'T SPEAK / BEGINNER ENGLISH ─────
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
      "You're not alone in this — most of our students feel the exact same way when they start. The thing is, you already understand English (you're chatting with me right now!). What's missing is regular speaking practice in a safe, judgment-free space. Ash's 32-Day English Level Up gives you daily 90-second voice tasks on WhatsApp, live practice rooms where everyone is learning together, and a trainer who reviews your progress. Within the first week, most students notice they're forming sentences faster without translating in their head first.",

      "I completely understand that feeling. A lot of our students say 'I know the words in my head but they don't come out.' That happens because we learn English through reading and exams, but never actually practice speaking it out loud regularly. The fix is simple — speak a little every single day, even for just 2 minutes. Our Speak with Ash Club (₹499/month) gives you structured daily speaking missions and 2 live rooms every week where you practice with real people, not just theory.",

      "It's okay — nobody is born speaking perfect English. Even people who seem fluent today started from the same point. The fastest way to get comfortable is to start with small daily speaking habits. Our 32-Day Level Up program (₹2,999) takes you from Day 1 (basic sentence building) to Day 32 (confident spontaneous speaking) with video lessons, live rooms, and reviewed voice tasks. You literally see your own improvement tracked with a /25 fluency score.",

      "I hear this from so many students and honestly, the fact that you're here asking shows you're already taking the right step. The biggest mistake people make is thinking they need to learn MORE grammar or vocabulary first — you don't. You need to start speaking with whatever English you already have, and build from there. That's exactly what our Speak with Ash weekly sessions do — you show up, you speak, you get feedback, you improve week by week.",

      "Don't worry about being perfect right now. The goal isn't to sound like a native speaker — it's to express your thoughts clearly and naturally. Many of our students who joined with zero speaking confidence are now handling office meetings and phone calls comfortably. It starts with consistent daily practice. Would you like me to explain how the 32-Day Level Up or the monthly Speaking Club works?"
    ]
  },

  // ───── IELTS GENERAL INFO / WHAT IS IELTS ─────
  {
    id: "ielts_general",
    keywords: ["ielts", "exam", "test", "band", "score", "what"],
    patterns: [
      /what is ielts/i, /about ielts/i, /ielts exam/i, /ielts test/i,
      /tell.*about.*ielts/i, /explain.*ielts/i, /ielts kya/i
    ],
    answers: [
      "IELTS (International English Language Testing System) is the world's most widely accepted English proficiency test, recognized by over 12,000 organizations in 140+ countries. It tests 4 skills: Listening (30 min), Reading (60 min), Writing (60 min), and Speaking (11-14 min face-to-face). Scores range from Band 1 to Band 9. Most universities require Band 6.5–7.5 and immigration programs like Canada Express Entry typically need Band 7.0+ in each module.",

      "IELTS is a standardized English test used worldwide for university admissions, immigration (Canada PR, Australia PR, UK visas), and professional registration. There are 2 versions — Academic (for higher studies) and General Training (for migration/work). The exam has 4 sections: Listening, Reading, Writing, and Speaking. Your overall band score is the average of all 4 modules, rounded to the nearest 0.5.",

      "IELTS measures your ability to use English in real academic and everyday situations. It's accepted by every major university in the UK, Canada, Australia, the US, and Europe. The test has 4 parts — Listening (40 questions from audio recordings), Reading (40 questions from passages), Writing (2 tasks — a report/letter + an essay), and Speaking (a 3-part face-to-face conversation with an examiner). Results are given within 13 days."
    ]
  },

  // ───── IELTS PREPARATION TIMELINE ─────
  {
    id: "ielts_timeline",
    keywords: ["prepare", "preparation", "months", "weeks", "days", "time", "schedule", "timeline", "long", "duration", "start", "plan"],
    patterns: [
      /how (long|many months|many weeks|many days|much time).*(prepare|study|ielts|crack|clear)/i,
      /preparation time/i, /study schedule/i, /study plan/i,
      /when.*start.*prepar/i, /how.*start.*ielts/i
    ],
    answers: [
      "For most learners, 4 to 8 weeks of focused daily study (1–2 hours) is enough for effective IELTS preparation. If your current level is around Band 5.5–6.0 and you're targeting 7.0+, plan for about 6 weeks. If you're already around Band 6.5, even 3–4 weeks of intensive practice with mock tests can be sufficient. The key is consistency — studying 1 hour daily beats 5 hours on weekends.",

      "It depends on your current English level and target band. Here's a rough guide:\n• Band 5.0 → 7.0: About 8–10 weeks\n• Band 6.0 → 7.0: About 4–6 weeks\n• Band 6.5 → 7.5: About 3–4 weeks\nThe most important thing is taking a diagnostic mock test first so you know exactly where you stand. We offer free diagnostic tests on our website.",

      "Most students who follow a structured plan reach their target band in 30–45 days. I'd recommend starting with a full mock test to find your baseline score, then focusing 70% of your time on your weakest modules. For example, if your Reading is already at 7.0 but Writing is at 5.5, spend more time on essay structure and get expert feedback on your writing.",

      "A realistic timeline is 4–8 weeks with daily 1–2 hour focused study. But honestly, the biggest time-saver is getting expert feedback on your Writing and Speaking early on, because those are the modules where students waste the most time practicing the wrong things. Our Recorded Course (₹5,000) includes 7 trainer-evaluated mock tests specifically for this reason."
    ]
  },

  // ───── IELTS WRITING ─────
  {
    id: "ielts_writing",
    keywords: ["writing", "essay", "task", "paragraph", "coherence", "vocabulary", "write", "opinion", "discussion", "graph", "letter", "report"],
    patterns: [
      /writing/i, /task 1/i, /task 2/i, /essay/i, /improve.*writ/i,
      /writing.*band/i, /band.*writing/i, /writing.*score/i,
      /stuck.*(6|6.5).*writ/i, /writ.*stuck/i, /how to write/i,
      /paragraph/i, /coherence/i, /ielts essay/i
    ],
    answers: [
      "Most students get stuck at Band 6.0–6.5 in Writing because of weak Task Achievement and Coherence, not vocabulary. Here's what examiners actually look for in Task 2:\n\n1. A clear position stated in the introduction (not vague)\n2. Each body paragraph develops ONE main idea fully with explanation + specific example\n3. Logical paragraph flow with clear topic sentences\n4. No new ideas in the conclusion\n\nThe biggest mistake? Writing complex sentences to 'impress' the examiner. Simple, clear sentences with precise vocabulary actually score higher than forced, error-filled complex ones.",

      "For Writing Task 2, use this proven structure:\n\n• Introduction (2–3 sentences): Paraphrase the question + state your clear position\n• Body 1 (4–5 sentences): Topic sentence → Explain → Specific example → Impact\n• Body 2 (4–5 sentences): Same structure, different argument\n• Conclusion (2 sentences): Restate position + final thought\n\nSpend 5 minutes planning BEFORE you write. This alone can jump your score by 0.5 bands because your essay will have much better logical flow.",

      "For Writing Task 1 (Academic): Describe the main trends/features in 150+ words. Start with an overview paragraph identifying 2–3 key patterns. Don't describe every single data point — focus on comparisons and significant changes.\n\nFor Task 1 (General): Write a formal, semi-formal, or informal letter depending on the prompt. Address all 3 bullet points in the question, and match your tone to the audience.\n\nIn both cases, the Overview/Purpose paragraph is worth about 25% of your Task Achievement score, so never skip it.",

      "The #1 thing that separates a Band 6 essay from a Band 7 essay is specificity. Band 6 answers give vague, general statements like 'Education is important for society.' Band 7 answers give concrete reasoning: 'Access to primary education in rural areas reduces child labor rates by equipping children with literacy skills needed for formal employment.' See the difference? In our course, trainers review your actual essays and show you exactly where you're being too vague.",

      "If your Writing score isn't moving despite practice, the problem is almost certainly that you're practicing without expert feedback. You can write 50 essays, but if you keep making the same coherence or grammar mistakes, your score won't change. That's why our course includes personal writing evaluations — a certified trainer reads your essay, marks exactly where you lose band marks, and shows you how to fix it."
    ]
  },

  // ───── IELTS SPEAKING ─────
  {
    id: "ielts_speaking",
    keywords: ["speaking", "cue", "card", "examiner", "nervous", "part", "pronunciation", "accent", "stammer", "ramble"],
    patterns: [
      /ielts speaking/i, /cue card/i, /speaking part/i, /speaking test/i,
      /nervous.*speak/i, /speaking.*nervous/i, /improve.*speaking/i,
      /speaking.*improve/i, /speaking.*band/i, /band.*speaking/i,
      /pronunciation/i, /accent/i, /speaking tips/i, /examiner/i,
      /stammer/i, /rambl/i, /speaking score/i
    ],
    answers: [
      "IELTS Speaking has 3 parts:\n\n• Part 1 (4–5 min): Simple personal questions. Give 2–3 sentence answers, not one-word replies.\n• Part 2 (3–4 min): You get a cue card and 1 minute to prepare, then speak for 2 minutes. Use the Past-Present-Future framework to never run out of things to say.\n• Part 3 (4–5 min): Abstract discussion questions. Structure your answers as: Opinion → Reason → Example → Conclusion.\n\nThe examiner is NOT judging your accent. They evaluate Fluency, Vocabulary, Grammar Range, and Pronunciation clarity.",

      "For the Cue Card (Part 2), here's a strategy that works every time: During your 1-minute prep, jot down 3 bullet points — one about the Past (how you discovered/started something), one about the Present (what it means to you now), and one about the Future (your plans related to it). This gives you a natural 2-minute story flow without memorizing scripts.",

      "The most common mistake in Speaking is trying to use 'big' vocabulary that you don't naturally use. Examiners can tell when you've memorized phrases, and it actually hurts your Fluency score because you pause unnaturally to recall them. Instead, speak naturally using words you're comfortable with, and focus on clear pronunciation and smooth sentence connections. Fillers like 'well...', 'actually...', 'to be honest...' are perfectly fine and sound natural.",

      "If you get nervous during IELTS Speaking, remember: the examiner is trained to make you comfortable. They're not trying to trick you. Take a breath before answering, and if you don't understand a question, say 'Could you rephrase that?' — this is completely allowed and doesn't lose marks. In our course, you practice with 7 full mock speaking evaluations so the real exam feels familiar.",

      "A quick tip for Band 7+ in Speaking: use a mix of simple and complex sentences naturally. For example: 'I enjoy cooking. It started when I was about 12, and since then I've been experimenting with different cuisines, especially Italian food, which I find really satisfying to make from scratch.' That one response shows range without sounding rehearsed."
    ]
  },

  // ───── IELTS READING ─────
  {
    id: "ielts_reading",
    keywords: ["reading", "passage", "true", "false", "given", "heading", "matching", "skim", "scan", "paragraph"],
    patterns: [
      /reading/i, /true.*false.*not given/i, /matching heading/i,
      /reading.*time/i, /time.*reading/i, /passage 3/i,
      /improve.*reading/i, /reading.*improve/i, /reading.*score/i,
      /reading.*tips/i, /skim/i, /scan/i
    ],
    answers: [
      "In IELTS Reading, never read the entire passage word-by-word first. Here's the efficient approach:\n\n1. Read the title and first sentence of each paragraph (30 seconds)\n2. Go straight to the questions\n3. Identify keywords in the question, then scan the passage for those specific words or synonyms\n\nTime allocation: Passage 1 = 15 min, Passage 2 = 20 min, Passage 3 = 25 min. Never spend more than 90 seconds on a single question — guess and move on.",

      "For True/False/Not Given questions, here's the exact rule:\n\n• TRUE: The passage says the same thing as the statement\n• FALSE: The passage directly CONTRADICTS the statement\n• NOT GIVEN: The passage doesn't mention this information at all — even if you think it's true in real life\n\nThe trickiest part is distinguishing FALSE from NOT GIVEN. Ask yourself: 'Does the passage specifically say the OPPOSITE?' If yes → False. If the topic just isn't discussed → Not Given.",

      "For Matching Headings: Read the first and last sentence of each paragraph — they usually contain the main idea. Cross out headings as you match them to narrow down options. Don't match based on a single word appearing in both the heading and paragraph — the heading should capture the OVERALL point of the paragraph, not just mention a keyword.",

      "Reading Passage 3 is always the hardest — it has abstract academic language, complex sentence structures, and the trickiest question types. Save 25 minutes for it. If you find yourself stuck on a question, mark your best guess and move on immediately. Many students lose 3–4 marks on Passages 1 and 2 by running out of time because they spent too long on one difficult question."
    ]
  },

  // ───── IELTS LISTENING ─────
  {
    id: "ielts_listening",
    keywords: ["listening", "audio", "hear", "spelling", "distractor", "map", "section"],
    patterns: [
      /listening/i, /listening.*tips/i, /improve.*listening/i,
      /listening.*score/i, /spelling.*mistake/i, /distractor/i,
      /listening.*section/i, /listening.*hard/i
    ],
    answers: [
      "IELTS Listening plays the audio ONCE only, so preparation during the 30-second pause before each section is crucial. Use that time to read ahead, underline keywords in the questions, and predict what type of answer to expect (a name? a number? a place?). Watch out for distractors — speakers often change their mind mid-sentence. Always go with the final confirmed information.",

      "Common Listening mistakes that cost marks:\n\n1. Spelling errors (e.g., 'libary' instead of 'library') — each misspelling = wrong answer\n2. Writing singular when the answer is plural (or vice versa)\n3. Missing the answer because you're still writing the previous one — use abbreviations while listening, then write full words during the transfer time\n4. Getting tricked by distractors ('Let's meet Monday... no wait, Tuesday works better')",

      "Sections 1 & 2 are easier (everyday conversations, monologues). Sections 3 & 4 are harder (academic discussions, lectures). If you find yourself losing focus during Section 4, try to stay engaged by mentally predicting what comes next. In our mock tests, you can practice with authentic audio at different speeds to build endurance.",

      "A practical tip: Before the test, practice listening to British, Australian, and North American accents (BBC podcasts, TED talks, ABC Australia). IELTS uses a mix of accents, and being familiar with them reduces panic when you hear an unfamiliar pronunciation during the real exam."
    ]
  },

  // ───── ACADEMIC VS GENERAL TRAINING ─────
  {
    id: "academic_vs_general",
    keywords: ["academic", "general", "training", "difference", "which", "type", "version", "format"],
    patterns: [
      /academic.*general/i, /general.*academic/i, /which.*ielts/i,
      /difference.*academic/i, /difference.*general/i, /which.*test.*take/i,
      /academic or general/i, /general or academic/i
    ],
    answers: [
      "Simple rule:\n\n• **IELTS Academic**: For university admissions (Bachelor's, Master's, PhD) and professional registration (doctors, nurses, engineers).\n• **IELTS General Training**: For immigration (Canada PR, Australia PR, UK visa) and work permits.\n\nBoth share the same Listening and Speaking tests. The difference is in Reading (academic passages vs everyday texts) and Writing Task 1 (graph/chart description vs formal/informal letter).",

      "If your goal is to study at a university abroad, you need IELTS Academic. If your goal is permanent residency (like Canada Express Entry or Australia Skilled Migration), you need IELTS General Training. Some students need BOTH at different stages — for example, Academic for your university application and then General for PR after graduation. Our course covers practice materials for both versions.",

      "The scoring is the same (Band 1–9) for both Academic and General. However, General Training Reading tends to be slightly easier (everyday texts like advertisements, notices) compared to Academic Reading (academic journal-style passages). General Writing Task 1 asks you to write a letter instead of describing a graph. Everything else — Listening, Speaking, and Task 2 Writing — is identical."
    ]
  },

  // ───── COURSE FEES & PRICING ─────
  {
    id: "pricing",
    keywords: ["fee", "fees", "price", "pricing", "cost", "charge", "money", "pay", "payment", "rupees", "5000", "2999", "499", "1999", "expensive", "affordable", "budget", "discount"],
    patterns: [
      /fee/i, /price/i, /cost/i, /how much/i, /pricing/i, /charges/i,
      /kितना|kitna/i, /affordable/i, /budget/i, /discount/i, /expensive/i,
      /pay/i, /payment/i
    ],
    answers: [
      "Here are all our program fees:\n\n• Recorded IELTS Strategy Course — ₹5,000 (one-time). Includes 30+ hours of video lessons, 7 full mock exams with writing & speaking evaluations by certified trainers, 3 months unlimited access.\n\n• 32-Day English Level Up — ₹2,999 (one-time). Daily video lessons, live practice rooms, WhatsApp speaking missions, baseline vs final fluency score.\n\n• Speak with Ash Club — ₹499/month. Weekly live rooms with Ash, daily missions, peer practice calls, trainer feedback.\n\n• Interview Success Blueprint — ₹1,999 (one-time). 15 sessions + 10 live mock interviews.\n\n• Diagnostic Mock Tests — Free on our website.",

      "Our most popular program is the Recorded IELTS Course at ₹5,000 (one-time, 3 months access). It includes everything — 30+ hours of strategy lessons across all 4 modules, 7 evaluated mock tests, and personal writing & speaking feedback. For spoken English, the 32-Day Level Up is ₹2,999 and the monthly Speaking Club is ₹499/month. All fees are one-time except the monthly club.",

      "Quick pricing breakdown:\n\n• IELTS full course: ₹5,000 (3 months, 7 mocks evaluated)\n• Spoken English 32-Day program: ₹2,999\n• Monthly speaking practice: ₹499/month\n• Interview prep: ₹1,999 (4 weeks)\n• Mock tests: Free\n\nNo hidden fees. You get full access from Day 1 on any device.",

      "Everything is transparently priced with no hidden charges. The IELTS course is ₹5,000 one-time which comes down to about ₹55/day for 3 months of complete preparation including trainer evaluations. The Speaking Club at ₹499/month is less than ₹17/day for daily practice with live rooms and real feedback."
    ]
  },

  // ───── 32-DAY ENGLISH LEVEL UP ─────
  {
    id: "32day_levelup",
    keywords: ["32", "day", "level", "up", "levelup", "transformation", "cohort"],
    patterns: [
      /32.?day/i, /level.?up/i, /32.*english/i, /transformation/i
    ],
    answers: [
      "The 32-Day English Level Up (₹2,999) is a complete daily speaking transformation:\n\n• Day 0: You take a baseline fluency test (/25 score)\n• Days 1–10: Sentence building, everyday grammar, common conversation phrases\n• Days 11–20: Pronunciation correction, natural rhythm, and live practice rooms\n• Days 21–30: Real-world conversations — ordering food, phone calls, meetings, small talk\n• Days 31–32: Final fluency test + comparison with your Day 0 score\n\nEvery day you record a 90-second voice task on WhatsApp that your trainer actually listens to and responds to.",

      "The 32-Day Level Up is designed for people who understand English but can't speak it confidently. Each day has a short video lesson (15–20 mins) + a daily speaking mission where you record yourself and submit on WhatsApp. You also get access to live practice rooms where you speak with other students and trainers. By Day 32, students typically see a jump of 5–8 points on their /25 fluency score.",

      "Think of the 32-Day Level Up as a gym membership for your English speaking. You don't just watch videos — you speak every single day, get corrected, and track your progress. It costs ₹2,999 (one-time, not monthly), and it's specifically built for people who feel stuck because they know English on paper but freeze up in real conversations."
    ]
  },

  // ───── SPEAK WITH ASH CLUB ─────
  {
    id: "speak_with_ash",
    keywords: ["ash", "club", "weekly", "monthly", "subscription", "practice", "partner", "community"],
    patterns: [
      /speak.*ash/i, /ash.*club/i, /speaking club/i, /monthly.*club/i,
      /weekly.*practice/i, /speaking.*membership/i, /join.*ash/i
    ],
    answers: [
      "Speak with Ash (₹499/month) is a weekly speaking community. Here's what a typical week looks like:\n\n• Monday & Wednesday: Daily voice speaking mission (10–20 min)\n• Tuesday: Live speaking room with Ash (group discussion + live corrections)\n• Thursday: Peer partner practice call (you're paired with another student)\n• Friday: Trainer-guided practice room (focused topic like storytelling, debate, etc.)\n• Weekend: Reviewed WhatsApp voice submissions + monthly fluency scorecard\n\nYou can join any month and cancel anytime.",

      "The Speak with Ash Club gives you something most English learners don't have — a consistent, weekly speaking routine with real people and real feedback. It's not a course with an end date; it's an ongoing practice community at ₹499/month. Perfect for people who finished a course but don't want to lose momentum, or anyone who just needs regular speaking partners.",

      "Ash personally leads 2 live speaking rooms every week where you discuss real topics, practice expressing opinions, and get live pronunciation and phrasing corrections. Between sessions, you do daily voice tasks and partner calls. Most members see a noticeable improvement in their natural speaking flow within the first 2–3 weeks of consistent participation."
    ]
  },

  // ───── INTERVIEW PREP ─────
  {
    id: "interview_prep",
    keywords: ["interview", "job", "resume", "hr", "behavioral", "salary", "career", "placement", "hired", "fresher", "experienced", "professional"],
    patterns: [
      /interview/i, /job.*seeker/i, /hr.*round/i, /salary.*negotiat/i,
      /elevator.*pitch/i, /job.*prep/i, /career/i, /fresher/i,
      /introduce.*yourself/i, /tell me about yourself/i, /resume/i
    ],
    answers: [
      "The Interview Success Blueprint (₹1,999) is a 4-week program:\n\n• Week 1: Building your 60–90 second self-introduction pitch\n• Week 2: Mastering behavioral questions using the STAR formula (Situation → Task → Action → Result)\n• Week 3: Handling tricky questions — salary expectations, career gaps, 'Why should we hire you?'\n• Week 4: Live mock interviews with scoring on a /35 evaluation rubric\n\nYou get 15 recorded sessions + 10 live mock interviews + a free WhatsApp practice group for peer practice.",

      "If you have an interview coming up and you're worried about freezing or not finding the right words, this course helps you build a structured approach. Most candidates fail interviews not because they lack skills, but because they can't articulate their experience clearly under pressure. We teach you exactly how to structure your answers so your competence actually comes through.",

      "The program includes 10 actual live mock interviews — not just watching someone else practice, but YOU sitting in front of a trainer who asks real HR questions, then gives you a detailed scorecard. By the 4th or 5th mock, most students say the anxiety has almost completely disappeared because they've already 'been through it' multiple times."
    ]
  },

  // ───── MOCK TESTS & DIAGNOSTIC ─────
  {
    id: "mock_tests",
    keywords: ["mock", "test", "diagnostic", "practice", "sample", "quiz", "free", "assessment", "evaluate", "benchmark"],
    patterns: [
      /mock/i, /diagnostic/i, /free.*test/i, /practice.*test/i,
      /sample.*test/i, /test.*free/i, /quiz/i, /assessment/i,
      /check.*level/i, /know.*level/i, /current.*score/i, /baseline/i
    ],
    answers: [
      "You can take our free diagnostic assessment directly on the website under the Mock Tests section. It gives you an estimated band score across all 4 modules so you know exactly where you stand before investing in any course. We always recommend starting here — there's no point preparing blindly when a 20-minute test can show you exactly which modules need the most work.",

      "We offer free diagnostic mock tests on our website that simulate the real IELTS experience. You get timed Reading and Listening sections with instant score calculations. For Writing and Speaking, our paid course includes 7 full evaluations where certified trainers mark your essays and speaking recordings using the official IELTS 9-band rubric.",

      "Start with our free online diagnostic — it takes about 20 minutes and gives you a realistic baseline score. Many students are surprised to find their Reading might be at 7.0 but their Writing is at 5.5. Knowing this upfront lets you focus your preparation where it actually matters, instead of spending equal time on modules you're already strong in."
    ]
  },

  // ───── STUDY ABROAD / UNIVERSITIES / VISA ─────
  {
    id: "study_abroad",
    keywords: ["abroad", "university", "universities", "visa", "canada", "uk", "usa", "australia", "europe", "sop", "admission", "scholarship", "immigration", "pr", "migrate", "migration"],
    patterns: [
      /study abroad/i, /university/i, /universities/i, /visa/i,
      /canada/i, /uk/i, /usa/i, /australia/i, /europe/i,
      /sop/i, /statement.*purpose/i, /admission/i, /scholarship/i,
      /immigration/i, /permanent.*residen/i, /pr/i, /migrate/i
    ],
    answers: [
      "Our study abroad team provides end-to-end support: shortlisting universities that match your profile and budget, reviewing and improving your Statement of Purpose (SOP), helping with visa documentation, and identifying scholarship opportunities. We work with universities across the UK, Canada, USA, Australia, and Europe. You can book a free counseling session to discuss your specific plans.",

      "For study abroad applications, IELTS is usually just one part of the puzzle. You also need a strong SOP, academic transcripts, recommendation letters, and financial documents. Our counselors have helped hundreds of students get admissions to universities like University of Toronto, University of Melbourne, University of Edinburgh, and many more. The consultation is free — we review your profile and suggest realistic university options.",

      "If you're targeting Canada PR through Express Entry, you'll need IELTS General Training with ideally Band 7.0+ in each module (that's 6 points per module under CLB 9). For Australia Skilled Migration, it's similar. Our immigration counselors can explain the exact score requirements for your specific pathway and help you plan your preparation timeline accordingly."
    ]
  },

  // ───── COURSE ACCESS & VALIDITY ─────
  {
    id: "access_validity",
    keywords: ["access", "validity", "device", "mobile", "laptop", "tablet", "login", "rewatch", "download", "offline", "certificate"],
    patterns: [
      /validity/i, /how long.*access/i, /access/i, /device/i,
      /mobile/i, /laptop/i, /tablet/i, /rewatch/i, /download/i,
      /offline/i, /certificate/i, /login/i, /expire/i
    ],
    answers: [
      "You get 3 full months of unlimited access from the date of enrollment. You can log in 24/7 from any device — phone, tablet, or laptop. All video lessons can be re-watched as many times as you want. Your mock test scores and writing feedback are saved in your dashboard for the entire duration.",

      "Your access is valid for 3 months and works on any browser on any device. There's no download needed — everything streams from our portal. You can study at 6 AM before work or at midnight after everyone's asleep, completely on your schedule. Your progress, notes, and mock scores are all saved automatically.",

      "It's 3 months of access from when you enroll, available on mobile, tablet, and laptop. You can re-watch any lesson unlimited times. If you need a bit more time due to an exam date change, you can reach out to our support team and we'll discuss extending your access."
    ]
  },

  // ───── CONNECT WITH COUNSELOR / WHATSAPP ─────
  {
    id: "human_contact",
    keywords: ["whatsapp", "call", "phone", "counselor", "advisor", "human", "person", "support", "contact", "number", "reach"],
    patterns: [
      /talk.*human/i, /talk.*person/i, /talk.*counselor/i, /talk.*advisor/i,
      /whatsapp/i, /phone.*number/i, /call/i, /contact/i, /reach/i,
      /help desk/i, /speak.*directly/i, /real person/i, /support team/i
    ],
    answers: [
      "You can chat directly with our counseling team on WhatsApp anytime. They'll review your background, discuss your target score and timeline, and suggest the best preparation path for your specific situation. No pressure, just honest guidance.",

      "Our senior counselor is available on WhatsApp for one-on-one discussions about your goals. Whether you need help choosing between courses, have questions about your study plan, or want to discuss your mock test results — just send a message and they'll get back to you within a few hours.",

      "Of course! For personalized advice about your specific situation — like which course to pick, what band score to target, or how to manage preparation alongside work — our counselor on WhatsApp can give you tailored recommendations."
    ]
  },

  // ───── GREETINGS ─────
  {
    id: "greeting",
    keywords: [],
    patterns: [
      /^(hi|hello|hey|hii+|heyy+|namaste|salam|good morning|good evening|good afternoon|good night|sup|yo)\s*[!?.]*$/i
    ],
    answers: [
      "Hello! How are you doing? Tell me what's on your mind — are you preparing for IELTS, looking to improve your spoken English, or getting ready for interviews?",
      "Hi there! What can I help you with today? Feel free to ask me anything about IELTS preparation, English speaking, course details, or study abroad.",
      "Hey! Welcome. What's your current goal? Whether it's cracking a target band score, building speaking confidence, or preparing for job interviews — just ask and I'll give you a straight answer.",
      "Hello! Good to have you here. Ask me anything — IELTS strategies, course fees, speaking tips, mock tests, study abroad — whatever's on your mind right now."
    ]
  },

  // ───── THANKS / BYE ─────
  {
    id: "thanks_bye",
    keywords: [],
    patterns: [
      /^(thanks|thank you|thankyou|thx|bye|goodbye|see you|ok thanks|got it|okay|ok)\s*[!?.]*$/i
    ],
    answers: [
      "You're welcome! If you have more questions later, just come back here anytime. Wishing you the best with your preparation!",
      "Glad I could help! Feel free to reach out whenever you need more guidance. You've got this!",
      "Anytime! Remember, the hardest part is starting — once you build a daily routine, momentum takes over. Good luck!",
      "Happy to help! Come back whenever you need advice. All the best with your goals!"
    ]
  }
];

/*
  ─────────────────────────────────────────────────────────
  DIVERSE FALLBACK RESPONSES (for truly unmatched queries)
  ─────────────────────────────────────────────────────────
*/
const FALLBACK_RESPONSES = [
  "I'd love to help with that! Could you tell me a bit more — are you asking about IELTS preparation, spoken English, interviews, or something else? The more specific your question, the better I can answer.",
  "That's a good question! I cover topics like IELTS module strategies, spoken English improvement, course details, fees, mock tests, and study abroad. Could you be a bit more specific so I can give you a detailed answer?",
  "I want to make sure I give you the right answer. Could you rephrase your question or tell me which area you're interested in — IELTS, spoken English, interviews, or study abroad?",
  "Hmm, I want to be honest — I'm not sure I fully understood that. Can you ask it differently? For example, you could ask about Writing tips, Speaking strategies, course fees, or how to start preparing for IELTS.",
  "I can help with questions about IELTS preparation (all 4 modules), spoken English improvement, interview training, course pricing, mock tests, and study abroad counseling. What would you like to know more about?"
];

// ─────────── COMPONENT ───────────

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
  // Track recently used answer indices per topic to avoid repeats
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
    if (nextState) {
      track("open_live_chat_widget", { source: "floating_button" });
    }
  }

  // Round-robin answer picker: cycles through all answers before repeating
  const pickAnswer = useCallback((topicId, answers) => {
    if (!answers || answers.length === 0) return "";
    if (!usedAnswersRef.current[topicId]) {
      usedAnswersRef.current[topicId] = [];
    }
    const used = usedAnswersRef.current[topicId];

    // Find unused indices
    const available = answers.map((_, i) => i).filter(i => !used.includes(i));

    // If all used, reset
    if (available.length === 0) {
      usedAnswersRef.current[topicId] = [];
      const freshAvailable = answers.map((_, i) => i);
      const pick = freshAvailable[Math.floor(Math.random() * freshAvailable.length)];
      usedAnswersRef.current[topicId].push(pick);
      return answers[pick];
    }

    const pick = available[Math.floor(Math.random() * available.length)];
    used.push(pick);
    return answers[pick];
  }, []);

  const getAnswer = useCallback((query) => {
    const text = query.trim().toLowerCase();

    // 1. Direct regex pattern match (highest priority)
    for (const entry of KNOWLEDGE_BASE) {
      if (entry.patterns && entry.patterns.some(p => p.test(text))) {
        return pickAnswer(entry.id, entry.answers);
      }
    }

    // 2. Keyword scoring (for natural, conversational phrasing)
    const words = text.replace(/[^a-z0-9' ]/g, "").split(/\s+/).filter(Boolean);
    const stopWords = new Set(["the", "is", "a", "an", "and", "or", "in", "on", "for", "to", "of", "it", "its", "be", "am", "are", "was", "were", "has", "have", "had", "do", "does", "did", "will", "would", "shall", "should", "may", "might", "can", "could", "but", "if", "so", "as", "at", "by", "with", "from", "this", "that", "these", "those", "there", "here", "very", "just", "also", "too", "not", "no", "yes", "about", "some", "any", "all", "much", "many", "more", "most", "than", "then", "when", "where", "which", "who", "whom", "whose", "what", "why", "please", "need", "want", "like", "really", "actually", "think"]);

    let bestEntry = null;
    let bestScore = 0;

    for (const entry of KNOWLEDGE_BASE) {
      if (!entry.keywords || entry.keywords.length === 0) continue;
      let score = 0;
      for (const word of words) {
        if (stopWords.has(word)) continue;
        // Check if the word matches or is contained in any keyword
        for (const kw of entry.keywords) {
          if (word === kw) {
            score += 3; // exact match = high score
          } else if (word.length > 3 && kw.includes(word)) {
            score += 2; // partial keyword match
          } else if (kw.length > 3 && word.includes(kw)) {
            score += 2; // word contains keyword
          }
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestEntry = entry;
      }
    }

    if (bestEntry && bestScore >= 3) {
      return pickAnswer(bestEntry.id, bestEntry.answers);
    }

    // 3. Diverse fallback — cycles through different fallbacks
    const fb = FALLBACK_RESPONSES[fallbackIndexRef.current % FALLBACK_RESPONSES.length];
    fallbackIndexRef.current += 1;
    return fb;
  }, [pickAnswer]);

  function handleSend(userText = inputValue) {
    if (!userText.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: userText.trim(),
      timestamp: "Just now"
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);
    track("send_chat_message", { query: userText });

    // Slightly varied delay to feel natural
    const delay = 350 + Math.floor(Math.random() * 300);
    setTimeout(() => {
      const answer = getAnswer(userText);
      const botResponse = {
        id: Date.now() + 1,
        sender: "bot",
        text: answer,
        timestamp: "Just now"
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, delay);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
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

            {/* Chat Stream */}
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

            {/* Quick Suggestion Pills */}
            <div className="chat-pills-bar">
              <button className="chat-pill" onClick={() => handleSend("I don't know how to speak in English")}>
                🗣️ Spoken English
              </button>
              <button className="chat-pill" onClick={() => handleSend("How can I score Band 7+ in IELTS Writing?")}>
                ✍️ Writing Tips
              </button>
              <button className="chat-pill" onClick={() => handleSend("What are the course fees?")}>
                💰 Course Fees
              </button>
              <button className="chat-pill" onClick={() => handleSend("How long should I prepare for IELTS?")}>
                📅 Study Timeline
              </button>
            </div>

            {/* Text Input */}
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

      {/* Floating Toggle Button */}
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
