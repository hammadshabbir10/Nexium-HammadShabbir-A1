"use client";
import { useState } from "react";

export default function FeedbackPage() {
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{to?: string, from?: string, subject?: string, message?: string}>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};
    if (!to) newErrors.to = "To email is required";
    else if (!validateEmail(to)) newErrors.to = "Invalid email address";
    if (!from) newErrors.from = "From email is required";
    else if (!validateEmail(from)) newErrors.from = "Invalid email address";
    if (!subject) newErrors.subject = "Subject is required";
    if (!message) newErrors.message = "Message is required";
    setErrors(newErrors);
    setApiError("");
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      try {
        const res = await fetch("/api/send-feedback", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ to, from, subject, message }),
        });
        if (!res.ok) throw new Error("Failed to send feedback");
        setSubmitted(true);
        setTo(""); setFrom(""); setSubject(""); setMessage("");
      } catch (err) {
        setApiError("Failed to send feedback. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-primary p-4">
      <div className="w-full max-w-lg bg-white/10 rounded-2xl shadow-professional p-8">
        <h1 className="heading-primary text-3xl mb-6 text-center">Feedback</h1>
        {submitted ? (
          <div className="text-green-400 text-center font-semibold">Thank you for your feedback!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-high-contrast font-semibold mb-1">To (Email)</label>
              <input
                type="email"
                className="input-professional w-full text-base md:text-lg placeholder:text-base md:placeholder:text-lg"
                value={to}
                onChange={e => setTo(e.target.value)}
                placeholder="Recipient's email address"
              />
              {errors.to && <div className="text-red-400 text-sm mt-1">{errors.to}</div>}
            </div>
            <div>
              <label className="block text-high-contrast font-semibold mb-1">From (Email)</label>
              <input
                type="email"
                className="input-professional w-full text-base md:text-lg placeholder:text-base md:placeholder:text-lg"
                value={from}
                onChange={e => setFrom(e.target.value)}
                placeholder="Your email address"
              />
              {errors.from && <div className="text-red-400 text-sm mt-1">{errors.from}</div>}
            </div>
            <div>
              <label className="block text-high-contrast font-semibold mb-1">Subject</label>
              <input
                type="text"
                className="input-professional w-full text-base md:text-lg placeholder:text-base md:placeholder:text-lg"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject of your feedback"
              />
              {errors.subject && <div className="text-red-400 text-sm mt-1">{errors.subject}</div>}
            </div>
            <div>
              <label className="block text-high-contrast font-semibold mb-1">Message</label>
              <textarea
                className="input-professional w-full min-h-[120px] text-base md:text-lg placeholder:text-base md:placeholder:text-lg"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Type your feedback here..."
              />
              {errors.message && <div className="text-red-400 text-sm mt-1">{errors.message}</div>}
            </div>
            {apiError && <div className="text-red-400 text-center font-medium">{apiError}</div>}
            <button
              type="submit"
              className="btn-professional btn-full-width py-3 text-white rounded-xl font-semibold mt-2 text-lg"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Feedback"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 