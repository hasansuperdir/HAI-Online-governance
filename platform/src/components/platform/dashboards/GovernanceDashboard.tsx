"use client";

const kpis = [
  { label: "GOVERNANCE SCORE", value: "91%", target: "Target: ≥95%", color: "text-green-400", bar: 91, barColor: "bg-green-500" },
  { label: "PROCESS COMPLIANCE", value: "87%", target: "Target: ≥90%", color: "text-orange-400", bar: 87, barColor: "bg-orange-500" },
  { label: "AUDIT FINDINGS OPEN", value: "4", target: "Critical: 1", color: "text-red-400", bar: 30, barColor: "bg-red-500" },
  { label: "RISK REGISTER ITEMS", value: "28", target: "High: 6 | Medium: 14", color: "text-yellow-400", bar: 55, barColor: "bg-yellow-500" },
];

const processFlows = [
  { process: "PF-01 Submittal Review", compliance: "94%", owner: "ER", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { process: "PF-03 IPC Certification", compliance: "100%", owner: "QS", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { process: "PF-08 Variation Order", compliance: "88%", owner: "PM", status: "Warning", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { process: "PF-10 Inspection Request", compliance: "91%", owner: "QA", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { process: "PF-15 NCR Management", compliance: "78%", owner: "QA", status: "Breach", statusColor: "text-red-400 bg-red-500/10 border-red-500/20" },
];

const auditFindings = [
  { finding: "AF-012", area: "Document Control", severity: "Critical", days: 14, status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20" },
  { finding: "AF-011", area: "Cost Management", severity: "Major", days: 8, status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { finding: "AF-010", area: "HSE Reporting", severity: "Minor", days: 3, status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { finding: "AF-009", area: "Approval Chain", severity: "Major", days: 0, status: "Closed", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const riskRegister = [
  { risk: "R-045", description: "Facade delay due to material shortage", impact: "High", likelihood: "Medium", owner: "PM", riskColor: "text-red-400" },
  { risk: "R-042", description: "MEP coordination clashes", impact: "High", likelihood: "High", owner: "ER", riskColor: "text-red-400" },
  { risk: "R-038", description: "Authority approval delay (QCDD)", impact: "Medium", likelihood: "High", owner: "PM", riskColor: "text-orange-400" },
  { risk: "R-035", description: "Subcontractor performance decline", impact: "Medium", likelihood: "Medium", owner: "CM", riskColor: "text-yellow-400" },
];

const delegations = [
  { role: "Programme Director", threshold: "QAR 5M+", approvals: "VO, Claims, Gate", active: true },
  { role: "Project Manager", threshold: "QAR 500K–5M", approvals: "VO, IPC, NCR", active: true },
  { role: "QS Lead", threshold: "QAR ≤500K", approvals: "IPC, Minor VO", active: true },
  { role: "Site Engineer", threshold: "N/A", approvals: "Inspections, DPR", active: true },
];

export default function GovernanceDashboard() {
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

      {/* Process Flows + Audit Findings */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Process Flow Compliance
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Process</th>
                <th className="text-left pb-2">Compliance</th>
                <th className="text-left pb-2">Owner</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {processFlows.map((row) => (
                <tr key={row.process} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2 text-gray-300">{row.process}</td>
                  <td className="py-2 text-gray-400">{row.compliance}</td>
                  <td className="py-2 text-gray-400">{row.owner}</td>
                  <td className="py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Audit Findings
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Finding</th>
                <th className="text-left pb-2">Area</th>
                <th className="text-left pb-2">Severity</th>
                <th className="text-left pb-2">Days</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {auditFindings.map((row) => (
                <tr key={row.finding} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2 text-gray-300 font-medium">{row.finding}</td>
                  <td className="py-2 text-gray-400">{row.area}</td>
                  <td className="py-2 text-gray-400">{row.severity}</td>
                  <td className="py-2 text-gray-400">{row.days}</td>
                  <td className="py-2">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Risk Register + Authority Delegation */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Risk Register (Top Risks)
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Risk</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-left pb-2">Impact</th>
                <th className="text-left pb-2">Owner</th>
              </tr>
            </thead>
            <tbody>
              {riskRegister.map((row) => (
                <tr key={row.risk} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className={`py-2 font-medium ${row.riskColor}`}>{row.risk}</td>
                  <td className="py-2 text-gray-400 max-w-[200px] truncate">{row.description}</td>
                  <td className="py-2 text-gray-400">{row.impact}</td>
                  <td className="py-2 text-gray-400">{row.owner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Authority Delegation Matrix
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Role</th>
                <th className="text-left pb-2">Threshold</th>
                <th className="text-left pb-2">Approvals</th>
              </tr>
            </thead>
            <tbody>
              {delegations.map((row) => (
                <tr key={row.role} className="text-xs border-b border-hai-primary/30 last:border-0">
                  <td className="py-2 text-gray-300 font-medium">{row.role}</td>
                  <td className="py-2 text-gray-400">{row.threshold}</td>
                  <td className="py-2 text-gray-400">{row.approvals}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
