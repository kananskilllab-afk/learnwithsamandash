import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import StickyCta from "./StickyCta.jsx";

const NO_STICKY_CTA_ROUTES = ["/study-abroad", "/login", "/thank-you", "/recorded-ielts-course"];
// Recorded course page has its own in-page "Enrol" CTA repeated throughout —
// a generic sticky bar there would compete with the on-page checkout button.

export default function Layout() {
  const location = useLocation();
  const hideSticky = NO_STICKY_CTA_ROUTES.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {!hideSticky && <StickyCta />}
    </>
  );
}
