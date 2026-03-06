"use client";

import { useState } from "react";

const roles = ["All", "Client", "Employer Rep", "Consultant", "Contractor", "Subcontractor", "Authority"];

interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  position: string;
  email: string;
  phone: string;
  trade: string;
  status: string;
  statusColor: string;
}

const contacts: Contact[] = [
  { id: "DIR-001", name: "Ahmed Al-Thani", company: "Client (Owner)", role: "Client", position: "Project Owner Representative", email: "a.althani@client.qa", phone: "+974 5555 0001", trade: "—", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-002", name: "Hasan Ali", company: "HAI Group", role: "Employer Rep", position: "Programme Director", email: "hasan@haigroup.qa", phone: "+974 5555 0010", trade: "—", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-003", name: "Mohammed Karim", company: "HAI Group", role: "Employer Rep", position: "Project Manager", email: "m.karim@haigroup.qa", phone: "+974 5555 0011", trade: "—", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-004", name: "Sarah Chen", company: "HAI Group", role: "Employer Rep", position: "Cost Manager / QS Lead", email: "s.chen@haigroup.qa", phone: "+974 5555 0012", trade: "Commercial", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-005", name: "Dr. Faisal Noor", company: "HTCO Consultants", role: "Consultant", position: "Lead Design Manager", email: "f.noor@htco.qa", phone: "+974 5555 0020", trade: "Design", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-006", name: "James Morrison", company: "HTCO Consultants", role: "Consultant", position: "Resident Engineer", email: "j.morrison@htco.qa", phone: "+974 5555 0021", trade: "Supervision", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-007", name: "Rajesh Kumar", company: "Shelter Engineering", role: "Contractor", position: "Project Director", email: "r.kumar@shelter.qa", phone: "+974 5555 0030", trade: "Civil / Main Works", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-008", name: "Ali Hassan", company: "Shelter Engineering", role: "Contractor", position: "Site Manager", email: "a.hassan@shelter.qa", phone: "+974 5555 0031", trade: "Civil / Main Works", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-009", name: "Tony Fernandez", company: "Gulf MEP Solutions", role: "Subcontractor", position: "MEP Project Manager", email: "t.fernandez@gulfmep.qa", phone: "+974 5555 0040", trade: "MEP", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-010", name: "Khalid Al-Mansour", company: "Al Khaleej Facades", role: "Subcontractor", position: "Facade Package Manager", email: "k.mansour@alkhaleej.qa", phone: "+974 5555 0050", trade: "Facade", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-011", name: "Maria Santos", company: "Desert Interiors", role: "Subcontractor", position: "Fit-out Manager", email: "m.santos@desert.qa", phone: "+974 5555 0060", trade: "Fit-out", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-012", name: "Eng. Abdullah Rashid", company: "QCDD", role: "Authority", position: "Building Inspector", email: "a.rashid@qcdd.gov.qa", phone: "+974 5555 0100", trade: "Regulatory", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { id: "DIR-013", name: "Eng. Fatima Al-Dosari", company: "Kahramaa", role: "Authority", position: "Electrical Inspector", email: "f.dosari@kahramaa.qa", phone: "+974 5555 0101", trade: "Regulatory", status: "Active", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

export default function DirectoryPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = contacts.filter((c) => {
    if (filter !== "All" && c.role !== filter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Project Directory</h1>
          <p className="text-xs text-gray-500 mt-1">Project stakeholders, contacts, and distribution lists</p>
        </div>
        <button className="text-xs px-4 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
          + Add Contact
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-6 gap-3 mb-6">
        {[
          { label: "Total Contacts", value: contacts.length.toString(), color: "text-blue-400" },
          { label: "Organizations", value: "8", color: "text-purple-400" },
          { label: "Client", value: contacts.filter((c) => c.role === "Client").length.toString(), color: "text-blue-400" },
          { label: "ER Team", value: contacts.filter((c) => c.role === "Employer Rep").length.toString(), color: "text-green-400" },
          { label: "Contractors", value: contacts.filter((c) => c.role === "Contractor" || c.role === "Subcontractor").length.toString(), color: "text-yellow-400" },
          { label: "Authorities", value: contacts.filter((c) => c.role === "Authority").length.toString(), color: "text-red-400" },
        ].map((s) => (
          <div key={s.label} className="bg-hai-navy border border-hai-steel rounded-lg p-3 text-center">
            <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-gray-500 mt-1 uppercase">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Search name or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-xs px-3 py-1.5 rounded border border-hai-steel bg-hai-primary text-gray-300 placeholder-gray-600 w-64 focus:outline-none focus:border-blue-500/30"
        />
        <div className="flex gap-2">
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setFilter(r)}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                filter === r ? "bg-blue-500/10 border-blue-500/30 text-blue-400" : "border-hai-steel text-gray-500 hover:border-blue-500/20"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Company</th>
              <th className="text-left px-4 py-2">Role</th>
              <th className="text-left px-4 py-2">Position</th>
              <th className="text-left px-4 py-2">Trade</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Phone</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 cursor-pointer">
                <td className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-hai-accent/20 flex items-center justify-center text-[10px] text-hai-accent font-bold">
                      {c.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                    </div>
                    <span className="text-gray-200 font-medium">{c.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-gray-400">{c.company}</td>
                <td className="px-4 py-2.5"><span className="text-[10px] px-2 py-0.5 rounded bg-hai-primary border border-hai-steel text-gray-400">{c.role}</span></td>
                <td className="px-4 py-2.5 text-gray-400">{c.position}</td>
                <td className="px-4 py-2.5 text-gray-500">{c.trade}</td>
                <td className="px-4 py-2.5 text-blue-400">{c.email}</td>
                <td className="px-4 py-2.5 text-gray-400">{c.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
