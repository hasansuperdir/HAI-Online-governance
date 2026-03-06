export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold text-white mb-6">Platform Settings</h1>

      <div className="grid grid-cols-2 gap-6">
        {/* User Management */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <h2 className="text-sm font-semibold text-blue-400 mb-4">User & Role Management</h2>
          <div className="space-y-3">
            {[
              { name: "Ahmed Al-Thani", role: "Programme Director", dept: "PM", status: "Active" },
              { name: "Sarah Williams", role: "QS Lead", dept: "Contracts", status: "Active" },
              { name: "Mohammed Hassan", role: "Design Manager", dept: "Design", status: "Active" },
              { name: "Julia Chen", role: "Doc Controller", dept: "DocControl", status: "Active" },
              { name: "Omar Khalid", role: "Finance Director", dept: "Finance", status: "Active" },
            ].map((u) => (
              <div key={u.name} className="flex items-center justify-between py-2 border-b border-hai-primary/50">
                <div>
                  <div className="text-xs text-gray-200 font-medium">{u.name}</div>
                  <div className="text-[10px] text-gray-500">{u.role} — {u.dept}</div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ERP Integration */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <h2 className="text-sm font-semibold text-blue-400 mb-4">ERP Integration (Artan)</h2>
          <div className="space-y-3">
            {[
              { label: "Connection Status", value: "Connected", color: "text-green-400" },
              { label: "Last Sync", value: "2 minutes ago", color: "text-gray-300" },
              { label: "Records Synced Today", value: "147", color: "text-blue-400" },
              { label: "Sync Success Rate", value: "99.2%", color: "text-green-400" },
              { label: "Failed Transactions", value: "1", color: "text-red-400" },
              { label: "Sync Direction", value: "Bidirectional", color: "text-gray-300" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-hai-primary/50">
                <span className="text-xs text-gray-500">{item.label}</span>
                <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button className="text-xs px-3 py-2 rounded bg-blue-500/10 border border-blue-500/30 text-blue-400 hover:bg-blue-500/20 transition-colors">
              Force Sync
            </button>
            <button className="text-xs px-3 py-2 rounded bg-hai-primary border border-hai-steel text-gray-400 hover:border-blue-500/30 transition-colors">
              View Sync Log
            </button>
          </div>
        </div>

        {/* Workflow Configuration */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <h2 className="text-sm font-semibold text-blue-400 mb-4">Workflow Engine</h2>
          <div className="space-y-2">
            {[
              { flow: "PF-01 Document Review", status: "Active", sla: "5 days" },
              { flow: "PF-02 Correspondence", status: "Active", sla: "3 days" },
              { flow: "PF-03 Variation Order", status: "Active", sla: "14 days" },
              { flow: "PF-08 IPC Processing", status: "Active", sla: "21 days" },
              { flow: "PF-09 Approval Engine", status: "Active", sla: "Variable" },
              { flow: "PF-23 Predictive Analytics", status: "Active", sla: "Daily" },
            ].map((w) => (
              <div key={w.flow} className="flex items-center justify-between py-2 border-b border-hai-primary/50">
                <span className="text-xs text-gray-200">{w.flow}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-gray-500">SLA: {w.sla}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
                    {w.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Rules */}
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <h2 className="text-sm font-semibold text-blue-400 mb-4">Notification & Alert Rules</h2>
          <div className="space-y-2">
            {[
              { rule: "SLA breach warning (80% threshold)", enabled: true },
              { rule: "FIDIC deadline alert (3 day warning)", enabled: true },
              { rule: "IPC approval reminder (daily)", enabled: true },
              { rule: "NCR escalation (overdue > 7 days)", enabled: true },
              { rule: "Authority submission deadline", enabled: true },
              { rule: "ERP sync failure alert", enabled: true },
              { rule: "Contractor KPI threshold breach", enabled: false },
              { rule: "AI prediction high-risk alert", enabled: true },
            ].map((n) => (
              <div key={n.rule} className="flex items-center justify-between py-2 border-b border-hai-primary/50">
                <span className="text-xs text-gray-200">{n.rule}</span>
                <div className={`w-8 h-4 rounded-full relative cursor-pointer transition-colors ${n.enabled ? "bg-blue-500" : "bg-hai-steel"}`}>
                  <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${n.enabled ? "left-4" : "left-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
