"use client";

import Link from "next/link";

const kpis = [
  { label: "Stage Gate Compliance", value: "94%", target: "Target: 100%", color: "green", bar: 94 },
  { label: "Approval Turnaround", value: "3.2d", target: "SLA: 5 days", color: "green", bar: 64 },
  { label: "Cost Deviation", value: "+2.1%", target: "Threshold: ±5%", color: "amber", bar: 42 },
  { label: "Open Variations", value: "23", target: "QAR 4.8M exposure", color: "amber", bar: 55 },
  { label: "IPC Pipeline", value: "QAR 48M", target: "3 pending approval", color: "blue", bar: 72 },
  { label: "NCRs Open", value: "12", target: "4 overdue", color: "red", bar: 35 },
  { label: "Document Submissions", value: "89%", target: "On-time rate", color: "green", bar: 89 },
  { label: "ERP Sync Health", value: "99.2%", target: "Last sync: 2 min ago", color: "green", bar: 99 },
];

const colorMap: Record<string, string> = {
  green: "border-green-500 text-green-400",
  amber: "border-yellow-500 text-yellow-400",
  red: "border-red-500 text-red-400",
  blue: "border-blue-500 text-blue-400",
};

const barColorMap: Record<string, string> = {
  green: "bg-green-500",
  amber: "bg-yellow-500",
  red: "bg-red-500",
  blue: "bg-blue-500",
};

const stages = [
  { num: 0, name: "Brief", status: "done" },
  { num: 1, name: "Concept", status: "done" },
  { num: 2, name: "Developed", status: "done" },
  { num: 3, name: "Technical", status: "done" },
  { num: 4, name: "Production", status: "done" },
  { num: 5, name: "Tender", status: "done" },
  { num: 6, name: "Construction", status: "current" },
  { num: 7, name: "Handover", status: "future" },
  { num: 8, name: "In Use", status: "future" },
];

const recentActions = [
  { time: "14:32", text: "IPC-024 approved by Finance — QAR 3.2M released", type: "approval" },
  { time: "13:15", text: "VO-018 submitted for assessment — Facade redesign", type: "variation" },
  { time: "12:40", text: "NCR-089 corrective action submitted by Contractor A", type: "ncr" },
  { time: "11:20", text: "DWG-A-301 Rev C approved with comments", type: "document" },
  { time: "10:05", text: "QCDD DC2 submission status: Under Review", type: "authority" },
  { time: "09:30", text: "Stage 6 Gate Review checklist: 87% complete", type: "gate" },
  { time: "08:45", text: "ERP sync completed: 47 records synchronised", type: "erp" },
];

const alerts = [
  { text: "FIDIC Cl. 20.1 — Claim notice deadline in 3 days (VO-015)", level: "critical" },
  { text: "IPC-023 QS certification overdue by 2 days", level: "warning" },
  { text: "Kahramaa load application pending for 14 days", level: "warning" },
  { text: "Contractor B performance score dropped to 62%", level: "info" },
];

