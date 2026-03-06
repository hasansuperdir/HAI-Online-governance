"use client";

import { useState } from "react";
import ERDashboard from "@/components/platform/dashboards/ERDashboard";
import CostDashboard from "@/components/platform/dashboards/CostDashboard";
import QualityDashboard from "@/components/platform/dashboards/QualityDashboard";
import ContractorPortal from "@/components/platform/dashboards/ContractorPortal";
import ConsultantPortal from "@/components/platform/dashboards/ConsultantPortal";
import GovernanceDashboard from "@/components/platform/dashboards/GovernanceDashboard";

const subDashboardTabs = [
  { id: "er", label: "ER Dashboard", ref: "R01-R02" },
  { id: "cost", label: "Cost Dashboard", ref: "R03-R05" },
  { id: "quality", label: "Quality Dashboard", ref: "R06-R08" },
  { id: "contractor", label: "Contractor Portal", ref: "R10-R11" },
  { id: "consultant", label: "Consultant Portal", ref: "R12" },
  { id: "governance", label: "Governance Dashboard", ref: "R01-R13" },
];

/* ─── Project Data ─── */
interface Project {
  name: string;
  capacity: string;
  contractor: string;
  consultant: string;
  employerRep: string;
  financialProgress: number;
  physicalProgress: number;
  plannedProgress: number;
  temperature: string;
  manpower: number;
  hseAccidents: number;
  hseLTI: number;
  currentStage: number;
}

const projectData: Record<string, Project[]> = {
  "Large Scale": [
    {
      name: "CUQ",
      capacity: "120 MQAR",
      contractor: "Shelter",
      consultant: "HTCO",
      employerRep: "Hasan Molla",
      financialProgress: 68,
      physicalProgress: 62,
      plannedProgress: 65,
      temperature: "34°C",
      manpower: 1240,
      hseAccidents: 0,
      hseLTI: 0,
      currentStage: 6,
    },
    {
      name: "FH-N13",
      capacity: "50 MQAR",
      contractor: "Shelter",
      consultant: "HTCO",
      employerRep: "Hasan Molla",
      financialProgress: 45,
      physicalProgress: 41,
      plannedProgress: 48,
      temperature: "33°C",
      manpower: 860,
      hseAccidents: 1,
      hseLTI: 0,
      currentStage: 5,
    },
    {
      name: "DBS-Wakra",
      capacity: "70 MQAR",
      contractor: "ADC",
      consultant: "ACG",
      employerRep: "Hasan Molla",
      financialProgress: 78,
      physicalProgress: 74,
      plannedProgress: 72,
      temperature: "35°C",
      manpower: 980,
      hseAccidents: 0,
      hseLTI: 0,
      currentStage: 7,
    },
  ],
  "Small Scale": [],
};

/* ─── Stage Data ─── */
const stages = [
  { num: 0, name: "Brief" },
  { num: 1, name: "Concept" },
  { num: 2, name: "Developed Design" },
  { num: 3, name: "Technical Design" },
  { num: 4, name: "Production Info" },
  { num: 5, name: "Tender" },
  { num: 6, name: "Construction" },
  { num: 7, name: "Handover" },
  { num: 8, name: "In Use" },
];

/* ─── Documents per requirement ─── */
interface Document {
  name: string;
  ref: string;
  rev: string;
  date: string;
  status: "Approved";
}

