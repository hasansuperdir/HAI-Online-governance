import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Top Bar */}
      <div className="bg-hai-primary text-white text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span>Delivering Certainty Across Complex Projects</span>
          <div className="flex gap-5">
            <Link href="/contact" className="hover:text-hai-accent transition-colors">Contact</Link>
            <Link href="/platform/dashboard" className="hover:text-hai-accent transition-colors font-semibold">
              SkyStruct Platform →
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-hai-primary">HAI</span>
            <span className="text-hai-accent"> Group</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-hai-accent transition-colors">Home</Link>
            <Link href="/services" className="text-sm font-medium text-gray-700 hover:text-hai-accent transition-colors">Services</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-hai-accent transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-hai-accent transition-colors">Contact</Link>
            <Link
              href="/platform/dashboard"
              className="bg-hai-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-hai-accent-dark transition-colors"
            >
              Launch Platform
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-hai-primary via-hai-blue to-hai-primary text-white py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-hai-accent font-semibold text-sm tracking-widest uppercase mb-4">
              Employer Representative & Governance Partner
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
              Governance That<br />
              <span className="text-hai-accent">Protects Your Investment</span>
            </h1>
            <p className="text-lg text-gray-300 mb-10 leading-relaxed">
              HAI strengthens project governance, controls commercial risk, and ensures
              contractual compliance across the full project lifecycle — from brief
              to handover.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/services"
                className="bg-hai-accent text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-hai-accent-dark transition-all hover:shadow-lg"
              >
                Our Services
              </Link>
              <Link
                href="/platform/dashboard"
                className="border-2 border-white/30 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-white/10 transition-all"
              >
                Explore SkyStruct →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: "QAR 12B+", label: "Portfolio Value Under Governance" },
            { num: "23", label: "Active Process Flows" },
            { num: "27", label: "Data Entities Managed" },
            { num: "100%", label: "FIDIC & QCS Compliance" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-hai-primary">{s.num}</div>
              <div className="text-sm text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-hai-accent font-semibold text-sm tracking-widest uppercase mb-3">What We Do</p>
            <h2 className="text-3xl font-bold text-hai-primary">End-to-End Governance Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Programme Governance",
                desc: "RIBA-aligned stage gates, freeze mechanisms, and approval chains that protect scope, budget, and schedule.",
                icon: "🏗️",
              },
              {
                title: "Contract Administration",
                desc: "FIDIC 2017 compliance, variation management, IPC processing, and claim defence with full audit trails.",
                icon: "📋",
              },
              {
                title: "Digital Platform (SkyStruct)",
                desc: "Cloud governance platform with 23 automated workflows, real-time dashboards, and ERP integration.",
                icon: "💻",
              },
              {
                title: "Cost & Financial Control",
                desc: "Budget baseline tracking, payment certification, cash flow forecasting, and commercial risk management.",
                icon: "📊",
              },
              {
                title: "Quality & HSE Oversight",
                desc: "ITP management, NCR tracking, inspection workflows, and HSE compliance monitoring with KPI scoring.",
                icon: "✅",
              },
              {
                title: "Authority & Regulatory",
                desc: "QCDD, Kahramaa, Ashghal, Civil Defence, and GSAS submission tracking with deadline management.",
                icon: "🏛️",
              },
            ].map((svc) => (
              <div
                key={svc.title}
                className="bg-white p-8 rounded-xl border border-gray-200 hover:border-hai-accent hover:shadow-lg transition-all group"
              >
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className="text-lg font-bold text-hai-primary mb-3 group-hover:text-hai-accent transition-colors">
                  {svc.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SkyStruct Platform Section */}
      <section className="py-20 bg-hai-primary text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-hai-accent font-semibold text-sm tracking-widest uppercase mb-4">
                SkyStruct Platform
              </p>
              <h2 className="text-3xl font-bold mb-6">
                Governance Intelligence,<br />Delivered Digitally
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                SkyStruct is HAI&apos;s proprietary governance platform. It automates
                23 process flows, tracks 27 data entities, and provides real-time
                KPI dashboards with predictive analytics.
              </p>
              <div className="space-y-4">
                {[
                  "Stage-gate lifecycle management (RIBA 0-8)",
                  "Document control with multi-reviewer approval loops",
                  "FIDIC-compliant variation & claim workflows",
                  "Artan ERP bidirectional sync",
                  "AI-powered predictive analytics & risk scoring",
                  "Role-based dashboards (ER, PM, QS, Contractor)",
                ].map((f) => (
                  <div key={f} className="flex items-start gap-3">
                    <span className="text-hai-accent font-bold mt-0.5">✓</span>
                    <span className="text-sm text-gray-300">{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/platform/dashboard"
                className="inline-block mt-8 bg-hai-accent text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-hai-accent-dark transition-all"
              >
                Launch SkyStruct →
              </Link>
            </div>
            <div className="bg-hai-navy rounded-2xl p-8 border border-hai-steel">
              <div className="text-xs text-gray-400 mb-6 uppercase tracking-wider font-semibold">
                Platform Metrics (Live)
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Active Projects", value: "8", color: "text-blue-400" },
                  { label: "Open Approvals", value: "47", color: "text-yellow-400" },
                  { label: "Documents Tracked", value: "2,341", color: "text-green-400" },
                  { label: "Stage Gate Compliance", value: "94%", color: "text-green-400" },
                  { label: "Open Variations", value: "23", color: "text-orange-400" },
                  { label: "IPC Pipeline", value: "QAR 48M", color: "text-blue-400" },
                  { label: "NCRs Open", value: "12", color: "text-red-400" },
                  { label: "ERP Sync Status", value: "Live", color: "text-green-400" },
                ].map((m) => (
                  <div
                    key={m.label}
                    className="bg-hai-primary/50 rounded-lg p-4 border border-hai-steel hover:border-blue-500/50 transition-colors"
                  >
                    <div className={`text-2xl font-bold ${m.color}`}>{m.value}</div>
                    <div className="text-xs text-gray-500 mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Lifecycle */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-hai-accent font-semibold text-sm tracking-widest uppercase mb-3">
              Methodology
            </p>
            <h2 className="text-3xl font-bold text-hai-primary">RIBA Stage-Gate Lifecycle</h2>
            <p className="text-gray-500 mt-3">Full governance coverage from Brief to In Use</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { stage: "0", name: "Brief", phase: "Ph1" },
              { stage: "1", name: "Concept", phase: "Ph1" },
              { stage: "2", name: "Developed Design", phase: "Ph2" },
              { stage: "3", name: "Technical Design", phase: "Ph2" },
              { stage: "4", name: "Production Info", phase: "Ph2" },
              { stage: "5", name: "Tender", phase: "Ph2" },
              { stage: "6", name: "Construction", phase: "Ph3" },
              { stage: "7", name: "Handover", phase: "Ph4" },
              { stage: "8", name: "In Use", phase: "Ph4" },
            ].map((s) => (
              <div
                key={s.stage}
                className="flex flex-col items-center bg-gray-50 border border-gray-200 rounded-xl px-5 py-4 min-w-[120px] hover:border-hai-accent hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-hai-primary text-white flex items-center justify-center font-bold text-sm mb-2">
                  {s.stage}
                </div>
                <div className="text-sm font-semibold text-hai-primary text-center">{s.name}</div>
                <div className="text-xs text-gray-400 mt-1">{s.phase}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-hai-accent to-hai-accent-dark text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Strengthen Your Project Governance?</h2>
          <p className="text-lg opacity-90 mb-8">
            Let us show you how HAI and SkyStruct can protect your investment.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-hai-accent px-10 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all"
          >
            Get in Touch
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-hai-primary text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold text-white mb-4">
              HAI <span className="text-hai-accent">Group</span>
            </div>
            <p className="text-sm leading-relaxed">
              Employer representative and project governance consultancy. Delivering
              certainty across complex projects.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <div className="space-y-2 text-sm">
              <div>Programme Governance</div>
              <div>Contract Administration</div>
              <div>Cost Control</div>
              <div>Quality & HSE</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Platform</h4>
            <div className="space-y-2 text-sm">
              <div>SkyStruct Overview</div>
              <div>Dashboard & Analytics</div>
              <div>ERP Integration</div>
              <div>AI Tools</div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm">
              <div>Doha, Qatar</div>
              <div>info@haigroup.qa</div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-gray-700 text-xs text-center">
          © 2026 HAI Group. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
