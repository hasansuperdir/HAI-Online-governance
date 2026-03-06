"use client";

import { useState } from "react";

const documents = [
  { ref: "DWG-A-301-C", title: "Ground Floor Plan Rev C", discipline: "Architectural", type: "Drawing", status: "APP", reviewer: "Design Mgr", date: "2026-03-04" },
  { ref: "DWG-S-102-B", title: "Foundation Detail Sheet 2", discipline: "Structural", type: "Drawing", status: "Under Review", reviewer: "QS Lead", date: "2026-03-05" },
  { ref: "SPEC-M-010-A", title: "HVAC Specification", discipline: "MEP-Mechanical", type: "Specification", status: "APP-COM", reviewer: "MEP Lead", date: "2026-03-03" },
  { ref: "RPT-C-005-A", title: "Soil Investigation Report", discipline: "Civil", type: "Report", status: "APP", reviewer: "PM", date: "2026-02-28" },
  { ref: "MS-C03-R2", title: "Concrete Works Method Statement", discipline: "Structural", type: "Method Statement", status: "REJ", reviewer: "QA Manager", date: "2026-03-05" },
  { ref: "DWG-E-201-A", title: "Electrical SLD Main Panel", discipline: "MEP-Electrical", type: "Drawing", status: "Submitted", reviewer: "—", date: "2026-03-06" },
  { ref: "CALC-S-008-B", title: "Beam Load Calculation", discipline: "Structural", type: "Calculation", status: "Under Review", reviewer: "Struct Lead", date: "2026-03-04" },
  { ref: "SUB-F-012-A", title: "Fire Strategy Report", discipline: "Fire", type: "Submittal", status: "APP", reviewer: "Fire Eng", date: "2026-03-01" },
  { ref: "DWG-I-105-A", title: "Interior Finishes Level 3", discipline: "Interior", type: "Drawing", status: "Under Review", reviewer: "Design Mgr", date: "2026-03-05" },
  { ref: "ASBU-A-401-A", title: "As-Built Ground Floor", discipline: "Architectural", type: "As-Built", status: "Draft", reviewer: "—", date: "2026-03-06" },
];

const statusColors: Record<string, string> = {
  APP: "bg-green-500/10 text-green-400 border-green-500/20",
  "APP-COM": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Under Review": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  REJ: "bg-red-500/10 text-red-400 border-red-500/20",
  Submitted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  Draft: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  INFO: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

export default function DocumentsPage() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Drawing", "Specification", "Report", "Method Statement", "Submittal", "As-Built"];

  const filtered = filter === "All" ? documents : documents.filter((d) => d.type === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Document Control</h1>
          <p className="text-xs text-gray-500 mt-1">Track submittals, reviews, and approvals across all disciplines</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + New Submittal
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Documents", value: "2,341", color: "text-blue-400" },
          { label: "Approved", value: "1,847", color: "text-green-400" },
          { label: "Under Review", value: "312", color: "text-yellow-400" },
          { label: "Rejected", value: "40", color: "text-red-400" },
          { label: "On-Time Rate", value: "89%", color: "text-green-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-3 py-1.5 rounded border transition-colors ${
              filter === f
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "border-hai-steel text-gray-500 hover:border-blue-500/20"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
              <th className="text-left px-4 py-3">Reference</th>
              <th className="text-left px-4 py-3">Title</th>
              <th className="text-left px-4 py-3">Discipline</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Reviewer</th>
              <th className="text-left px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((d) => (
              <tr key={d.ref} className="text-xs border-b border-hai-primary/50 hover:bg-hai-primary/30 cursor-pointer transition-colors">
                <td className="px-4 py-3 font-mono text-blue-400">{d.ref}</td>
                <td className="px-4 py-3 text-gray-200">{d.title}</td>
                <td className="px-4 py-3 text-gray-400">{d.discipline}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {d.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-[10px] border ${statusColors[d.status] || ""}`}>
                    {d.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400">{d.reviewer}</td>
                <td className="px-4 py-3 text-gray-500">{d.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
