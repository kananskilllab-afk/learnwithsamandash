import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import StickyCta from "./StickyCta.jsx";
import LiveChatWidget from "./LiveChatWidget.jsx";

const NO_STICKY_CTA_ROUTES = ["/study-abroad", "/login", "/thank-you", "/recorded-ielts-course"];

export default function Layout() {
  const location = useLocation();
  const hideSticky = NO_STICKY_CTA_ROUTES.some((p) => location.pathname.startsWith(p));

  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
      {!hideSticky && <StickyCta />}
      <LiveChatWidget />
    </>
  );
}
