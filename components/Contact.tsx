"use client";
import { useState } from "react";
import SectionHead from "./SectionHead";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) { setStatus("sent"); form.reset(); }
    else setStatus("error");
    setTimeout(() => setStatus("idle"), 5000);
  }

  const fields = [
    { label: "01 / Name",    name: "name",    type: "text",  placeholder: "Your name",       required: true },
    { label: "02 / Email",   name: "email",   type: "email", placeholder: "you@company.com", required: true },
    { label: "03 / Company", name: "company", type: "text",  placeholder: "Where you work",  required: false },
  ];

  return (
    <section id="contact" className="section-pad bg-ink text-paper px-6 md:px-8">
      <SectionHead num="/07" label="Let's build — Get in touch" right="Reply within 24h" light />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

        {/* Left col */}
        <div>
          <h2
            className="contact-heading reveal uppercase mb-10"
            style={{ fontFamily: "var(--font-display)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
          >
            GOT{" "}
            <span style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontWeight: 300, textTransform: "lowercase", letterSpacing: "-0.02em" }}>a serious</span>
            <br />
            <span className="text-accent">PROBLEM</span> TO BUILD?
          </h2>
          <div className="uppercase tracking-[0.1em] leading-loose text-[12px]" style={{ fontFamily: "var(--font-mono)" }}>
            <div className="mb-6">
              <div className="opacity-50 text-[10px]">Email</div>
              <a href="mailto:hello@crudstudio.com" data-hover className="border-b border-transparent hover:border-accent hover:text-accent transition-colors">
                hello@crudstudio.com
              </a>
            </div>
            <div className="mb-6">
              <div className="opacity-50 text-[10px]">Studio</div>
              <span>Remote — India · GMT+5:30</span>
            </div>
            <div className="mb-6">
              <div className="opacity-50 text-[10px]">Elsewhere</div>
              <a href="#" data-hover className="hover:text-accent transition-colors">LinkedIn</a>
              {" · "}
              <a href="#" data-hover className="hover:text-accent transition-colors">GitHub</a>
              {" · "}
              <a href="#" data-hover className="hover:text-accent transition-colors">Instagram</a>
            </div>
          </div>
        </div>

        {/* Right col — form */}
        <form onSubmit={onSubmit} className="flex flex-col">
          {fields.map((f) => (
            <div key={f.name} className="form-field border-b border-paper py-5">
              <label className="form-label block mb-2.5 text-[11px] uppercase tracking-[0.15em] opacity-50 transition-colors duration-200" style={{ fontFamily: "var(--font-mono)" }}>
                {f.label}
              </label>
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                required={f.required}
                className="w-full bg-transparent border-0 text-paper outline-none italic font-light placeholder:opacity-30 transition-opacity"
                style={{ fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em" }}
              />
            </div>
          ))}

          <div className="form-field border-b border-paper py-5">
            <label className="form-label block mb-2.5 text-[11px] uppercase tracking-[0.15em] opacity-50 transition-colors duration-200" style={{ fontFamily: "var(--font-mono)" }}>
              04 / What do you need?
            </label>
            <select
              name="projectType"
              required
              data-hover
              className="w-full bg-transparent border-0 text-paper outline-none italic font-light pr-6 appearance-none transition-opacity"
              style={{ fontFamily: "var(--font-serif)", fontSize: 22 }}
            >
              <option value="">— Select an option —</option>
              <option>Web app / platform</option>
              <option>Mobile app</option>
              <option>SaaS product</option>
              <option>Admin panel / dashboard</option>
              <option>CRM system</option>
              <option>Something else</option>
            </select>
          </div>

          <div className="form-field border-b border-paper py-5">
            <label className="form-label block mb-2.5 text-[11px] uppercase tracking-[0.15em] opacity-50 transition-colors duration-200" style={{ fontFamily: "var(--font-mono)" }}>
              05 / Budget range
            </label>
            <select
              name="budget"
              data-hover
              className="w-full bg-transparent border-0 text-paper outline-none italic font-light pr-6 appearance-none"
              style={{ fontFamily: "var(--font-serif)", fontSize: 22 }}
            >
              <option value="">— Pick a range —</option>
              <option>Under ₹2L / $2K</option>
              <option>₹2L – ₹5L / $2K – $6K</option>
              <option>₹5L – ₹15L / $6K – $18K</option>
              <option>₹15L+ / $18K+</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div className="form-field border-b border-paper py-5">
            <label className="form-label block mb-2.5 text-[11px] uppercase tracking-[0.15em] opacity-50 transition-colors duration-200" style={{ fontFamily: "var(--font-mono)" }}>
              06 / Tell us about it
            </label>
            <textarea
              name="message"
              required
              placeholder="The problem, the users, the timeline — anything that helps."
              rows={3}
              className="w-full bg-transparent border-0 text-paper outline-none italic font-light resize-y min-h-[80px] placeholder:opacity-30"
              style={{ fontFamily: "var(--font-serif)", fontSize: 22, letterSpacing: "-0.01em" }}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            data-hover
            disabled={status === "sending"}
            className="group relative overflow-hidden mt-8 self-start px-12 py-5 border-[1.5px] border-paper bg-transparent text-paper uppercase tracking-[0.15em] text-[13px] transition-opacity disabled:opacity-60"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)]" />
            <span className="relative z-10 group-hover:text-ink transition-colors flex items-center gap-2.5">
              {status === "sending" && <span className="spinner" />}
              {status === "sending" && "Sending"}
              {status === "sent"    && "Sent ✓ — we'll reply within 24h"}
              {status === "error"   && "Error — try again"}
              {status === "idle"    && "Send brief →"}
            </span>
          </button>
        </form>
      </div>
    </section>
  );
}