const requirementDocuments: Record<string, Document[]> = {
  // Stage 0
  "Client Brief Document": [
    { name: "Client Brief - Final", ref: "CUQ-BRF-001", rev: "Rev C", date: "2024-01-15", status: "Approved" },
    { name: "Project Objectives Statement", ref: "CUQ-BRF-002", rev: "Rev B", date: "2024-01-18", status: "Approved" },
  ],
  "Feasibility Study": [
    { name: "Feasibility Study Report", ref: "CUQ-FES-001", rev: "Rev D", date: "2024-02-10", status: "Approved" },
    { name: "Market Analysis Report", ref: "CUQ-FES-002", rev: "Rev B", date: "2024-02-12", status: "Approved" },
  ],
  "Budget Estimation": [
    { name: "Preliminary Cost Estimate", ref: "CUQ-CST-001", rev: "Rev C", date: "2024-02-20", status: "Approved" },
  ],
  "Site Survey Report": [
    { name: "Topographic Survey", ref: "CUQ-SRV-001", rev: "Rev B", date: "2024-01-25", status: "Approved" },
    { name: "Geotechnical Investigation", ref: "CUQ-SRV-002", rev: "Rev A", date: "2024-01-28", status: "Approved" },
  ],
  // Stage 1
  "Concept Design Report": [
    { name: "Concept Design Report - Final", ref: "CUQ-CNC-001", rev: "Rev E", date: "2024-03-20", status: "Approved" },
    { name: "Massing Study", ref: "CUQ-CNC-002", rev: "Rev C", date: "2024-03-18", status: "Approved" },
  ],
  "Initial Cost Plan": [
    { name: "Cost Plan Stage 1", ref: "CUQ-CST-010", rev: "Rev B", date: "2024-03-25", status: "Approved" },
  ],
  "Stakeholder Approval": [
    { name: "Stakeholder Sign-off Minutes", ref: "CUQ-STK-001", rev: "Rev A", date: "2024-04-02", status: "Approved" },
  ],
  "Environmental Assessment": [
    { name: "Environmental Impact Assessment", ref: "CUQ-ENV-001", rev: "Rev C", date: "2024-04-10", status: "Approved" },
  ],
  // Stage 2
  "Developed Design Package": [
    { name: "Architecture Developed Design", ref: "CUQ-ARC-DD-001", rev: "Rev D", date: "2024-05-15", status: "Approved" },
    { name: "Structural Developed Design", ref: "CUQ-STR-DD-001", rev: "Rev C", date: "2024-05-18", status: "Approved" },
    { name: "MEP Developed Design", ref: "CUQ-MEP-DD-001", rev: "Rev C", date: "2024-05-20", status: "Approved" },
  ],
  "Updated Cost Plan": [
    { name: "Cost Plan Stage 2", ref: "CUQ-CST-020", rev: "Rev C", date: "2024-05-25", status: "Approved" },
  ],
  "Planning Application": [
    { name: "Planning Submission Package", ref: "CUQ-PLN-001", rev: "Rev B", date: "2024-06-01", status: "Approved" },
  ],
  "Structural Scheme Design": [
    { name: "Structural Scheme Report", ref: "CUQ-STR-SCH-001", rev: "Rev D", date: "2024-05-22", status: "Approved" },
  ],
  "MEP Scheme Design": [
    { name: "MEP Scheme Report", ref: "CUQ-MEP-SCH-001", rev: "Rev C", date: "2024-05-24", status: "Approved" },
  ],
  // Stage 3
  "Technical Design Package": [
    { name: "Architecture Technical Design", ref: "CUQ-ARC-TD-001", rev: "Rev E", date: "2024-07-10", status: "Approved" },
    { name: "Structural Technical Design", ref: "CUQ-STR-TD-001", rev: "Rev D", date: "2024-07-12", status: "Approved" },
  ],
  "Building Regulation Submission": [
    { name: "Building Regulation Application", ref: "CUQ-REG-001", rev: "Rev B", date: "2024-07-20", status: "Approved" },
  ],
  "Specialist Subcontractor Designs": [
    { name: "Facade Specialist Design", ref: "CUQ-SPC-FAC-001", rev: "Rev C", date: "2024-07-25", status: "Approved" },
    { name: "Lift Specialist Design", ref: "CUQ-SPC-LFT-001", rev: "Rev B", date: "2024-07-28", status: "Approved" },
  ],
  "Construction Method Statement": [
    { name: "Method Statement - Main Works", ref: "CUQ-CMS-001", rev: "Rev C", date: "2024-08-01", status: "Approved" },
  ],
  "Fire Strategy Report": [
    { name: "Fire Strategy - Final", ref: "CUQ-FIR-001", rev: "Rev D", date: "2024-08-05", status: "Approved" },
  ],
  // Stage 4
  "Production Drawings": [
    { name: "Architecture Production Drawings", ref: "CUQ-ARC-PD-001", rev: "Rev F", date: "2024-09-15", status: "Approved" },
    { name: "Structural Production Drawings", ref: "CUQ-STR-PD-001", rev: "Rev E", date: "2024-09-18", status: "Approved" },
    { name: "MEP Production Drawings", ref: "CUQ-MEP-PD-001", rev: "Rev D", date: "2024-09-20", status: "Approved" },
  ],
  "Bill of Quantities": [
    { name: "Bill of Quantities - Final", ref: "CUQ-BOQ-001", rev: "Rev C", date: "2024-09-25", status: "Approved" },
  ],
  "Specification Documents": [
    { name: "Technical Specifications", ref: "CUQ-SPC-001", rev: "Rev D", date: "2024-09-28", status: "Approved" },
  ],
  "Pre-qualification of Contractors": [
    { name: "PQQ Evaluation Report", ref: "CUQ-PQQ-001", rev: "Rev B", date: "2024-10-05", status: "Approved" },
  ],
  // Stage 5
  "Tender Documents Issued": [
    { name: "Tender Document Package", ref: "CUQ-TND-001", rev: "Rev C", date: "2024-11-01", status: "Approved" },
  ],
  "Tender Evaluation Report": [
    { name: "Tender Evaluation Report", ref: "CUQ-TND-EVL-001", rev: "Rev B", date: "2024-12-10", status: "Approved" },
  ],
  "Contract Award": [
    { name: "Contract Award Letter", ref: "CUQ-CNT-AWD-001", rev: "Rev A", date: "2025-01-15", status: "Approved" },
    { name: "Contract Agreement", ref: "CUQ-CNT-AGR-001", rev: "Rev B", date: "2025-01-20", status: "Approved" },
  ],
  "Pre-contract Meeting": [
    { name: "Pre-contract Meeting Minutes", ref: "CUQ-CNT-MTG-001", rev: "Rev A", date: "2025-01-25", status: "Approved" },
  ],
  // Stage 6
  "Mobilisation Complete": [
    { name: "Mobilisation Completion Report", ref: "CUQ-MOB-001", rev: "Rev B", date: "2025-03-01", status: "Approved" },
    { name: "Site Establishment Plan", ref: "CUQ-MOB-002", rev: "Rev C", date: "2025-02-20", status: "Approved" },
  ],
  "Foundation Works": [
    { name: "Foundation Completion Report", ref: "CUQ-FND-001", rev: "Rev B", date: "2025-06-15", status: "Approved" },
    { name: "Piling Completion Certificate", ref: "CUQ-FND-002", rev: "Rev A", date: "2025-05-20", status: "Approved" },
  ],
  "Structural Frame": [],
  "MEP Rough-in": [],
  "Envelope / Facade": [],
  "Interior Fit-out": [],
  "Testing & Commissioning": [],
  "Snagging & Defects": [],
  // Stage 7
  "Practical Completion Certificate": [],
  "O&M Manuals Delivered": [],
  "As-Built Drawings": [],
  "Training of FM Team": [],
  "Defects Liability Period Start": [],
  // Stage 8
  "Post Occupancy Evaluation": [],
  "Defects Rectification": [],
  "Final Account Agreement": [],
  "Performance Review": [],
  "Lessons Learned Report": [],
};

