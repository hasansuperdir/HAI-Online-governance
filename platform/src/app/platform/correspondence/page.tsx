"use client";

import { useState } from "react";

const tabs = ["Inbox", "Sent", "Drafts", "Transmittals"];

interface CorrespondenceItem {
  ref: string;
  subject: string;
  from: string;
  to: string;
  type: string;
  priority: string;
  date: string;
  status: string;
  statusColor: string;
}

const inbox: CorrespondenceItem[] = [
  { ref: "COR-2026-0312", subject: "Request for Extension of Time — Piling Works Zone C", from: "Shelter Engineering", to: "HAI Group (ER)", type: "Letter", priority: "High", date: "06 Mar 2026", status: "Action Required", statusColor: "text-red-400 bg-red-500/10 border-red-500/20" },
  { ref: "COR-2026-0311", subject: "Material Submittal Response — Structural Steel Grade S355", from: "HTCO Consultants", to: "HAI Group (ER)", type: "Response", priority: "Normal", date: "05 Mar 2026", status: "For Information", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { ref: "COR-2026-0310", subject: "Weekly Progress Report #47 — CUQ Project", from: "Shelter Engineering", to: "HAI Group (ER)", type: "Report", priority: "Normal", date: "04 Mar 2026", status: "Reviewed", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "COR-2026-0309", subject: "Notice of Claim — Unforeseen Ground Conditions Cl. 4.12", from: "Shelter Engineering", to: "HAI Group (ER)", type: "Notice", priority: "High", date: "03 Mar 2026", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ref: "COR-2026-0308", subject: "Design Change Notice — MEP Riser Shaft Relocation", from: "HTCO Consultants", to: "HAI Group (ER)", type: "DCN", priority: "Normal", date: "02 Mar 2026", status: "Acknowledged", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "COR-2026-0307", subject: "IPC #24 Submission — Main Building Works", from: "Shelter Engineering", to: "HAI Group (ER)", type: "IPC", priority: "Normal", date: "01 Mar 2026", status: "Processing", statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
  { ref: "COR-2026-0306", subject: "Kahramaa Load Application Status Update", from: "HTCO Consultants", to: "HAI Group (ER)", type: "Letter", priority: "Normal", date: "28 Feb 2026", status: "For Information", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
];

const sent: CorrespondenceItem[] = [
  { ref: "COR-2026-0305", subject: "Instruction to Proceed — Interior Fit-out Package TP-004", from: "HAI Group (ER)", to: "Desert Interiors", type: "Instruction", priority: "High", date: "05 Mar 2026", status: "Delivered", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "COR-2026-0304", subject: "NCR-088 Response Required — Missing Fire Stops Level 4", from: "HAI Group (ER)", to: "XYZ Systems", type: "NCR Notice", priority: "High", date: "04 Mar 2026", status: "Awaiting Response", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ref: "COR-2026-0303", subject: "Monthly Programme Report — February 2026", from: "HAI Group (ER)", to: "Client (Owner)", type: "Report", priority: "Normal", date: "03 Mar 2026", status: "Delivered", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "COR-2026-0302", subject: "Performance Notice Under FIDIC Cl. 15.1 — Contractor B", from: "HAI Group (ER)", to: "ADC Construction", type: "Notice", priority: "High", date: "01 Mar 2026", status: "Delivered", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const drafts: CorrespondenceItem[] = [
  { ref: "COR-2026-0313", subject: "Variation Order Assessment — Facade Redesign VO-018", from: "HAI Group (ER)", to: "Shelter Engineering", type: "Assessment", priority: "Normal", date: "06 Mar 2026", status: "Draft", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
  { ref: "COR-2026-0314", subject: "Stage Gate 6 Review Meeting Invitation", from: "HAI Group (ER)", to: "All Parties", type: "Invitation", priority: "Normal", date: "06 Mar 2026", status: "Draft", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
];

const transmittals = [
  { ref: "TRN-2026-0089", subject: "Approved Shop Drawings — Structural Package Rev C", from: "HTCO Consultants", to: "Shelter Engineering", documents: 12, date: "05 Mar 2026", status: "Acknowledged", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "TRN-2026-0088", subject: "IFC Drawings — MEP Level 5-8", from: "HTCO Consultants", to: "Gulf MEP Solutions", documents: 28, date: "04 Mar 2026", status: "Received", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { ref: "TRN-2026-0087", subject: "As-Built Drawings — Foundation Works", from: "Shelter Engineering", to: "HAI Group (ER)", documents: 45, date: "03 Mar 2026", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ref: "TRN-2026-0086", subject: "Tender Documents — Landscaping Package TP-005", from: "HAI Group (ER)", to: "4 Bidders", documents: 8, date: "01 Mar 2026", status: "Issued", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "TRN-2026-0085", subject: "Specification Updates — Fire Protection Rev B", from: "HTCO Consultants", to: "Al Khaleej Fire", documents: 3, date: "28 Feb 2026", status: "Acknowledged", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const priorityColors: Record<string, string> = {
  High: "text-red-400",
  Normal: "text-gray-500",
  Low: "text-gray-600",
};

export default function CorrespondencePage() {
  const [activeTab, setActiveTab] = useState("Inbox");
  const [selected, setSelected] = useState<string | null>(null);

  const currentList = activeTab === "Inbox" ? inbox : activeTab === "Sent" ? sent : activeTab === "Drafts" ? drafts : [];
  const selectedItem = [...inbox, ...sent, ...drafts].find((c) => c.ref === selected);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Correspondence</h1>
          <p className="text-xs text-gray-500 mt-1">Formal project correspondence, letters, notices, and transmittals</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + New Correspondence
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Correspondence", value: "312", color: "text-blue-400" },
          { label: "Action Required", value: "8", color: "text-red-400" },
          { label: "Awaiting Response", value: "14", color: "text-yellow-400" },
          { label: "Transmittals", value: "89", color: "text-purple-400" },
          { label: "This Month", value: "24", color: "text-green-400" },
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
            onClick={() => { setActiveTab(tab); setSelected(null); }}
            className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab ? "border-hai-accent text-white" : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            {tab}
            {tab === "Inbox" && <span className="ml-2 text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">{inbox.length}</span>}
          </button>
        ))}
      </div>

      {activeTab === "Transmittals" ? (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Ref</th>
                <th className="text-left pb-2">Subject</th>
                <th className="text-left pb-2">From</th>
                <th className="text-left pb-2">To</th>
                <th className="text-center pb-2">Documents</th>
                <th className="text-left pb-2">Date</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {transmittals.map((t) => (
                <tr key={t.ref} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer">
                  <td className="py-3 text-blue-400 font-mono font-medium">{t.ref}</td>
                  <td className="py-3 text-gray-300">{t.subject}</td>
                  <td className="py-3 text-gray-400">{t.from}</td>
                  <td className="py-3 text-gray-400">{t.to}</td>
                  <td className="py-3 text-center text-blue-400 font-medium">{t.documents}</td>
                  <td className="py-3 text-gray-400">{t.date}</td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded border ${t.statusColor}`}>{t.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex gap-4">
          {/* List */}
          <div className="w-1/2 bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
            <div className="divide-y divide-hai-primary/30">
              {currentList.map((item) => (
                <div
                  key={item.ref}
                  onClick={() => setSelected(item.ref)}
                  className={`p-4 cursor-pointer transition-all ${selected === item.ref ? "bg-blue-500/10 border-l-2 border-l-blue-400" : "hover:bg-hai-primary/20"}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono text-blue-400">{item.ref}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${item.statusColor}`}>{item.status}</span>
                  </div>
                  <div className="text-xs text-gray-200 font-medium mb-1 line-clamp-1">{item.subject}</div>
                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <span>{item.from} → {item.to}</span>
                    <div className="flex items-center gap-2">
                      <span className={priorityColors[item.priority]}>{item.priority}</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail */}
          <div className="w-1/2 bg-hai-navy border border-hai-steel rounded-lg p-5">
            {selectedItem ? (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono text-blue-400">{selectedItem.ref}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${selectedItem.statusColor}`}>{selectedItem.status}</span>
                  <span className={`text-[10px] ${priorityColors[selectedItem.priority]}`}>{selectedItem.priority}</span>
                </div>
                <h2 className="text-sm font-semibold text-white mb-4">{selectedItem.subject}</h2>

                <div className="space-y-2 mb-4 text-xs">
                  <div className="flex"><span className="w-20 text-gray-500">From:</span><span className="text-gray-300">{selectedItem.from}</span></div>
                  <div className="flex"><span className="w-20 text-gray-500">To:</span><span className="text-gray-300">{selectedItem.to}</span></div>
                  <div className="flex"><span className="w-20 text-gray-500">Type:</span><span className="text-gray-300">{selectedItem.type}</span></div>
                  <div className="flex"><span className="w-20 text-gray-500">Date:</span><span className="text-gray-300">{selectedItem.date}</span></div>
                </div>

                <div className="border-t border-hai-steel pt-4">
                  <div className="text-xs text-gray-400 leading-relaxed">
                    This is a formal project correspondence regarding the above subject. The full letter content, attachments, and response history would be displayed here in the production system.
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-hai-steel">
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-2">Attachments</div>
                  <div className="flex gap-2">
                    <div className="text-xs px-3 py-1.5 rounded bg-hai-primary border border-hai-steel text-gray-300 cursor-pointer hover:border-blue-500/30">
                      Letter.pdf
                    </div>
                    <div className="text-xs px-3 py-1.5 rounded bg-hai-primary border border-hai-steel text-gray-300 cursor-pointer hover:border-blue-500/30">
                      Supporting_Docs.zip
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400">Reply</button>
                  <button className="text-xs px-3 py-1.5 rounded bg-hai-primary border border-hai-steel text-gray-400">Forward</button>
                  <button className="text-xs px-3 py-1.5 rounded bg-hai-primary border border-hai-steel text-gray-400">Print</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500 text-xs">
                Select a correspondence to view details
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
