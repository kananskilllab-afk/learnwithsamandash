import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { track } from "../lib/analytics.js";

const NAV_LINKS = [
  { to: "/what-is-ielts", label: "IELTS Blueprint" },
  { to: "/courses", label: "Courses" },
  { to: "/mock-tests", label: "Free Diagnostic" },
  { to: "/success-stories", label: "Band Results" },
  { to: "/about", label: "Our Story" },
  { to: "/study-abroad", label: "Global Admissions" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 15);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggle() {
    const next = !open;
    setOpen(next);
    document.body.style.overflow = next ? "hidden" : "";
  }

  function fireHeaderCta() {
    track("click_find_ielts_path_cta", { section: "header" });
  }

  return (
    <>
      <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Learn With Sam and Ash">
            <div className="brand-logo-badge">
              <span>S&amp;A</span>
            </div>
            <div className="brand-text-wrap">
              <span className="brand-title">Learn With Sam &amp; Ash</span>
              <span className="brand-subtitle">IELTS Masterclass Academy</span>
            </div>
          </Link>

          <nav className="nav-desktop" aria-label="Primary Navigation">
            {NAV_LINKS.map((l) => {
              const isActive = location.pathname === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`nav-link${isActive ? " active" : ""}`}
                >
                  {l.label}
                  {isActive && <span className="nav-active-pill" />}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link to="/login" className="login-link">
              Student Portal
            </Link>
            <Link
              to="/what-is-ielts#quiz"
              className="btn btn-primary btn-sm header-cta-btn"
              onClick={fireHeaderCta}
            >
              Get Your Plan
            </Link>
            <button
              className="nav-toggle"
              aria-label="Toggle navigation menu"
              aria-expanded={open}
              onClick={toggle}
            >
              <span className={`hamburger-line line1${open ? " open" : ""}`}></span>
              <span className={`hamburger-line line2${open ? " open" : ""}`}></span>
              <span className={`hamburger-line line3${open ? " open" : ""}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <div className="mobile-menu-links">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={location.pathname === l.to ? "active" : ""}
            >
              {l.label}
            </Link>
          ))}
          <div className="mobile-divider" />
          <Link to="/recorded-ielts-course">Recorded Course (₹5,000)</Link>
          <Link to="/live-ielts-course">Live Batches</Link>
          <Link to="/login" className="mobile-login">
            Student Portal Login
          </Link>
        </div>
        <div className="mobile-menu-footer">
          <Link
            to="/what-is-ielts#quiz"
            className="btn btn-primary btn-block"
            onClick={fireHeaderCta}
          >
            Get Your IELTS Plan
          </Link>
        </div>
      </div>
    </>
  );
}
