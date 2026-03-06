"use client";

import { useState } from "react";

const tabs = ["Upcoming", "Minutes", "Action Items"];

interface Meeting {
  ref: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  attendees: string[];
  status: string;
  statusColor: string;
}

const upcoming: Meeting[] = [
  { ref: "MTG-2026-048", title: "Weekly Progress Meeting #48", type: "Progress", date: "10 Mar 2026", time: "10:00 AM", location: "Site Office — Meeting Room 1", attendees: ["HAI Group", "Shelter Eng", "HTCO", "Gulf MEP"], status: "Confirmed", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "MTG-2026-049", title: "Stage Gate 6 Review — CUQ Project", type: "Stage Gate", date: "12 Mar 2026", time: "02:00 PM", location: "HAI Head Office", attendees: ["HAI Group", "Client", "HTCO", "Shelter Eng"], status: "Confirmed", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "MTG-2026-050", title: "VO-018 Assessment Meeting", type: "Commercial", date: "13 Mar 2026", time: "11:00 AM", location: "Site Office — Meeting Room 2", attendees: ["HAI Group", "Shelter Eng", "HTCO"], status: "Pending Confirmation", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ref: "MTG-2026-051", title: "HSE Committee Monthly Meeting", type: "HSE", date: "15 Mar 2026", time: "09:00 AM", location: "Site Office — HSE Room", attendees: ["HAI Group", "All Contractors"], status: "Confirmed", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "MTG-2026-052", title: "Design Coordination — MEP Clashes Level 6-8", type: "Design", date: "17 Mar 2026", time: "10:00 AM", location: "Virtual — MS Teams", attendees: ["HTCO", "Gulf MEP", "HAI Group"], status: "Pending Confirmation", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
];

interface MinutesItem {
  ref: string;
  title: string;
  date: string;
  attendeeCount: number;
  actionItems: number;
  openActions: number;
  status: string;
  statusColor: string;
}

const minutes: MinutesItem[] = [
  { ref: "MOM-2026-047", title: "Weekly Progress Meeting #47", date: "03 Mar 2026", attendeeCount: 12, actionItems: 8, openActions: 3, status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "MOM-2026-046", title: "Weekly Progress Meeting #46", date: "24 Feb 2026", attendeeCount: 10, actionItems: 6, openActions: 1, status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "MOM-2026-045", title: "Monthly Commercial Review — February", date: "20 Feb 2026", attendeeCount: 8, actionItems: 12, openActions: 5, status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "MOM-2026-044", title: "Design Review — Facade Options", date: "18 Feb 2026", attendeeCount: 6, actionItems: 4, openActions: 0, status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "MOM-2026-043", title: "Weekly Progress Meeting #45", date: "17 Feb 2026", attendeeCount: 11, actionItems: 7, openActions: 0, status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

interface ActionItem {
  id: string;
  meeting: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: string;
  status: string;
  statusColor: string;
}

const actionItems: ActionItem[] = [
  { id: "ACT-2026-089", meeting: "MOM-047", description: "Submit revised programme baseline incorporating approved EOT", assignedTo: "Shelter Engineering", dueDate: "10 Mar 2026", priority: "High", status: "Overdue", statusColor: "text-red-400 bg-red-500/10 border-red-500/20" },
  { id: "ACT-2026-088", meeting: "MOM-047", description: "Provide updated material delivery schedule for MEP works", assignedTo: "Gulf MEP Solutions", dueDate: "12 Mar 2026", priority: "High", status: "Open", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { id: "ACT-2026-087", meeting: "MOM-047", description: "Circulate NCR-088 corrective action plan to all parties", assignedTo: "HAI Group", dueDate: "07 Mar 2026", priority: "Normal", status: "Open", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { id: "ACT-2026-086", meeting: "MOM-045", description: "Coordinate with Kahramaa for load application follow-up", assignedTo: "HTCO Consultants", dueDate: "15 Mar 2026", priority: "Normal", status: "Open", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { id: "ACT-2026-085", meeting: "MOM-045", description: "Complete IPC #23 certification and issue to Finance", assignedTo: "HAI Group", dueDate: "05 Mar 2026", priority: "High", status: "Completed", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "ACT-2026-084", meeting: "MOM-044", description: "Prepare facade mock-up schedule and submit for approval", assignedTo: "Al Khaleej Facades", dueDate: "08 Mar 2026", priority: "Normal", status: "Open", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
];

export default function MeetingsPage() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Meetings</h1>
          <p className="text-xs text-gray-500 mt-1">Meeting schedule, minutes of meeting, and action item tracking</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Schedule Meeting
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Meetings (MTD)", value: "12", color: "text-blue-400" },
          { label: "Upcoming", value: upcoming.length.toString(), color: "text-yellow-400" },
          { label: "Open Actions", value: actionItems.filter((a) => a.status !== "Completed").length.toString(), color: "text-red-400" },
          { label: "Overdue Actions", value: actionItems.filter((a) => a.status === "Overdue").length.toString(), color: "text-red-400" },
          { label: "Action Closure Rate", value: "82%", color: "text-green-400" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-hai-steel mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab ? "border-hai-accent text-white" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Upcoming */}
      {activeTab === "Upcoming" && (
        <div className="space-y-3">
          {upcoming.map((m) => (
            <div key={m.ref} className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-blue-500/30 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-blue-400">{m.ref}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-hai-primary border border-hai-steel text-gray-400">{m.type}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${m.statusColor}`}>{m.status}</span>
                </div>
                <span className="text-xs text-gray-500">{m.date} — {m.time}</span>
              </div>
              <div className="text-sm text-white font-medium mb-2">{m.title}</div>
              <div className="flex items-center justify-between text-[10px] text-gray-500">
                <span>{m.location}</span>
                <span>{m.attendees.join(", ")}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Minutes */}
      {activeTab === "Minutes" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Ref</th>
                <th className="text-left pb-2">Meeting</th>
                <th className="text-left pb-2">Date</th>
                <th className="text-center pb-2">Attendees</th>
                <th className="text-center pb-2">Actions</th>
                <th className="text-center pb-2">Open</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {minutes.map((m) => (
                <tr key={m.ref} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer">
                  <td className="py-3 text-blue-400 font-mono font-medium">{m.ref}</td>
                  <td className="py-3 text-gray-300">{m.title}</td>
                  <td className="py-3 text-gray-400">{m.date}</td>
                  <td className="py-3 text-center text-gray-400">{m.attendeeCount}</td>
                  <td className="py-3 text-center text-gray-400">{m.actionItems}</td>
                  <td className="py-3 text-center"><span className={m.openActions > 0 ? "text-red-400 font-bold" : "text-green-400"}>{m.openActions}</span></td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded border ${m.statusColor}`}>{m.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Items */}
      {activeTab === "Action Items" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">ID</th>
                <th className="text-left pb-2">Meeting</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-left pb-2">Assigned To</th>
                <th className="text-left pb-2">Due Date</th>
                <th className="text-left pb-2">Priority</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {actionItems.map((a) => (
                <tr key={a.id} className={`text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 ${a.status === "Overdue" ? "bg-red-500/5" : ""}`}>
                  <td className="py-3 text-blue-400 font-mono font-medium">{a.id}</td>
                  <td className="py-3 text-gray-500 font-mono">{a.meeting}</td>
                  <td className="py-3 text-gray-300 max-w-xs">{a.description}</td>
                  <td className="py-3 text-gray-400">{a.assignedTo}</td>
                  <td className="py-3 text-gray-400">{a.dueDate}</td>
                  <td className="py-3"><span className={a.priority === "High" ? "text-red-400" : "text-gray-400"}>{a.priority}</span></td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded border ${a.statusColor}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