const stageRequirements: Record<number, { name: string; done: boolean }[]> = {
  0: [
    { name: "Client Brief Document", done: true },
    { name: "Feasibility Study", done: true },
    { name: "Budget Estimation", done: true },
    { name: "Site Survey Report", done: true },
  ],
  1: [
    { name: "Concept Design Report", done: true },
    { name: "Initial Cost Plan", done: true },
    { name: "Stakeholder Approval", done: true },
    { name: "Environmental Assessment", done: true },
  ],
  2: [
    { name: "Developed Design Package", done: true },
    { name: "Updated Cost Plan", done: true },
    { name: "Planning Application", done: true },
    { name: "Structural Scheme Design", done: true },
    { name: "MEP Scheme Design", done: true },
  ],
  3: [
    { name: "Technical Design Package", done: true },
    { name: "Building Regulation Submission", done: true },
    { name: "Specialist Subcontractor Designs", done: true },
    { name: "Construction Method Statement", done: true },
    { name: "Fire Strategy Report", done: true },
  ],
  4: [
    { name: "Production Drawings", done: true },
    { name: "Bill of Quantities", done: true },
    { name: "Specification Documents", done: true },
    { name: "Pre-qualification of Contractors", done: true },
  ],
  5: [
    { name: "Tender Documents Issued", done: true },
    { name: "Tender Evaluation Report", done: true },
    { name: "Contract Award", done: true },
    { name: "Pre-contract Meeting", done: true },
  ],
  6: [
    { name: "Mobilisation Complete", done: true },
    { name: "Foundation Works", done: true },
    { name: "Structural Frame", done: false },
    { name: "MEP Rough-in", done: false },
    { name: "Envelope / Facade", done: false },
    { name: "Interior Fit-out", done: false },
    { name: "Testing & Commissioning", done: false },
    { name: "Snagging & Defects", done: false },
  ],
  7: [
    { name: "Practical Completion Certificate", done: false },
    { name: "O&M Manuals Delivered", done: false },
    { name: "As-Built Drawings", done: false },
    { name: "Training of FM Team", done: false },
    { name: "Defects Liability Period Start", done: false },
  ],
  8: [
    { name: "Post Occupancy Evaluation", done: false },
    { name: "Defects Rectification", done: false },
    { name: "Final Account Agreement", done: false },
    { name: "Performance Review", done: false },
    { name: "Lessons Learned Report", done: false },
  ],
};

