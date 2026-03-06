"use client";

import { useState } from "react";

const tabs = ["Models", "Clashes", "Coordination Log"];

interface Model {
  id: string;
  name: string;
  discipline: string;
  format: string;
  version: string;
  author: string;
  size: string;
  date: string;
  status: string;
  statusColor: string;
}

const models: Model[] = [
  { id: "MDL-001", name: "CUQ — Architectural Model", discipline: "Architectural", format: "IFC 4.0", version: "v12", author: "HTCO", size: "245 MB", date: "05 Mar 2026", status: "Current", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "MDL-002", name: "CUQ — Structural Model", discipline: "Structural", format: "IFC 4.0", version: "v9", author: "HTCO", size: "180 MB", date: "04 Mar 2026", status: "Current", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "MDL-003", name: "CUQ — MEP Mechanical Model", discipline: "MEP-Mechanical", format: "IFC 4.0", version: "v8", author: "HTCO", size: "312 MB", date: "03 Mar 2026", status: "Current", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "MDL-004", name: "CUQ — MEP Electrical Model", discipline: "MEP-Electrical", format: "IFC 4.0", version: "v7", author: "HTCO", size: "156 MB", date: "03 Mar 2026", status: "Current", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "MDL-005", name: "CUQ — MEP Plumbing & Fire", discipline: "MEP-Plumbing", format: "IFC 4.0", version: "v6", author: "HTCO", size: "98 MB", date: "01 Mar 2026", status: "Current", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "MDL-006", name: "CUQ — Facade Model", discipline: "Facade", format: "IFC 4.0", version: "v4", author: "Al Khaleej", size: "67 MB", date: "28 Feb 2026", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { id: "MDL-007", name: "CUQ — Federated Model (All Disciplines)", discipline: "Federated", format: "IFC 4.0", version: "v5", author: "HTCO", size: "1.2 GB", date: "05 Mar 2026", status: "Current", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "MDL-008", name: "CUQ — Interior Fit-out Model", discipline: "Interior", format: "RVT", version: "v2", author: "Desert Interiors", size: "89 MB", date: "25 Feb 2026", status: "Preliminary", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
];

interface Clash {
  id: string;
  type: string;
  modelA: string;
  modelB: string;
  zone: string;
  level: string;
  description: string;
  severity: string;
  severityColor: string;
  assignedTo: string;
  status: string;
  statusColor: string;
  date: string;
}

const clashes: Clash[] = [
  { id: "CLH-001", type: "Hard Clash", modelA: "Structural", modelB: "MEP-Mechanical", zone: "Zone B", level: "Level 6", description: "Duct penetration through primary beam B6-12 — insufficient clearance", severity: "Critical", severityColor: "text-red-400 bg-red-500/10 border-red-500/20", assignedTo: "HTCO", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", date: "05 Mar 2026" },
  { id: "CLH-002", type: "Hard Clash", modelA: "MEP-Electrical", modelB: "MEP-Plumbing", zone: "Zone A", level: "Level 4", description: "Cable tray routing conflicts with drainage pipe in ceiling void", severity: "Major", severityColor: "text-orange-400 bg-orange-500/10 border-orange-500/20", assignedTo: "Gulf MEP", status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", date: "04 Mar 2026" },
  { id: "CLH-003", type: "Soft Clash", modelA: "Architectural", modelB: "MEP-Mechanical", zone: "Zone C", level: "Level 3", description: "FCU clearance below ceiling — 50mm shortfall for maintenance access", severity: "Minor", severityColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", assignedTo: "HTCO", status: "Resolved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", date: "03 Mar 2026" },
  { id: "CLH-004", type: "Hard Clash", modelA: "Structural", modelB: "MEP-Plumbing", zone: "Zone A", level: "Basement 1", description: "Storm water pipe routing through pile cap PC-A12", severity: "Critical", severityColor: "text-red-400 bg-red-500/10 border-red-500/20", assignedTo: "HTCO", status: "Resolved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", date: "01 Mar 2026" },
  { id: "CLH-005", type: "Soft Clash", modelA: "Facade", modelB: "MEP-Mechanical", zone: "Zone B", level: "Level 8", description: "Fresh air intake louvre conflicts with facade panel joint", severity: "Major", severityColor: "text-orange-400 bg-orange-500/10 border-orange-500/20", assignedTo: "Al Khaleej", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", date: "05 Mar 2026" },
  { id: "CLH-006", type: "4D Clash", modelA: "Structural", modelB: "Facade", zone: "Zone A", level: "Level 10-12", description: "Facade installation sequence conflicts with structural slab pour schedule", severity: "Major", severityColor: "text-orange-400 bg-orange-500/10 border-orange-500/20", assignedTo: "Shelter Eng", status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", date: "04 Mar 2026" },
];

const coordinationLog = [
  { ref: "BCF-2026-034", subject: "Level 6 MEP Coordination — Beam Clash Resolution", disciplines: ["Structural", "MEP-Mechanical"], raised: "05 Mar 2026", resolution: "Pending", resDate: "—" },
  { ref: "BCF-2026-033", subject: "Facade/MEP Integration — Air Intake Levels 7-9", disciplines: ["Facade", "MEP-Mechanical"], raised: "04 Mar 2026", resolution: "Pending", resDate: "—" },
  { ref: "BCF-2026-032", subject: "Basement Drainage Rerouting Around Pile Caps", disciplines: ["Structural", "MEP-Plumbing"], raised: "01 Mar 2026", resolution: "Resolved — pipe rerouted", resDate: "03 Mar 2026" },
  { ref: "BCF-2026-031", subject: "Level 3 Ceiling Void Coordination — All MEP Services", disciplines: ["Architectural", "MEP-All"], raised: "28 Feb 2026", resolution: "Resolved — ceiling dropped 75mm", resDate: "02 Mar 2026" },
  { ref: "BCF-2026-030", subject: "Fire Riser Shaft Coordination — All Levels", disciplines: ["Fire", "MEP-Electrical", "MEP-Plumbing"], raised: "25 Feb 2026", resolution: "Resolved — shaft enlarged per DCN", resDate: "28 Feb 2026" },
];

export default function BIMPage() {
  const [activeTab, setActiveTab] = useState("Models");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">BIM & Model Coordination</h1>
          <p className="text-xs text-gray-500 mt-1">3D model management, clash detection, and design coordination</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Upload Model
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Models", value: models.length.toString(), color: "text-blue-400" },
          { label: "Total Clashes", value: clashes.length.toString(), color: "text-yellow-400" },
          { label: "Open Clashes", value: clashes.filter((c) => c.status === "Open").length.toString(), color: "text-red-400" },
          { label: "In Progress", value: clashes.filter((c) => c.status === "In Progress").length.toString(), color: "text-yellow-400" },
          { label: "Resolved", value: clashes.filter((c) => c.status === "Resolved").length.toString(), color: "text-green-400" },
          { label: "Federated Size", value: "1.2 GB", color: "text-purple-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-hai-steel mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab ? "border-hai-accent text-white" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Models */}
      {activeTab === "Models" && (
        <div className="space-y-3">
          {models.map((m) => (
            <div key={m.id} className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* 3D Icon placeholder */}
                  <div className="w-12 h-12 rounded bg-hai-primary border border-hai-steel flex items-center justify-center">
                    <span className="text-lg">{m.discipline === "Federated" ? "🌐" : "🧊"}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-blue-400">{m.id}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${m.statusColor}`}>{m.status}</span>
                    </div>
                    <div className="text-sm text-white font-medium">{m.name}</div>
                    <div className="flex items-center gap-4 text-[10px] text-gray-500 mt-1">
                      <span>{m.discipline}</span>
                      <span>{m.format}</span>
                      <span>{m.version}</span>
                      <span>{m.size}</span>
                      <span>{m.author}</span>
                      <span>{m.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">View</button>
                  <button className="text-xs px-3 py-1.5 rounded bg-hai-primary border border-hai-steel text-gray-400">Download</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clashes */}
      {activeTab === "Clashes" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">ID</th>
                <th className="text-left pb-2">Type</th>
                <th className="text-left pb-2">Models</th>
                <th className="text-left pb-2">Location</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-left pb-2">Severity</th>
                <th className="text-left pb-2">Assigned</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {clashes.map((c) => (
                <tr key={c.id} className={`text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer ${c.severity === "Critical" && c.status === "Open" ? "bg-red-500/5" : ""}`}>
                  <td className="py-3 text-blue-400 font-mono font-medium">{c.id}</td>
                  <td className="py-3 text-gray-400">{c.type}</td>
                  <td className="py-3 text-gray-300 text-[10px]">{c.modelA} vs {c.modelB}</td>
                  <td className="py-3 text-gray-400 text-[10px]">{c.zone} — {c.level}</td>
                  <td className="py-3 text-gray-300 max-w-xs text-[11px]">{c.description}</td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded border ${c.severityColor}`}>{c.severity}</span></td>
                  <td className="py-3 text-gray-400">{c.assignedTo}</td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded border ${c.statusColor}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Coordination Log */}
      {activeTab === "Coordination Log" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">BCF Coordination Issues</div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Ref</th>
                <th className="text-left pb-2">Subject</th>
                <th className="text-left pb-2">Disciplines</th>
                <th className="text-left pb-2">Raised</th>
                <th className="text-left pb-2">Resolution</th>
                <th className="text-left pb-2">Resolved Date</th>
              </tr>
            </thead>
            <tbody>
              {coordinationLog.map((item) => (
                <tr key={item.ref} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer">
                  <td className="py-3 text-blue-400 font-mono font-medium">{item.ref}</td>
                  <td className="py-3 text-gray-300">{item.subject}</td>
                  <td className="py-3">
                    <div className="flex gap-1 flex-wrap">
                      {item.disciplines.map((d) => (
                        <span key={d} className="text-[9px] px-1.5 py-0.5 rounded bg-hai-primary border border-hai-steel text-gray-400">{d}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 text-gray-400">{item.raised}</td>
                  <td className="py-3 text-gray-300">{item.resolution}</td>
                  <td className="py-3 text-gray-400">{item.resDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
