"use client";

import { useState } from "react";

const tabs = ["Payment Certificates", "Contract Terms", "Invoices", "Variation Orders", "Cash Flow"];

const paymentCerts = [
  { ipc: "IPC-012", period: "Jan 2026", applied: "4,560,000", certified: "4,230,000", retained: "211,500", netPayable: "4,018,500", status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ipc: "IPC-011", period: "Dec 2025", applied: "3,890,000", certified: "3,740,000", retained: "187,000", netPayable: "3,553,000", status: "Paid", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ipc: "IPC-010", period: "Nov 2025", applied: "4,120,000", certified: "3,980,000", retained: "199,000", netPayable: "3,781,000", status: "Paid", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ipc: "IPC-009", period: "Oct 2025", applied: "3,650,000", certified: "3,540,000", retained: "177,000", netPayable: "3,363,000", status: "Paid", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ipc: "IPC-008", period: "Sep 2025", applied: "4,280,000", certified: "4,100,000", retained: "205,000", netPayable: "3,895,000", status: "Paid", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const contractTerms = [
  { clause: "Cl. 1.1", title: "Definitions", type: "General", fidic: "FIDIC 2017", status: "Compliant", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { clause: "Cl. 4.2", title: "Performance Security", type: "Bond", fidic: "FIDIC 2017", status: "Active", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { clause: "Cl. 8.1", title: "Commencement of Works", type: "Time", fidic: "FIDIC 2017", status: "Compliant", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { clause: "Cl. 13.1", title: "Right to Vary", type: "Variation", fidic: "FIDIC 2017", status: "Active", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { clause: "Cl. 14.3", title: "Application for IPC", type: "Payment", fidic: "FIDIC 2017", status: "Compliant", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { clause: "Cl. 14.6", title: "Issue of IPC", type: "Payment", fidic: "FIDIC 2017", status: "Warning", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { clause: "Cl. 20.1", title: "Claims (Contractor)", type: "Claims", fidic: "FIDIC 2017", status: "Active", statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
];

const invoices = [
  { inv: "INV-2026-012", vendor: "Shelter Engineering", amount: "4,018,500", date: "15 Feb 2026", dueDate: "15 Mar 2026", status: "Pending", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { inv: "INV-2026-011", vendor: "HTCO Consultants", amount: "285,000", date: "01 Feb 2026", dueDate: "01 Mar 2026", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { inv: "INV-2026-010", vendor: "Shelter Engineering", amount: "3,553,000", date: "15 Jan 2026", dueDate: "15 Feb 2026", status: "Paid", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { inv: "INV-2025-009", vendor: "ADC Construction", amount: "2,890,000", date: "15 Dec 2025", dueDate: "15 Jan 2026", status: "Paid", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { inv: "INV-2025-008", vendor: "ACG Consulting", amount: "195,000", date: "01 Dec 2025", dueDate: "01 Jan 2026", status: "Paid", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
];

const variationOrders = [
  { vo: "VO-034", description: "MEP Scope Change — Additional AHUs", value: "890,000", type: "Instruction", fidic: "Cl. 13.1", status: "Pending Approval", statusColor: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  { vo: "VO-033", description: "Foundation Redesign — Pile Caps", value: "1,450,000", type: "Instruction", fidic: "Cl. 13.3", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { vo: "VO-032", description: "Facade Material Change", value: "320,000", type: "Instruction", fidic: "Cl. 13.1", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { vo: "VO-031", description: "Additional Fire Stopping", value: "145,000", type: "Daywork", fidic: "Cl. 13.6", status: "Under Assessment", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { vo: "VO-030", description: "Landscape Re-design", value: "560,000", type: "Instruction", fidic: "Cl. 13.1", status: "Approved", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
];

const cashFlowData = [
  { month: "Sep 25", planned: 3800, actual: 3650, cumPlanned: 28400, cumActual: 27200 },
  { month: "Oct 25", planned: 3900, actual: 3540, cumPlanned: 32300, cumActual: 30740 },
  { month: "Nov 25", planned: 4100, actual: 3980, cumPlanned: 36400, cumActual: 34720 },
  { month: "Dec 25", planned: 4000, actual: 3740, cumPlanned: 40400, cumActual: 38460 },
  { month: "Jan 26", planned: 4200, actual: 4230, cumPlanned: 44600, cumActual: 42690 },
  { month: "Feb 26", planned: 4300, actual: null, cumPlanned: 48900, cumActual: null },
  { month: "Mar 26", planned: 4400, actual: null, cumPlanned: 53300, cumActual: null },
  { month: "Apr 26", planned: 4500, actual: null, cumPlanned: 57800, cumActual: null },
];

export default function CommercialPage() {
  const [activeTab, setActiveTab] = useState("Payment Certificates");
  const maxCum = 58000;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Commercial Management</h1>
        <p className="text-xs text-gray-500 mt-1">Payment certificates, contract terms, invoices, variations & cash flow</p>
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Contract Value", value: "QAR 120M", color: "text-blue-400" },
          { label: "Certified to Date", value: "QAR 81.6M", color: "text-green-400" },
          { label: "Retention Held", value: "QAR 4.1M", color: "text-yellow-400" },
          { label: "Approved VOs", value: "QAR 2.33M", color: "text-orange-400" },
          { label: "Pending Claims", value: "QAR 3.23M", color: "text-red-400" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Tab Bar */}
      <div className="flex border-b border-hai-steel mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
              activeTab === tab
                ? "border-hai-accent text-white"
                : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Payment Certificates */}
      {activeTab === "Payment Certificates" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Interim Payment Certificates (IPC)
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">IPC #</th>
                <th className="text-left pb-2">Period</th>
                <th className="text-right pb-2">Applied (QAR)</th>
                <th className="text-right pb-2">Certified (QAR)</th>
                <th className="text-right pb-2">Retention</th>
                <th className="text-right pb-2">Net Payable</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentCerts.map((row) => (
                <tr key={row.ipc} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-gray-300 font-medium">{row.ipc}</td>
                  <td className="py-3 text-gray-400">{row.period}</td>
                  <td className="py-3 text-gray-400 text-right">{row.applied}</td>
                  <td className="py-3 text-gray-300 text-right font-medium">{row.certified}</td>
                  <td className="py-3 text-gray-400 text-right">{row.retained}</td>
                  <td className="py-3 text-green-400 text-right font-medium">{row.netPayable}</td>
                  <td className="py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Contract Terms */}
      {activeTab === "Contract Terms" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Contract Terms & FIDIC Clauses
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Clause</th>
                <th className="text-left pb-2">Title</th>
                <th className="text-left pb-2">Type</th>
                <th className="text-left pb-2">Reference</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {contractTerms.map((row) => (
                <tr key={row.clause} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-blue-400 font-medium">{row.clause}</td>
                  <td className="py-3 text-gray-300">{row.title}</td>
                  <td className="py-3 text-gray-400">{row.type}</td>
                  <td className="py-3 text-gray-400">{row.fidic}</td>
                  <td className="py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Invoices */}
      {activeTab === "Invoices" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Invoice Register
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Invoice #</th>
                <th className="text-left pb-2">Vendor</th>
                <th className="text-right pb-2">Amount (QAR)</th>
                <th className="text-left pb-2">Date</th>
                <th className="text-left pb-2">Due Date</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((row) => (
                <tr key={row.inv} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-gray-300 font-medium">{row.inv}</td>
                  <td className="py-3 text-gray-400">{row.vendor}</td>
                  <td className="py-3 text-gray-300 text-right font-medium">{row.amount}</td>
                  <td className="py-3 text-gray-400">{row.date}</td>
                  <td className="py-3 text-gray-400">{row.dueDate}</td>
                  <td className="py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Variation Orders */}
      {activeTab === "Variation Orders" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Variation Order Register
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">VO #</th>
                <th className="text-left pb-2">Description</th>
                <th className="text-right pb-2">Value (QAR)</th>
                <th className="text-left pb-2">Type</th>
                <th className="text-left pb-2">FIDIC Ref</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {variationOrders.map((row) => (
                <tr key={row.vo} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-gray-300 font-medium">{row.vo}</td>
                  <td className="py-3 text-gray-400">{row.description}</td>
                  <td className="py-3 text-gray-300 text-right font-medium">{row.value}</td>
                  <td className="py-3 text-gray-400">{row.type}</td>
                  <td className="py-3 text-blue-400">{row.fidic}</td>
                  <td className="py-3">
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cash Flow */}
      {activeTab === "Cash Flow" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Cash Flow — Planned vs Actual (QAR &apos;000)
          </div>
          {/* Visual bar chart */}
          <div className="mb-6">
            <div className="flex items-end gap-2 h-40 mb-2">
              {cashFlowData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center justify-end h-full gap-0.5">
                  <div className="flex gap-0.5 items-end w-full justify-center" style={{ height: "100%" }}>
                    <div
                      className="w-[40%] bg-blue-500 rounded-t-sm"
                      style={{ height: `${(d.planned / 5000) * 100}%` }}
                      title={`Planned: ${d.planned}`}
                    />
                    {d.actual !== null ? (
                      <div
                        className={`w-[40%] rounded-t-sm ${d.actual >= d.planned ? "bg-green-500" : "bg-orange-500"}`}
                        style={{ height: `${(d.actual / 5000) * 100}%` }}
                        title={`Actual: ${d.actual}`}
                      />
                    ) : (
                      <div className="w-[40%] bg-gray-700 rounded-t-sm border border-dashed border-gray-600" style={{ height: `${(d.planned / 5000) * 80}%` }} />
                    )}
                  </div>
                  <div className="text-[9px] text-gray-500 mt-1">{d.month}</div>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 text-[10px] text-gray-500">
              <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-blue-500 rounded-sm" /> Planned</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-green-500 rounded-sm" /> Actual</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-2 bg-gray-700 border border-dashed border-gray-600 rounded-sm" /> Forecast</div>
            </div>
          </div>

          {/* Cumulative S-Curve */}
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-3">
            Cumulative S-Curve (QAR &apos;000)
          </div>
          <div className="space-y-2">
            {cashFlowData.map((d) => (
              <div key={d.month} className="flex items-center gap-3">
                <span className="text-[10px] text-gray-500 w-12">{d.month}</span>
                <div className="flex-1 h-4 bg-hai-primary rounded-full overflow-hidden relative">
                  <div
                    className="h-full bg-blue-500/40 rounded-full absolute top-0 left-0"
                    style={{ width: `${(d.cumPlanned / maxCum) * 100}%` }}
                  />
                  {d.cumActual !== null && (
                    <div
                      className="h-full bg-green-500 rounded-full absolute top-0 left-0"
                      style={{ width: `${(d.cumActual / maxCum) * 100}%` }}
                    />
                  )}
                </div>
                <span className="text-[10px] text-gray-400 w-16 text-right">
                  {d.cumActual !== null ? `${(d.cumActual / 1000).toFixed(1)}M` : `${(d.cumPlanned / 1000).toFixed(1)}M*`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
