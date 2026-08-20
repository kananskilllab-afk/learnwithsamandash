import React from "react";

export const GOOGLE_REVIEWS = [
  {
    id: 1,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    initials: "P",
    color: "#E11D48",
    reviewerMeta: "Local Guide · 14 reviews",
    rating: 5,
    timeAgo: "2 weeks ago",
    isNew: true,
    text: "Sam & Ash gave me the exact writing templates that pushed my score from a stuck 6.5 to an 8.0 in just 4 weeks! The detailed Task 2 essay structure and lexical resource breakdown made all the difference on test day.",
    bandTag: "Band 8.0 · Academic"
  },
  {
    id: 2,
    name: "Rahul Mehta",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    initials: "R",
    color: "#2563EB",
    reviewerMeta: "8 reviews · 2 photos",
    rating: 5,
    timeAgo: "3 weeks ago",
    isNew: true,
    text: "The mock speaking evaluations made all the difference. I knew exactly what examiners look for in fluency and pronunciation. Cleared with Band 7.5 on my first attempt for Canada Express Entry!",
    bandTag: "Band 7.5 · General Training"
  },
  {
    id: 3,
    name: "Ananya Deshmukh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
    initials: "A",
    color: "#059669",
    reviewerMeta: "Local Guide · 22 reviews",
    rating: 5,
    timeAgo: "1 month ago",
    isNew: false,
    text: "No complicated jargon. Just systematic strategies for Reading and Listening that actually work under real exam timers. Listening 8.5 and Reading 8.0 in the first attempt!",
    bandTag: "Band 8.5 · Canada PR"
  },
  {
    id: 4,
    name: "Karan Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
    initials: "K",
    color: "#D97706",
    reviewerMeta: "5 reviews · 1 photo",
    rating: 5,
    timeAgo: "1 month ago",
    isNew: false,
    text: "Best IELTS preparation platform hands down. The 30 hours recorded course is organized so logically. Every question type from True/False/NG to Matching Headings was demystified.",
    bandTag: "Band 8.0 · Academic"
  },
  {
    id: 5,
    name: "Sneha Varma",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80",
    initials: "S",
    color: "#7C3AED",
    reviewerMeta: "Local Guide · 19 reviews",
    rating: 5,
    timeAgo: "2 months ago",
    isNew: false,
    text: "I was struggling with Speaking Part 2 cue cards. Sam's framework on linking ideas and natural signposting took away all the anxiety. Scored an 8.0 in Speaking!",
    bandTag: "Band 8.0 · Speaking"
  },
  {
    id: 6,
    name: "Vikramaditya Rao",
    avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&auto=format&fit=crop&q=80",
    initials: "V",
    color: "#0284C7",
    reviewerMeta: "11 reviews · 3 photos",
    rating: 5,
    timeAgo: "2 months ago",
    isNew: false,
    text: "The authentic practice tests and diagnostic reviews showed me my exact grammar gaps. Worth every single rupee. Got my UK university unconditional offer letter!",
    bandTag: "Band 7.5 · UK Admission"
  },
  {
    id: 7,
    name: "Divya Nambiar",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    initials: "D",
    color: "#DB2777",
    reviewerMeta: "Local Guide · 31 reviews",
    rating: 5,
    timeAgo: "3 months ago",
    isNew: false,
    text: "I watched their YouTube channel for months and finally bought the full recorded course. The personal feedback on 7 full mock tests was a complete game changer.",
    bandTag: "Band 8.0 · Academic"
  },
  {
    id: 8,
    name: "Amitabh Sen",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
    initials: "A",
    color: "#EA580C",
    reviewerMeta: "7 reviews",
    rating: 5,
    timeAgo: "3 months ago",
    isNew: false,
    text: "Writing Task 1 diagram analysis was my weakest point. Ash's vocabulary matrix and paragraph structures helped me score an overall 8.0 in General Training!",
    bandTag: "Band 8.0 · GT"
  },
  {
    id: 9,
    name: "Meera Krishnan",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80",
    initials: "M",
    color: "#0D9488",
    reviewerMeta: "Local Guide · 15 reviews",
    rating: 5,
    timeAgo: "3 months ago",
    isNew: false,
    text: "Super responsive support team and the curriculum is structured to perfection. No fluff, just pure high-yield strategies. Highly recommend to everyone!",
    bandTag: "Band 7.5 · Australia PR"
  },
  {
    id: 10,
    name: "Rohan Kulkarni",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80",
    initials: "R",
    color: "#4F46E5",
    reviewerMeta: "9 reviews · 4 photos",
    rating: 5,
    timeAgo: "4 months ago",
    isNew: false,
    text: "Achieved overall Band 8.5 with a 9.0 in Listening! The accent training modules and distractor elimination techniques are unmatched. Thank you Sam and Ash!",
    bandTag: "Band 8.5 · Overall"
  }
];

export default function GoogleReviewCard({ review }) {
  return (
    <div className="google-review-card">
      {/* Header: User Avatar, Name, Metadata, and Official Google 'G' icon */}
      <div className="google-review-header">
        <div className="google-review-user-group">
          {review.avatar ? (
            <img
              src={review.avatar}
              alt={review.name}
              className="google-review-avatar"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className="google-review-avatar-fallback"
            style={{
              display: review.avatar ? "none" : "flex",
              backgroundColor: review.color || "#2563EB"
            }}
          >
            {review.initials || review.name[0]}
          </div>

          <div className="google-review-user-info">
            <h4 className="google-review-name">{review.name}</h4>
            <span className="google-review-meta">{review.reviewerMeta}</span>
          </div>
        </div>

        {/* Official Google G Logo SVG */}
        <div className="google-g-logo" title="Google Review">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        </div>
      </div>

      {/* Star Rating & Timestamp */}
      <div className="google-review-rating-row">
        <div className="google-stars" aria-label={`${review.rating} stars`}>
          {[...Array(review.rating)].map((_, i) => (
            <svg key={i} className="google-star-svg" viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="#FBBC04"
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
              />
            </svg>
          ))}
        </div>
        <span className="google-review-time">{review.timeAgo}</span>
        {review.isNew && <span className="google-review-new-tag">NEW</span>}
      </div>

      {/* Review Quote Body with Decorative Quotes */}
      <div className="google-review-body">
        <span className="google-quote-mark left">“</span>
        <p className="google-review-text">{review.text}</p>
        <span className="google-quote-mark right">”</span>
      </div>

      {/* Bottom verified badge */}
      <div className="google-review-card-footer">
        <span className="google-band-tag">{review.bandTag}</span>
        <div className="google-verified-pill">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="#34A853">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          <span>Verified Student</span>
        </div>
      </div>
    </div>
  );
}
