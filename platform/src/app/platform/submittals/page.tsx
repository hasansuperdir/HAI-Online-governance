"use client";

import { useState } from "react";

/* ─── Submittal Category Structure ─── */
const contractorCategories: Record<string, string[]> = {
  Schedule: [
    "Daily Report",
    "Weekly Report",
    "Monthly Report",
    "Baseline Programme",
    "Extension of Time (EOT)",
  ],
  Engineering: [
    "Shop Drawing",
    "RFI (Request for Information)",
    "MIR (Material Inspection Request)",
    "WIR (Work Inspection Request)",
    "Method Statement",
    "Material Submittal",
    "Sample Submittal",
    "Mock-up",
    "Calculation",
    "Reports",
    "NCR Closure",
    "Snag Closure",
  ],
  Commercial: [
    "Payment Certificate",
    "VO Claim",
    "Final Account Statement",
    "Taking Over Certificate",
    "Performance Certificate",
  ],
  HSE: [
    "HSE Plan",
    "Risk Assessment",
    "Method Statement (HSE)",
    "Incident Report",
    "HSE Inspection Report",
    "Emergency Drill Report",
    "Toolbox Talk Record",
    "Permit to Work",
  ],
};

const consultantCategories: Record<string, string[]> = {
  "Design Review": [
    "Design Review Report",
    "Technical Query Response",
    "Design Change Notice",
    "Value Engineering Proposal",
  ],
  "Site Supervision": [
    "Site Inspection Report",
    "Progress Assessment",
    "Defects Report",
    "Completion Certificate Recommendation",
  ],
  "Commercial Review": [
    "IPC Assessment Report",
    "VO Assessment Report",
    "Claim Review Report",
    "Cost Report",
  ],
  "Quality Review": [
    "Material Approval Review",
    "Shop Drawing Review",
    "ITP Review",
    "NCR Review & Recommendation",
  ],
};

/* ─── Submittal Status Data (mock) ─── */
interface Submittal {
  ref: string;
  title: string;
  rev: string;
  date: string;
  status: string;
  statusColor: string;
  reviewer: string;
}

