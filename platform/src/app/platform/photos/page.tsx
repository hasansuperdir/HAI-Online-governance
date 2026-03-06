"use client";

import { useState } from "react";

const categories = ["All", "Progress", "Quality", "HSE", "Inspection", "Drone", "As-Built"];

interface Photo {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  takenBy: string;
  tags: string[];
}

const photos: Photo[] = [
  { id: "PHT-001", title: "Level 5 Slab Pour — Zone A Complete", category: "Progress", location: "Zone A — Level 5", date: "06 Mar 2026", takenBy: "Site Eng A", tags: ["concrete", "slab", "level-5"] },
  { id: "PHT-002", title: "Rebar Cage Inspection — Column C12", category: "Inspection", location: "Zone C — Level 3", date: "05 Mar 2026", takenBy: "QA Inspector", tags: ["rebar", "column", "inspection"] },
  { id: "PHT-003", title: "Scaffolding Safety Audit — Zone C", category: "HSE", location: "Zone C — Exterior", date: "05 Mar 2026", takenBy: "HSE Officer", tags: ["scaffolding", "safety", "audit"] },
  { id: "PHT-004", title: "MEP Rough-In — Level 4 Ceiling Space", category: "Progress", location: "Zone B — Level 4", date: "04 Mar 2026", takenBy: "MEP Supervisor", tags: ["mep", "ductwork", "rough-in"] },
  { id: "PHT-005", title: "Waterproofing Application — Basement 1", category: "Quality", location: "Basement 1", date: "04 Mar 2026", takenBy: "QA Inspector", tags: ["waterproofing", "basement"] },
  { id: "PHT-006", title: "Aerial Site Overview — March 2026", category: "Drone", location: "Full Site", date: "03 Mar 2026", takenBy: "Drone Operator", tags: ["aerial", "drone", "overview"] },
  { id: "PHT-007", title: "Fire Door Installation — Stair A Level 4", category: "Inspection", location: "Zone A — Level 4", date: "03 Mar 2026", takenBy: "Fire Inspector", tags: ["fire-door", "installation"] },
  { id: "PHT-008", title: "Facade Panel Mock-up — Main Entrance", category: "Quality", location: "Exterior — Main Entrance", date: "02 Mar 2026", takenBy: "Design Manager", tags: ["facade", "mock-up"] },
  { id: "PHT-009", title: "NCR-088 Evidence — Missing Fire Stops L4", category: "Quality", location: "Zone B — Level 4 Riser", date: "02 Mar 2026", takenBy: "QA Inspector", tags: ["ncr", "fire-stops", "defect"] },
  { id: "PHT-010", title: "Foundation As-Built Survey — Zone C", category: "As-Built", location: "Zone C — Foundations", date: "01 Mar 2026", takenBy: "Survey Team", tags: ["foundation", "as-built", "survey"] },
  { id: "PHT-011", title: "Concrete Cube Test — Batch 2026-C045", category: "Quality", location: "Site Lab", date: "01 Mar 2026", takenBy: "Lab Technician", tags: ["concrete", "test", "quality"] },
  { id: "PHT-012", title: "Weekly Progress — West Elevation", category: "Progress", location: "Exterior — West", date: "28 Feb 2026", takenBy: "Site Eng B", tags: ["progress", "elevation", "weekly"] },
];

export default function PhotosPage() {
  const [filter, setFilter] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = filter === "All" ? photos : photos.filter((p) => p.category === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Site Photos</h1>
          <p className="text-xs text-gray-500 mt-1">Construction progress photos, inspections, HSE evidence, and drone captures</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Upload Photos
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Photos", value: "2,847", color: "text-blue-400" },
          { label: "This Month", value: "156", color: "text-green-400" },
          { label: "Progress", value: "1,203", color: "text-blue-400" },
          { label: "Inspections", value: "842", color: "text-purple-400" },
          { label: "HSE", value: "324", color: "text-yellow-400" },
          { label: "Drone Captures", value: "48", color: "text-blue-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                filter === c ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500 hover:border-blue-500/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-1">
          <button onClick={() => setViewMode("grid")} className={`text-xs px-3 py-1.5 rounded border ${viewMode === "grid" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500"}`}>Grid</button>
          <button onClick={() => setViewMode("list")} className={`text-xs px-3 py-1.5 rounded border ${viewMode === "list" ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500"}`}>List</button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <div className="grid grid-cols-4 gap-3">
          {filtered.map((p) => (
            <div key={p.id} className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden hover:border-blue-500/30 transition-all cursor-pointer">
              {/* Placeholder thumbnail */}
              <div className="h-36 bg-hai-primary flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl mb-1">
                    {p.category === "Drone" ? "🛸" : p.category === "HSE" ? "⚠" : p.category === "Inspection" ? "🔍" : "📷"}
                  </div>
                  <div className="text-[10px] text-gray-500">{p.category}</div>
                </div>
              </div>
              <div className="p-3">
                <div className="text-xs text-gray-200 font-medium mb-1 line-clamp-2">{p.title}</div>
                <div className="flex items-center justify-between text-[10px] text-gray-500">
                  <span>{p.location}</span>
                  <span>{p.date}</span>
                </div>
                <div className="flex gap-1 mt-2 flex-wrap">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="text-[9px] px-1.5 py-0.5 rounded bg-hai-primary border border-hai-steel text-gray-400">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left px-4 py-2">ID</th>
                <th className="text-left px-4 py-2">Title</th>
                <th className="text-left px-4 py-2">Category</th>
                <th className="text-left px-4 py-2">Location</th>
                <th className="text-left px-4 py-2">Taken By</th>
                <th className="text-left px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer">
                  <td className="px-4 py-2.5 font-mono text-blue-400">{p.id}</td>
                  <td className="px-4 py-2.5 text-gray-300">{p.title}</td>
                  <td className="px-4 py-2.5"><span className="text-[10px] px-2 py-0.5 rounded bg-hai-primary border border-hai-steel text-gray-400">{p.category}</span></td>
                  <td className="px-4 py-2.5 text-gray-400">{p.location}</td>
                  <td className="px-4 py-2.5 text-gray-400">{p.takenBy}</td>
                  <td className="px-4 py-2.5 text-gray-500">{p.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
