"use client";

import { useState } from "react";

interface DailyLogEntry {
  date: string;
  weather: { condition: string; tempHigh: string; tempLow: string; humidity: string; wind: string };
  manpower: { contractor: string; count: number }[];
  totalManpower: number;
  workPerformed: string[];
  delays: string[];
  deliveries: { item: string; supplier: string; qty: string }[];
  equipment: { name: string; hours: number; status: string }[];
  visitors: { name: string; company: string; purpose: string }[];
  safetyNotes: string[];
  createdBy: string;
  status: string;
  statusColor: string;
}

const dailyLogs: DailyLogEntry[] = [
  {
    date: "06 Mar 2026",
    weather: { condition: "Sunny", tempHigh: "32°C", tempLow: "22°C", humidity: "45%", wind: "12 km/h NW" },
    manpower: [
      { contractor: "Shelter Engineering", count: 145 },
      { contractor: "Gulf MEP Solutions", count: 62 },
      { contractor: "Al Khaleej Facades", count: 28 },
      { contractor: "Desert Interiors", count: 18 },
      { contractor: "HAI Group / HTCO", count: 12 },
    ],
    totalManpower: 265,
    workPerformed: [
      "Level 5 slab concrete pour — Zone A completed (240 m³)",
      "Rebar fixing Level 6 columns — Zone B, Grid C12-C18",
      "MEP rough-in continuation — Level 4 ceiling void",
      "Facade panel installation — Level 3-4, West elevation",
      "Interior fit-out mobilization — Level 2 common areas",
    ],
    delays: [
      "Concrete pump breakdown — 45 min delay on Level 5 pour (pump replaced)",
    ],
    deliveries: [
      { item: "Structural Steel — Beams Level 7", supplier: "Qatar Steel", qty: "48 tonnes" },
      { item: "FCU Units — Level 4-5", supplier: "Daikin Gulf", qty: "24 units" },
      { item: "Ceramic Tiles — Lobby Finishes", supplier: "RAK Ceramics", qty: "320 m²" },
    ],
    equipment: [
      { name: "Tower Crane TC-01", hours: 10, status: "Operational" },
      { name: "Tower Crane TC-02", hours: 8, status: "Operational" },
      { name: "Concrete Pump CP-01", hours: 6, status: "Repaired" },
      { name: "Mobile Crane 50T", hours: 4, status: "Operational" },
      { name: "Telehandler TH-01", hours: 9, status: "Operational" },
    ],
    visitors: [
      { name: "Eng. Abdullah Rashid", company: "QCDD", purpose: "Building inspection — Level 3-4" },
      { name: "Ahmed Al-Thani", company: "Client", purpose: "Monthly site visit" },
    ],
    safetyNotes: [
      "Toolbox talk conducted — Working at heights (Zone C)",
      "No incidents reported",
      "HSE audit scheduled for 10 Mar 2026",
    ],
    createdBy: "Site Eng A",
    status: "Submitted",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
  },
  {
    date: "05 Mar 2026",
    weather: { condition: "Partly Cloudy", tempHigh: "30°C", tempLow: "21°C", humidity: "52%", wind: "8 km/h NE" },
    manpower: [
      { contractor: "Shelter Engineering", count: 152 },
      { contractor: "Gulf MEP Solutions", count: 58 },
      { contractor: "Al Khaleej Facades", count: 30 },
      { contractor: "Desert Interiors", count: 15 },
      { contractor: "HAI Group / HTCO", count: 12 },
    ],
    totalManpower: 267,
    workPerformed: [
      "Level 5 slab formwork completion — Zone A",
      "Rebar inspection passed — Column Grid C12 (IR-155 conditional)",
      "MEP pressure testing — Zone B Level 3 (failed — rework required)",
      "Facade mock-up review with Design Manager",
    ],
    delays: [
      "MEP rework on Zone B pressure test — 1 day impact on MEP programme",
    ],
    deliveries: [
      { item: "Reinforcement Steel — Level 6", supplier: "Qatar Steel", qty: "32 tonnes" },
    ],
    equipment: [
      { name: "Tower Crane TC-01", hours: 10, status: "Operational" },
      { name: "Tower Crane TC-02", hours: 9, status: "Operational" },
      { name: "Concrete Pump CP-01", hours: 0, status: "Breakdown" },
    ],
    visitors: [],
    safetyNotes: [
      "Near miss reported — unsecured scaffolding board Zone C (INC-034)",
      "Toolbox talk — Housekeeping and material storage",
    ],
    createdBy: "Site Eng A",
    status: "Approved",
    statusColor: "text-green-400 bg-green-500/10 border-green-500/20",
  },
];

