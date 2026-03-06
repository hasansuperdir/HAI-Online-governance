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

      {/* Submittal Table */}
      {activeSubType ? (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              {activeSubType} — Submittal Register
            </div>
            <span className="text-[10px] text-gray-500">
              {currentSubmittals.length} item{currentSubmittals.length !== 1 ? "s" : ""}
            </span>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Ref</th>
                <th className="text-left pb-2">Title</th>
                <th className="text-left pb-2">Rev</th>
                <th className="text-left pb-2">Date</th>
                <th className="text-left pb-2">Reviewer</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentSubmittals.map((row) => (
                <tr key={row.ref} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-blue-400 font-medium font-mono">{row.ref}</td>
                  <td className="py-3 text-gray-300">{row.title}</td>
                  <td className="py-3 text-gray-400">{row.rev}</td>
                  <td className="py-3 text-gray-400">{row.date}</td>
                  <td className="py-3 text-gray-400">{row.reviewer}</td>
                  <td className="py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
