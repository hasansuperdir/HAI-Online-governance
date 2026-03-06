"use client";

import { useState } from "react";

type PathMode = "all" | "critical" | "longest";

interface Activity {
  id: string;
  name: string;
  start: number; // week number
  duration: number; // weeks
  progress: number; // 0-100
  isCritical: boolean;
  isLongest: boolean;
  predecessor?: string;
  resource: string;
}

const activities: Activity[] = [
  // Phase 1: Substructure
  { id: "A1.1", name: "Site Preparation & Enabling", start: 0, duration: 4, progress: 100, isCritical: true, isLongest: true, resource: "Shelter" },
  { id: "A1.2", name: "Piling Works", start: 4, duration: 8, progress: 100, isCritical: true, isLongest: true, predecessor: "A1.1", resource: "Piling Sub" },
  { id: "A1.3", name: "Pile Cap & Raft Foundation", start: 12, duration: 6, progress: 100, isCritical: true, isLongest: true, predecessor: "A1.2", resource: "Shelter" },
  { id: "A1.4", name: "Basement Waterproofing", start: 14, duration: 4, progress: 100, isCritical: false, isLongest: false, predecessor: "A1.2", resource: "WP Sub" },
  // Phase 2: Superstructure
  { id: "A2.1", name: "Ground Floor Slab", start: 18, duration: 3, progress: 100, isCritical: true, isLongest: true, predecessor: "A1.3", resource: "Shelter" },
  { id: "A2.2", name: "Structural Frame (Levels 1-5)", start: 21, duration: 10, progress: 65, isCritical: true, isLongest: true, predecessor: "A2.1", resource: "Shelter" },
  { id: "A2.3", name: "Structural Frame (Levels 6-10)", start: 31, duration: 10, progress: 15, isCritical: true, isLongest: true, predecessor: "A2.2", resource: "Shelter" },
  { id: "A2.4", name: "Structural Frame (Roof)", start: 41, duration: 4, progress: 0, isCritical: true, isLongest: true, predecessor: "A2.3", resource: "Shelter" },
  // Phase 3: MEP
  { id: "A3.1", name: "MEP Rough-in (Levels 1-5)", start: 26, duration: 8, progress: 40, isCritical: false, isLongest: true, predecessor: "A2.2", resource: "MEP Sub" },
  { id: "A3.2", name: "MEP Rough-in (Levels 6-10)", start: 36, duration: 8, progress: 0, isCritical: false, isLongest: true, predecessor: "A2.3", resource: "MEP Sub" },
  { id: "A3.3", name: "MEP Main Plant Installation", start: 38, duration: 6, progress: 0, isCritical: false, isLongest: false, predecessor: "A3.1", resource: "MEP Sub" },
  // Phase 4: Envelope
  { id: "A4.1", name: "Facade Installation (Levels 1-5)", start: 28, duration: 10, progress: 30, isCritical: false, isLongest: false, predecessor: "A2.2", resource: "Facade Sub" },
  { id: "A4.2", name: "Facade Installation (Levels 6-10)", start: 38, duration: 10, progress: 0, isCritical: false, isLongest: false, predecessor: "A2.3", resource: "Facade Sub" },
  { id: "A4.3", name: "Roof Waterproofing & Insulation", start: 45, duration: 3, progress: 0, isCritical: true, isLongest: true, predecessor: "A2.4", resource: "WP Sub" },
  // Phase 5: Fit-out
  { id: "A5.1", name: "Interior Fit-out (Levels 1-5)", start: 36, duration: 12, progress: 5, isCritical: false, isLongest: false, predecessor: "A3.1", resource: "Fitout Sub" },
  { id: "A5.2", name: "Interior Fit-out (Levels 6-10)", start: 46, duration: 12, progress: 0, isCritical: false, isLongest: true, predecessor: "A3.2", resource: "Fitout Sub" },
  { id: "A5.3", name: "Common Areas & Lobbies", start: 50, duration: 8, progress: 0, isCritical: false, isLongest: false, predecessor: "A5.1", resource: "Fitout Sub" },
  // Phase 6: Testing & Commissioning
  { id: "A6.1", name: "MEP Testing & Commissioning", start: 56, duration: 6, progress: 0, isCritical: true, isLongest: true, predecessor: "A5.2", resource: "MEP Sub" },
  { id: "A6.2", name: "Fire & Life Safety Testing", start: 58, duration: 4, progress: 0, isCritical: true, isLongest: true, predecessor: "A6.1", resource: "FLS Sub" },
  { id: "A6.3", name: "BMS Integration & Testing", start: 60, duration: 3, progress: 0, isCritical: false, isLongest: false, predecessor: "A6.1", resource: "BMS Sub" },
  // Phase 7: Completion
  { id: "A7.1", name: "Snagging & Defects", start: 62, duration: 4, progress: 0, isCritical: true, isLongest: true, predecessor: "A6.2", resource: "Shelter" },
  { id: "A7.2", name: "Authority Inspections (CD, QCDD)", start: 64, duration: 3, progress: 0, isCritical: true, isLongest: true, predecessor: "A7.1", resource: "PM" },
  { id: "A7.3", name: "Practical Completion", start: 67, duration: 1, progress: 0, isCritical: true, isLongest: true, predecessor: "A7.2", resource: "PM" },
];

