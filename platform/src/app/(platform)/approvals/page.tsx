"use client";

const approvals = [
  { id: "APR-047", type: "IPC", subject: "IPC-024 Contractor A — QAR 3.2M", status: "Pending", assignee: "Finance Director", sla: 2, slaMax: 5, date: "2026-03-04" },
  { id: "APR-046", type: "Variation", subject: "VO-018 Facade Redesign — QAR 890K", status: "Under Review", assignee: "QS Lead", sla: 4, slaMax: 7, date: "2026-03-03" },
  { id: "APR-045", type: "Contract Award", subject: "Landscaping Package — QAR 12.4M", status: "Pending", assignee: "CEO", sla: 1, slaMax: 3, date: "2026-03-05" },
  { id: "APR-044", type: "Budget", subject: "Phase 2 Budget Uplift — QAR 5.6M", status: "Returned", assignee: "PM Director", sla: 6, slaMax: 5, date: "2026-03-01" },
  { id: "APR-043", type: "Design-Gateway", subject: "Stage 3→4 Gate Approval — Tower B", status: "Approved", assignee: "Programme Dir", sla: 3, slaMax: 5, date: "2026-02-28" },
  { id: "APR-042", type: "IPC", subject: "IPC-023 Contractor B — QAR 1.8M", status: "Approved", assignee: "Finance Director", sla: 4, slaMax: 5, date: "2026-02-26" },
  { id: "APR-041", type: "Variation", subject: "VO-017 MEP Rerouting — QAR 340K", status: "Rejected", assignee: "PM Director", sla: 5, slaMax: 7, date: "2026-02-25" },
  { id: "APR-040", type: "Advance", subject: "Advance Payment — Contractor C 10%", status: "Approved", assignee: "CEO", sla: 2, slaMax: 3, date: "2026-02-24" },
];

const statusColors: Record<string, string> = {
  Pending: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Under Review": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Approved: "bg-green-500/10 text-green-400 border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  Returned: "bg-orange-500/10 text-orange-400 border-orange-500/20",
};

const typeColors: Record<string, string> = {
  IPC: "text-blue-400",
  Variation: "text-yellow-400",
  "Contract Award": "text-green-400",
  Budget: "text-purple-400",
  "Design-Gateway": "text-teal-400",
  Advance: "text-orange-400",
};

export default function ApprovalsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Approval Engine</h1>
          <p className="text-xs text-gray-500 mt-1">Multi-level approval workflows with SLA tracking and delegation</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + New Approval Request
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Approvals", value: "234", color: "text-blue-400" },
          { label: "Pending", value: "12", color: "text-yellow-400" },
          { label: "Avg Turnaround", value: "3.2d", color: "text-green-400" },
          { label: "Overdue", value: "2", color: "text-red-400" },
          { label: "SLA Compliance", value: "91%", color: "text-green-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Approval Cards */}
      <div className="space-y-3">
        {approvals.map((a) => (
          <div
            key={a.id}
            className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-blue-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-mono text-blue-400">{a.id}</span>
                  <span className={`text-xs font-semibold ${typeColors[a.type] || "text-gray-400"}`}>
                    {a.type}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${statusColors[a.status]}`}>
                    {a.status}
                  </span>
                </div>
                <div className="text-sm text-gray-200 mb-2">{a.subject}</div>
                <div className="flex items-center gap-4 text-[10px] text-gray-500">
                  <span>Assignee: <span className="text-gray-300">{a.assignee}</span></span>
                  <span>Submitted: {a.date}</span>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-xs font-semibold ${a.sla > a.slaMax ? "text-red-400" : a.sla > a.slaMax * 0.7 ? "text-yellow-400" : "text-green-400"}`}>
                  {a.sla}d / {a.slaMax}d
                </div>
                <div className="text-[10px] text-gray-500">SLA</div>
                <div className="w-20 h-1.5 bg-hai-primary rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      a.sla > a.slaMax ? "bg-red-500" : a.sla > a.slaMax * 0.7 ? "bg-yellow-500" : "bg-green-500"
                    }`}
                    style={{ width: `${Math.min((a.sla / a.slaMax) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