const submittalData: Record<string, Submittal[]> = {
  "Shop Drawing": [
    { ref: "SD-ARC-001", title: "Ground Floor Plan - Rev D", rev: "D", date: "22 Feb 2026", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "HTCO" },
    { ref: "SD-ARC-002", title: "Typical Floor Plan - Rev C", rev: "C", date: "20 Feb 2026", status: "Approved w/ Comments", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", reviewer: "HTCO" },
    { ref: "SD-STR-001", title: "Foundation Layout - Rev E", rev: "E", date: "18 Feb 2026", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "HTCO" },
    { ref: "SD-MEP-001", title: "HVAC Ductwork L1-L3 - Rev B", rev: "B", date: "25 Feb 2026", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", reviewer: "HTCO" },
    { ref: "SD-MEP-002", title: "Electrical SLD - Rev C", rev: "C", date: "24 Feb 2026", status: "Revise & Resubmit", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", reviewer: "HTCO" },
  ],
  "Daily Report": [
    { ref: "DR-2026-058", title: "Daily Report — 27 Feb 2026", rev: "A", date: "27 Feb 2026", status: "Submitted", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", reviewer: "ER" },
    { ref: "DR-2026-057", title: "Daily Report — 26 Feb 2026", rev: "A", date: "26 Feb 2026", status: "Acknowledged", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "ER" },
    { ref: "DR-2026-056", title: "Daily Report — 25 Feb 2026", rev: "A", date: "25 Feb 2026", status: "Acknowledged", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "ER" },
  ],
  "Method Statement": [
    { ref: "MS-CIV-001", title: "Concrete Pouring — Raft Foundation", rev: "C", date: "15 Feb 2026", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "HTCO" },
    { ref: "MS-CIV-002", title: "Formwork Erection — Columns", rev: "B", date: "18 Feb 2026", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "HTCO" },
    { ref: "MS-MEP-001", title: "Chilled Water Piping Installation", rev: "B", date: "20 Feb 2026", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", reviewer: "HTCO" },
  ],
  "Material Submittal": [
    { ref: "MAT-STR-001", title: "Rebar — Grade 460B", rev: "B", date: "10 Feb 2026", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "HTCO" },
    { ref: "MAT-ARC-001", title: "Facade Aluminum Panels", rev: "C", date: "14 Feb 2026", status: "Approved w/ Comments", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", reviewer: "HTCO" },
    { ref: "MAT-MEP-001", title: "AHU Units — Carrier 39HQ", rev: "A", date: "22 Feb 2026", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", reviewer: "HTCO" },
  ],
  "Payment Certificate": [
    { ref: "IPC-012", title: "IPC #12 — January 2026", rev: "A", date: "15 Feb 2026", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", reviewer: "QS" },
    { ref: "IPC-011", title: "IPC #11 — December 2025", rev: "A", date: "15 Jan 2026", status: "Paid", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "QS" },
  ],
  "RFI (Request for Information)": [
    { ref: "RFI-234", title: "Slab Edge Detail at Grid C-7", rev: "A", date: "25 Feb 2026", status: "Open", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", reviewer: "HTCO" },
    { ref: "RFI-233", title: "Waterproofing Spec Clarification", rev: "A", date: "22 Feb 2026", status: "Responded", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "HTCO" },
  ],
  "Design Review Report": [
    { ref: "DRR-ARC-001", title: "Architecture DD Review — Phase 1", rev: "B", date: "10 Feb 2026", status: "Issued", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", reviewer: "HTCO" },
    { ref: "DRR-STR-001", title: "Structural TD Review — Podium", rev: "A", date: "15 Feb 2026", status: "Draft", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20", reviewer: "HTCO" },
  ],
  "IPC Assessment Report": [
    { ref: "IPC-ASS-012", title: "IPC #12 Assessment", rev: "A", date: "20 Feb 2026", status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", reviewer: "HTCO QS" },
  ],
};

/* Default submittals for categories without specific data */
const defaultSubmittal = (type: string): Submittal[] => [
  { ref: `${type.substring(0, 3).toUpperCase()}-001`, title: `${type} — Pending`, rev: "A", date: "—", status: "No Submittals", statusColor: "text-gray-500 bg-gray-500/10 border-gray-500/20", reviewer: "—" },
];

export default function SubmittalsPage() {
  const [submittalType, setSubmittalType] = useState<"contractor" | "consultant">("contractor");
  const [activeCategory, setActiveCategory] = useState<string>("Schedule");
  const [activeSubType, setActiveSubType] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const categories = submittalType === "contractor" ? contractorCategories : consultantCategories;
  const categoryKeys = Object.keys(categories);
  const subTypes = activeCategory ? categories[activeCategory] || [] : [];
  const currentSubmittals = activeSubType
    ? submittalData[activeSubType] || defaultSubmittal(activeSubType)
    : [];

  // Stats
  const allSubmittals = Object.values(submittalData).flat();
  const totalCount = allSubmittals.length;
  const approvedCount = allSubmittals.filter((s) => s.status.startsWith("Approved") || s.status === "Paid" || s.status === "Acknowledged" || s.status === "Issued" || s.status === "Responded").length;
  const reviewCount = allSubmittals.filter((s) => s.status === "Under Review" || s.status === "In Progress" || s.status === "Draft" || s.status === "Open" || s.status === "Submitted").length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Submittals Management</h1>
        <p className="text-xs text-gray-500 mt-1">Track contractor and consultant submittals across all disciplines</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {[
          { label: "Total Submittals", value: totalCount.toString(), color: "text-blue-400" },
          { label: "Approved / Closed", value: approvedCount.toString(), color: "text-green-400" },
          { label: "Under Review", value: reviewCount.toString(), color: "text-yellow-400" },
          { label: "Rejected / Revise", value: (totalCount - approvedCount - reviewCount).toString(), color: "text-red-400" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Submittal Type Dropdown */}
      <div className="mb-4">
        <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
          Submittal Source
        </label>
        <select
          value={submittalType}
          onChange={(e) => {
            const val = e.target.value as "contractor" | "consultant";
            setSubmittalType(val);
            const newCats = val === "contractor" ? contractorCategories : consultantCategories;
            const firstCat = Object.keys(newCats)[0];
            setActiveCategory(firstCat);
            setActiveSubType("");
          }}
          className="w-full max-w-sm px-4 py-3 bg-hai-navy border border-hai-steel rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
        >
          <option value="contractor">Contractor Submittal</option>
          <option value="consultant">Consultant Submittal</option>
        </select>
      </div>

      {/* Category Tabs */}
      <div className="flex border-b border-hai-steel mb-4">
        {categoryKeys.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setActiveSubType("");
            }}
            className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
              activeCategory === cat
                ? "border-hai-accent text-white"
                : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sub-type buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {subTypes.map((sub) => (
          <button
            key={sub}
            onClick={() => setActiveSubType(activeSubType === sub ? "" : sub)}
            className={`text-xs px-3 py-2 rounded-lg border transition-all ${
              activeSubType === sub
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "bg-hai-navy border-hai-steel text-gray-400 hover:text-gray-200 hover:border-gray-500"
            }`}
          >
            {sub}
          </button>
        ))}
      </div>

      {/* Submittal Table + Detail View */}
      {activeSubType ? (
        <div className="flex gap-4">
          {/* Left: List */}
          <div className={`bg-hai-navy border border-hai-steel rounded-lg p-5 ${selectedItem ? "w-[340px] flex-shrink-0" : "flex-1"}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {activeSubType}
              </div>
              <span className="text-[10px] text-gray-500">
                {currentSubmittals.length} item{currentSubmittals.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="space-y-1">
              {currentSubmittals.map((row) => (
                <button
                  key={row.ref}
                  onClick={() => setSelectedItem(selectedItem === row.ref ? null : row.ref)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all ${
                    selectedItem === row.ref
                      ? "bg-blue-500/10 border-blue-500/30"
                      : "border-transparent hover:bg-hai-primary/30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300 font-medium">{row.title}</span>
                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-[10px] text-blue-400 font-mono">{row.ref}</span>
                    <span className="text-[10px] text-gray-600">{row.date}</span>
                    <span className="text-[10px] text-gray-600">Rev {row.rev}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detail Panel */}
          {selectedItem && (() => {
            const item = currentSubmittals.find((s) => s.ref === selectedItem);
            if (!item) return null;
            const isRFI = activeSubType.includes("RFI");
            const isDailyReport = activeSubType === "Daily Report";

            return (
              <div className="flex-1 bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
                {/* Detail Header */}
                <div className="px-5 py-4 border-b border-hai-steel flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                  <button onClick={() => setSelectedItem(null)} className="text-xs text-gray-500 hover:text-gray-300">Close</button>
                </div>

                {/* Mail-style metadata */}
                <div className="px-5 py-4 border-b border-hai-steel/50 space-y-2">
                  <div className="grid grid-cols-[100px_1fr] gap-y-2 text-xs">
                    <span className="text-gray-500">Mail Type</span>
                    <span className="text-gray-300">{isRFI ? "Request For Information" : isDailyReport ? "Daily Site Report" : activeSubType}</span>
                    <span className="text-gray-500">Reference</span>
                    <span className="text-blue-400 font-mono">{item.ref}</span>
                    <span className="text-gray-500">From</span>
                    <span className="text-gray-300">Contractor — Shelter Engineering</span>
                    <span className="text-gray-500">To</span>
                    <span className="text-gray-300">{item.reviewer} <span className="text-gray-600">(+2 more...)</span></span>
                    <span className="text-gray-500">Sent</span>
                    <span className="text-gray-300">{item.date}</span>
                    <span className="text-gray-500">Respond by</span>
                    <span className="text-orange-400 font-medium">{item.date}</span>
                    <span className="text-gray-500">Status</span>
                    <span><span className={`text-[10px] px-2 py-0.5 rounded border ${item.statusColor}`}>{item.status}</span></span>
                  </div>
                </div>

                {/* Content — depends on type */}
                <div className="px-5 py-4">
                  {isDailyReport ? (
                    /* Daily Report Detail */
                    <div className="space-y-3">
                      {[
                        { title: "Weather (Clear, 34°C)", content: "Clear skies throughout the day. Max temp 34°C, Min 24°C. Humidity 65%. Wind NW 12 km/h. No rain.", icon: "🌤️" },
                        { title: "Workforce (People 1,240, Total Hours 9,920)", content: "Concrete crew: 320 | Steel fixers: 180 | MEP: 240 | Formwork: 200 | General labour: 180 | Supervision: 60 | QA/QC: 30 | HSE: 30", icon: "👷" },
                        { title: "Schedule Delays", content: "Facade delivery delayed by 3 days due to customs clearance. Mitigation: Re-sequencing Level 6-7 interior works to maintain critical path.", icon: "⏰" },
                        { title: "Material Deliveries", content: "• Rebar 32mm — 45 tonnes received (Voucher #DV-2026-089)\n• Ready-mix concrete G40 — 180 m³ delivered\n• MEP ductwork sections — partial delivery (70%)", icon: "🚛" },
                        { title: "Equipment (Quantity 8, Runtime Hours 64)", content: "Tower Crane TC-01: 8h | Tower Crane TC-02: 8h | Concrete Pump: 6h | Excavator: 8h | Mobile Crane: 8h | Telehandler x2: 16h | Generator: 10h", icon: "🏗️" },
                        { title: "General Comments", content: "Concrete pour completed for Level 4 slab Zone B (420 m³). Steel erection progressing on Level 5 columns Grid A-F. MEP rough-in started on Level 3.", icon: "📝" },
                        { title: "Visitors (2)", content: "• Mr. Hasan Molla — Employer Rep — Site walkthrough & progress review\n• Mr. Ahmed Al-Thani — QCDD Inspector — Fire compartmentation inspection", icon: "👤" },
                        { title: "Attachments (3)", content: "📎 site-progress-L4-slab.jpg (1.2 MB)\n📎 concrete-pour-report.pdf (340 KB)\n📎 daily-manpower-log.xlsx (85 KB)", icon: "📎" },
                      ].map((section) => (
                        <details key={section.title} className="group">
                          <summary className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg hover:bg-hai-primary/30 transition-all">
                            <svg className="w-3 h-3 text-gray-500 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-sm mr-1">{section.icon}</span>
                            <span className="text-xs text-gray-300 font-medium">{section.title}</span>
                          </summary>
                          <div className="ml-8 mt-1 px-3 py-2 bg-hai-primary/20 rounded-lg">
                            <pre className="text-[11px] text-gray-400 whitespace-pre-wrap font-sans leading-relaxed">{section.content}</pre>
                          </div>
                        </details>
                      ))}
                    </div>
                  ) : isRFI ? (
                    /* RFI Detail */
                    <div className="space-y-4">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Details</div>
                      <div className="grid grid-cols-[120px_1fr] gap-y-3 text-xs">
                        <span className="text-gray-500">Discipline</span>
                        <span className="text-gray-300">HVAC / MEP</span>
                        <span className="text-gray-500">Question</span>
                        <span className="text-gray-300 leading-relaxed">
                          {item.ref === "RFI-234"
                            ? "At Grid C-7, the slab edge detail shows a 150mm upstand but the architectural drawing shows flush finish. Please clarify the correct detail and confirm if waterproofing is required at this junction."
                            : "Due to space constraints, the condensing unit will need to be moved on the roof. Are there any restrictions for moving this 10m to the east?"}
                        </span>
                        <span className="text-gray-500">Cost Implication?</span>
                        <span className="text-yellow-400">Yes — labour charges</span>
                        <span className="text-gray-500">Schedule Impact?</span>
                        <span className="text-yellow-400">Yes — minimal (1-2 days)</span>
                        <span className="text-gray-500">Priority</span>
                        <span className="text-orange-400">High</span>
                      </div>
                      {/* Response thread */}
                      <div className="mt-4 border-t border-hai-steel/50 pt-4">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-3">Response Thread</div>
                        {item.status === "Responded" || item.status === "Approved" ? (
                          <div className="space-y-3">
                            <div className="bg-hai-primary/30 rounded-lg p-3 border-l-2 border-blue-500">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-blue-400 font-medium">HTCO Design Consultant</span>
                                <span className="text-[10px] text-gray-600">{item.date}</span>
                              </div>
                              <p className="text-xs text-gray-300 leading-relaxed">
                                Confirmed: The upstand should be 150mm as per structural requirements. Waterproofing membrane to be applied. Refer to detail DT-WP-003 Rev B.
                              </p>
                            </div>
                            <div className="bg-hai-primary/30 rounded-lg p-3 border-l-2 border-green-500">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-green-400 font-medium">ER — Project Manager</span>
                                <span className="text-[10px] text-gray-600">{item.date}</span>
                              </div>
                              <p className="text-xs text-gray-300">Endorsed. Contractor to proceed per consultant response.</p>
                            </div>
                          </div>
                        ) : (
                          <div className="text-xs text-gray-600 italic">Awaiting response...</div>
                        )}
                      </div>
                      {/* Attachments */}
                      <div className="mt-3 border-t border-hai-steel/50 pt-3">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Attachments</div>
                        <div className="flex gap-2">
                          <div className="bg-hai-primary/30 border border-hai-steel/50 rounded px-3 py-2 text-[10px] text-gray-400 flex items-center gap-2">
                            <span>📎</span> RFI-sketch.pdf <span className="text-gray-600">240 KB</span>
                          </div>
                          <div className="bg-hai-primary/30 border border-hai-steel/50 rounded px-3 py-2 text-[10px] text-gray-400 flex items-center gap-2">
                            <span>📎</span> site-photo.jpg <span className="text-gray-600">1.1 MB</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Generic submittal detail */
                    <div className="space-y-3">
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Submittal Details</div>
                      <div className="grid grid-cols-[100px_1fr] gap-y-2 text-xs">
                        <span className="text-gray-500">Type</span>
                        <span className="text-gray-300">{activeSubType}</span>
                        <span className="text-gray-500">Discipline</span>
                        <span className="text-gray-300">{item.ref.includes("ARC") ? "Architecture" : item.ref.includes("STR") ? "Structural" : item.ref.includes("MEP") ? "MEP" : "Multi-discipline"}</span>
                        <span className="text-gray-500">Description</span>
                        <span className="text-gray-300 leading-relaxed">{item.title}</span>
                        <span className="text-gray-500">Revision</span>
                        <span className="text-gray-300">Rev {item.rev}</span>
                      </div>
                      <div className="mt-3 border-t border-hai-steel/50 pt-3">
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold mb-2">Attachments</div>
                        <div className="bg-hai-primary/30 border border-hai-steel/50 rounded px-3 py-2 text-[10px] text-gray-400 flex items-center gap-2 w-fit">
                          <span>📎</span> {item.ref}_Rev{item.rev}.pdf <span className="text-gray-600">2.4 MB</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}
        </div>
      ) : (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-12 text-center">
          <div className="text-3xl mb-3">📨</div>
          <h3 className="text-sm font-semibold text-gray-300 mb-1">Select a Submittal Type</h3>
          <p className="text-xs text-gray-500">
            Choose a category above, then select a specific submittal type to view the register
          </p>
        </div>
      )}
    </div>
  );
}