const totalWeeks = 70;
const currentWeek = 28; // ~7 months in

export default function SchedulePage() {
  const [pathMode, setPathMode] = useState<PathMode>("all");
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const filtered = activities.filter((a) => {
    if (pathMode === "critical") return a.isCritical;
    if (pathMode === "longest") return a.isLongest;
    return true;
  });

  const selectedAct = activities.find((a) => a.id === selectedActivity);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Schedule Management</h1>
          <p className="text-xs text-gray-500 mt-1">Gantt chart, activities, critical & longest path analysis</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 uppercase tracking-wider mr-2">View:</span>
          {(["all", "critical", "longest"] as PathMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setPathMode(mode)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                pathMode === mode
                  ? mode === "critical"
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : mode === "longest"
                    ? "bg-orange-500/10 border-orange-500/30 text-orange-400"
                    : "bg-blue-500/10 border-blue-500/30 text-blue-400"
                  : "bg-hai-navy border-hai-steel text-gray-500 hover:text-gray-300"
              }`}
            >
              {mode === "all" ? "All Activities" : mode === "critical" ? "Critical Path" : "Longest Path"}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Activities", value: activities.length.toString(), color: "text-blue-400" },
          { label: "Critical Path Items", value: activities.filter((a) => a.isCritical).length.toString(), color: "text-red-400" },
          { label: "Overall Progress", value: `${Math.round(activities.reduce((s, a) => s + a.progress, 0) / activities.length)}%`, color: "text-green-400" },
          { label: "Current Week", value: `W${currentWeek}`, color: "text-yellow-400" },
          { label: "Completion Target", value: `W${totalWeeks}`, color: "text-gray-300" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Gantt Chart */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg p-5 mb-6 overflow-x-auto">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
          Gantt Chart — Programme Schedule
        </div>

        {/* Timeline header */}
        <div className="flex mb-2 ml-[260px]">
          {Array.from({ length: Math.ceil(totalWeeks / 4) }, (_, i) => (
            <div
              key={i}
              className="text-[9px] text-gray-600 border-l border-hai-steel/30 pl-1"
              style={{ width: `${(4 / totalWeeks) * 100}%`, minWidth: 40 }}
            >
              M{i + 1}
            </div>
          ))}
        </div>

        {/* Current week indicator line */}
        <div className="relative">
          <div
            className="absolute top-0 bottom-0 w-px bg-yellow-500/50 z-10"
            style={{ left: `calc(260px + ${(currentWeek / totalWeeks) * 100}% * (100% - 260px) / 100%)` }}
          />

          {/* Activities */}
          <div className="space-y-1">
            {filtered.map((act) => {
              const leftPct = (act.start / totalWeeks) * 100;
              const widthPct = (act.duration / totalWeeks) * 100;
              const isSelected = selectedActivity === act.id;

              return (
                <div
                  key={act.id}
                  className={`flex items-center h-7 cursor-pointer group ${isSelected ? "bg-blue-500/5 -mx-2 px-2 rounded" : ""}`}
                  onClick={() => setSelectedActivity(isSelected ? null : act.id)}
                >
                  {/* Label */}
                  <div className="w-[260px] flex-shrink-0 flex items-center gap-2 pr-3">
                    <span className="text-[9px] text-gray-600 w-8 flex-shrink-0">{act.id}</span>
                    <span className={`text-[11px] truncate ${
                      act.isCritical && pathMode !== "longest" ? "text-red-300" :
                      act.isLongest && pathMode === "longest" ? "text-orange-300" :
                      "text-gray-400"
                    } group-hover:text-white transition-colors`}>
                      {act.name}
                    </span>
                  </div>

                  {/* Bar area */}
                  <div className="flex-1 relative h-full">
                    {/* Background bar */}
                    <div
                      className={`absolute top-1 h-5 rounded-sm border transition-all ${
                        act.isCritical
                          ? "bg-red-500/20 border-red-500/40"
                          : "bg-blue-500/15 border-blue-500/30"
                      } ${isSelected ? "ring-1 ring-blue-400" : ""}`}
                      style={{ left: `${leftPct}%`, width: `${Math.max(widthPct, 1)}%` }}
                    >
                      {/* Progress fill */}
                      {act.progress > 0 && (
                        <div
                          className={`h-full rounded-sm ${act.isCritical ? "bg-red-500/60" : "bg-blue-500/50"}`}
                          style={{ width: `${act.progress}%` }}
                        />
                      )}
                      {/* Progress label */}
                      {widthPct > 3 && (
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white/70 font-medium">
                          {act.progress}%
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mt-4 pt-3 border-t border-hai-steel/30">
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <div className="w-4 h-2.5 bg-red-500/40 border border-red-500/60 rounded-sm" /> Critical Path
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <div className="w-4 h-2.5 bg-blue-500/30 border border-blue-500/40 rounded-sm" /> Non-Critical
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
            <div className="w-px h-4 bg-yellow-500" /> Current Week (W{currentWeek})
          </div>
        </div>
      </div>

      {/* Activity Details (when selected) */}
      {selectedAct && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Activity Detail — {selectedAct.id}
            </div>
            <button onClick={() => setSelectedActivity(null)} className="text-xs text-gray-500 hover:text-gray-300">
              Close
            </button>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <div>
              <div className="text-[10px] text-gray-600 uppercase">Name</div>
              <div className="text-xs text-gray-200 mt-0.5 font-medium">{selectedAct.name}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-600 uppercase">Start</div>
              <div className="text-xs text-gray-300 mt-0.5">Week {selectedAct.start}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-600 uppercase">Duration</div>
              <div className="text-xs text-gray-300 mt-0.5">{selectedAct.duration} weeks</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-600 uppercase">Progress</div>
              <div className={`text-xs mt-0.5 font-medium ${selectedAct.progress >= 100 ? "text-green-400" : selectedAct.progress > 0 ? "text-yellow-400" : "text-gray-500"}`}>
                {selectedAct.progress}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-gray-600 uppercase">Resource</div>
              <div className="text-xs text-gray-300 mt-0.5">{selectedAct.resource}</div>
            </div>
            <div>
              <div className="text-[10px] text-gray-600 uppercase">Path</div>
              <div className="flex gap-1 mt-0.5">
                {selectedAct.isCritical && <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">Critical</span>}
                {selectedAct.isLongest && <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">Longest</span>}
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-2 bg-hai-primary rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all ${selectedAct.isCritical ? "bg-red-500" : "bg-blue-500"}`}
              style={{ width: `${selectedAct.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Activity Table */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
        <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
          Activity Register ({filtered.length} activities)
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
              <th className="text-left pb-2">ID</th>
              <th className="text-left pb-2">Activity</th>
              <th className="text-left pb-2">Start</th>
              <th className="text-left pb-2">Duration</th>
              <th className="text-left pb-2">Progress</th>
              <th className="text-left pb-2">Resource</th>
              <th className="text-left pb-2">Path</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((act) => (
              <tr
                key={act.id}
                className={`text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer ${
                  selectedActivity === act.id ? "bg-blue-500/10" : ""
                }`}
                onClick={() => setSelectedActivity(selectedActivity === act.id ? null : act.id)}
              >
                <td className="py-2.5 text-gray-400 font-mono">{act.id}</td>
                <td className="py-2.5 text-gray-300">{act.name}</td>
                <td className="py-2.5 text-gray-400">W{act.start}</td>
                <td className="py-2.5 text-gray-400">{act.duration}w</td>
                <td className="py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-hai-primary rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${act.progress >= 100 ? "bg-green-500" : act.progress > 0 ? "bg-blue-500" : "bg-gray-700"}`}
                        style={{ width: `${act.progress}%` }}
                      />
                    </div>
                    <span className="text-gray-400">{act.progress}%</span>
                  </div>
                </td>
                <td className="py-2.5 text-gray-400">{act.resource}</td>
                <td className="py-2.5">
                  <div className="flex gap-1">
                    {act.isCritical && <span className="text-[9px] px-1.5 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20">CP</span>}
                    {act.isLongest && <span className="text-[9px] px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-400 border border-orange-500/20">LP</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
