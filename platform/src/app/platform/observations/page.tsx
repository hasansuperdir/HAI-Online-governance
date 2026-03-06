"use client";

import { useState } from "react";

const categories = ["All", "Quality", "Safety", "Commissioning", "Warranty", "Work-to-Complete"];
const statuses = ["All", "Open", "In Progress", "Resolved", "Closed"];

interface Observation {
  id: string;
  category: string;
  title: string;
  location: string;
  description: string;
  contractor: string;
  priority: string;
  priorityColor: string;
  raisedBy: string;
  raisedDate: string;
  dueDate: string;
  status: string;
  statusColor: string;
  photos: number;
}

const observations: Observation[] = [
  { id: "OBS-001", category: "Quality", title: "Concrete surface finish below specification", location: "Zone A — Level 5 Slab", description: "Surface roughness exceeds tolerance in area near column C12. Grinding may be required before floor finish application.", contractor: "Shelter Engineering", priority: "Major", priorityColor: "text-orange-400", raisedBy: "QA Inspector", raisedDate: "06 Mar 2026", dueDate: "13 Mar 2026", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", photos: 3 },
  { id: "OBS-002", category: "Safety", title: "Inadequate edge protection — open slab edge", location: "Zone C — Level 6", description: "Temporary edge protection removed for formwork stripping and not reinstated. Fall hazard — 18m drop.", contractor: "Shelter Engineering", priority: "Critical", priorityColor: "text-red-400", raisedBy: "HSE Officer", raisedDate: "06 Mar 2026", dueDate: "06 Mar 2026", status: "Resolved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20", photos: 2 },
  { id: "OBS-003", category: "Quality", title: "MEP sleeve misalignment — Level 4 slab", location: "Zone B — Level 4, Grid D5-D8", description: "3 MEP sleeves found 150mm off from design location. Coordination issue between structural and MEP models.", contractor: "Gulf MEP Solutions", priority: "Major", priorityColor: "text-orange-400", raisedBy: "Resident Eng", raisedDate: "05 Mar 2026", dueDate: "10 Mar 2026", status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", photos: 4 },
  { id: "OBS-004", category: "Safety", title: "Housekeeping — debris accumulation in stairwell", location: "Zone A — Stair Core B, Levels 3-5", description: "Accumulated construction debris in stairwell restricting egress route. Potential fire and trip hazard.", contractor: "Shelter Engineering", priority: "Minor", priorityColor: "text-yellow-400", raisedBy: "HSE Officer", raisedDate: "05 Mar 2026", dueDate: "06 Mar 2026", status: "Closed", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20", photos: 1 },
  { id: "OBS-005", category: "Commissioning", title: "AHU-4A vibration levels above threshold", location: "Zone A — Level 4 Plant Room", description: "Vibration reading at 4.2 mm/s exceeds 2.5 mm/s limit. Isolator pads may need replacement.", contractor: "Gulf MEP Solutions", priority: "Major", priorityColor: "text-orange-400", raisedBy: "Commissioning Eng", raisedDate: "04 Mar 2026", dueDate: "11 Mar 2026", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", photos: 1 },
  { id: "OBS-006", category: "Quality", title: "Waterproofing membrane lapping insufficient", location: "Basement 1 — External Wall Zone C", description: "Membrane lap observed at 80mm, specification requires minimum 150mm. Risk of water ingress.", contractor: "Shelter Engineering", priority: "Critical", priorityColor: "text-red-400", raisedBy: "QA Inspector", raisedDate: "04 Mar 2026", dueDate: "07 Mar 2026", status: "In Progress", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20", photos: 5 },
  { id: "OBS-007", category: "Work-to-Complete", title: "Ceiling grid installation incomplete — Level 3 corridor", location: "Zone B — Level 3 Corridor C3-01", description: "Ceiling grid T-bar installation 60% complete. Tiles and light fittings pending. Required for Level 3 handover.", contractor: "Desert Interiors", priority: "Minor", priorityColor: "text-yellow-400", raisedBy: "Project Eng", raisedDate: "03 Mar 2026", dueDate: "15 Mar 2026", status: "Open", statusColor: "text-red-400 bg-red-500/10 border-red-500/20", photos: 2 },
  { id: "OBS-008", category: "Safety", title: "Crane exclusion zone not demarcated", location: "Zone A — Ground Level, TC-01 radius", description: "Swing radius exclusion zone for Tower Crane 01 not marked with barriers during concrete pour.", contractor: "Shelter Engineering", priority: "Major", priorityColor: "text-orange-400", raisedBy: "HSE Officer", raisedDate: "02 Mar 2026", dueDate: "03 Mar 2026", status: "Closed", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20", photos: 2 },
];

export default function ObservationsPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = observations.filter((o) => {
    if (categoryFilter !== "All" && o.category !== categoryFilter) return false;
    if (statusFilter !== "All" && o.status !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Observations</h1>
          <p className="text-xs text-gray-500 mt-1">Quality, safety, commissioning, and work-to-complete observations</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Log Observation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Observations", value: observations.length.toString(), color: "text-blue-400" },
          { label: "Open", value: observations.filter((o) => o.status === "Open").length.toString(), color: "text-red-400" },
          { label: "In Progress", value: observations.filter((o) => o.status === "In Progress").length.toString(), color: "text-yellow-400" },
          { label: "Closed", value: observations.filter((o) => o.status === "Closed" || o.status === "Resolved").length.toString(), color: "text-green-400" },
          { label: "Quality", value: observations.filter((o) => o.category === "Quality").length.toString(), color: "text-blue-400" },
          { label: "Safety", value: observations.filter((o) => o.category === "Safety").length.toString(), color: "text-yellow-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-4">
        <div className="flex gap-2 items-center">
          <span className="text-[10px] text-gray-500 uppercase">Category:</span>
          {categories.map((c) => (
            <button key={c} onClick={() => setCategoryFilter(c)} className={`text-xs px-3 py-1 rounded border transition-colors ${categoryFilter === c ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500 hover:border-blue-500/20"}`}>
              {c}
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

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map((o) => (
          <div key={o.id} className={`bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-blue-500/30 transition-all cursor-pointer ${o.priority === "Critical" && o.status === "Open" ? "border-l-2 border-l-red-400" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-blue-400">{o.id}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-hai-primary border border-hai-steel text-gray-400">{o.category}</span>
                  <span className={`text-xs font-medium ${o.priorityColor}`}>{o.priority}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${o.statusColor}`}>{o.status}</span>
                </div>
                <div className="text-sm text-white font-medium mb-1">{o.title}</div>
                <div className="text-xs text-gray-400 mb-2">{o.description}</div>
                <div className="flex items-center gap-4 text-[10px] text-gray-500">
                  <span>{o.location}</span>
                  <span>Contractor: {o.contractor}</span>
                  <span>Raised: {o.raisedDate}</span>
                  <span>Due: {o.dueDate}</span>
                  <span>{o.photos} photo{o.photos !== 1 ? "s" : ""}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
