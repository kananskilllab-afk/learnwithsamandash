import { useState, useCallback } from "react";
import { submitLead } from "../lib/api.js";
import { track } from "../lib/analytics.js";

/**
 * Reusable lead-form state machine: idle -> submitting -> success | error.
 * Usage:
 *   const { status, error, handleSubmit } = useLeadForm("study_abroad");
 *   <form onSubmit={handleSubmit(fieldsFromForm)}>
 */
export function useLeadForm(leadType) {
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [error, setError] = useState(null);
  const [startedTracked, setStartedTracked] = useState(false);

  const trackStart = useCallback(() => {
    if (!startedTracked) {
      track(`${leadType}_form_start`, { lead_type: leadType });
      setStartedTracked(true);
    }
  }, [leadType, startedTracked]);

  const submit = useCallback(
    async (fields) => {
      setStatus("submitting");
      setError(null);
      try {
        await submitLead(leadType, fields);
        track(`${leadType}_form_complete`, { lead_type: leadType });
        setStatus("success");
      } catch (err) {
        setError(err.message || "Something went wrong. Please try again.");
        setStatus("error");
      }
    },
    [leadType]
  );

  return { status, error, submit, trackStart };
}
