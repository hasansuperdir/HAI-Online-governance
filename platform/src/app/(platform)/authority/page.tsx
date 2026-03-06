"use client";

const submissions = [
  { ref: "AUTH-045", authority: "QCDD", type: "DC2", project: "ARADA Tower A", status: "Under Review", submitted: "2026-02-20", deadline: "2026-03-20" },
  { ref: "AUTH-044", authority: "Kahramaa", type: "Load Application", project: "ARADA Tower A", status: "Submitted", submitted: "2026-02-15", deadline: "2026-03-15" },
  { ref: "AUTH-043", authority: "Ashghal", type: "Infrastructure NOC", project: "Marina District", status: "Comments Received", submitted: "2026-02-10", deadline: "2026-03-10" },
  { ref: "AUTH-042", authority: "Civil Defense", type: "Fire Strategy", project: "ARADA Tower A", status: "Approved", submitted: "2026-01-28", deadline: "2026-02-28" },
  { ref: "AUTH-041", authority: "QCDD", type: "DC1", project: "ARADA Tower B", status: "Approved", submitted: "2026-01-15", deadline: "2026-02-15" },
  { ref: "AUTH-040", authority: "GSAS", type: "Design Part 1", project: "ARADA Tower A", status: "In Progress", submitted: "2026-02-01", deadline: "2026-04-01" },
  { ref: "AUTH-039", authority: "Municipality", type: "Building Permit", project: "Sports Complex", status: "Submitted", submitted: "2026-02-25", deadline: "2026-03-25" },
];

const statusColors: Record<string, string> = {
  "Under Review": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Submitted: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Comments Received": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Approved: "bg-green-500/10 text-green-400 border-green-500/20",
  Rejected: "bg-red-500/10 text-red-400 border-red-500/20",
  "In Progress": "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "Not Submitted": "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const authorityColors: Record<string, string> = {
  QCDD: "text-blue-400",
  Kahramaa: "text-yellow-400",
  Ashghal: "text-green-400",
  "Civil Defense": "text-red-400",
  GSAS: "text-teal-400",
  Municipality: "text-purple-400",
};

const gsasCheckpoints = [
  { checkpoint: "Registration", status: "Approved" },
  { checkpoint: "Concept Assessment", status: "Approved" },
  { checkpoint: "Design Part 1", status: "In Progress" },
  { checkpoint: "Design Part 2", status: "Not Started" },
  { checkpoint: "LoC Application", status: "Not Started" },
  { checkpoint: "Construction Audit", status: "Not Started" },
  { checkpoint: "Final Certificate", status: "Not Started" },
];

export default function AuthorityPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Authority & Regulatory</h1>
          <p className="text-xs text-gray-500 mt-1">Qatar authority submissions — QCDD, Kahramaa, Ashghal, Civil Defence, GSAS</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
          + New Submission
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Submissions", value: "45", color: "text-blue-400" },
          { label: "Approved", value: "28", color: "text-green-400" },
          { label: "Pending", value: "12", color: "text-yellow-400" },
          { label: "Overdue", value: "2", color: "text-red-400" },
          { label: "GSAS Progress", value: "29%", color: "text-teal-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Submissions Table */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
              <th className="text-left px-4 py-3">Reference</th>
              <th className="text-left px-4 py-3">Authority</th>
              <th className="text-left px-4 py-3">Type</th>
              <th className="text-left px-4 py-3">Project</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Submitted</th>
              <th className="text-left px-4 py-3">Deadline</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.ref} className="text-xs border-b border-hai-primary/50 hover:bg-hai-primary/30 cursor-pointer">
                <td className="px-4 py-2.5 font-mono text-blue-400">{s.ref}</td>
                <td className={`px-4 py-2.5 font-semibold ${authorityColors[s.authority] || "text-gray-400"}`}>{s.authority}</td>
                <td className="px-4 py-2.5 text-gray-400">{s.type}</td>
                <td className="px-4 py-2.5 text-gray-200">{s.project}</td>
                <td className="px-4 py-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${statusColors[s.status]}`}>{s.status}</span>
                </td>
                <td className="px-4 py-2.5 text-gray-500">{s.submitted}</td>
                <td className="px-4 py-2.5 text-gray-500">{s.deadline}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* GSAS Tracker */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg p-4">
        <div className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-4">GSAS Sustainability Certification — ARADA Tower A</div>
        <div className="flex gap-2">
          {gsasCheckpoints.map((g) => (
            <div
              key={g.checkpoint}
              className={`flex-1 text-center p-3 rounded border ${
                g.status === "Approved"
                  ? "bg-green-500/10 border-green-500/20"
                  : g.status === "In Progress"
                  ? "bg-yellow-500/10 border-yellow-500/20"
                  : "bg-hai-primary border-hai-steel"
              }`}
            >
              <div className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                g.status === "Approved" ? "bg-green-500" : g.status === "In Progress" ? "bg-yellow-500 animate-pulse" : "bg-hai-steel"
              }`} />
              <div className="text-[10px] text-gray-300">{g.checkpoint}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
