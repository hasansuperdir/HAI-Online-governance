import Link from "next/link";

export default function AboutPage() {
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
            <Link href="/about" className="text-sm font-medium text-hai-accent">About</Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-hai-accent">Contact</Link>
            <Link href="/platform/dashboard" className="bg-hai-accent text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-hai-accent-dark transition-colors">
              Launch Platform
            </Link>
          </div>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-hai-primary to-hai-blue text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-hai-accent font-semibold text-sm tracking-widest uppercase mb-4">About HAI</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">The Employer&apos;s Governance Partner</h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            We exist for one reason: to protect the owner&apos;s commercial position and
            deliver certainty across complex construction projects.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-hai-primary mb-6">Who We Are</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  HAI Group is a specialist employer representative and project governance
                  consultancy based in Doha, Qatar. We work exclusively on the employer&apos;s
                  side, providing programme management, contract administration, and digital
                  governance services.
                </p>
                <p>
                  Our team combines deep expertise in FIDIC contract administration, RIBA
                  project lifecycle management, and Qatar&apos;s regulatory environment (QCS 2014,
                  QCDD, Kahramaa, Ashghal, GSAS).
                </p>
                <p>
                  We developed <strong>SkyStruct</strong> — a proprietary governance platform
                  that digitises and automates 23 project management workflows, providing
                  real-time visibility and predictive intelligence across the project portfolio.
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-hai-primary mb-6">Our Approach</h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Governance First",
                    desc: "Every decision is framed through governance controls — stage gates, freeze mechanisms, and approval chains.",
                  },
                  {
                    title: "Contractual Rigour",
                    desc: "We track every FIDIC notice, deadline, and determination. Nothing falls through the cracks.",
                  },
                  {
                    title: "Data-Driven",
                    desc: "SkyStruct provides real-time KPIs, trend analysis, and predictive risk scoring across the portfolio.",
                  },
                  {
                    title: "Employer-Side Only",
                    desc: "We work exclusively for the owner. No conflicts of interest. Your commercial position is our priority.",
                  },
                ].map((item) => (
                  <div key={item.title} className="border-l-4 border-hai-accent pl-4">
                    <h3 className="font-bold text-hai-primary">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-hai-primary text-center mb-12">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "FIDIC 2017", detail: "Red & Yellow Book" },
              { label: "RIBA PoW", detail: "Stages 0–8" },
              { label: "QCS 2014", detail: "Qatar Construction" },
              { label: "GSAS", detail: "Sustainability" },
              { label: "QCDD", detail: "Civil Defence" },
              { label: "Kahramaa", detail: "Utilities" },
              { label: "Ashghal", detail: "Infrastructure" },
              { label: "ERP Integration", detail: "Artan Platform" },
            ].map((c) => (
              <div key={c.label} className="bg-white p-5 rounded-lg border border-gray-200 text-center hover:border-hai-accent transition-colors">
                <div className="font-bold text-hai-primary">{c.label}</div>
                <div className="text-xs text-gray-500 mt-1">{c.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
