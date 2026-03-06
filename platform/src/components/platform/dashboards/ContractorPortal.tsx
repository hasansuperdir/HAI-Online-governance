"use client";

const kpis = [
  { label: "OPEN SUBMITTALS", value: "12", target: "4 pending review", color: "text-blue-400", bar: 60, barColor: "bg-blue-500" },
  { label: "RESUBMISSIONS DUE", value: "3", target: "Code C responses", color: "text-orange-400", bar: 40, barColor: "bg-orange-500" },
  { label: "NEXT IPC DUE", value: "15 Mar", target: "IPC #13", color: "text-yellow-400", bar: 75, barColor: "bg-yellow-500" },
  { label: "PERFORMANCE SCORE", value: "78", target: "Previous: 74", color: "text-green-400", bar: 78, barColor: "bg-green-500" },
];

const submittals = [
  { sub: "SUB-0456", category: "B-Material", submitted: "18 Feb", response: "Under Review", responseColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { sub: "SUB-0455", category: "C-Method Stmt", submitted: "15 Feb", response: "Code B", responseColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { sub: "SUB-0454", category: "D-QA/QC", submitted: "12 Feb", response: "Code C", responseColor: "text-red-400 bg-red-500/10 border-red-500/20" },
  { sub: "SUB-0453", category: "A-Design", submitted: "10 Feb", response: "Code A", responseColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const actions = [
  { text: "Resubmit SUB-0454 (ITP revision)", due: "3 CD", urgent: true },
  { text: "Rectify NCR-088 (MEP alignment)", due: "6 CD", urgent: true },
  { text: "Submit IPC #13 application", due: "12 CD", urgent: false },
  { text: "Upload progress photos (Week 23)", due: "2 CD", urgent: true },
];

export default function ContractorPortal() {
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

      {/* Submittals + Outstanding Actions */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            My Submittals
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Submittal</th>
                <th className="text-left pb-2">Category</th>
                <th className="text-left pb-2">Submitted</th>
                <th className="text-left pb-2">Response</th>
              </tr>
            </thead>
            <tbody>
              {submittals.map((row) => (
                <tr key={row.sub} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2.5 text-gray-300 font-medium">{row.sub}</td>
                  <td className="py-2.5 text-gray-400">{row.category}</td>
                  <td className="py-2.5 text-gray-400">{row.submitted}</td>
                  <td className="py-2.5">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.responseColor}`}>{row.response}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Outstanding Actions
          </div>
          <div className="space-y-0">
            {actions.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-hai-primary/50 last:border-0">
                <span className="text-xs text-gray-300">{a.text}</span>
                <span className={`text-xs font-semibold ${a.urgent ? "text-red-400" : "text-green-400"}`}>
                  Due: {a.due}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
