"use client";

const contracts = [
  { num: "CON-001", name: "Main Building Works", contractor: "ABC Construction", type: "Main Contract", value: "QAR 245M", status: "Active", vos: 8, ipcs: 18 },
  { num: "CON-002", name: "MEP Package", contractor: "XYZ Systems", type: "Subcontract", value: "QAR 98M", status: "Active", vos: 5, ipcs: 12 },
  { num: "CON-003", name: "Facade Package", contractor: "GlassTech LLC", type: "Subcontract", value: "QAR 67M", status: "Active", vos: 3, ipcs: 8 },
  { num: "CON-004", name: "Landscaping", contractor: "GreenScape Qatar", type: "Subcontract", value: "QAR 12.4M", status: "Draft", vos: 0, ipcs: 0 },
  { num: "CON-005", name: "Design Consultancy", contractor: "DesignGroup Int", type: "Consultancy", value: "QAR 18M", status: "Active", vos: 2, ipcs: 24 },
];

const variations = [
  { vo: "VO-018", contract: "CON-001", title: "Facade Redesign — Level 12-15", value: "QAR 890K", status: "Under Assessment", days: 12 },
  { vo: "VO-017", contract: "CON-002", title: "MEP Rerouting — Basement 2", value: "QAR 340K", status: "Rejected", days: 0 },
  { vo: "VO-016", contract: "CON-001", title: "Additional Piling — Zone C", value: "QAR 2.1M", status: "Approved", days: 28 },
  { vo: "VO-015", contract: "CON-003", title: "Glass Specification Change", value: "QAR 560K", status: "Submitted", days: 0 },
  { vo: "VO-014", contract: "CON-002", title: "Chiller Upsizing", value: "QAR 1.4M", status: "Approved", days: 14 },
];

const ipcs = [
  { num: "IPC-024", contractor: "ABC Construction", amount: "QAR 3.2M", status: "Finance Review", certified: "QAR 3.0M" },
  { num: "IPC-023", contractor: "XYZ Systems", amount: "QAR 1.8M", status: "PM Endorsed", certified: "QAR 1.7M" },
  { num: "IPC-022", contractor: "GlassTech LLC", amount: "QAR 2.4M", status: "Paid", certified: "QAR 2.3M" },
  { num: "IPC-021", contractor: "ABC Construction", amount: "QAR 4.1M", status: "Paid", certified: "QAR 3.9M" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-500/10 text-green-400 border-green-500/20",
  Draft: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  Completed: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Approved: "bg-green-500/10 text-green-400 border-green-500/20",
  "Under Assessment": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Submitted: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  "Finance Review": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "PM Endorsed": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Paid: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function ContractsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Contract & Commercial</h1>
          <p className="text-xs text-gray-500 mt-1">FIDIC contract administration, variations, IPCs, and claims</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Contract Value", value: "QAR 440M", color: "text-blue-400" },
          { label: "Certified to Date", value: "QAR 287M", color: "text-green-400" },
          { label: "Open VOs", value: "23", color: "text-yellow-400" },
          { label: "VO Exposure", value: "QAR 4.8M", color: "text-orange-400" },
          { label: "Pending IPCs", value: "3", color: "text-purple-400" },
          { label: "Claims Active", value: "2", color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Contracts Table */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden mb-6">
        <div className="px-4 py-3 border-b border-hai-steel">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Active Contracts</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
              <th className="text-left px-4 py-2">Contract</th>
              <th className="text-left px-4 py-2">Contractor</th>
              <th className="text-left px-4 py-2">Type</th>
              <th className="text-left px-4 py-2">Value</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-center px-4 py-2">VOs</th>
              <th className="text-center px-4 py-2">IPCs</th>
            </tr>
          </thead>
          <tbody>
            {contracts.map((c) => (
              <tr key={c.num} className="text-xs border-b border-hai-primary/50 hover:bg-hai-primary/30 cursor-pointer">
                <td className="px-4 py-2.5">
                  <span className="font-mono text-blue-400">{c.num}</span>
                  <span className="text-gray-200 ml-2">{c.name}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-400">{c.contractor}</td>
                <td className="px-4 py-2.5 text-gray-400">{c.type}</td>
                <td className="px-4 py-2.5 text-gray-200 font-semibold">{c.value}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${statusColors[c.status]}`}>{c.status}</span>
                </td>
                <td className="px-4 py-2.5 text-center text-gray-400">{c.vos}</td>
                <td className="px-4 py-2.5 text-center text-gray-400">{c.ipcs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Variations */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-hai-steel">
            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Variation Orders</span>
          </div>
          <div className="divide-y divide-hai-primary/50">
            {variations.map((v) => (
              <div key={v.vo} className="px-4 py-3 hover:bg-hai-primary/30 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-blue-400">{v.vo}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${statusColors[v.status]}`}>{v.status}</span>
                </div>
                <div className="text-xs text-gray-200">{v.title}</div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>{v.value}</span>
                  {v.days > 0 && <span>+{v.days} days EOT</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* IPCs */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-hai-steel">
            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">Interim Payment Certificates</span>
          </div>
          <div className="divide-y divide-hai-primary/50">
            {ipcs.map((ipc) => (
              <div key={ipc.num} className="px-4 py-3 hover:bg-hai-primary/30 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-blue-400">{ipc.num}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${statusColors[ipc.status]}`}>{ipc.status}</span>
                </div>
                <div className="text-xs text-gray-200">{ipc.contractor}</div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>Claimed: {ipc.amount}</span>
                  <span>Certified: {ipc.certified}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
