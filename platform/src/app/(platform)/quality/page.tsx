"use client";

const inspections = [
  { ir: "IR-156", activity: "Concrete Pour — Level 5 Slab", type: "Hold Point", result: "Pass", inspector: "QA Eng A", date: "2026-03-06" },
  { ir: "IR-155", activity: "Rebar Inspection — Col. Grid C", type: "Hold Point", result: "Conditional", inspector: "QA Eng B", date: "2026-03-05" },
  { ir: "IR-154", activity: "Waterproofing — Basement 1", type: "Witness Point", result: "Pass", inspector: "QA Eng A", date: "2026-03-04" },
  { ir: "IR-153", activity: "MEP Pressure Test — Zone B", type: "Hold Point", result: "Fail", inspector: "MEP Inspector", date: "2026-03-03" },
  { ir: "IR-152", activity: "Welding Visual — Steel Frame L3", type: "Witness Point", result: "Pass", inspector: "QA Eng C", date: "2026-03-02" },
];

const ncrs = [
  { ncr: "NCR-089", title: "Concrete cover below spec — Col C-12", contractor: "ABC Construction", status: "Corrective Action Submitted", severity: "Major", date: "2026-03-05" },
  { ncr: "NCR-088", title: "Missing fire stops — Level 4 riser", contractor: "XYZ Systems", status: "Open", severity: "Critical", date: "2026-03-04" },
  { ncr: "NCR-087", title: "Incorrect tile finish — Lobby", contractor: "FitOut Co", status: "Re-inspected", severity: "Minor", date: "2026-03-02" },
  { ncr: "NCR-086", title: "Weld defect — Beam B-22", contractor: "SteelWorks LLC", status: "Closed", severity: "Major", date: "2026-02-28" },
];

const resultColors: Record<string, string> = {
  Pass: "text-green-400",
  Conditional: "text-yellow-400",
  Fail: "text-red-400",
};

const severityColors: Record<string, string> = {
  Critical: "bg-red-500/10 text-red-400 border-red-500/20",
  Major: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Minor: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
};

const ncrStatusColors: Record<string, string> = {
  Open: "bg-red-500/10 text-red-400 border-red-500/20",
  "Corrective Action Submitted": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Re-inspected": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Closed: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function QualityPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Quality Management</h1>
          <p className="text-xs text-gray-500 mt-1">Inspections, NCRs, ITPs, and quality performance tracking</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">
            + Inspection Request
          </button>
          <button className="text-xs px-4 py-2 rounded bg-red-500/10 border border-red-500/30 text-red-400">
            + Raise NCR
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Inspections (MTD)", value: "47", color: "text-blue-400" },
          { label: "Pass Rate", value: "87%", color: "text-green-400" },
          { label: "Open NCRs", value: "12", color: "text-red-400" },
          { label: "NCR Closure Rate", value: "78%", color: "text-yellow-400" },
          { label: "Active ITPs", value: "34", color: "text-blue-400" },
          { label: "Contractor Avg Score", value: "74%", color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Inspections */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-hai-steel">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Recent Inspections</span>
          </div>
          <div className="divide-y divide-hai-primary/50">
            {inspections.map((ir) => (
              <div key={ir.ir} className="px-4 py-3 hover:bg-hai-primary/30 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-blue-400">{ir.ir}</span>
                  <span className={`text-xs font-bold ${resultColors[ir.result]}`}>{ir.result}</span>
                </div>
                <div className="text-xs text-gray-200">{ir.activity}</div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>{ir.type} — {ir.inspector}</span>
                  <span>{ir.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NCRs */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-hai-steel">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Non-Conformance Reports</span>
          </div>
          <div className="divide-y divide-hai-primary/50">
            {ncrs.map((ncr) => (
              <div key={ncr.ncr} className="px-4 py-3 hover:bg-hai-primary/30 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-400">{ncr.ncr}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${severityColors[ncr.severity]}`}>{ncr.severity}</span>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${ncrStatusColors[ncr.status]}`}>{ncr.status}</span>
                </div>
                <div className="text-xs text-gray-200">{ncr.title}</div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>{ncr.contractor}</span>
                  <span>{ncr.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
