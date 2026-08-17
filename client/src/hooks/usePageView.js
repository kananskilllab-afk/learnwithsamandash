import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track, getAttribution } from "../lib/analytics.js";

export function usePageView(eventName) {
  const location = useLocation();
  useEffect(() => {
    if (eventName) track(eventName, getAttribution() || {});
    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);
}
