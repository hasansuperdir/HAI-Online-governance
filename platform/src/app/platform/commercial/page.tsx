"use client";

import { useState } from "react";

const tabs = ["Cost Worksheet", "Payment Certificates", "Contract Terms", "Invoices", "Variation Orders", "Cash Flow"];

/* ─── Cost Worksheet WBS Data ─── */
interface WBSItem {
  code: string;
  name: string;
  isSection: boolean;
  originalBudget: number;
  approvedChanges: number;
  approvedTransfers: number;
  currentBudget: number;
  potentialChanges: number;
  potentialTransfers: number;
  potentialBudget: number;
  currentContract: number;
}

const costWorksheet: WBSItem[] = [
  { code: "5S", name: "CUQ Project", isSection: true, originalBudget: 70000000, approvedChanges: 25000, approvedTransfers: 0, currentBudget: 70025000, potentialChanges: 5500, potentialTransfers: 0, potentialBudget: 70030500, currentContract: 53281345 },
  // SS.01 Site Preparation
  { code: "5S.01", name: "Site Preparation Works", isSection: true, originalBudget: 1400000, approvedChanges: 25000, approvedTransfers: 18345, currentBudget: 1443345, potentialChanges: 2500, potentialTransfers: 0, potentialBudget: 1445845, currentContract: 1440845 },
  { code: "5S.01.02", name: "Demolition Work and Clearance", isSection: false, originalBudget: 358000, approvedChanges: 0, approvedTransfers: 18345, currentBudget: 354345, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 354345, currentContract: 354345 },
  { code: "5S.01.03", name: "Groundworks", isSection: false, originalBudget: 168000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 168000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 168000, currentContract: 0 },
  { code: "5S.01.04", name: "Temporary Traffic Management", isSection: false, originalBudget: 98000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 98000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 98000, currentContract: 98000 },
  { code: "5S.01.05", name: "Site Investigation", isSection: false, originalBudget: 728000, approvedChanges: 25000, approvedTransfers: 0, currentBudget: 753000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 753000, currentContract: 750000 },
  { code: "5S.01.01", name: "Hazardous & Contaminated ...", isSection: false, originalBudget: 70000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 70000, potentialChanges: 2500, potentialTransfers: 0, potentialBudget: 72500, currentContract: 70000 },
  // SS.02 Substructure
  { code: "5S.02", name: "Substructure", isSection: true, originalBudget: 14000000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 14000000, potentialChanges: 5000, potentialTransfers: 0, potentialBudget: 14003000, currentContract: 13475000 },
  { code: "5S.02.01", name: "Excavation", isSection: false, originalBudget: 1400000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1400000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1400000, currentContract: 1505000 },
  { code: "5S.02.02", name: "Piling", isSection: false, originalBudget: 4480000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 4480000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 4480000, currentContract: 4256000 },
  { code: "5S.02.03", name: "Foundations", isSection: false, originalBudget: 2660000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2660000, potentialChanges: 3000, potentialTransfers: 0, potentialBudget: 2663000, currentContract: 2527000 },
  { code: "5S.02.04", name: "Slabs", isSection: false, originalBudget: 1820000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1820000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1820000, currentContract: 1729000 },
  { code: "5S.02.05", name: "Basement Walls", isSection: false, originalBudget: 2380000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2380000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 2380000, currentContract: 2261000 },
  { code: "5S.02.06", name: "Waterproofing", isSection: false, originalBudget: 1260000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1260000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1260000, currentContract: 1197000 },
  // SS.03 Super Structure
  { code: "5S.03", name: "Super Structure", isSection: true, originalBudget: 21000000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 21000000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 21000000, currentContract: 19950000 },
  { code: "5S.03.01", name: "Structural Frame", isSection: false, originalBudget: 2520000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2520000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 2520000, currentContract: 2394000 },
  { code: "5S.03.02", name: "Floors", isSection: false, originalBudget: 6090000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 6090000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 6090000, currentContract: 5785000 },
  { code: "5S.03.03", name: "Roof", isSection: false, originalBudget: 3360000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 3360000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 3360000, currentContract: 3192000 },
  { code: "5S.03.04", name: "Stairs and Ramps", isSection: false, originalBudget: 2520000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2520000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 2520000, currentContract: 2394000 },
  { code: "5S.03.05", name: "Facade", isSection: false, originalBudget: 1470000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1470000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1470000, currentContract: 1396000 },
  { code: "5S.03.06", name: "External Walls", isSection: false, originalBudget: 2940000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2940000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 2940000, currentContract: 2793000 },
  { code: "5S.03.07", name: "Windows and Doors", isSection: false, originalBudget: 2100000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2100000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 2100000, currentContract: 1995000 },
  // SS.04 Architectural Works
  { code: "5S.04", name: "Architectural Works", isSection: true, originalBudget: 10500000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 10500000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 10500000, currentContract: 0 },
  { code: "5S.04.01", name: "Internal Walls and Partitions", isSection: false, originalBudget: 1785000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1785000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1785000, currentContract: 0 },
  { code: "5S.04.02", name: "Handrails", isSection: false, originalBudget: 840000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 840000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 840000, currentContract: 0 },
  { code: "5S.04.03", name: "Internal Doors", isSection: false, originalBudget: 1575000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1575000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1575000, currentContract: 0 },
  { code: "5S.04.04", name: "Wall Finishes", isSection: false, originalBudget: 1365000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1365000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1365000, currentContract: 0 },
  { code: "5S.04.05", name: "Floor Finishes", isSection: false, originalBudget: 735000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 735000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 735000, currentContract: 0 },
  { code: "5S.04.06", name: "Ceiling Finishes", isSection: false, originalBudget: 1260000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1260000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1260000, currentContract: 0 },
  { code: "5S.04.07", name: "Fittings, Furnishings and Equ...", isSection: false, originalBudget: 2750000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2750000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 2750000, currentContract: 0 },
  // SS.05 MEP
  { code: "5S.05", name: "MEP Services", isSection: true, originalBudget: 18200000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 18200000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 18200000, currentContract: 14560000 },
  { code: "5S.05.01", name: "HVAC", isSection: false, originalBudget: 5460000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 5460000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 5460000, currentContract: 4368000 },
  { code: "5S.05.02", name: "Electrical", isSection: false, originalBudget: 4550000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 4550000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 4550000, currentContract: 3640000 },
  { code: "5S.05.03", name: "Plumbing & Drainage", isSection: false, originalBudget: 3640000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 3640000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 3640000, currentContract: 2912000 },
  { code: "5S.05.04", name: "Fire Protection", isSection: false, originalBudget: 2730000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 2730000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 2730000, currentContract: 2184000 },
  { code: "5S.05.05", name: "BMS & Controls", isSection: false, originalBudget: 1820000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1820000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1820000, currentContract: 1456000 },
  // SS.06 External Works
  { code: "5S.06", name: "External Works", isSection: true, originalBudget: 4900000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 4900000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 4900000, currentContract: 3675000 },
  { code: "5S.06.01", name: "Roads and Parking", isSection: false, originalBudget: 1960000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1960000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1960000, currentContract: 1470000 },
  { code: "5S.06.02", name: "Landscaping", isSection: false, originalBudget: 1470000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1470000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1470000, currentContract: 1102500 },
  { code: "5S.06.03", name: "Utilities & Infrastructure", isSection: false, originalBudget: 1470000, approvedChanges: 0, approvedTransfers: 0, currentBudget: 1470000, potentialChanges: 0, potentialTransfers: 0, potentialBudget: 1470000, currentContract: 1102500 },
];

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
  const [activeTab, setActiveTab] = useState("Cost Worksheet");
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

      {/* Cost Worksheet */}
      {activeTab === "Cost Worksheet" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5 overflow-x-auto">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
              Cost Worksheet — WBS Breakdown
            </div>
            <div className="text-[10px] text-gray-500">Reporting Period: Mar &apos;26</div>
          </div>
          <table className="w-full min-w-[1100px]">
            <thead>
              <tr className="text-[9px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2 pr-2 w-16">Code</th>
                <th className="text-left pb-2 pr-2">Name</th>
                <th className="text-right pb-2 pr-2">Original Budget</th>
                <th className="text-right pb-2 pr-2">Approved Changes</th>
                <th className="text-right pb-2 pr-2">Approved Transfers</th>
                <th className="text-right pb-2 pr-2">Current Budget</th>
                <th className="text-right pb-2 pr-2">Potential Changes</th>
                <th className="text-right pb-2 pr-2">Potential Transfers</th>
                <th className="text-right pb-2 pr-2">Potential Budget</th>
                <th className="text-right pb-2">Current Contract</th>
              </tr>
            </thead>
            <tbody>
              {costWorksheet.map((row) => {
                const fmt = (n: number) => n === 0 ? "$0.00" : `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
                return (
                  <tr
                    key={row.code}
                    className={`text-[11px] border-b last:border-0 ${
                      row.isSection
                        ? "bg-blue-500/5 border-hai-steel font-semibold"
                        : "border-hai-primary/20 hover:bg-hai-primary/20"
                    }`}
                  >
                    <td className={`py-1.5 pr-2 font-mono ${row.isSection ? "text-blue-400" : "text-gray-500"}`}>
                      {row.code}
                    </td>
                    <td className={`py-1.5 pr-2 ${row.isSection ? "text-white" : "text-gray-300"} ${!row.isSection ? "pl-4" : ""}`}>
                      {row.isSection ? `▼ ${row.name}` : row.name}
                    </td>
                    <td className={`py-1.5 pr-2 text-right ${row.isSection ? "text-gray-200" : "text-gray-400"}`}>{fmt(row.originalBudget)}</td>
                    <td className="py-1.5 pr-2 text-right text-gray-400">{fmt(row.approvedChanges)}</td>
                    <td className="py-1.5 pr-2 text-right text-gray-400">{fmt(row.approvedTransfers)}</td>
                    <td className={`py-1.5 pr-2 text-right ${row.isSection ? "text-green-400 font-semibold" : "text-gray-300"}`}>{fmt(row.currentBudget)}</td>
                    <td className="py-1.5 pr-2 text-right text-gray-400">{fmt(row.potentialChanges)}</td>
                    <td className="py-1.5 pr-2 text-right text-gray-400">{fmt(row.potentialTransfers)}</td>
                    <td className={`py-1.5 pr-2 text-right ${row.isSection ? "text-blue-400" : "text-gray-400"}`}>{fmt(row.potentialBudget)}</td>
                    <td className={`py-1.5 text-right ${row.isSection ? "text-orange-400 font-semibold" : row.currentContract > 0 ? "text-gray-300" : "text-gray-600"}`}>{fmt(row.currentContract)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

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
