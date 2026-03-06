"use client";

const incidents = [
  { id: "INC-034", type: "Near Miss", desc: "Unsecured scaffolding board — Zone C Level 4", severity: "Medium", contractor: "ABC Construction", date: "2026-03-05", status: "Open" },
  { id: "INC-033", type: "First Aid", desc: "Minor hand laceration — rebar cutting", severity: "Low", contractor: "SteelWorks LLC", date: "2026-03-04", status: "Closed" },
  { id: "INC-032", type: "Near Miss", desc: "Crane load swing near walkway", severity: "High", contractor: "ABC Construction", date: "2026-03-03", status: "Under Investigation" },
  { id: "INC-031", type: "Environmental", desc: "Concrete wash into storm drain", severity: "Medium", contractor: "ABC Construction", date: "2026-03-01", status: "Corrective Action" },
];

const permits = [
  { id: "PTW-089", type: "Hot Works", location: "Level 6 — Steel Connections", contractor: "SteelWorks LLC", valid: "2026-03-06", status: "Active" },
  { id: "PTW-088", type: "Confined Space", location: "Basement 2 — Sump Pit", contractor: "XYZ Systems", valid: "2026-03-06", status: "Active" },
  { id: "PTW-087", type: "Crane Lift", location: "Zone A — Tower Crane 1", contractor: "ABC Construction", valid: "2026-03-06", status: "Active" },
  { id: "PTW-086", type: "Excavation", location: "External — Utility Trench", contractor: "CivilWorks Co", valid: "2026-03-05", status: "Expired" },
];

const sevColors: Record<string, string> = {
  High: "bg-red-500/10 text-red-400 border-red-500/20",
  Medium: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Low: "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function HSEPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Health, Safety & Environment</h1>
          <p className="text-xs text-gray-500 mt-1">Incident tracking, permits, toolbox talks, and HSE compliance</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-4 py-2 rounded bg-red-500/10 border border-red-500/30 text-red-400">+ Report Incident</button>
          <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">+ Issue Permit</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Safe Man Hours", value: "1.2M", color: "text-green-400" },
          { label: "LTI Free Days", value: "187", color: "text-green-400" },
          { label: "Incidents (MTD)", value: "4", color: "text-yellow-400" },
          { label: "Near Misses", value: "8", color: "text-orange-400" },
          { label: "Active Permits", value: "12", color: "text-blue-400" },
          { label: "Toolbox Talks", value: "23", color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Incidents */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-hai-steel">
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Recent Incidents</span>
          </div>
          <div className="divide-y divide-hai-primary/50">
            {incidents.map((inc) => (
              <div key={inc.id} className="px-4 py-3 hover:bg-hai-primary/30 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-blue-400">{inc.id}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded border ${sevColors[inc.severity]}`}>{inc.severity}</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{inc.type}</span>
                </div>
                <div className="text-xs text-gray-200">{inc.desc}</div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>{inc.contractor}</span>
                  <span>{inc.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permits */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
          <div className="px-4 py-3 border-b border-hai-steel">
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Permits to Work</span>
          </div>
          <div className="divide-y divide-hai-primary/50">
            {permits.map((p) => (
              <div key={p.id} className="px-4 py-3 hover:bg-hai-primary/30 cursor-pointer">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-mono text-blue-400">{p.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    p.status === "Active" ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"
                  }`}>{p.status}</span>
                </div>
                <div className="text-xs text-gray-200">{p.type} — {p.location}</div>
                <div className="flex justify-between text-[10px] text-gray-500 mt-1">
                  <span>{p.contractor}</span>
                  <span>Valid: {p.valid}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
