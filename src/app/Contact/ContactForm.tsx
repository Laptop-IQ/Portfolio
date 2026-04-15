"use client";

import { useState, useCallback } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    [],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
      });

      if (!res.ok) throw new Error();

      setStatus("Message sent successfully ✨");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch {
      setStatus("Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--primary-color)] focus:bg-white/10 transition-all duration-300";

  return (
    <div className="relative p-8 lg:p-10 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl lg:text-3xl font-semibold">
          Let’s work{" "}
          <span className="text-[var(--primary-color)]">together</span>
        </h2>

        <p className="text-gray-400 text-sm mt-2">
          Tell me about your idea and I’ll help you build it into reality.
        </p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1 */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First name"
            required
            value={formData.firstName}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Row 2 */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            required
            value={formData.email}
            onChange={handleChange}
            className={inputClass}
          />

          <input
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Select */}
        <select
          name="service"
          required
          value={formData.service}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Select service</option>
          <option>Web Development</option>
          <option>UI/UX Design</option>
          <option>SEO Optimization</option>
        </select>

        {/* Message */}
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell me about your project..."
          value={formData.message}
          onChange={handleChange}
          className={inputClass}
        />

        {/* Button */}
        <button
          disabled={loading}
          className="w-full py-3 rounded-lg font-medium bg-[var(--primary-color)] text-black hover:scale-[1.02] active:scale-[0.98] transition-transform"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>

        {/* Status */}
        {status && (
          <p className="text-sm text-gray-300 mt-2 animate-pulse">{status}</p>
        )}
      </form>
    </div>
  );
}
