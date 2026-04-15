"use client";

import { useState } from "react";
import {
  BiPhone,
  BiEnvelope,
  BiTime,
  BiMessageDetail,
  BiGlobe,
  BiMap,
} from "react-icons/bi";

export default function ContactPage() {
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setStatus("Message sent successfully ✨");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (err: any) {
      setStatus(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--primary-color)] transition";
  const inputClass2 =
    "w-full bg-[#050505] border border-white/10 rounded-lg px-5 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[var(--primary-color)] transition";

  return (
    <section className="relative min-h-screen text-white px-6 lg:px-24 py-20 overflow-hidden bg-[#050505]">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,94,0,0.12),transparent_55%)]" />

      <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">
        {/* ================= FORM ================= */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-lg p-8 lg:p-10 shadow-2xl">
          <h2 className="text-4xl lg:text-5xl font-semibold">
            Let’s build something{" "}
            <span className="text-[var(--primary-color)]">great</span>
          </h2>

          <p className="text-gray-400 mt-4 text-sm leading-relaxed">
            Have a project in mind? Let’s turn your idea into a high-performance
            digital experience.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className={inputClass}
                required
              />
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={inputClass}
                required
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className={inputClass}
              />
            </div>

            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className={inputClass2}
              required
            >
              <option value="">Select Service</option>
              <option value="Web Development">Web Development</option>
              <option value="UI/UX Design">UI/UX Design</option>
              <option value="SEO Optimization">SEO Optimization</option>
            </select>

            <textarea
              name="message"
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              className={inputClass}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-medium bg-[var(--primary-color)] text-black hover:scale-[1.02] transition"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {status && <p className="text-sm text-gray-300 mt-3">{status}</p>}
          </form>
        </div>

        {/* ================= CONTACT INFO ================= */}
        <div className="flex flex-col justify-center gap-5">
          {[
            { icon: <BiPhone />, label: "Phone", value: "+91 7986515332" },
            {
              icon: <BiEnvelope />,
              label: "Email",
              value: "sk9414681@gmail.com",
            },
            {
              icon: <BiMap />,
              label: "Address",
              value: "Code Corner Tech, Delhi",
            },
            {
              icon: <BiTime />,
              label: "Working Hours",
              value: "Mon–Fri: 9AM–6PM",
            },
            {
              icon: <BiMessageDetail />,
              label: "WhatsApp",
              value: "+91 123456789",
            },
            { icon: <BiGlobe />, label: "Website", value: "www.mywebsite.com" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:scale-[1.02] transition"
            >
              <div className="text-[var(--primary-color)] text-xl">
                {item.icon}
              </div>

              <div>
                <p className="text-xs text-gray-400">{item.label}</p>
                <p className="text-sm font-medium text-white">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