export default function DailyLogPage() {
  const [selectedDate, setSelectedDate] = useState(0);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    weather: true, manpower: true, work: true, delays: true, deliveries: true, equipment: false, visitors: false, safety: true,
  });

  const log = dailyLogs[selectedDate];

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Daily Log</h1>
          <p className="text-xs text-gray-500 mt-1">Daily site activity records — weather, manpower, work performed, deliveries, equipment</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Create Daily Log
        </button>
      </div>

      <div className="flex gap-4">
        {/* Date List */}
        <div className="w-48 space-y-2">
          {dailyLogs.map((l, i) => (
            <button
              key={l.date}
              onClick={() => setSelectedDate(i)}
              className={`w-full text-left px-3 py-2.5 rounded border text-xs transition-colors ${
                selectedDate === i ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-400 hover:border-blue-500/20 bg-hai-navy"
              }`}
            >
              <div className="font-medium">{l.date}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">{l.totalManpower} workers • {l.status}</div>
            </button>
          ))}
        </div>

        {/* Log Detail */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg p-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-white">{log.date}</div>
              <div className="text-[10px] text-gray-500 mt-0.5">Created by {log.createdBy}</div>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded border ${log.statusColor}`}>{log.status}</span>
          </div>

          {/* Weather */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
            <button onClick={() => toggleSection("weather")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-blue-400 uppercase tracking-wider hover:bg-hai-primary/20">
              <span>Weather</span>
              <span className="text-gray-500">{expandedSections.weather ? "▼" : "▶"}</span>
            </button>
            {expandedSections.weather && (
              <div className="px-4 pb-3 grid grid-cols-5 gap-3">
                {[
                  { label: "Condition", value: log.weather.condition },
                  { label: "High", value: log.weather.tempHigh },
                  { label: "Low", value: log.weather.tempLow },
                  { label: "Humidity", value: log.weather.humidity },
                  { label: "Wind", value: log.weather.wind },
                ].map((w) => (
                  <div key={w.label} className="text-center">
                    <div className="text-[10px] text-gray-500 uppercase">{w.label}</div>
                    <div className="text-xs text-gray-300 font-medium mt-0.5">{w.value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Manpower */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
            <button onClick={() => toggleSection("manpower")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-blue-400 uppercase tracking-wider hover:bg-hai-primary/20">
              <span>Manpower — {log.totalManpower} Total</span>
              <span className="text-gray-500">{expandedSections.manpower ? "▼" : "▶"}</span>
            </button>
            {expandedSections.manpower && (
              <div className="px-4 pb-3 space-y-1">
                {log.manpower.map((m) => (
                  <div key={m.contractor} className="flex items-center justify-between text-xs">
                    <span className="text-gray-300">{m.contractor}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-1.5 bg-hai-primary rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(m.count / log.totalManpower) * 100}%` }} />
                      </div>
                      <span className="text-gray-400 w-8 text-right">{m.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Work Performed */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
            <button onClick={() => toggleSection("work")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-blue-400 uppercase tracking-wider hover:bg-hai-primary/20">
              <span>Work Performed</span>
              <span className="text-gray-500">{expandedSections.work ? "▼" : "▶"}</span>
            </button>
            {expandedSections.work && (
              <div className="px-4 pb-3 space-y-1">
                {log.workPerformed.map((w, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-blue-400 mt-0.5">•</span>
                    <span>{w}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Delays */}
          {log.delays.length > 0 && (
            <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
              <button onClick={() => toggleSection("delays")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-red-400 uppercase tracking-wider hover:bg-hai-primary/20">
                <span>Delays & Issues ({log.delays.length})</span>
                <span className="text-gray-500">{expandedSections.delays ? "▼" : "▶"}</span>
              </button>
              {expandedSections.delays && (
                <div className="px-4 pb-3 space-y-1">
                  {log.delays.map((d, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <span className="text-red-400 mt-0.5">!</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Deliveries */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
            <button onClick={() => toggleSection("deliveries")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-blue-400 uppercase tracking-wider hover:bg-hai-primary/20">
              <span>Material Deliveries ({log.deliveries.length})</span>
              <span className="text-gray-500">{expandedSections.deliveries ? "▼" : "▶"}</span>
            </button>
            {expandedSections.deliveries && (
              <div className="px-4 pb-3">
                <table className="w-full">
                  <thead>
                    <tr className="text-[10px] text-gray-500 uppercase">
                      <th className="text-left pb-1">Item</th>
                      <th className="text-left pb-1">Supplier</th>
                      <th className="text-right pb-1">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {log.deliveries.map((d, i) => (
                      <tr key={i} className="text-xs">
                        <td className="py-1 text-gray-300">{d.item}</td>
                        <td className="py-1 text-gray-400">{d.supplier}</td>
                        <td className="py-1 text-gray-400 text-right">{d.qty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Equipment */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
            <button onClick={() => toggleSection("equipment")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-blue-400 uppercase tracking-wider hover:bg-hai-primary/20">
              <span>Equipment ({log.equipment.length})</span>
              <span className="text-gray-500">{expandedSections.equipment ? "▼" : "▶"}</span>
            </button>
            {expandedSections.equipment && (
              <div className="px-4 pb-3 space-y-1">
                {log.equipment.map((e, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-300">{e.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400">{e.hours} hrs</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded border ${
                        e.status === "Operational" ? "text-green-400 bg-green-500/10 border-green-500/20" :
                        e.status === "Breakdown" ? "text-red-400 bg-red-500/10 border-red-500/20" :
                        "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                      }`}>{e.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Safety Notes */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
            <button onClick={() => toggleSection("safety")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-yellow-400 uppercase tracking-wider hover:bg-hai-primary/20">
              <span>Safety Notes</span>
              <span className="text-gray-500">{expandedSections.safety ? "▼" : "▶"}</span>
            </button>
            {expandedSections.safety && (
              <div className="px-4 pb-3 space-y-1">
                {log.safetyNotes.map((n, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                    <span className="text-yellow-400 mt-0.5">⚠</span>
                    <span>{n}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visitors */}
          {log.visitors.length > 0 && (
            <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
              <button onClick={() => toggleSection("visitors")} className="w-full px-4 py-3 flex items-center justify-between text-xs font-semibold text-blue-400 uppercase tracking-wider hover:bg-hai-primary/20">
                <span>Visitors ({log.visitors.length})</span>
                <span className="text-gray-500">{expandedSections.visitors ? "▼" : "▶"}</span>
              </button>
              {expandedSections.visitors && (
                <div className="px-4 pb-3 space-y-1">
                  {log.visitors.map((v, i) => (
                    <div key={i} className="flex items-center justify-between text-xs">
                      <div>
                        <span className="text-gray-300 font-medium">{v.name}</span>
                        <span className="text-gray-500 ml-2">({v.company})</span>
                      </div>
                      <span className="text-gray-400">{v.purpose}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
