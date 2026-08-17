import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { track } from "../lib/analytics.js";

const NAV_LINKS = [
  { to: "/what-is-ielts", label: "What is IELTS?" },
  { to: "/courses", label: "Courses" },
  { to: "/mock-tests", label: "Free Resources" },
  { to: "/success-stories", label: "Success Stories" },
  { to: "/about", label: "About" },
  { to: "/study-abroad", label: "Study Abroad" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, [location.pathname]);

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
      <header className="site-header">
        <div className="container">
          <Link to="/" className="brand" aria-label="Learn With Sam and Ash">
            <span className="brand-mark">S&amp;A</span>
            <span>Learn With Sam &amp; Ash</span>
          </Link>

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
            <Link to="/login" className="login-link">Login</Link>
            <Link
              to="/what-is-ielts#quiz"
              className="btn btn-primary btn-sm"
              onClick={fireHeaderCta}
            >
              Find My IELTS Path
            </Link>
            <button
              className="nav-toggle"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={toggle}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {NAV_LINKS.map((l) => (
          <Link key={l.to} to={l.to}>{l.label}</Link>
        ))}
        <Link to="/recorded-ielts-course">Recorded Course</Link>
        <Link to="/live-ielts-course">Live Course</Link>
        <Link to="/login">Login</Link>
        <Link
          to="/what-is-ielts#quiz"
          className="btn btn-primary btn-block"
          onClick={fireHeaderCta}
        >
          Find My IELTS Path
        </Link>
      </div>
    </>
  );
}
