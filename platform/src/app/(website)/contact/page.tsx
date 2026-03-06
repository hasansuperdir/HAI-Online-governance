"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-hai-primary">HAI</span>
            <span className="text-hai-accent"> Group</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-hai-accent">Home</Link>
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-hai-accent">Services</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-hai-accent">About</Link>
            <Link href="/contact" className="text-sm font-medium text-hai-accent">Contact</Link>
            <Link href="/platform/dashboard" className="bg-hai-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-hai-accent-dark transition-colors">
              Launch Platform
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-hai-primary to-hai-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-hai-accent font-semibold text-sm tracking-widest uppercase mb-4">Contact</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-300">Let&apos;s discuss how HAI can protect your project investment.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-hai-primary mb-8">Send Us a Message</h2>
            {submitted ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-green-700 mb-2">Message Sent</h3>
                <p className="text-green-600">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-hai-accent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      required
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-hai-accent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-hai-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-hai-accent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interest</label>
                  <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-hai-accent">
                    <option>Programme Governance</option>
                    <option>Contract Administration</option>
                    <option>SkyStruct Platform</option>
                    <option>Cost Control</option>
                    <option>Quality & HSE</option>
                    <option>General Enquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-hai-accent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-hai-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-hai-accent-dark transition-colors w-full"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-hai-primary mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-hai-accent/10 rounded-lg flex items-center justify-center text-hai-accent font-bold flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <div className="font-semibold text-hai-primary">Office</div>
                    <div className="text-sm text-gray-600">Doha, Qatar</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-hai-accent/10 rounded-lg flex items-center justify-center text-hai-accent font-bold flex-shrink-0">
                    ✉️
                  </div>
                  <div>
                    <div className="font-semibold text-hai-primary">Email</div>
                    <div className="text-sm text-gray-600">info@haigroup.qa</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-hai-primary rounded-xl p-8 text-white">
              <h3 className="font-bold text-lg mb-4">Why HAI?</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-2"><span className="text-hai-accent">✓</span> Employer-side only — no conflicts of interest</li>
                <li className="flex gap-2"><span className="text-hai-accent">✓</span> FIDIC 2017 specialist contract administration</li>
                <li className="flex gap-2"><span className="text-hai-accent">✓</span> Proprietary SkyStruct governance platform</li>
                <li className="flex gap-2"><span className="text-hai-accent">✓</span> Qatar regulatory expertise (QCS, QCDD, GSAS)</li>
                <li className="flex gap-2"><span className="text-hai-accent">✓</span> AI-powered predictive analytics</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
