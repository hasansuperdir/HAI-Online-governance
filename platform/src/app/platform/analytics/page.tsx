"use client";

const predictions = [
  {
    id: "AI-001",
    type: "Cost Deviation",
    project: "ARADA Tower A",
    prediction: "Budget overrun likely to reach +4.2% by Q3 2026",
    confidence: 87,
    risk: "Amber",
    factors: ["3 pending variation orders", "Material price escalation trend", "Productivity below baseline"],
    recommendation: "Accelerate VO assessment. Consider supplier hedging for steel.",
  },
  {
    id: "AI-002",
    type: "Schedule Delay",
    project: "Sports Complex",
    prediction: "Stage 6 completion at risk — 23 day delay projected",
    confidence: 79,
    risk: "Red",
    factors: ["Kahramaa approval pending 14 days", "3 NCRs blocking concrete pour", "Subcontractor mobilisation delayed"],
    recommendation: "Escalate Kahramaa application. Fast-track NCR closure with daily follow-up.",
  },
  {
    id: "AI-003",
    type: "Contractor Performance",
    project: "ARADA Tower B",
    prediction: "Contractor B score trending to 58% — breach of KPI threshold",
    confidence: 72,
    risk: "Amber",
    factors: ["NCR rate 3x programme average", "IPC submission quality declining", "Resource histogram below plan"],
    recommendation: "Issue performance notice under FIDIC Cl. 15.1. Schedule performance review meeting.",
  },
  {
    id: "AI-004",
    type: "Approval Bottleneck",
    project: "Programme-Wide",
    prediction: "Finance Director approval queue will exceed SLA in 5 working days",
    confidence: 91,
    risk: "Amber",
    factors: ["12 pending approvals in queue", "Average 4.2 day processing time", "3 high-value IPCs incoming"],
    recommendation: "Activate delegation to Deputy Finance Director for IPCs under QAR 2M.",
  },
];

const riskColors: Record<string, string> = {
  Green: "bg-green-500/10 text-green-400 border-green-500/20",
  Amber: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  Red: "bg-red-500/10 text-red-400 border-red-500/20",
};

const kpiTrends = [
  { kpi: "Approval Turnaround", current: "3.2d", trend: "improving", target: "5d" },
  { kpi: "Stage Compliance", current: "94%", trend: "stable", target: "100%" },
  { kpi: "Cost Deviation", current: "+2.1%", trend: "worsening", target: "±5%" },
  { kpi: "IPC Processing Time", current: "18d", trend: "improving", target: "21d" },
  { kpi: "Submittal On-Time", current: "89%", trend: "stable", target: "95%" },
  { kpi: "NCR Closure Rate", current: "78%", trend: "worsening", target: "90%" },
  { kpi: "Variation Assessment", current: "12d", trend: "stable", target: "14d" },
  { kpi: "ERP Sync Success", current: "99.2%", trend: "stable", target: "99%" },
];

const trendColors: Record<string, string> = {
  improving: "text-green-400",
  stable: "text-blue-400",
  worsening: "text-red-400",
};

const trendArrows: Record<string, string> = {
  improving: "↑",
  stable: "→",
  worsening: "↓",
};

export default function AnalyticsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Analytics & AI</h1>
          <p className="text-xs text-gray-500 mt-1">Predictive analytics, KPI trends, and AI-powered risk intelligence</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1.5 rounded bg-hai-navy border border-hai-steel text-gray-400">
            Last 30 Days
          </button>
          <button className="text-xs px-3 py-1.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-400">
            Run AI Analysis
          </button>
        </div>
      </div>

      {/* AI Predictions */}
      <div className="mb-6">
        <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          AI Predictions & Recommendations
        </div>
        <div className="space-y-3">
          {predictions.map((p) => (
            <div key={p.id} className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-purple-400">{p.id}</span>
                    <span className="text-xs text-gray-400">{p.type}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${riskColors[p.risk]}`}>{p.risk}</span>
                    <span className="text-[10px] text-gray-500">{p.project}</span>
                  </div>
                  <div className="text-sm text-gray-200 mb-2 font-medium">{p.prediction}</div>
                  <div className="mb-2">
                    <span className="text-[10px] text-gray-500 uppercase">Contributing Factors:</span>
                    <ul className="mt-1 space-y-0.5">
                      {p.factors.map((f, i) => (
                        <li key={i} className="text-[11px] text-gray-400 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gray-600" /> {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-hai-primary/50 rounded p-2.5 border border-hai-steel">
                    <span className="text-[10px] text-purple-400 font-semibold uppercase">AI Recommendation: </span>
                    <span className="text-xs text-gray-300">{p.recommendation}</span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-purple-400">{p.confidence}%</div>
                  <div className="text-[10px] text-gray-500">Confidence</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* KPI Trends */}
      <div className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
        <div className="px-4 py-3 border-b border-hai-steel">
          <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">KPI Performance Trends</span>
        </div>
        <table className="w-full">
          <thead>
            <tr className="text-[10px] text-gray-500 uppercase border-b border-hai-steel">
              <th className="text-left px-4 py-2">KPI</th>
              <th className="text-left px-4 py-2">Current</th>
              <th className="text-left px-4 py-2">Target</th>
              <th className="text-left px-4 py-2">Trend</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {kpiTrends.map((k) => (
              <tr key={k.kpi} className="text-xs border-b border-hai-primary/50 hover:bg-hai-primary/30">
                <td className="px-4 py-2.5 text-gray-200 font-medium">{k.kpi}</td>
                <td className="px-4 py-2.5 text-gray-200 font-semibold">{k.current}</td>
                <td className="px-4 py-2.5 text-gray-500">{k.target}</td>
                <td className={`px-4 py-2.5 font-bold ${trendColors[k.trend]}`}>
                  {trendArrows[k.trend]} {k.trend}
                </td>
                <td className="px-4 py-2.5">
                  <div className="w-16 h-1.5 bg-hai-primary rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${
                      k.trend === "improving" ? "bg-green-500" : k.trend === "stable" ? "bg-blue-500" : "bg-red-500"
                    }`} style={{ width: "70%" }} />
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
