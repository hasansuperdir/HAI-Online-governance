import { NextRequest, NextResponse } from "next/server";

// AI Prediction Engine API
// Provides predictive analytics for cost, schedule, contractor performance, and bottleneck detection

interface Prediction {
  id: string;
  type: "Cost Deviation" | "Schedule Delay" | "Contractor Performance" | "Approval Bottleneck" | "Document Risk";
  project: string;
  prediction: string;
  confidence: number;
  risk_level: "Green" | "Amber" | "Red";
  factors: string[];
  recommendation: string;
  generated_at: string;
}

interface RiskScore {
  project: string;
  overall_risk: number;
  cost_risk: number;
  schedule_risk: number;
  quality_risk: number;
  compliance_risk: number;
}

// Mock AI predictions — in production, these come from ML models
const predictions: Prediction[] = [
  {
    id: "AI-001",
    type: "Cost Deviation",
    project: "ARADA Tower A",
    prediction: "Budget overrun likely to reach +4.2% by Q3 2026 based on current variation trend and material cost escalation.",
    confidence: 87,
    risk_level: "Amber",
    factors: [
      "3 pending variation orders totalling QAR 1.79M",
      "Steel price index up 8.3% vs baseline assumptions",
      "Labour productivity 12% below programme baseline",
    ],
    recommendation: "Accelerate VO assessment to crystallise exposure. Consider supplier hedging for remaining steel packages. Review resource loading against baseline.",
    generated_at: "2026-03-06T08:00:00Z",
  },
  {
    id: "AI-002",
    type: "Schedule Delay",
    project: "Sports Complex",
    prediction: "Stage 6 completion at risk — 23 calendar day delay projected based on critical path analysis.",
    confidence: 79,
    risk_level: "Red",
    factors: [
      "Kahramaa load application pending 14 days (avg approval: 21 days)",
      "3 open NCRs blocking concrete pour on critical path",
      "Subcontractor mobilisation delayed by 11 days",
    ],
    recommendation: "Escalate Kahramaa application through authority liaison. Assign dedicated NCR closure team with daily follow-up. Issue performance notice to subcontractor.",
    generated_at: "2026-03-06T08:00:00Z",
  },
  {
    id: "AI-003",
    type: "Contractor Performance",
    project: "ARADA Tower B",
    prediction: "Contractor B overall score trending to 58% by end of month — below 60% KPI threshold.",
    confidence: 72,
    risk_level: "Amber",
    factors: [
      "NCR rate 3.2x programme average (7 NCRs in 30 days)",
      "IPC submission quality declining — last 2 returned for corrections",
      "Resource histogram 18% below contractual commitment",
    ],
    recommendation: "Issue formal performance notice under FIDIC Cl. 15.1. Schedule performance review meeting within 7 days. Request updated resource mobilisation plan.",
    generated_at: "2026-03-06T08:00:00Z",
  },
  {
    id: "AI-004",
    type: "Approval Bottleneck",
    project: "Programme-Wide",
    prediction: "Finance Director approval queue will exceed 5-day SLA in 5 working days at current processing rate.",
    confidence: 91,
    risk_level: "Amber",
    factors: [
      "12 pending approvals currently in Finance Director queue",
      "Average processing time trending to 4.2 days (SLA: 5 days)",
      "3 high-value IPCs (>QAR 2M each) arriving this week",
    ],
    recommendation: "Activate delegation to Deputy Finance Director for approvals under QAR 2M. Prioritise IPC-024 and IPC-025 for immediate processing.",
    generated_at: "2026-03-06T08:00:00Z",
  },
  {
    id: "AI-005",
    type: "Document Risk",
    project: "Marina District",
    prediction: "Stage 4 document submission rate at 67% — gate review at risk if trend continues.",
    confidence: 84,
    risk_level: "Amber",
    factors: [
      "142 documents required for Stage 4 gate, 95 submitted to date",
      "MEP coordination drawings 3 weeks behind programme",
      "Design consultant response time averaging 8 days (target: 5)",
    ],
    recommendation: "Issue document expedition notice to design consultant. Schedule weekly submittal progress meetings. Consider parallel review for non-interdependent packages.",
    generated_at: "2026-03-06T08:00:00Z",
  },
];

const riskScores: RiskScore[] = [
  { project: "ARADA Tower A", overall_risk: 35, cost_risk: 45, schedule_risk: 25, quality_risk: 20, compliance_risk: 15 },
  { project: "ARADA Tower B", overall_risk: 52, cost_risk: 38, schedule_risk: 42, quality_risk: 65, compliance_risk: 30 },
  { project: "Marina District", overall_risk: 40, cost_risk: 25, schedule_risk: 55, quality_risk: 30, compliance_risk: 20 },
  { project: "Sports Complex", overall_risk: 68, cost_risk: 50, schedule_risk: 78, quality_risk: 45, compliance_risk: 35 },
  { project: "School Campus", overall_risk: 22, cost_risk: 18, schedule_risk: 20, quality_risk: 15, compliance_risk: 10 },
];

// GET: Retrieve AI predictions and risk scores
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const project = searchParams.get("project");
  const type = searchParams.get("type");

  let filteredPredictions = [...predictions];
  if (project) filteredPredictions = filteredPredictions.filter((p) => p.project === project);
  if (type) filteredPredictions = filteredPredictions.filter((p) => p.type === type);

  let filteredRisk = [...riskScores];
  if (project) filteredRisk = filteredRisk.filter((r) => r.project === project);

  return NextResponse.json({
    predictions: filteredPredictions,
    risk_scores: filteredRisk,
    model_version: "1.2.0",
    last_trained: "2026-03-01T00:00:00Z",
    data_points_analysed: 15420,
  });
}

// POST: Run on-demand AI analysis
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { analysis_type, project, parameters } = body;

  const validTypes = ["cost_forecast", "schedule_risk", "contractor_scoring", "bottleneck_detection", "document_classification"];

  if (!analysis_type || !validTypes.includes(analysis_type)) {
    return NextResponse.json(
      { error: `Invalid analysis_type. Must be one of: ${validTypes.join(", ")}` },
      { status: 400 }
    );
  }

  // In production, this triggers the ML pipeline
  return NextResponse.json({
    message: "Analysis queued successfully",
    job_id: crypto.randomUUID(),
    analysis_type,
    project: project || "All",
    parameters: parameters || {},
    estimated_completion: "30 seconds",
    status: "Processing",
  });
}
