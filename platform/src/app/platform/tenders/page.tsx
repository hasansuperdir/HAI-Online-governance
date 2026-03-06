"use client";

import { useState } from "react";

const tabs = ["Tender Packages", "Prequalification", "Bid Evaluation", "Award"];

interface TenderPackage {
  ref: string;
  title: string;
  trade: string;
  estimatedValue: string;
  bidders: number;
  issueDate: string;
  closeDate: string;
  status: string;
  statusColor: string;
}

const tenderPackages: TenderPackage[] = [
  { ref: "TP-001", title: "Main Building Works — Structural & Civil", trade: "Civil", estimatedValue: "45,000,000", bidders: 5, issueDate: "01 Sep 2024", closeDate: "15 Oct 2024", status: "Awarded", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "TP-002", title: "MEP Services — HVAC, Electrical, Plumbing", trade: "MEP", estimatedValue: "18,200,000", bidders: 4, issueDate: "15 Sep 2024", closeDate: "30 Oct 2024", status: "Awarded", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "TP-003", title: "Facade & Curtain Wall", trade: "Facade", estimatedValue: "8,500,000", bidders: 3, issueDate: "01 Oct 2024", closeDate: "15 Nov 2024", status: "Awarded", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { ref: "TP-004", title: "Interior Fit-out — Common Areas", trade: "Fit-out", estimatedValue: "6,200,000", bidders: 6, issueDate: "01 Feb 2026", closeDate: "15 Mar 2026", status: "Evaluation", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { ref: "TP-005", title: "Landscaping & External Works", trade: "Landscape", estimatedValue: "4,900,000", bidders: 4, issueDate: "15 Feb 2026", closeDate: "31 Mar 2026", status: "Open", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { ref: "TP-006", title: "Elevator & Vertical Transportation", trade: "Lifts", estimatedValue: "3,200,000", bidders: 3, issueDate: "01 Mar 2026", closeDate: "15 Apr 2026", status: "Open", statusColor: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  { ref: "TP-007", title: "Fire Protection & Life Safety", trade: "Fire", estimatedValue: "2,800,000", bidders: 0, issueDate: "15 Mar 2026", closeDate: "30 Apr 2026", status: "Draft", statusColor: "text-gray-400 bg-gray-500/10 border-gray-500/20" },
];

const prequalData = [
  { company: "Shelter Engineering", trade: "Civil", grade: "A", capacity: "QAR 500M+", experience: "15+ yrs", score: 92, status: "Qualified", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { company: "ADC Construction", trade: "Civil", grade: "A", capacity: "QAR 300M+", experience: "12 yrs", score: 87, status: "Qualified", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { company: "Gulf MEP Solutions", trade: "MEP", grade: "A", capacity: "QAR 200M+", experience: "10 yrs", score: 85, status: "Qualified", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { company: "Al Khaleej Facades", trade: "Facade", grade: "B+", capacity: "QAR 100M+", experience: "8 yrs", score: 78, status: "Qualified", statusColor: "text-green-400 bg-green-500/10 border-green-500/20" },
  { company: "Desert Interiors", trade: "Fit-out", grade: "B", capacity: "QAR 80M+", experience: "6 yrs", score: 72, status: "Conditional", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  { company: "Greenscape Qatar", trade: "Landscape", grade: "B", capacity: "QAR 50M+", experience: "5 yrs", score: 68, status: "Under Review", statusColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
];

const bidEvaluations = [
  { tender: "TP-004", bidder: "Desert Interiors", technicalScore: 78, commercialScore: 85, totalScore: 81, amount: "5,890,000", rank: 1, recommendation: "Award", recColor: "text-green-400" },
  { tender: "TP-004", bidder: "Luxe Fit-out LLC", technicalScore: 82, commercialScore: 72, totalScore: 77, amount: "6,450,000", rank: 2, recommendation: "Reserve", recColor: "text-yellow-400" },
  { tender: "TP-004", bidder: "Al Maha Interiors", technicalScore: 75, commercialScore: 70, totalScore: 73, amount: "6,780,000", rank: 3, recommendation: "—", recColor: "text-gray-500" },
  { tender: "TP-004", bidder: "Premium Decor Co", technicalScore: 68, commercialScore: 88, totalScore: 76, amount: "5,420,000", rank: 4, recommendation: "Non-Compliant", recColor: "text-red-400" },
];

const awards = [
  { tender: "TP-001", contractor: "Shelter Engineering", value: "44,200,000", awardDate: "01 Nov 2024", contractType: "FIDIC Red Book 2017", loi: "Issued", loiColor: "text-green-400", contract: "Signed", contractColor: "text-green-400" },
  { tender: "TP-002", contractor: "Gulf MEP Solutions", value: "17,850,000", awardDate: "15 Nov 2024", contractType: "FIDIC Red Book 2017", loi: "Issued", loiColor: "text-green-400", contract: "Signed", contractColor: "text-green-400" },
  { tender: "TP-003", contractor: "Al Khaleej Facades", value: "8,320,000", awardDate: "01 Dec 2024", contractType: "FIDIC Red Book 2017", loi: "Issued", loiColor: "text-green-400", contract: "Signed", contractColor: "text-green-400" },
];

export default function TendersPage() {
  const [activeTab, setActiveTab] = useState("Tender Packages");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Tender Management</h1>
        <p className="text-xs text-gray-500 mt-1">Manage prequalification, tender packages, bid evaluation, and contract award</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Packages", value: tenderPackages.length.toString(), color: "text-blue-400" },
          { label: "Open Tenders", value: tenderPackages.filter((t) => t.status === "Open").length.toString(), color: "text-yellow-400" },
          { label: "Under Evaluation", value: tenderPackages.filter((t) => t.status === "Evaluation").length.toString(), color: "text-orange-400" },
          { label: "Awarded", value: tenderPackages.filter((t) => t.status === "Awarded").length.toString(), color: "text-green-400" },
          { label: "Est. Total Value", value: "QAR 88.8M", color: "text-blue-400" },
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

      {/* Tender Packages */}
      {activeTab === "Tender Packages" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Ref</th>
                <th className="text-left pb-2">Package</th>
                <th className="text-left pb-2">Trade</th>
                <th className="text-right pb-2">Est. Value (QAR)</th>
                <th className="text-center pb-2">Bidders</th>
                <th className="text-left pb-2">Issue Date</th>
                <th className="text-left pb-2">Close Date</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tenderPackages.map((row) => (
                <tr key={row.ref} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-blue-400 font-mono font-medium">{row.ref}</td>
                  <td className="py-3 text-gray-300">{row.title}</td>
                  <td className="py-3 text-gray-400">{row.trade}</td>
                  <td className="py-3 text-gray-300 text-right font-medium">{row.estimatedValue}</td>
                  <td className="py-3 text-gray-400 text-center">{row.bidders || "—"}</td>
                  <td className="py-3 text-gray-400">{row.issueDate}</td>
                  <td className="py-3 text-gray-400">{row.closeDate}</td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Prequalification */}
      {activeTab === "Prequalification" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">Prequalification Register</div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Company</th>
                <th className="text-left pb-2">Trade</th>
                <th className="text-left pb-2">Grade</th>
                <th className="text-left pb-2">Capacity</th>
                <th className="text-left pb-2">Experience</th>
                <th className="text-center pb-2">PQQ Score</th>
                <th className="text-left pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {prequalData.map((row) => (
                <tr key={row.company} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-gray-300 font-medium">{row.company}</td>
                  <td className="py-3 text-gray-400">{row.trade}</td>
                  <td className="py-3 text-blue-400 font-medium">{row.grade}</td>
                  <td className="py-3 text-gray-400">{row.capacity}</td>
                  <td className="py-3 text-gray-400">{row.experience}</td>
                  <td className="py-3 text-center">
                    <span className={`text-xs font-bold ${row.score >= 80 ? "text-green-400" : row.score >= 70 ? "text-yellow-400" : "text-red-400"}`}>{row.score}</span>
                  </td>
                  <td className="py-3"><span className={`text-[10px] px-2 py-0.5 rounded border ${row.statusColor}`}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Bid Evaluation */}
      {activeTab === "Bid Evaluation" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
            Bid Evaluation — TP-004: Interior Fit-out
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-center pb-2">Rank</th>
                <th className="text-left pb-2">Bidder</th>
                <th className="text-center pb-2">Technical (40%)</th>
                <th className="text-center pb-2">Commercial (60%)</th>
                <th className="text-center pb-2">Total Score</th>
                <th className="text-right pb-2">Bid Amount (QAR)</th>
                <th className="text-left pb-2">Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {bidEvaluations.map((row) => (
                <tr key={row.bidder} className={`text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20 ${row.rank === 1 ? "bg-green-500/5" : ""}`}>
                  <td className="py-3 text-center text-gray-400 font-bold">#{row.rank}</td>
                  <td className="py-3 text-gray-300 font-medium">{row.bidder}</td>
                  <td className="py-3 text-center text-gray-400">{row.technicalScore}</td>
                  <td className="py-3 text-center text-gray-400">{row.commercialScore}</td>
                  <td className="py-3 text-center font-bold text-blue-400">{row.totalScore}</td>
                  <td className="py-3 text-right text-gray-300 font-medium">{row.amount}</td>
                  <td className="py-3"><span className={`text-xs font-medium ${row.recColor}`}>{row.recommendation}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Award */}
      {activeTab === "Award" && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
          <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">Contract Awards</div>
          <table className="w-full">
            <thead>
              <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
                <th className="text-left pb-2">Tender</th>
                <th className="text-left pb-2">Contractor</th>
                <th className="text-right pb-2">Award Value (QAR)</th>
                <th className="text-left pb-2">Award Date</th>
                <th className="text-left pb-2">Contract Type</th>
                <th className="text-left pb-2">LOI</th>
                <th className="text-left pb-2">Contract</th>
              </tr>
            </thead>
            <tbody>
              {awards.map((row) => (
                <tr key={row.tender} className="text-xs border-b border-hai-primary/30 last:border-0 hover:bg-hai-primary/20">
                  <td className="py-3 text-blue-400 font-mono font-medium">{row.tender}</td>
                  <td className="py-3 text-gray-300 font-medium">{row.contractor}</td>
                  <td className="py-3 text-green-400 text-right font-medium">{row.value}</td>
                  <td className="py-3 text-gray-400">{row.awardDate}</td>
                  <td className="py-3 text-gray-400">{row.contractType}</td>
                  <td className="py-3"><span className={`text-[10px] ${row.loiColor}`}>{row.loi}</span></td>
                  <td className="py-3"><span className={`text-[10px] ${row.contractColor}`}>{row.contract}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
