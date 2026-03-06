"use client";

import { useState } from "react";

const zones = ["All", "Zone A", "Zone B", "Zone C", "Basement", "Exterior"];
const statuses = ["All", "Open", "Rectified", "Verified", "Closed"];

interface PunchItem {
  id: string;
  zone: string;
  location: string;
  discipline: string;
  description: string;
  contractor: string;
  priority: string;
  priorityColor: string;
  raisedDate: string;
  dueDate: string;
  status: string;
  statusColor: string;
  photos: number;
}

const punchItems: PunchItem[] = [
  { id: "PL-001", zone: "Zone A", location: "Level 5 — Corridor C5-01", discipline: "Architectural", description: "Ceiling tile misaligned — 3 panels near column C12", contractor: "Desert Interiors", priority: "Minor", priorityColor: "text-yellow-400", raisedDate: "04 Mar 2026", dueDate: "11 Mar 2026", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", photos: 2 },
  { id: "PL-002", zone: "Zone A", location: "Level 5 — Office 5-A03", discipline: "MEP-Electrical", description: "Light switch plate not flush with wall finish", contractor: "Gulf MEP Solutions", priority: "Minor", priorityColor: "text-yellow-400", raisedDate: "04 Mar 2026", dueDate: "11 Mar 2026", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", photos: 1 },
  { id: "PL-003", zone: "Zone B", location: "Level 3 — Washroom M3-02", discipline: "MEP-Plumbing", description: "Water stain on ceiling — possible leak from above", contractor: "Gulf MEP Solutions", priority: "Major", priorityColor: "text-orange-400", raisedDate: "03 Mar 2026", dueDate: "07 Mar 2026", status: "Rectified", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", photos: 3 },
  { id: "PL-004", zone: "Zone A", location: "Level 4 — Fire Escape Stair A", discipline: "Fire", description: "Fire door closer not functioning — door remains open", contractor: "Al Khaleej Fire", priority: "Critical", priorityColor: "text-red-400", raisedDate: "02 Mar 2026", dueDate: "04 Mar 2026", status: "Verified", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", photos: 2 },
  { id: "PL-005", zone: "Zone C", location: "Level 2 — Reception Area", discipline: "Interior", description: "Marble floor tile chipped at entrance threshold", contractor: "Desert Interiors", priority: "Minor", priorityColor: "text-yellow-400", raisedDate: "01 Mar 2026", dueDate: "08 Mar 2026", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", photos: 1 },
  { id: "PL-006", zone: "Basement", location: "B1 — Car Park Bay 45-52", discipline: "Structural", description: "Crack in floor slab >0.3mm width — structural review needed", contractor: "Shelter Engineering", priority: "Critical", priorityColor: "text-red-400", raisedDate: "28 Feb 2026", dueDate: "03 Mar 2026", status: "Rectified", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20", photos: 4 },
  { id: "PL-007", zone: "Zone B", location: "Level 6 — Plant Room PR-6A", discipline: "MEP-Mechanical", description: "AHU vibration isolator missing on unit AHU-6A-01", contractor: "Gulf MEP Solutions", priority: "Major", priorityColor: "text-orange-400", raisedDate: "27 Feb 2026", dueDate: "06 Mar 2026", status: "Closed", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20", photos: 2 },
  { id: "PL-008", zone: "Exterior", location: "Ground Floor — Main Entrance Canopy", discipline: "Architectural", description: "Sealant joint incomplete between glass canopy and facade", contractor: "Al Khaleej Facades", priority: "Major", priorityColor: "text-orange-400", raisedDate: "26 Feb 2026", dueDate: "05 Mar 2026", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", photos: 3 },
  { id: "PL-009", zone: "Zone A", location: "Level 7 — Corridor C7-02", discipline: "MEP-Electrical", description: "Emergency light not illuminating during test", contractor: "Gulf MEP Solutions", priority: "Critical", priorityColor: "text-red-400", raisedDate: "25 Feb 2026", dueDate: "28 Feb 2026", status: "Closed", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20", photos: 1 },
];

export default function PunchListPage() {
  const [zoneFilter, setZoneFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = punchItems.filter((p) => {
    if (zoneFilter !== "All" && p.zone !== zoneFilter) return false;
    if (statusFilter !== "All" && p.status !== statusFilter) return false;
    return true;
  });

  const open = punchItems.filter((p) => p.status === "Open").length;
  const rectified = punchItems.filter((p) => p.status === "Rectified").length;
  const closed = punchItems.filter((p) => p.status === "Closed" || p.status === "Verified").length;
  const critical = punchItems.filter((p) => p.priority === "Critical" && p.status === "Open").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Punch List</h1>
          <p className="text-xs text-gray-500 mt-1">Deficiency tracking, snag lists, and completion verification</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Add Punch Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Items", value: punchItems.length.toString(), color: "text-blue-400" },
          { label: "Open", value: open.toString(), color: "text-red-400" },
          { label: "Rectified (Pending Verify)", value: rectified.toString(), color: "text-blue-400" },
          { label: "Closed / Verified", value: closed.toString(), color: "text-green-400" },
          { label: "Critical Open", value: critical.toString(), color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{s.label}</div>
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-[10px] text-gray-500 uppercase">Zone:</span>
          {zones.map((z) => (
            <button key={z} onClick={() => setZoneFilter(z)} className={`text-xs px-3 py-1 rounded border transition-colors ${zoneFilter === z ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500 hover:border-blue-500/20"}`}>
              {z}
            </button>
          ))}
        </div>
        <div className="flex gap-2 items-center">
          <span className="text-[10px] text-gray-500 uppercase">Status:</span>
          {statuses.map((s) => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`text-xs px-3 py-1 rounded border transition-colors ${statusFilter === s ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500 hover:border-blue-500/20"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
              <th className="text-left px-4 py-2">ID</th>
              <th className="text-left px-4 py-2">Zone / Location</th>
              <th className="text-left px-4 py-2">Discipline</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Contractor</th>
              <th className="text-left px-4 py-2">Priority</th>
              <th className="text-left px-4 py-2">Due</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className={`text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer ${p.priority === "Critical" && p.status === "Open" ? "bg-red-500/5" : ""}`}>
                <td className="px-4 py-2.5 font-mono text-blue-400 font-medium">{p.id}</td>
                <td className="px-4 py-2.5">
                  <div className="text-gray-300">{p.zone}</div>
                  <div className="text-[10px] text-gray-500">{p.location}</div>
                </td>
                <td className="px-4 py-2.5 text-gray-400">{p.discipline}</td>
                <td className="px-4 py-2.5 text-gray-300 max-w-xs">{p.description}</td>
                <td className="px-4 py-2.5 text-gray-400">{p.contractor}</td>
                <td className="px-4 py-2.5"><span className={`text-xs font-medium ${p.priorityColor}`}>{p.priority}</span></td>
                <td className="px-4 py-2.5 text-gray-400">{p.dueDate}</td>
                <td className="px-4 py-2.5"><span className={`text-[10px] px-2 py-0.5 rounded border ${p.statusColor}`}>{p.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
