import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { track } from "../lib/analytics.js";

const SHOW_AFTER_PX = 420;

/** Sticky mobile CTA that appears once the visitor has scrolled past the hero. */
export default function StickyCta({ to = "/recorded-ielts-course", label = "Start the Recorded Course" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > SHOW_AFTER_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`sticky-cta${show ? " show" : ""}`}>
      <Link className="btn btn-primary btn-block" to={to} onClick={() => track("click_recorded_course_cta", { section: "sticky" })}>
        {label}
      </Link>
    </div>
  );
}
