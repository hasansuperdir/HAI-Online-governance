"use client";

import { useState } from "react";

const disciplines = ["All", "Architectural", "Structural", "MEP-Electrical", "MEP-Mechanical", "MEP-Plumbing", "Fire", "Interior", "Landscape"];

interface Drawing {
  ref: string;
  title: string;
  discipline: string;
  revision: string;
  scale: string;
  status: string;
  statusColor: string;
  author: string;
  date: string;
  sheets: number;
}

const drawings: Drawing[] = [
  { ref: "A-GA-GF-001", title: "Ground Floor General Arrangement", discipline: "Architectural", revision: "C", scale: "1:100", status: "IFC", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", author: "HTCO", date: "01 Mar 2026", sheets: 1 },
  { ref: "A-GA-01-001", title: "Level 1 General Arrangement", discipline: "Architectural", revision: "B", scale: "1:100", status: "IFC", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", author: "HTCO", date: "28 Feb 2026", sheets: 1 },
  { ref: "A-GA-RF-001", title: "Roof Plan", discipline: "Architectural", revision: "A", scale: "1:200", status: "For Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", author: "HTCO", date: "05 Mar 2026", sheets: 1 },
  { ref: "S-FND-001", title: "Foundation Layout — Zones A-C", discipline: "Structural", revision: "D", scale: "1:50", status: "As-Built", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", author: "HTCO", date: "15 Feb 2026", sheets: 3 },
  { ref: "S-FRM-L5-001", title: "Level 5 Framing Plan", discipline: "Structural", revision: "B", scale: "1:100", status: "IFC", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", author: "HTCO", date: "25 Feb 2026", sheets: 2 },
  { ref: "S-DET-COL-012", title: "Column Details — Grid C12-C18", discipline: "Structural", revision: "C", scale: "1:25", status: "Shop Drawing Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", author: "Shelter Eng", date: "03 Mar 2026", sheets: 4 },
  { ref: "E-SLD-MSB-001", title: "Main Switchboard SLD", discipline: "MEP-Electrical", revision: "B", scale: "NTS", status: "IFC", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", author: "HTCO", date: "20 Feb 2026", sheets: 2 },
  { ref: "E-LTG-GF-001", title: "Ground Floor Lighting Layout", discipline: "MEP-Electrical", revision: "A", scale: "1:100", status: "For Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", author: "HTCO", date: "04 Mar 2026", sheets: 1 },
  { ref: "M-HVAC-L3-001", title: "Level 3 HVAC Ductwork Layout", discipline: "MEP-Mechanical", revision: "B", scale: "1:100", status: "IFC", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", author: "HTCO", date: "22 Feb 2026", sheets: 1 },
  { ref: "M-CHW-SCH-001", title: "Chilled Water Schematic", discipline: "MEP-Mechanical", revision: "C", scale: "NTS", status: "IFC", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", author: "HTCO", date: "18 Feb 2026", sheets: 1 },
  { ref: "P-DRN-B1-001", title: "Basement 1 Drainage Layout", discipline: "MEP-Plumbing", revision: "A", scale: "1:100", status: "For Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", author: "HTCO", date: "05 Mar 2026", sheets: 1 },
  { ref: "F-SPR-L4-001", title: "Level 4 Sprinkler Layout", discipline: "Fire", revision: "A", scale: "1:100", status: "Submitted", statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/20", author: "Al Khaleej", date: "06 Mar 2026", sheets: 1 },
  { ref: "I-FIN-LBY-001", title: "Main Lobby Finishes Plan", discipline: "Interior", revision: "B", scale: "1:50", status: "For Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", author: "HTCO", date: "04 Mar 2026", sheets: 2 },
  { ref: "L-GA-EXT-001", title: "External Landscaping Master Plan", discipline: "Landscape", revision: "A", scale: "1:500", status: "Preliminary", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20", author: "HTCO", date: "01 Mar 2026", sheets: 1 },
];

const revisionHistory = [
  { rev: "D", date: "15 Feb 2026", description: "As-built update per site survey", by: "Shelter Eng" },
  { rev: "C", date: "10 Jan 2026", description: "Revised per structural review comments", by: "HTCO" },
  { rev: "B", date: "15 Dec 2025", description: "Updated pile layout Zone C", by: "HTCO" },
  { rev: "A", date: "01 Nov 2025", description: "Initial issue for construction", by: "HTCO" },
];

export default function DrawingsPage() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = filter === "All" ? drawings : drawings.filter((d) => d.discipline === filter);
  const selectedDwg = drawings.find((d) => d.ref === selected);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Drawing Register</h1>
          <p className="text-xs text-gray-500 mt-1">Design drawings, shop drawings, as-builts — full revision control</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Upload Drawing
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Drawings", value: "1,247", color: "text-blue-400" },
          { label: "IFC Issued", value: "892", color: "text-green-400" },
          { label: "For Review", value: "124", color: "text-yellow-400" },
          { label: "Shop Drawings", value: "186", color: "text-purple-400" },
          { label: "As-Builts", value: "45", color: "text-blue-400" },
          { label: "Avg Rev Count", value: "2.8", color: "text-gray-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Discipline Filter */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {disciplines.map((d) => (
          <button
            key={d}
            onClick={() => setFilter(d)}
            className={`text-xs px-3 py-1.5 rounded border transition-colors ${
              filter === d ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500 hover:border-blue-500/20"
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        {/* Table */}
        <div className={`${selected ? "w-2/3" : "w-full"} bg-hai-navy border border-hai-steel rounded-lg overflow-hidden transition-all`}>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left px-4 py-2">Drawing No.</th>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Discipline</th>
                <th className="text-center px-4 py-2">Rev</th>
                <th className="text-left px-4 py-2">Scale</th>
                <th className="text-left px-4 py-2">Status</th>
                <th className="text-left px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d) => (
                <tr
                  key={d.ref}
                  onClick={() => setSelected(d.ref)}
                  className={`text-xs border-b border-hai-primary/30 last:border-0 cursor-pointer transition-colors ${
                    selected === d.ref ? "bg-blue-500/10" : "hover:bg-hai-primary/20"
                  }`}
                >
                  <td className="px-4 py-2.5 font-mono text-blue-400 font-medium">{d.ref}</td>
                  <td className="px-4 py-2.5 text-gray-300">{d.title}</td>
                  <td className="px-4 py-2.5 text-gray-400">{d.discipline}</td>
                  <td className="px-4 py-2.5 text-center"><span className="bg-hai-primary px-2 py-0.5 rounded text-gray-300 font-mono">{d.revision}</span></td>
                  <td className="px-4 py-2.5 text-gray-500">{d.scale}</td>
                  <td className="px-4 py-2.5"><span className={`text-[10px] px-2 py-0.5 rounded border ${d.statusColor}`}>{d.status}</span></td>
                  <td className="px-4 py-2.5 text-gray-500">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selected && selectedDwg && (
          <div className="w-1/3 bg-hai-navy border border-hai-steel rounded-lg p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-blue-400">{selectedDwg.ref}</span>
              <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-300 text-xs">Close</button>
            </div>
            <h3 className="text-sm font-semibold text-white mb-4">{selectedDwg.title}</h3>

            <div className="space-y-2 mb-4 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Discipline</span><span className="text-gray-300">{selectedDwg.discipline}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Current Rev</span><span className="text-gray-300 font-mono">{selectedDwg.revision}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Scale</span><span className="text-gray-300">{selectedDwg.scale}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Sheets</span><span className="text-gray-300">{selectedDwg.sheets}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Author</span><span className="text-gray-300">{selectedDwg.author}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Status</span><span className={`text-[10px] px-2 py-0.5 rounded border ${selectedDwg.statusColor}`}>{selectedDwg.status}</span></div>
            </div>

            {/* Preview placeholder */}
            <div className="bg-hai-primary border border-hai-steel rounded-lg h-32 flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xs">Drawing Preview</span>
            </div>

            {/* Revision History */}
            <div className="border-t border-hai-steel pt-3">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Revision History</div>
              <div className="space-y-2">
                {revisionHistory.map((r) => (
                  <div key={r.rev} className="flex items-start gap-2 text-[11px]">
                    <span className="font-mono text-blue-400 bg-hai-primary px-1.5 py-0.5 rounded">{r.rev}</span>
                    <div>
                      <div className="text-gray-300">{r.description}</div>
                      <div className="text-gray-500">{r.by} — {r.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <button className="text-xs px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 flex-1">View PDF</button>
              <button className="text-xs px-3 py-1.5 rounded bg-hai-primary border border-hai-steel text-gray-400 flex-1">Download</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
