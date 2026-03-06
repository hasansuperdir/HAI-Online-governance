"use client";

const kpis = [
  { label: "NCR CLOSURE RATE (KPI-006)", value: "88%", target: "Target: ≥95%", color: "text-orange-400", bar: 88, barColor: "bg-orange-500" },
  { label: "INSPECTION PASS RATE", value: "94%", target: "Target: ≥90%", color: "text-green-400", bar: 94, barColor: "bg-green-500" },
  { label: "HSE INCIDENT RATE (KPI-012)", value: "0.12", target: "Target: 0", color: "text-orange-400", bar: 12, barColor: "bg-orange-500" },
  { label: "OPEN SNAGS (KPI-015)", value: "47", target: "Overdue: 12", color: "text-red-400", bar: 47, barColor: "bg-red-500" },
];

const ncrRegister = [
  { ncr: "NCR-089", location: "B2 Level 3", category: "Concrete", days: 19, status: "Overdue", statusColor: "text-red-400 bg-red-500/10 border-red-500/20" },
  { ncr: "NCR-088", location: "Tower A", category: "MEP", days: 8, status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ncr: "NCR-087", location: "Podium", category: "Waterproof", days: 3, status: "Rectified", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ncr: "NCR-086", location: "B1 Level 1", category: "Rebar", days: 0, status: "Closed", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
];

const inspections = [
  { label: "Requested", count: 87, color: "bg-blue-500", height: "h-28" },
  { label: "Passed", count: 75, color: "bg-green-500", height: "h-24" },
  { label: "Failed", count: 7, color: "bg-red-500", height: "h-4" },
  { label: "Pending", count: 5, color: "bg-gray-500", height: "h-3" },
];

const snagList = [
  { zone: "Tower A", open: 12, inProgress: 8, closed: 45, total: 65 },
  { zone: "Tower B", open: 18, inProgress: 5, closed: 32, total: 55 },
  { zone: "Podium", open: 7, inProgress: 3, closed: 28, total: 38 },
  { zone: "Basement", open: 10, inProgress: 2, closed: 19, total: 31 },
];

const hseStats = [
  { metric: "Man-Hours", thisMonth: "180,000", cumulative: "2,340,000" },
  { metric: "Near Misses", thisMonth: "3", cumulative: "28" },
  { metric: "First Aid", thisMonth: "1", cumulative: "12" },
  { metric: "LTI", thisMonth: "0", cumulative: "1" },
  { metric: "LTIFR", thisMonth: "0.00", cumulative: "0.09" },
];

export default function QualityDashboard() {
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
              <div className={`h-full ${kpi.barColor} rounded-full`} style={{ width: `${Math.min(kpi.bar, 100)}%` }} />
            </div>
          </div>
        ))}
      </div>

      {/* NCR Register + Inspection Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            NCR Register
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">NCR</th>
                <th className="text-left pb-2">Location</th>
                <th className="text-left pb-2">Category</th>
                <th className="text-left pb-2">Days Open</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {ncrRegister.map((row) => (
                <tr key={row.ncr} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.ncr}</td>
                  <td className="py-2.5 text-gray-400">{row.location}</td>
                  <td className="py-2.5 text-gray-400">{row.category}</td>
                  <td className="py-2.5 text-gray-400">{row.days}</td>
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
            Inspection Summary (This Month)
          </div>
          <div className="flex items-end gap-4 h-36">
            {inspections.map((s) => (
              <div key={s.label} className="flex-1 flex flex-col items-center justify-end h-full">
                <div className="text-[10px] text-gray-400 mb-1">{s.count}</div>
                <div className={`w-full ${s.color} rounded-t-sm ${s.height}`} />
                <div className="text-[9px] text-gray-500 mt-2 text-center leading-tight">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Snag List + HSE Statistics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Snag List Status
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Zone</th>
                <th className="text-left pb-2">Open</th>
                <th className="text-left pb-2">In Progress</th>
                <th className="text-left pb-2">Closed</th>
                <th className="text-left pb-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {snagList.map((row) => (
                <tr key={row.zone} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.zone}</td>
                  <td className="py-2.5 text-red-400">{row.open}</td>
                  <td className="py-2.5 text-yellow-400">{row.inProgress}</td>
                  <td className="py-2.5 text-green-400">{row.closed}</td>
                  <td className="py-2.5 text-gray-400">{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            HSE Statistics
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Metric</th>
                <th className="text-left pb-2">This Month</th>
                <th className="text-left pb-2">Cumulative</th>
              </tr>
            </thead>
            <tbody>
              {hseStats.map((row) => (
                <tr key={row.metric} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.metric}</td>
                  <td className="py-2.5 text-gray-400">{row.thisMonth}</td>
                  <td className="py-2.5 text-gray-400">{row.cumulative}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
