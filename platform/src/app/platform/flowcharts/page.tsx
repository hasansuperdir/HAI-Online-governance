"use client";

import { useState } from "react";

/* ─── Process Flow Data ─── */
interface FlowStep {
  id: string;
  label: string;
  actors: string[];
  duration: string;
  type: "start" | "task" | "parallel" | "decision" | "end";
}

interface ProcessFlow {
  id: string;
  title: string;
  category: string;
  ref: string;
  initiator: string;
  totalDuration: string;
  status: "Active" | "Draft" | "Under Review";
  steps: FlowStep[];
}

const processFlows: ProcessFlow[] = [
  {
    id: "WF-001",
    title: "SDL Design Management Review",
    category: "Engineering",
    ref: "PF-01",
    initiator: "Contractor Design Manager",
    totalDuration: "10 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Multi-Discipline Review", actors: ["Project Manager (Lead)", "Architect", "C&S Engineer", "M&E Engineer", "Green Consultant"], duration: "5 days", type: "parallel" },
      { id: "s3", label: "Consolidation & Response", actors: ["Project Services — Summarize for Approval", "PEM — Summarize for Approval", "VCQ — Summarize for Approval"], duration: "2 days", type: "parallel" },
      { id: "s4", label: "Supervisor Internal Approval", actors: ["Supervision Team"], duration: "2 days", type: "task" },
      { id: "s5", label: "Final Approval Obtained", actors: ["Programme Director"], duration: "1 day", type: "task" },
      { id: "s6", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-002",
    title: "Variation Order Processing",
    category: "Commercial",
    ref: "PF-03",
    initiator: "Project Manager / QS",
    totalDuration: "28 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "VO Instruction Issued", actors: ["Project Manager"], duration: "1 day", type: "task" },
      { id: "s3", label: "Contractor Quotation", actors: ["Contractor QS"], duration: "14 days", type: "task" },
      { id: "s4", label: "QS Assessment & Evaluation", actors: ["ER QS Lead", "Cost Consultant"], duration: "5 days", type: "parallel" },
      { id: "s5", label: "Value Threshold Check", actors: ["Approval Authority"], duration: "1 day", type: "decision" },
      { id: "s6", label: "ER Approval / PM Approval", actors: ["Programme Director", "Project Manager"], duration: "5 days", type: "task" },
      { id: "s7", label: "VO Approved & Issued", actors: ["Contract Admin"], duration: "2 days", type: "task" },
      { id: "s8", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-003",
    title: "Interim Payment Certificate (IPC)",
    category: "Commercial",
    ref: "PF-08",
    initiator: "Contractor QS",
    totalDuration: "28 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Contractor Application", actors: ["Contractor QS"], duration: "Day 1", type: "task" },
      { id: "s3", label: "Site Measurement & Verification", actors: ["ER QS", "Site Team"], duration: "5 days", type: "parallel" },
      { id: "s4", label: "QS Evaluation & Draft IPC", actors: ["ER QS Lead"], duration: "7 days", type: "task" },
      { id: "s5", label: "PM Review & Endorsement", actors: ["Project Manager"], duration: "3 days", type: "task" },
      { id: "s6", label: "Finance Approval", actors: ["Finance Director"], duration: "5 days", type: "task" },
      { id: "s7", label: "IPC Issued (FIDIC 14.6)", actors: ["Contract Admin"], duration: "7 days", type: "task" },
      { id: "s8", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-004",
    title: "Non-Conformance Report (NCR)",
    category: "Quality",
    ref: "PF-10",
    initiator: "QA/QC Engineer",
    totalDuration: "14 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "NCR Raised & Documented", actors: ["QA/QC Engineer"], duration: "1 day", type: "task" },
      { id: "s3", label: "Root Cause Analysis", actors: ["Contractor QA", "Site Engineer"], duration: "3 days", type: "parallel" },
      { id: "s4", label: "Corrective Action Proposal", actors: ["Contractor"], duration: "3 days", type: "task" },
      { id: "s5", label: "Review & Accept / Reject", actors: ["ER QA Manager"], duration: "2 days", type: "decision" },
      { id: "s6", label: "Implementation & Verification", actors: ["Contractor", "ER Inspector"], duration: "3 days", type: "task" },
      { id: "s7", label: "NCR Close-out", actors: ["QA Manager"], duration: "2 days", type: "task" },
      { id: "s8", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-005",
    title: "Material Submittal Review",
    category: "Engineering",
    ref: "PF-01",
    initiator: "Contractor",
    totalDuration: "14 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Contractor Submits Material Data", actors: ["Contractor Engineer"], duration: "1 day", type: "task" },
      { id: "s3", label: "Document Control Logging", actors: ["Doc Control"], duration: "1 day", type: "task" },
      { id: "s4", label: "Multi-Discipline Review", actors: ["Lead Designer", "Specialist Reviewer", "QA/QC"], duration: "7 days", type: "parallel" },
      { id: "s5", label: "Consolidate Comments", actors: ["Design Manager"], duration: "2 days", type: "task" },
      { id: "s6", label: "Issue Response Code", actors: ["Design Manager"], duration: "1 day", type: "decision" },
      { id: "s7", label: "Transmittal to Contractor", actors: ["Doc Control"], duration: "2 days", type: "task" },
      { id: "s8", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-006",
    title: "Inspection Request (ITP)",
    category: "Quality",
    ref: "PF-10",
    initiator: "Contractor Site Engineer",
    totalDuration: "3 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Contractor Raises IR", actors: ["Site Engineer"], duration: "1 day", type: "task" },
      { id: "s3", label: "ER Inspector Attends Site", actors: ["ER Inspector"], duration: "1 day", type: "task" },
      { id: "s4", label: "Pass / Fail Decision", actors: ["ER Inspector"], duration: "0.5 day", type: "decision" },
      { id: "s5", label: "Issue Inspection Result", actors: ["QA Manager"], duration: "0.5 day", type: "task" },
      { id: "s6", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-007",
    title: "RFI Processing",
    category: "Engineering",
    ref: "PF-02",
    initiator: "Contractor",
    totalDuration: "7 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Contractor Raises RFI", actors: ["Site Engineer"], duration: "1 day", type: "task" },
      { id: "s3", label: "Route to Relevant Discipline", actors: ["Doc Control"], duration: "0.5 day", type: "task" },
      { id: "s4", label: "Technical Response", actors: ["Design Consultant", "Specialist"], duration: "3 days", type: "parallel" },
      { id: "s5", label: "ER Review & Approve", actors: ["Project Manager"], duration: "1.5 days", type: "task" },
      { id: "s6", label: "Issue Response to Contractor", actors: ["Doc Control"], duration: "1 day", type: "task" },
      { id: "s7", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-008",
    title: "Stage Gate Review",
    category: "Governance",
    ref: "PF-15",
    initiator: "Programme Director",
    totalDuration: "21 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Gate Readiness Assessment", actors: ["Project Manager", "QA Manager"], duration: "5 days", type: "parallel" },
      { id: "s3", label: "Compile Gate Package", actors: ["Project Services"], duration: "3 days", type: "task" },
      { id: "s4", label: "Gate Review Panel", actors: ["Programme Director", "Finance Dir", "Technical Dir"], duration: "5 days", type: "parallel" },
      { id: "s5", label: "Gate Decision", actors: ["Programme Director"], duration: "1 day", type: "decision" },
      { id: "s6", label: "Issue Gate Certificate", actors: ["Governance Team"], duration: "2 days", type: "task" },
      { id: "s7", label: "Communicate & Archive", actors: ["Project Services", "Doc Control"], duration: "5 days", type: "parallel" },
      { id: "s8", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-009",
    title: "Contractor Claim Assessment",
    category: "Commercial",
    ref: "PF-05",
    initiator: "Contractor",
    totalDuration: "42 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Claim Notice (FIDIC 20.1)", actors: ["Contractor"], duration: "28 days", type: "task" },
      { id: "s3", label: "ER Assessment", actors: ["ER QS", "ER PM", "Legal Advisor"], duration: "7 days", type: "parallel" },
      { id: "s4", label: "Determination", actors: ["Programme Director"], duration: "5 days", type: "decision" },
      { id: "s5", label: "Issue Determination Notice", actors: ["Contract Admin"], duration: "2 days", type: "task" },
      { id: "s6", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
  {
    id: "WF-010",
    title: "HSE Incident Reporting",
    category: "HSE",
    ref: "PF-12",
    initiator: "HSE Officer",
    totalDuration: "7 days",
    status: "Active",
    steps: [
      { id: "s1", label: "Start", actors: [], duration: "", type: "start" },
      { id: "s2", label: "Incident Reported", actors: ["HSE Officer / Anyone"], duration: "Immediate", type: "task" },
      { id: "s3", label: "Investigation & Root Cause", actors: ["HSE Manager", "Contractor HSE"], duration: "3 days", type: "parallel" },
      { id: "s4", label: "Corrective Actions Identified", actors: ["HSE Manager"], duration: "1 day", type: "task" },
      { id: "s5", label: "Management Review", actors: ["Programme Director", "HSE Director"], duration: "2 days", type: "task" },
      { id: "s6", label: "Close-out & Lessons Learned", actors: ["HSE Manager"], duration: "1 day", type: "task" },
      { id: "s7", label: "End", actors: [], duration: "", type: "end" },
    ],
  },
];

const categories = ["All", "Engineering", "Commercial", "Quality", "Governance", "HSE"];

/* ─── Flow Step Component ─── */
function FlowStepNode({ step }: { step: FlowStep }) {
  if (step.type === "start") {
    return (
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border-2 border-green-500 bg-green-500/10 flex items-center justify-center">
          <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <span className="text-[9px] text-gray-500 mt-1">Start</span>
      </div>
    );
  }

  if (step.type === "end") {
    return (
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 rounded-full border-2 border-red-500 bg-red-500/10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-sm bg-red-400" />
        </div>
        <span className="text-[9px] text-gray-500 mt-1">End</span>
      </div>
    );
  }

  if (step.type === "decision") {
    return (
      <div className="flex flex-col items-center min-w-[120px]">
        <div className="text-[9px] text-gray-600 mb-1">{step.duration}</div>
        <div className="w-20 h-20 border-2 border-yellow-500 bg-yellow-500/10 flex items-center justify-center rotate-45">
          <div className="-rotate-45 text-center px-1">
            <div className="text-[9px] text-yellow-300 font-medium leading-tight">{step.label}</div>
          </div>
        </div>
        <div className="mt-2 space-y-0.5">
          {step.actors.map((a, i) => (
            <div key={i} className="text-[8px] text-hai-accent text-center">{a}</div>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === "parallel") {
    return (
      <div className="flex flex-col items-center min-w-[130px]">
        <div className="text-[9px] text-gray-600 mb-1">{step.duration}</div>
        <div className="border border-hai-steel rounded-lg bg-hai-primary/30 p-2 space-y-1 w-full">
          {step.actors.map((a, i) => (
            <div key={i} className="text-[9px] text-hai-accent bg-hai-navy/60 rounded px-2 py-1 border border-hai-steel/50 text-center">
              {a}
            </div>
          ))}
        </div>
        <div className="text-[9px] text-gray-400 mt-1 text-center font-medium">{step.label}</div>
      </div>
    );
  }

  // task
  return (
    <div className="flex flex-col items-center min-w-[120px]">
      <div className="text-[9px] text-gray-600 mb-1">{step.duration}</div>
      <div className="border border-blue-500/30 rounded-lg bg-blue-500/5 px-4 py-3 text-center w-full">
        <div className="text-[10px] text-blue-300 font-medium leading-tight">{step.label}</div>
      </div>
      <div className="mt-1.5 space-y-0.5">
        {step.actors.map((a, i) => (
          <div key={i} className="text-[8px] text-hai-accent text-center">{a}</div>
        ))}
      </div>
    </div>
  );
}

/* ─── Arrow Connector ─── */
function Arrow() {
  return (
    <div className="flex items-center mx-1 flex-shrink-0 self-center mt-[-16px]">
      <div className="w-6 h-px bg-gray-600" />
      <svg className="w-2.5 h-2.5 text-gray-600 -ml-0.5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  );
}

/* ─── Main Component ─── */
export default function FlowchartsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFlow, setExpandedFlow] = useState<string | null>(null);

  const filtered = activeCategory === "All"
    ? processFlows
    : processFlows.filter((f) => f.category === activeCategory);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">Process Flowcharts</h1>
        <p className="text-xs text-gray-500 mt-1">Visual workflow diagrams for all governance processes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Processes", value: processFlows.length.toString(), color: "text-blue-400" },
          { label: "Engineering", value: processFlows.filter((f) => f.category === "Engineering").length.toString(), color: "text-green-400" },
          { label: "Commercial", value: processFlows.filter((f) => f.category === "Commercial").length.toString(), color: "text-orange-400" },
          { label: "Quality", value: processFlows.filter((f) => f.category === "Quality").length.toString(), color: "text-yellow-400" },
          { label: "Governance / HSE", value: processFlows.filter((f) => f.category === "Governance" || f.category === "HSE").length.toString(), color: "text-purple-400" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-hai-navy border border-hai-steel rounded-lg p-4">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</div>
            <div className={`text-xl font-bold ${kpi.color}`}>{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex border-b border-hai-steel mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setExpandedFlow(null);
            }}
            className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
              activeCategory === cat
                ? "border-hai-accent text-white"
                : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Process List */}
      <div className="space-y-3">
        {filtered.map((flow) => {
          const isExpanded = expandedFlow === flow.id;
          return (
            <div key={flow.id} className="bg-hai-navy border border-hai-steel rounded-lg overflow-hidden">
              {/* Header — clickable */}
              <button
                onClick={() => setExpandedFlow(isExpanded ? null : flow.id)}
                className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-hai-primary/20 transition-all text-left"
              >
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-600 font-mono w-16">{flow.id}</span>
                  <span className="text-sm text-white font-medium">{flow.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                    {flow.category}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] text-gray-500">Ref: {flow.ref}</span>
                  <span className="text-[10px] text-gray-500">Duration: {flow.totalDuration}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded border ${
                    flow.status === "Active"
                      ? "text-green-400 bg-green-500/10 border-green-500/20"
                      : "text-yellow-400 bg-yellow-500/10 border-yellow-500/20"
                  }`}>
                    {flow.status}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded — Flow Detail */}
              {isExpanded && (
                <div className="border-t border-hai-steel">
                  {/* Meta Info */}
                  <div className="px-5 py-3 bg-hai-primary/20 grid grid-cols-4 gap-4 border-b border-hai-steel/50">
                    <div>
                      <div className="text-[10px] text-gray-600 uppercase">Initiator</div>
                      <div className="text-xs text-gray-300 mt-0.5">{flow.initiator}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-600 uppercase">Reference</div>
                      <div className="text-xs text-gray-300 mt-0.5">{flow.ref}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-600 uppercase">Total Duration</div>
                      <div className="text-xs text-gray-300 mt-0.5">{flow.totalDuration}</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-gray-600 uppercase">Steps</div>
                      <div className="text-xs text-gray-300 mt-0.5">{flow.steps.length - 2} process steps</div>
                    </div>
                  </div>

                  {/* Duration header row */}
                  <div className="px-5 py-2 bg-hai-primary/10 border-b border-hai-steel/30">
                    <div className="flex items-center gap-6 overflow-x-auto">
                      <span className="text-[10px] text-gray-500 font-medium flex-shrink-0">Duration</span>
                      {flow.steps.filter((s) => s.type !== "start" && s.type !== "end").map((s) => (
                        <span key={s.id} className="text-[10px] text-gray-400 min-w-[120px] text-center flex-shrink-0">
                          {s.duration}
                        </span>
                      ))}
                      <span className="text-[10px] text-white font-semibold flex-shrink-0">Total: {flow.totalDuration}</span>
                    </div>
                  </div>

                  {/* Visual Flowchart */}
                  <div className="px-5 py-6 overflow-x-auto">
                    <div className="flex items-start gap-0 min-w-max">
                      {flow.steps.map((step, i) => (
                        <div key={step.id} className="flex items-start">
                          <FlowStepNode step={step} />
                          {i < flow.steps.length - 1 && <Arrow />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