const projects = [
  { name: "ARADA Tower A", stage: 6, budget: "QAR 245M", rag: "green" },
  { name: "ARADA Tower B", stage: 5, budget: "QAR 198M", rag: "amber" },
  { name: "Marina District", stage: 4, budget: "QAR 320M", rag: "green" },
  { name: "Sports Complex", stage: 6, budget: "QAR 180M", rag: "red" },
  { name: "School Campus", stage: 3, budget: "QAR 95M", rag: "green" },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Programme Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">Real-time governance overview across all projects</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1.5 rounded bg-hai-navy border border-hai-steel text-gray-400 hover:border-blue-500/50 transition-colors">
            Export PDF
          </button>
          <button className="text-xs px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stage Gate Timeline */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg p-5 mb-6">
        <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-4">
          RIBA Stage-Gate Progress — ARADA Programme
        </div>
        <div className="flex items-center gap-1">
          {stages.map((s, i) => (
            <div key={s.num} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    s.status === "done"
                      ? "bg-green-500 border-green-500 text-white"
                      : s.status === "current"
                      ? "bg-yellow-500 border-yellow-500 text-hai-primary animate-pulse"
                      : "bg-hai-primary border-hai-steel text-gray-500"
                  }`}
                >
                  {s.num}
                </div>
                <div className={`text-[10px] mt-2 font-semibold ${
                  s.status === "current" ? "text-yellow-400" : s.status === "done" ? "text-green-400" : "text-gray-600"
                }`}>
                  {s.name}
                </div>
              </div>
              {i < stages.length - 1 && (
                <div className={`h-0.5 flex-1 mx-1 ${
                  s.status === "done" ? "bg-green-500" : "bg-hai-steel"
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className={`bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-blue-500/30 transition-all cursor-pointer`}
          >
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</div>
            <div className={`text-2xl font-bold ${colorMap[kpi.color]?.split(" ")[1]}`}>{kpi.value}</div>
            <div className="text-[10px] text-gray-600 mt-1">{kpi.target}</div>
            <div className="h-1 bg-hai-primary rounded-full mt-3 overflow-hidden">
              <div
                className={`h-full rounded-full ${barColorMap[kpi.color]}`}
                style={{ width: `${kpi.bar}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Three Column Layout */}
      <div className="grid grid-cols-[280px_1fr_280px] gap-4">
        {/* Left: Alerts & Actions */}
        <div className="space-y-4">
          <div className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              Alerts
            </div>
            {alerts.map((a, i) => (
              <div
                key={i}
                className={`text-xs p-2.5 rounded mb-2 border-l-2 ${
                  a.level === "critical"
                    ? "bg-red-500/5 border-red-500 text-red-300"
                    : a.level === "warning"
                    ? "bg-yellow-500/5 border-yellow-500 text-yellow-300"
                    : "bg-blue-500/5 border-blue-500 text-blue-300"
                }`}
              >
                {a.text}
              </div>
            ))}
          </div>

          <div className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
              Quick Actions
            </div>
            <div className="space-y-2">
              {[
                { label: "New Document Submission", href: "/platform/documents" },
                { label: "Create Approval Request", href: "/platform/approvals" },
                { label: "Submit Variation", href: "/platform/contracts" },
                { label: "Log Inspection Request", href: "/platform/quality" },
                { label: "View AI Predictions", href: "/platform/analytics" },
              ].map((a) => (
                <Link
                  key={a.label}
                  href={a.href}
                  className="block text-xs px-3 py-2 bg-hai-primary border border-hai-steel rounded hover:border-blue-500/30 hover:text-blue-400 transition-all"
                >
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Center: Projects & Charts */}
        <div className="space-y-4">
          <div className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
              Portfolio Overview
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                  <th className="text-left pb-2">Project</th>
                  <th className="text-left pb-2">Stage</th>
                  <th className="text-left pb-2">Budget</th>
                  <th className="text-left pb-2">RAG</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((p) => (
                  <tr key={p.name} className="text-xs border-b border-hai-primary/50 hover:bg-hai-primary/30 cursor-pointer">
                    <td className="py-2.5 font-medium text-gray-200">{p.name}</td>
                    <td className="py-2.5 text-gray-400">Stage {p.stage}</td>
                    <td className="py-2.5 text-gray-400">{p.budget}</td>
                    <td className="py-2.5">
                      <span className={`inline-block w-3 h-3 rounded-full ${
                        p.rag === "green" ? "bg-green-500" : p.rag === "amber" ? "bg-yellow-500" : "bg-red-500"
                      }`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-4">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                Document Status
              </div>
              <div className="space-y-2">
                {[
                  { label: "Approved", count: 1847, pct: 79, color: "bg-green-500" },
                  { label: "Under Review", count: 312, pct: 13, color: "bg-yellow-500" },
                  { label: "Submitted", count: 142, pct: 6, color: "bg-blue-500" },
                  { label: "Rejected", count: 40, pct: 2, color: "bg-red-500" },
                ].map((d) => (
                  <div key={d.label} className="flex items-center gap-3">
                    <span className="text-[10px] text-gray-400 w-20">{d.label}</span>
                    <div className="flex-1 h-2 bg-hai-primary rounded-full overflow-hidden">
                      <div className={`h-full ${d.color} rounded-full`} style={{ width: `${d.pct}%` }} />
                    </div>
                    <span className="text-[10px] text-gray-500 w-10 text-right">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-hai-navy border border-hai-steel rounded-lg p-4">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
                Financial Summary
              </div>
              <div className="space-y-3">
                {[
                  { label: "Contract Value", value: "QAR 1.038B" },
                  { label: "Certified to Date", value: "QAR 687M" },
                  { label: "Approved VOs", value: "QAR 23.4M" },
                  { label: "Pending Claims", value: "QAR 8.7M" },
                  { label: "Retention Held", value: "QAR 34.2M" },
                ].map((f) => (
                  <div key={f.label} className="flex justify-between">
                    <span className="text-[10px] text-gray-400">{f.label}</span>
                    <span className="text-xs font-semibold text-gray-200">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Activity Feed */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-4">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Activity Feed
          </div>
          <div className="space-y-0">
            {recentActions.map((a, i) => (
              <div key={i} className="py-2.5 border-l-2 border-hai-steel pl-3 ml-1 relative">
                <div className="absolute left-[-5px] top-3.5 w-2 h-2 rounded-full bg-blue-400" />
                <div className="text-[10px] text-gray-600">{a.time}</div>
                <div className="text-xs text-gray-300 mt-0.5">{a.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
