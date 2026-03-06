import Link from "next/link";

const services = [
  {
    id: "governance",
    title: "Programme Governance",
    subtitle: "RIBA Stage-Gate Lifecycle Management",
    desc: "We implement a rigorous stage-gate framework aligned with RIBA Plan of Work, tailored for Qatar's regulatory environment. Each project phase has defined entry/exit criteria, freeze mechanisms, and approval chains.",
    features: [
      "RIBA Stages 0–8 with customised gate checklists",
      "Budget, Design, Scope & Regulatory freeze controls",
      "Exception management with CEO/ExCom approval chains",
      "Portfolio-level stage compliance dashboards",
      "GSAS sustainability checkpoint integration",
    ],
  },
  {
    id: "contracts",
    title: "Contract Administration",
    subtitle: "FIDIC 2017 Compliance & Commercial Defence",
    desc: "Full contract lifecycle management from award through final account. Every notice, determination, and time-bar is tracked against FIDIC contractual deadlines.",
    features: [
      "FIDIC clause-to-workflow mapping (Red & Yellow Book)",
      "Variation assessment with time & cost impact analysis",
      "Claim submission and defence with evidence chains",
      "Extension of Time (EOT) processing",
      "Contract duration matrix with deadline alerts",
      "Dispute notice management and escalation tracking",
    ],
  },
  {
    id: "cost",
    title: "Cost & Financial Control",
    subtitle: "Budget Protection & Payment Certification",
    desc: "End-to-end financial governance from budget baseline through final payment. Multi-stage IPC certification with ERP integration ensures payment accuracy.",
    features: [
      "Budget baseline tracking with freeze controls",
      "IPC multi-stage certification (QS → PM → Finance → Approval)",
      "Cash flow forecasting and S-curve monitoring",
      "Artan ERP bidirectional sync for PO, IPC, and Actuals",
      "Daywork sheet verification",
      "Bond and retention release management",
    ],
  },
  {
    id: "quality",
    title: "Quality & HSE Oversight",
    subtitle: "QCS 2014 Compliant Quality Management",
    desc: "Comprehensive quality assurance and health/safety/environmental management with inspection tracking, NCR workflows, and contractor performance scoring.",
    features: [
      "Inspection Test Plans (ITP) with hold/witness points",
      "Non-Conformance Report (NCR) corrective action tracking",
      "Material inspection and concrete test management",
      "HSE incident reporting and near-miss tracking",
      "Permit to Work management",
      "Contractor performance scorecards",
    ],
  },
  {
    id: "authority",
    title: "Authority & Regulatory",
    subtitle: "Qatar Authority Submission Tracking",
    desc: "Centralised tracking of all authority submissions across QCDD, Kahramaa, Ashghal, Civil Defence, and GSAS with deadline management and status monitoring.",
    features: [
      "QCDD Design Certificate (DC1, DC2, BCC) tracking",
      "Kahramaa load application management",
      "Ashghal infrastructure NOC tracking",
      "Civil Defence fire strategy approvals",
      "GSAS sustainability certification (10 checkpoints)",
      "Municipality coordination",
    ],
  },
  {
    id: "platform",
    title: "SkyStruct Digital Platform",
    subtitle: "AI-Powered Governance Intelligence",
    desc: "Our proprietary cloud platform automates 23 governance workflows, provides real-time dashboards, and uses predictive analytics to identify risks before they materialise.",
    features: [
      "23 automated process flows with SLA tracking",
      "27 integrated data entities with full audit trail",
      "Role-based dashboards (ER, PM, QS, Contractor, Consultant)",
      "AI-powered document classification and risk scoring",
      "Predictive analytics for cost and schedule deviation",
      "ERP integration with conflict resolution",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-hai-primary">HAI</span>
            <span className="text-hai-accent"> Group</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-hai-accent">Home</Link>
            <Link href="/services" className="text-sm font-medium text-hai-accent">Services</Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-hai-accent">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-hai-accent">Contact</Link>
            <Link href="/platform/dashboard" className="bg-hai-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-hai-accent-dark transition-colors">
              Launch Platform
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-br from-hai-primary to-hai-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-hai-accent font-semibold text-sm tracking-widest uppercase mb-4">Our Services</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Comprehensive Governance Solutions</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            From programme management to digital platform delivery — we cover every aspect
            of project governance for the employer.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          {services.map((svc, i) => (
            <div
              key={svc.id}
              id={svc.id}
              className={`grid md:grid-cols-2 gap-12 items-start ${i % 2 === 1 ? "md:direction-rtl" : ""}`}
            >
              <div>
                <p className="text-hai-accent font-semibold text-xs tracking-widest uppercase mb-2">
                  {svc.subtitle}
                </p>
                <h2 className="text-2xl font-bold text-hai-primary mb-4">{svc.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{svc.desc}</p>
                <ul className="space-y-3">
                  {svc.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-700">
                      <span className="text-hai-accent font-bold mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-8 flex items-center justify-center min-h-[250px]">
                <div className="text-center text-gray-400">
                  <div className="text-5xl mb-3">
                    {["🏗️", "📋", "📊", "✅", "🏛️", "💻"][i]}
                  </div>
                  <div className="text-sm font-medium">{svc.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-hai-primary text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Need a Tailored Solution?</h2>
        <p className="text-gray-300 mb-8">Every project is different. Let&apos;s discuss how HAI can strengthen your governance.</p>
        <Link href="/contact" className="inline-block bg-hai-accent text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-hai-accent-dark transition-all">
          Contact Us
        </Link>
      </section>
    </div>
  );
}
