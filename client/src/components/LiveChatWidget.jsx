import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "../lib/analytics.js";

export default function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleChat() {
    const nextState = !isOpen;
    setIsOpen(nextState);
    if (nextState) {
      track("open_live_chat_widget", { source: "floating_button" });
    }
  }

  function handleWhatsAppRedirect(message = "Hi Sam & Ash team! I have a question about your courses.") {
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
                  <div className="chat-subtitle">Typically replies in under 5 mins</div>
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

            {/* Modal Body */}
            <div className="chat-modal-body">
              <div className="chat-bubble received">
                👋 Hello! Looking to prepare for IELTS or join our Spoken English club? How can we help you today?
              </div>

              <div className="chat-quick-actions">
                <button
                  className="chat-quick-btn"
                  onClick={() => handleWhatsAppRedirect("Hi! Which course do you recommend for IELTS Band 7.5+?")}
                >
                  🎯 Recommend an IELTS Course
                </button>
                <button
                  className="chat-quick-btn"
                  onClick={() => handleWhatsAppRedirect("Hi Ash! I want to join the Speak with Ash / 32-Day Level Up program.")}
                >
                  🗣️ Spoken English &amp; Fluency Inquiry
                </button>
                <button
                  className="chat-quick-btn"
                  onClick={() => handleWhatsAppRedirect("Hi! I need help with Study Abroad university admissions.")}
                >
                  ✈️ Study Abroad Counseling
                </button>
              </div>
            </div>

            {/* Modal Footer / WhatsApp CTA */}
            <div className="chat-modal-footer">
              <button
                className="btn-whatsapp-chat"
                onClick={() => handleWhatsAppRedirect()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.073-2.127-.514-1.828-.75-3.003-2.607-3.094-2.729-.092-.122-.74-1.026-.74-1.957s.484-1.391.657-1.583c.172-.191.376-.239.501-.239.126 0 .25 0 .36.007.115.007.27-.044.423.324.156.376.533 1.303.579 1.398.047.094.078.204.016.328-.063.125-.094.204-.188.313-.094.11-.198.246-.282.33-.094.095-.192.198-.083.385.109.188.484.799 1.037 1.294.712.636 1.312.833 1.499.927.188.094.298.079.407-.047.11-.125.469-.548.594-.736.126-.188.25-.157.422-.094.172.062 1.094.516 1.282.609.188.094.313.141.36.219.046.078.046.452-.098.857z"/>
                </svg>
                Chat on WhatsApp Now
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