/* ─── Component ─── */
export default function DashboardPage() {
  const [projectType, setProjectType] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [activeStage, setActiveStage] = useState<number | null>(null);
  const [expandedReq, setExpandedReq] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("er");

  const projects = projectType ? projectData[projectType] || [] : [];
  const project = projects.find((p) => p.name === selectedProject) || null;
  const requirements = activeStage !== null ? stageRequirements[activeStage] || [] : [];

  const handleDownload = (doc: Document) => {
    // Simulate download — in production this would link to actual file storage
    const blob = new Blob(
      [`${doc.name}\nRef: ${doc.ref}\nRevision: ${doc.rev}\nDate: ${doc.date}\nStatus: ${doc.status}\n\n[This is a placeholder for the actual document content]`],
      { type: "text/plain" }
    );
    const url = URL.createObjectURL(blob);
    const a = window.document.createElement("a");
    a.href = url;
    a.download = `${doc.ref}_${doc.rev.replace(" ", "")}.pdf`;
    window.document.body.appendChild(a);
    a.click();
    window.document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Programme Dashboard</h1>
          <p className="text-xs text-gray-500 mt-1">
            Select project type and project to view governance overview
          </p>
        </div>
      </div>

      {/* ─── Dropdown Selectors ─── */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Project Type */}
        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
            Project Type
          </label>
          <select
            value={projectType}
            onChange={(e) => {
              setProjectType(e.target.value);
              setSelectedProject("");
              setActiveStage(null);
              setExpandedReq(null);
            }}
            className="w-full px-4 py-3 bg-hai-navy border border-hai-steel rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
          >
            <option value="">— Select Project Type —</option>
            <option value="Large Scale">Large Scale</option>
            <option value="Small Scale">Small Scale</option>
          </select>
        </div>

        {/* Project Selection */}
        <div>
          <label className="block text-xs text-gray-400 mb-1.5 font-medium uppercase tracking-wider">
            Project
          </label>
          <select
            value={selectedProject}
            onChange={(e) => {
              setSelectedProject(e.target.value);
              setActiveStage(null);
              setExpandedReq(null);
            }}
            disabled={!projectType || projects.length === 0}
            className="w-full px-4 py-3 bg-hai-navy border border-hai-steel rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <option value="">— Select Project —</option>
            {projects.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name} — {p.capacity}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── No project selected message ─── */}
      {!project && (
        <div className="bg-hai-navy border border-hai-steel rounded-lg p-12 text-center">
          <div className="text-4xl mb-4">📋</div>
          <h2 className="text-lg font-semibold text-gray-300 mb-2">Select a Project</h2>
          <p className="text-xs text-gray-500">
            Choose a project type and project from the dropdowns above to view details
          </p>
        </div>
      )}

      {/* ─── Project Details ─── */}
      {project && (
        <>
          {/* Project Info Bar — NARROW compact strip */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg px-5 py-2.5 mb-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <h2 className="text-sm font-bold text-white">{project.name}</h2>
              <div className="h-4 w-px bg-hai-steel" />
              <div className="flex items-center gap-5 text-xs">
                <span className="text-gray-400"><span className="text-gray-600">Cap:</span> <span className="text-gray-200 font-medium">{project.capacity}</span></span>
                <span className="text-gray-400"><span className="text-gray-600">Contr:</span> <span className="text-gray-200 font-medium">{project.contractor}</span></span>
                <span className="text-gray-400"><span className="text-gray-600">Cons:</span> <span className="text-gray-200 font-medium">{project.consultant}</span></span>
                <span className="text-gray-400"><span className="text-gray-600">ER:</span> <span className="text-gray-200 font-medium">{project.employerRep}</span></span>
              </div>
            </div>
            <span className="text-[10px] px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              {projectType}
            </span>
          </div>

          {/* ─── Financial Progress ─── */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
                Financial Progress
              </div>
              <div className="flex items-end gap-4">
                <div className="text-4xl font-bold text-green-400">{project.financialProgress}%</div>
                <div className="text-xs text-gray-500 pb-1">of total contract value certified</div>
              </div>
              <div className="h-3 bg-hai-primary rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-700"
                  style={{ width: `${project.financialProgress}%` }}
                />
              </div>
            </div>
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-5">
              <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
                Physical Progress
              </div>
              <div className="flex items-end gap-4">
                <div className="text-4xl font-bold text-blue-400">{project.physicalProgress}%</div>
                <div className="text-xs text-gray-500 pb-1">actual completion</div>
              </div>
              <div className="h-3 bg-hai-primary rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
                  style={{ width: `${project.physicalProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* ─── Project Summary Cards ─── */}
          <div className="grid grid-cols-5 gap-4 mb-6">
            {/* Temperature */}
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-orange-500/30 transition-all">
              <div className="text-2xl mb-2">🌡️</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Temperature</div>
              <div className="text-xl font-bold text-orange-400">{project.temperature}</div>
              <div className="text-[10px] text-gray-600 mt-1">Site condition today</div>
            </div>

            {/* Manpower */}
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-blue-500/30 transition-all">
              <div className="text-2xl mb-2">👷</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Manpower</div>
              <div className="text-xl font-bold text-blue-400">{project.manpower.toLocaleString()}</div>
              <div className="text-[10px] text-gray-600 mt-1">Workers on site</div>
            </div>

            {/* Schedule */}
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-yellow-500/30 transition-all">
              <div className="text-2xl mb-2">📅</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Schedule</div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-yellow-400">{project.physicalProgress}%</span>
                <span className="text-[10px] text-gray-500">vs</span>
                <span className="text-lg font-bold text-gray-400">{project.plannedProgress}%</span>
              </div>
              <div className="text-[10px] text-gray-600 mt-1">
                Actual vs Planned
              </div>
              <div className="h-1.5 bg-hai-primary rounded-full mt-2 overflow-hidden relative">
                <div
                  className="h-full bg-gray-500 rounded-full absolute top-0 left-0"
                  style={{ width: `${project.plannedProgress}%` }}
                />
                <div
                  className={`h-full rounded-full absolute top-0 left-0 ${
                    project.physicalProgress >= project.plannedProgress ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{ width: `${project.physicalProgress}%` }}
                />
              </div>
            </div>

            {/* HSE */}
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-green-500/30 transition-all">
              <div className="text-2xl mb-2">🛡️</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">HSE Accidents</div>
              <div className="text-xl font-bold text-green-400">{project.hseAccidents}</div>
              <div className="text-[10px] text-gray-600 mt-1">LTI: {project.hseLTI} | Safe days: 142</div>
            </div>

            {/* Site Photos & Cameras */}
            <div className="bg-hai-navy border border-hai-steel rounded-lg p-4 hover:border-purple-500/30 transition-all cursor-pointer group">
              <div className="text-2xl mb-2">📸</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Site Media</div>
              <div className="space-y-1.5 mt-2">
                <div className="text-xs text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1">
                  <span>📷</span> Site Photos
                </div>
                <div className="text-xs text-purple-400 group-hover:text-purple-300 transition-colors flex items-center gap-1">
                  <span>🎥</span> Live Cameras
                </div>
              </div>
            </div>
          </div>

          {/* ─── Sub-Dashboard Tabs ─── */}
          <div className="mb-6">
            {/* Tab Bar */}
            <div className="flex border-b border-hai-steel mb-4">
              {subDashboardTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2.5 text-xs font-medium transition-all border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? "border-hai-accent text-white"
                      : "border-transparent text-gray-500 hover:text-gray-300 hover:border-gray-600"
                  }`}
                >
                  {tab.label} <span className="text-gray-600 ml-1">({tab.ref})</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "er" && <ERDashboard />}
            {activeTab === "cost" && <CostDashboard />}
            {activeTab === "quality" && <QualityDashboard />}
            {activeTab === "contractor" && <ContractorPortal />}
            {activeTab === "consultant" && <ConsultantPortal />}
            {activeTab === "governance" && <GovernanceDashboard />}
          </div>

          {/* ─── Stage Ribbon (0-8) ─── */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg p-5 mb-4">
            <div className="text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
              RIBA Stage-Gate Progress
            </div>
            <div className="flex items-center gap-1">
              {stages.map((s, i) => {
                const isDone = s.num < project.currentStage;
                const isCurrent = s.num === project.currentStage;
                const isActive = activeStage === s.num;
                return (
                  <div key={s.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center flex-1">
                      <button
                        onClick={() => {
                          setActiveStage(isActive ? null : s.num);
                          setExpandedReq(null);
                        }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all cursor-pointer ${
                          isActive
                            ? "bg-hai-accent border-hai-accent text-white scale-110 shadow-lg shadow-hai-accent/30"
                            : isDone
                            ? "bg-green-500 border-green-500 text-white hover:scale-105"
                            : isCurrent
                            ? "bg-yellow-500 border-yellow-500 text-hai-primary animate-pulse hover:scale-105"
                            : "bg-hai-primary border-hai-steel text-gray-500 hover:border-gray-400 hover:scale-105"
                        }`}
                      >
                        {s.num}
                      </button>
                      <div
                        className={`text-[10px] mt-2 font-semibold text-center ${
                          isActive
                            ? "text-hai-accent"
                            : isCurrent
                            ? "text-yellow-400"
                            : isDone
                            ? "text-green-400"
                            : "text-gray-600"
                        }`}
                      >
                        {s.name}
                      </div>
                    </div>
                    {i < stages.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-1 ${
                          isDone ? "bg-green-500" : "bg-hai-steel"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ─── Stage Requirements Sub-ribbon ─── */}
          {activeStage !== null && (
            <div className="bg-hai-navy/60 border border-hai-steel rounded-lg p-5 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-xs font-semibold text-hai-accent uppercase tracking-wider">
                  Stage {activeStage} — {stages[activeStage]?.name} — Requirements
                </div>
                <div className="text-xs text-gray-500">
                  {requirements.filter((r) => r.done).length}/{requirements.length} Complete
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-2 bg-hai-primary rounded-full mb-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-hai-accent to-yellow-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${requirements.length > 0 ? (requirements.filter((r) => r.done).length / requirements.length) * 100 : 0}%`,
                  }}
                />
              </div>
              {/* Requirements list — clickable */}
              <div className="grid grid-cols-2 gap-2">
                {requirements.map((req, i) => {
                  const docs = requirementDocuments[req.name] || [];
                  const isExpanded = expandedReq === req.name;
                  return (
                    <div key={i}>
                      <button
                        onClick={() => setExpandedReq(isExpanded ? null : req.name)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all text-left ${
                          isExpanded
                            ? "bg-blue-500/10 border-blue-500/30 ring-1 ring-blue-500/20"
                            : req.done
                            ? "bg-green-500/5 border-green-500/20 hover:bg-green-500/10 hover:border-green-500/40"
                            : "bg-hai-primary/30 border-hai-steel hover:bg-hai-primary/50 hover:border-gray-500"
                        } cursor-pointer`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] ${
                            req.done
                              ? "bg-green-500 text-white"
                              : "border-2 border-gray-600 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                        <span
                          className={`text-xs flex-1 ${
                            isExpanded ? "text-blue-300 font-medium" : req.done ? "text-green-300" : "text-gray-400"
                          }`}
                        >
                          {req.name}
                        </span>
                        {docs.length > 0 && (
                          <span className="text-[10px] text-gray-600">
                            {docs.length} doc{docs.length > 1 ? "s" : ""}
                          </span>
                        )}
                        <svg
                          className={`w-3 h-3 text-gray-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* ─── Expanded Document Checklist ─── */}
                      {isExpanded && (
                        <div className="mt-1.5 ml-8 space-y-1">
                          {docs.length === 0 ? (
                            <div className="text-xs text-gray-600 italic px-3 py-2">
                              No approved documents yet
                            </div>
                          ) : (
                            docs.map((doc, di) => (
                              <button
                                key={di}
                                onClick={() => handleDownload(doc)}
                                className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-hai-primary/40 border border-hai-steel/50 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all cursor-pointer group text-left"
                              >
                                <svg className="w-4 h-4 text-blue-400 flex-shrink-0 group-hover:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <div className="flex-1 min-w-0">
                                  <div className="text-xs text-gray-200 group-hover:text-blue-300 transition-colors truncate">
                                    {doc.name}
                                  </div>
                                  <div className="text-[10px] text-gray-600 flex items-center gap-2">
                                    <span>{doc.ref}</span>
                                    <span>|</span>
                                    <span>{doc.rev}</span>
                                    <span>|</span>
                                    <span>{doc.date}</span>
                                  </div>
                                </div>
                                <span className="text-[9px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20 flex-shrink-0">
                                  {doc.status}
                                </span>
                                <svg className="w-3.5 h-3.5 text-gray-600 group-hover:text-blue-400 flex-shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                              </button>
                            ))
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
