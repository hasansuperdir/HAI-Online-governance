"use client";

const kpis = [
  { label: "IPC CYCLE TIME (KPI-004)", value: "22 CD", target: "Target: ≤28 CD (FIDIC 14.6)", color: "text-green-400", bar: 78, barColor: "bg-green-500" },
  { label: "VARIATION PROCESSING (KPI-003)", value: "32 CD", target: "Target: ≤28 CD", color: "text-orange-400", bar: 87, barColor: "bg-orange-500" },
  { label: "BUDGET VARIANCE (KPI-010)", value: "+7.2%", target: "Target: ≤5%", color: "text-orange-400", bar: 72, barColor: "bg-orange-500" },
  { label: "FREEZE EXCEPTION RATE (KPI-009)", value: "1.8%", target: "Target: ≤2%", color: "text-green-400", bar: 90, barColor: "bg-green-500" },
];

const ipcSummary = [
  { ipc: "#12", applied: "4,560,000", certified: "4,230,000", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ipc: "#11", applied: "3,890,000", certified: "3,740,000", status: "Paid", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ipc: "#10", applied: "4,120,000", certified: "3,980,000", status: "Paid", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const variations = [
  { vo: "VO-034", desc: "MEP Scope Change", value: "890,000", status: "Pending Approval", statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { vo: "VO-033", desc: "Foundation Redesign", value: "1,450,000", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { vo: "VO-032", desc: "Facade Material Change", value: "320,000", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const budgetBars = [
  { label: "Spatial Coordination", value: "120M", height: "h-32", color: "bg-blue-500" },
  { label: "Committed", value: "90M", height: "h-24", color: "bg-green-500" },
  { label: "Paid", value: "66M", height: "h-16", color: "bg-yellow-500" },
  { label: "Forecast", value: "102M", height: "h-28", color: "bg-red-500" },
];

const claims = [
  { claim: "CLM-003", fidic: "20.1", amount: "2,340,000", status: "Under Assessment", statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { claim: "CLM-002", fidic: "8.4 (EOT)", amount: "N/A (45 CD)", status: "Determination Due", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { claim: "CLM-001", fidic: "20.1", amount: "890,000", status: "Settled", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

export default function CostDashboard() {
  return (
    <div className="space-y-4">
      {/* KPI Row */}
      <div className="grid grid-cols-4 gap-3">
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

      {/* IPC Summary + Variation Register */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            IPC Summary
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">IPC #</th>
                <th className="text-left pb-2">Applied (QAR)</th>
                <th className="text-left pb-2">Certified (QAR)</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ipcSummary.map((row) => (
                <tr key={row.ipc} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.ipc}</td>
                  <td className="py-2.5 text-gray-400">{row.applied}</td>
                  <td className="py-2.5 text-gray-400">{row.certified}</td>
                  <td className="py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Variation Register
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">VO #</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-left pb-2">Value (QAR)</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {variations.map((row) => (
                <tr key={row.vo} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.vo}</td>
                  <td className="py-2.5 text-gray-400">{row.desc}</td>
                  <td className="py-2.5 text-gray-400">{row.value}</td>
                  <td className="py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Budget vs Actual + Claims Register */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Budget vs Actual
          </div>
          <div className="flex items-end gap-4 h-40">
            {budgetBars.map((b) => (
              <div key={b.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="text-[10px] text-gray-400 mb-1">{b.value}</div>
                <div className={`w-full ${b.color} rounded-t-sm ${b.height}`} />
                <div className="text-[9px] text-gray-500 mt-2 text-center leading-tight">{b.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Claims Register
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Claim</th>
                <th className="text-left pb-2">FIDIC Ref</th>
                <th className="text-left pb-2">Amount (QAR)</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map((row) => (
                <tr key={row.claim} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.claim}</td>
                  <td className="py-2.5 text-gray-400">{row.fidic}</td>
                  <td className="py-2.5 text-gray-400">{row.amount}</td>
                  <td className="py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
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
