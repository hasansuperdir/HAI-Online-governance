"use client";

const kpis = [
  { label: "PENDING REVIEWS", value: "8", target: "3 overdue SLA", color: "text-orange-400", bar: 65, barColor: "bg-orange-500" },
  { label: "AVG REVIEW TIME", value: "9.4 CD", target: "SLA: 14 CD", color: "text-green-400", bar: 67, barColor: "bg-green-500" },
  { label: "REVIEWS THIS MONTH", value: "23", target: "Last month: 19", color: "text-blue-400", bar: 82, barColor: "bg-blue-500" },
];

const reviewQueue = [
  { sub: "SUB-0456", category: "B-Material", received: "18 Feb", sla: "-2 CD", slaColor: "text-red-400" },
  { sub: "SUB-0457", category: "C-Method", received: "20 Feb", sla: "3 CD", slaColor: "text-green-400" },
  { sub: "SUB-0458", category: "D-QA/QC", received: "22 Feb", sla: "8 CD", slaColor: "text-green-400" },
  { sub: "SUB-0459", category: "E-HSE", received: "24 Feb", sla: "10 CD", slaColor: "text-green-400" },
];

const reviewHistory = [
  { code: "A - Approved", count: 42, pct: "38%" },
  { code: "B - Approved w/ Comments", count: 35, pct: "32%" },
  { code: "C - Revise & Resubmit", count: 25, pct: "23%" },
  { code: "D - Rejected", count: 8, pct: "7%" },
];

export default function ConsultantPortal() {
  return (
    <div className="space-y-4">
      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-3">
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

      {/* Review Queue + Review History */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Review Queue
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Submittal</th>
                <th className="text-left pb-2">Category</th>
                <th className="text-left pb-2">Received</th>
                <th className="text-left pb-2">SLA Remaining</th>
              </tr>
            </thead>
            <tbody>
              {reviewQueue.map((row) => (
                <tr key={row.sub} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.sub}</td>
                  <td className="py-2.5 text-gray-400">{row.category}</td>
                  <td className="py-2.5 text-gray-400">{row.received}</td>
                  <td className="py-2.5">
                    <span className={`text-xs font-semibold ${row.slaColor}`}>{row.sla}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Review History
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Code</th>
                <th className="text-left pb-2">Count</th>
                <th className="text-left pb-2">%</th>
              </tr>
            </thead>
            <tbody>
              {reviewHistory.map((row) => (
                <tr key={row.code} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300">{row.code}</td>
                  <td className="py-2.5 text-gray-400">{row.count}</td>
                  <td className="py-2.5 text-gray-400">{row.pct}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
