import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { track } from "../lib/analytics.js";

const NAV_LINKS = [
  { to: "/courses", label: "Courses" },
  { to: "/what-is-ielts", label: "IELTS Guide" },
  { to: "/mock-tests", label: "Mock Tests" },
  { to: "/success-stories", label: "Results" },
  { to: "/about", label: "About" },
  { to: "/study-abroad", label: "Study Abroad" }
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
      setScrolled(window.scrollY > 10);
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
          {/* Brand Logo & Name */}
          <Link to="/" className="brand" aria-label="Learn With Sam and Ash">
            <span className="brand-badge">S&amp;A</span>
            <span className="brand-name">Learn With Sam &amp; Ash</span>
          </Link>

          {/* Right-aligned Navigation & Actions */}
          <div className="header-right-group">
            <nav className="nav-desktop" aria-label="Primary">
              {NAV_LINKS.map((l) => {
                const isActive = location.pathname === l.to;
                return (
                  <Link
                    key={l.to}
                    to={l.to}
                    className={`nav-link${isActive ? " active" : ""}`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>

            <div className="header-actions">
              <Link
                to="/what-is-ielts#quiz"
                className="btn-header-cta"
                onClick={fireHeaderCta}
              >
                Find My Path
              </Link>
              <button
                className="nav-toggle"
                aria-label="Toggle navigation menu"
                aria-expanded={open}
                onClick={toggle}
              >
                <span className={`hamburger-bar bar1${open ? " open" : ""}`}></span>
                <span className={`hamburger-bar bar2${open ? " open" : ""}`}></span>
                <span className={`hamburger-bar bar3${open ? " open" : ""}`}></span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Mobile Drawer */}
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
          <Link to="/recorded-ielts-course">Recorded IELTS Course (₹5,000)</Link>
          <Link to="/live-ielts-course">Live Batches</Link>
          <Link to="/courses">Spoken English Programs</Link>
        </div>
        <div className="mobile-menu-footer">
          <Link
            to="/what-is-ielts#quiz"
            className="btn btn-primary btn-block"
            onClick={fireHeaderCta}
          >
            Find My Path
          </Link>
        </div>
      </div>
    </>
  );
}
