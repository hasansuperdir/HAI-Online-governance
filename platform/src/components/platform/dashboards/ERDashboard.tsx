"use client";

const kpis = [
  { label: "SUBMITTAL RESPONSE (KPI-001)", value: "11.2 CD", target: "Target: ≤14 CD", color: "text-green-400", bar: 80, barColor: "bg-green-500" },
  { label: "APPROVAL EFFICIENCY (KPI-011)", value: "93%", target: "Target: ≥90%", color: "text-green-400", bar: 93, barColor: "bg-green-500" },
  { label: "BUDGET VARIANCE (KPI-010)", value: "+7.2%", target: "Target: ≤5%", color: "text-orange-400", bar: 72, barColor: "bg-orange-500" },
  { label: "GATE COMPLIANCE (KPI-005)", value: "100%", target: "Target: 100%", color: "text-green-400", bar: 100, barColor: "bg-green-500" },
  { label: "RISK REGISTER CURRENCY (KPI-008)", value: "72%", target: "Target: ≥90%", color: "text-orange-400", bar: 72, barColor: "bg-orange-500" },
];

const pendingActions = [
  { text: "Approve VO-0034 — MEP Scope Change", due: "2 CD", urgent: true },
  { text: "Endorse IPC #12 — QAR 4,230,000", due: "3 CD", urgent: true },
  { text: "Review Gate 5.3 Checklist", due: "5 CD", urgent: false },
  { text: "Sign-off Contractor Score — Feb 2026", due: "7 CD", urgent: false },
  { text: "Acknowledge Risk R-045 escalation", due: "10 CD", urgent: false },
];

const submittals = [
  { label: "Received", count: 45, color: "bg-blue-500", height: "h-28" },
  { label: "Approved (A/B)", count: 30, color: "bg-green-500", height: "h-20" },
  { label: "Revise (C)", count: 8, color: "bg-yellow-500", height: "h-8" },
  { label: "Rejected (D)", count: 3, color: "bg-red-500", height: "h-4" },
  { label: "Pending", count: 4, color: "bg-gray-500", height: "h-5" },
];

const slaData = [
  { sla: "SLA-001 Submittals", compliance: "94%", status: "On Track", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { sla: "SLA-003 Correspondence", compliance: "88%", status: "Warning", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { sla: "SLA-006 IPC Cert", compliance: "100%", status: "On Track", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { sla: "SLA-009 NCR Closure", compliance: "78%", status: "Breach", statusColor: "text-red-400 bg-red-500/10 border-red-500/20" },
];

const escalations = [
  { item: "NCR-0089", level: "L3", levelColor: "text-red-400 bg-red-500/10", days: "5 CD" },
  { item: "RFI-0234", level: "L2", levelColor: "text-yellow-400 bg-yellow-500/10", days: "2 CD" },
  { item: "VO-0031", level: "L2", levelColor: "text-yellow-400 bg-yellow-500/10", days: "1 CD" },
];

const milestones = [
  { gate: "Gate 5.4", target: "15 Apr 2026", readiness: 87, color: "text-orange-400" },
  { gate: "Gate 6.0", target: "30 Jun 2026", readiness: 42, color: "text-orange-400" },
];

export default function ERDashboard() {
  return (
    <div className="space-y-4">
      {/* KPI Row */}
      <div className="grid grid-cols-5 gap-3">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</div>
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</div>
            <div className="text-[10px] text-gray-600 mt-1">{kpi.target}</div>
            <div className="h-1.5 bg-hai-primary rounded-full mt-3 overflow-hidden">
              <div className={`h-full ${kpi.barColor} rounded-full`} style={{ width: `${kpi.bar}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* Pending Actions + Submittal Status */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Pending Actions (My Queue)
          </div>
          <div className="space-y-0">
            {pendingActions.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-hai-primary/50 last:border-0">
                <span className="text-xs text-gray-300">{a.text}</span>
                <span className={`text-xs font-semibold ${a.urgent ? "text-red-400" : "text-orange-400"}`}>
                  Due: {a.due}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Submittal Status (Last 30 Days)
          </div>
          <div className="flex items-end gap-3 h-36">
            {submittals.map((s) => (
              <div key={s.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="text-[10px] text-gray-400 mb-1">{s.count}</div>
                <div className={`w-full ${s.color} rounded-t-sm ${s.height}`} />
                <div className="text-[9px] text-gray-500 mt-2 text-center leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SLA + Escalations + Milestones */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            SLA Compliance
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">SLA</th>
                <th className="text-left pb-2">Compliance</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {slaData.map((s) => (
                <tr key={s.sla} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2 text-gray-300">{s.sla}</td>
                  <td className="py-2 text-gray-400">{s.compliance}</td>
                  <td className="py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${s.statusColor}`}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Escalations Active
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Item</th>
                <th className="text-left pb-2">Level</th>
                <th className="text-left pb-2">Days Overdue</th>
              </tr>
            </thead>
            <tbody>
              {escalations.map((e) => (
                <tr key={e.item} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2 text-gray-300">{e.item}</td>
                  <td className="py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded ${e.levelColor}`}>{e.level}</span>
                  </td>
                  <td className="py-2 text-gray-400">{e.days}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Upcoming Gate Milestones
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Gate</th>
                <th className="text-left pb-2">Target</th>
                <th className="text-left pb-2">Readiness</th>
              </tr>
            </thead>
            <tbody>
              {milestones.map((m) => (
                <tr key={m.gate} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2 text-gray-300">{m.gate}</td>
                  <td className="py-2 text-gray-400">{m.target}</td>
                  <td className="py-2">
                    <span className={`text-xs font-bold ${m.color}`}>{m.readiness}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
