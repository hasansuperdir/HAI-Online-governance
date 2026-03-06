"use client";

import { useState } from "react";

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

  const projects = projectType ? projectData[projectType] || [] : [];
  const project = projects.find((p) => p.name === selectedProject) || null;
  const requirements = activeStage !== null ? stageRequirements[activeStage] || [] : [];

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
          {/* Project Info Bar */}
          <div className="bg-hai-navy border border-hai-steel rounded-lg p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">{project.name}</h2>
              <span className="text-xs px-3 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {projectType}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Capacity</div>
                <div className="text-sm font-semibold text-gray-200 mt-1">{project.capacity}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Contractor</div>
                <div className="text-sm font-semibold text-gray-200 mt-1">{project.contractor}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Consultant</div>
                <div className="text-sm font-semibold text-gray-200 mt-1">{project.consultant}</div>
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">Employer Rep</div>
                <div className="text-sm font-semibold text-gray-200 mt-1">{project.employerRep}</div>
              </div>
            </div>
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
                        onClick={() => setActiveStage(isActive ? null : s.num)}
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
            <div className="bg-hai-navy/60 border border-hai-steel rounded-lg p-5 mb-6 animate-in">
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
              {/* Requirements list */}
              <div className="grid grid-cols-2 gap-2">
                {requirements.map((req, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all ${
                      req.done
                        ? "bg-green-500/5 border-green-500/20"
                        : "bg-hai-primary/30 border-hai-steel"
                    }`}
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
                      className={`text-xs ${
                        req.done ? "text-green-300" : "text-gray-400"
                      }`}
                    >
                      {req.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
