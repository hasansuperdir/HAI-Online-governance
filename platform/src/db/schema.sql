-- ============================================================================
-- HAI-GOV SkyStruct Platform — PostgreSQL Database Schema
-- Based on HAI-GOV-024-R0.0 Level 3 Data Model (27 Entities)
-- ============================================================================

-- E-01: Project
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  code VARCHAR(20) NOT NULL UNIQUE CHECK (code ~ '^[A-Z0-9]{3,20}$'),
  name VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL CHECK (type IN ('School','Residential','Hospitality','Fit-out','Mixed-use')),
  current_stage INTEGER NOT NULL DEFAULT 0 CHECK (current_stage BETWEEN 0 AND 8),
  budget_baseline DECIMAL(15,2) NOT NULL CHECK (budget_baseline > 0),
  contract_value DECIMAL(15,2) NOT NULL CHECK (contract_value > 0),
  pm_id INTEGER REFERENCES users(id),
  status VARCHAR(20) NOT NULL DEFAULT 'Active' CHECK (status IN ('Active','Completed','On Hold','Terminated')),
  gsas_target VARCHAR(20) CHECK (gsas_target IN ('Platinum','Gold','Silver','Bronze')),
  start_date DATE NOT NULL,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-12: User/Role
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  department VARCHAR(50) NOT NULL CHECK (department IN ('PM','Design','Contracts','DocControl','Finance','FM','HSE','IT')),
  role VARCHAR(50) NOT NULL CHECK (role IN ('PM','Engineer','QS','DesignMgr','DocController','Finance','FMMgr','Admin','CEO','ExCom')),
  is_active BOOLEAN DEFAULT TRUE,
  delegate_to INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-13: Contractor/Supplier
CREATE TABLE contractors (
  id SERIAL PRIMARY KEY,
  registration_number VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(200) NOT NULL,
  qualification_status VARCHAR(50) DEFAULT 'Pending Review' CHECK (qualification_status IN ('Qualified','Probation','Disqualified','Pending Review')),
  contact_email VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-02: Stage Instance
CREATE TABLE stage_instances (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_number INTEGER NOT NULL CHECK (stage_number BETWEEN 0 AND 8),
  status VARCHAR(30) DEFAULT 'Not Started' CHECK (status IN ('Not Started','Active','Gate Review','Completed')),
  planned_start DATE,
  planned_end DATE,
  actual_start DATE,
  actual_end DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, stage_number)
);

-- E-03: Gate Checklist Item
CREATE TABLE gate_checklist_items (
  id SERIAL PRIMARY KEY,
  stage_instance_id INTEGER NOT NULL REFERENCES stage_instances(id) ON DELETE CASCADE,
  item_number INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('RIBA','RICS','Qatar Authority','GSAS','HAI-Specific','Entry','Exit','Freeze')),
  description TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'Not Started' CHECK (status IN ('Not Started','In Progress','Complete','N-A')),
  responsible_id INTEGER REFERENCES users(id),
  evidence_ref VARCHAR(200),
  completed_at TIMESTAMPTZ,
  UNIQUE(stage_instance_id, item_number)
);

-- E-04: Document
CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  hai_reference VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_instance_id INTEGER REFERENCES stage_instances(id),
  discipline VARCHAR(50) NOT NULL CHECK (discipline IN ('Architectural','Structural','MEP-Electrical','MEP-Mechanical','MEP-Plumbing','Fire','Civil','Interior','Landscape')),
  doc_type VARCHAR(50) NOT NULL CHECK (doc_type IN ('Drawing','Specification','Report','Calculation','Schedule','Submittal','Method Statement','As-Built','O&M Manual')),
  status VARCHAR(30) DEFAULT 'Draft' CHECK (status IN ('Draft','Submitted','Under Review','APP','APP-COM','REJ','INFO','Closed')),
  revision VARCHAR(10),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-05: Document Review
CREATE TABLE document_reviews (
  id SERIAL PRIMARY KEY,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  reviewer_id INTEGER NOT NULL REFERENCES users(id),
  review_date DATE NOT NULL DEFAULT CURRENT_DATE,
  review_status VARCHAR(20) NOT NULL CHECK (review_status IN ('APP','APP-COM','REJ','INFO')),
  comments TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-06: Transmittal
CREATE TABLE transmittals (
  id SERIAL PRIMARY KEY,
  reference_number VARCHAR(100) NOT NULL UNIQUE,
  project_id INTEGER REFERENCES projects(id),
  transmittal_type VARCHAR(20) NOT NULL CHECK (transmittal_type IN ('Incoming','Outgoing')),
  status VARCHAR(30) DEFAULT 'Open' CHECK (status IN ('Open','Acknowledged','Closed')),
  subject VARCHAR(500),
  sent_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-06b: Transmittal Documents (M:N)
CREATE TABLE transmittal_documents (
  transmittal_id INTEGER NOT NULL REFERENCES transmittals(id) ON DELETE CASCADE,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  PRIMARY KEY (transmittal_id, document_id)
);

-- E-07: Approval
CREATE TABLE approvals (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  approval_type VARCHAR(50) NOT NULL CHECK (approval_type IN ('Budget','Comparison','Contract Award','Advance','IPC','Variation','Design-Gateway')),
  sequence_number INTEGER NOT NULL,
  subject VARCHAR(500) NOT NULL,
  status VARCHAR(30) DEFAULT 'Pending' CHECK (status IN ('Pending','Approved','Rejected','Returned')),
  approver_id INTEGER REFERENCES users(id),
  sla_days INTEGER DEFAULT 5,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(project_id, approval_type, sequence_number)
);

-- E-08: Variation
CREATE TABLE variations (
  id SERIAL PRIMARY KEY,
  vo_number VARCHAR(50) NOT NULL UNIQUE,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  contract_id INTEGER REFERENCES contracts(id),
  approval_id INTEGER REFERENCES approvals(id),
  title VARCHAR(500) NOT NULL,
  value DECIMAL(15,2),
  eot_days INTEGER DEFAULT 0,
  status VARCHAR(30) DEFAULT 'Draft' CHECK (status IN ('Draft','Submitted','Under Assessment','Approved','Rejected','Partial')),
  assessor_id INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-09: IPC (Interim Payment Certificate)
CREATE TABLE ipcs (
  id SERIAL PRIMARY KEY,
  ipc_number VARCHAR(50) NOT NULL UNIQUE,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  contract_id INTEGER REFERENCES contracts(id),
  contractor_id INTEGER NOT NULL REFERENCES contractors(id),
  claimed_amount DECIMAL(15,2) NOT NULL,
  certified_amount DECIMAL(15,2),
  status VARCHAR(30) DEFAULT 'Submitted' CHECK (status IN ('Submitted','Under Verification','QS Certified','PM Endorsed','Finance Reviewed','Approved','Paid','Rejected')),
  qs_id INTEGER REFERENCES users(id),
  approval_id INTEGER REFERENCES approvals(id),
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- E-10: Contract
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  contract_number VARCHAR(50) NOT NULL UNIQUE,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  contractor_id INTEGER NOT NULL REFERENCES contractors(id),
  contract_type VARCHAR(50) NOT NULL CHECK (contract_type IN ('Main Contract','Subcontract','Contract Award','Consultancy')),
  title VARCHAR(500) NOT NULL,
  value DECIMAL(15,2) NOT NULL,
  status VARCHAR(30) DEFAULT 'Draft' CHECK (status IN ('Draft','Active','Completed','Terminated')),
  approval_id INTEGER REFERENCES approvals(id),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-11: Authority Submission
CREATE TABLE authority_submissions (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_instance_id INTEGER REFERENCES stage_instances(id),
  authority VARCHAR(50) NOT NULL CHECK (authority IN ('QCDD','Kahramaa','Ashghal','Civil Defense')),
  submission_type VARCHAR(50) NOT NULL CHECK (submission_type IN ('DC1','DC2','BCC','NOC','Load Application','Fire Strategy','Infrastructure NOC')),
  reference_number VARCHAR(100),
  status VARCHAR(30) DEFAULT 'Not Submitted' CHECK (status IN ('Not Submitted','Submitted','Under Review','Comments Received','Approved','Rejected')),
  submitted_date DATE,
  deadline_date DATE,
  approved_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-14: Lesson Learned
CREATE TABLE lessons_learned (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  stage_instance_id INTEGER REFERENCES stage_instances(id),
  category VARCHAR(100) NOT NULL,
  sequence_number INTEGER NOT NULL,
  description TEXT NOT NULL,
  preventive_rule TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, category, sequence_number)
);

-- E-15: Freeze
CREATE TABLE freezes (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  freeze_type VARCHAR(30) NOT NULL CHECK (freeze_type IN ('Budget','Design','Scope','Regulatory')),
  status VARCHAR(30) DEFAULT 'Active' CHECK (status IN ('Active','Lifted-Partial','Deactivated')),
  effective_date DATE NOT NULL,
  lifted_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, freeze_type, effective_date)
);

-- E-16: Freeze Exception
CREATE TABLE freeze_exceptions (
  id SERIAL PRIMARY KEY,
  freeze_id INTEGER NOT NULL REFERENCES freezes(id) ON DELETE CASCADE,
  sequence_number INTEGER NOT NULL,
  reason TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'Requested' CHECK (status IN ('Requested','Under Review','Approved','Rejected','Expired')),
  variation_id INTEGER REFERENCES variations(id),
  approved_by INTEGER REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(freeze_id, sequence_number)
);

-- E-17: Correspondence
CREATE TABLE correspondence (
  id SERIAL PRIMARY KEY,
  reference_number VARCHAR(100) NOT NULL UNIQUE,
  project_id INTEGER REFERENCES projects(id),
  document_id INTEGER REFERENCES documents(id),
  corr_type VARCHAR(20) NOT NULL CHECK (corr_type IN ('Incoming','Outgoing')),
  fidic_sequence VARCHAR(30) DEFAULT 'None' CHECK (fidic_sequence IN ('None','Notice','Response','Determination')),
  subject VARCHAR(500) NOT NULL,
  status VARCHAR(30) DEFAULT 'Open' CHECK (status IN ('Open','Responded','Closed','Escalated')),
  sent_date DATE,
  response_due DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-18: Inspection Request (IR)
CREATE TABLE inspection_requests (
  id SERIAL PRIMARY KEY,
  ir_number VARCHAR(50) NOT NULL UNIQUE,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  activity VARCHAR(500) NOT NULL,
  inspection_type VARCHAR(50),
  result VARCHAR(20) CHECK (result IN ('Pass','Fail','Conditional')),
  inspector_id INTEGER REFERENCES users(id),
  inspection_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-19: NCR (Non-Conformance Report)
CREATE TABLE ncrs (
  id SERIAL PRIMARY KEY,
  ncr_number VARCHAR(50) NOT NULL UNIQUE,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  ir_id INTEGER UNIQUE REFERENCES inspection_requests(id),
  contractor_id INTEGER REFERENCES contractors(id),
  title VARCHAR(500) NOT NULL,
  severity VARCHAR(20) CHECK (severity IN ('Critical','Major','Minor')),
  status VARCHAR(50) DEFAULT 'Open' CHECK (status IN ('Open','Corrective Action Submitted','Re-inspected','Closed')),
  corrective_action TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  closed_at TIMESTAMPTZ
);

-- E-20: Site Report
CREATE TABLE site_reports (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id),
  report_date DATE NOT NULL,
  report_type VARCHAR(20) NOT NULL CHECK (report_type IN ('Daily','Weekly')),
  weather VARCHAR(50),
  manpower INTEGER,
  progress_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, report_date, report_type)
);

-- E-21: Handover Package
CREATE TABLE handover_packages (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL UNIQUE REFERENCES projects(id),
  status VARCHAR(30) DEFAULT 'In Progress' CHECK (status IN ('In Progress','Complete','Accepted by FM')),
  completion_pct DECIMAL(5,2) DEFAULT 0,
  accepted_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-22: Warranty
CREATE TABLE warranties (
  id SERIAL PRIMARY KEY,
  handover_id INTEGER NOT NULL REFERENCES handover_packages(id) ON DELETE CASCADE,
  equipment_name VARCHAR(200) NOT NULL,
  warranty_start DATE,
  warranty_end DATE,
  status VARCHAR(30) DEFAULT 'Active' CHECK (status IN ('Active','Expiring Soon','Expired')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- E-23: KPI Snapshot
CREATE TABLE kpi_snapshots (
  id SERIAL PRIMARY KEY,
  snapshot_date DATE NOT NULL,
  project_id INTEGER REFERENCES projects(id),
  kpi_type VARCHAR(50) NOT NULL CHECK (kpi_type IN ('Approval Turnaround','Stage Compliance','Cost Deviation','Variation Trend','IPC Time','Submittal Metrics','Bottleneck')),
  value DECIMAL(10,2) NOT NULL,
  rag_status VARCHAR(10) CHECK (rag_status IN ('Red','Amber','Green')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(snapshot_date, kpi_type, project_id)
);

-- E-24: Contractor Score
CREATE TABLE contractor_scores (
  id SERIAL PRIMARY KEY,
  contractor_id INTEGER NOT NULL REFERENCES contractors(id),
  period VARCHAR(20) NOT NULL,
  quality_score DECIMAL(5,2),
  schedule_score DECIMAL(5,2),
  safety_score DECIMAL(5,2),
  overall_score DECIMAL(5,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(contractor_id, period)
);

-- E-25: Audit Log
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id INTEGER REFERENCES users(id),
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INTEGER,
  details JSONB,
  ip_address INET
);

-- E-26: ERP Sync Record
CREATE TABLE erp_sync_records (
  id SERIAL PRIMARY KEY,
  sync_id UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  direction VARCHAR(30) NOT NULL CHECK (direction IN ('SkyStruct->ERP','ERP->SkyStruct')),
  entity_type VARCHAR(30) NOT NULL CHECK (entity_type IN ('Budget','PO','IPC','Payment','Actuals')),
  entity_id INTEGER,
  status VARCHAR(20) DEFAULT 'Pending' CHECK (status IN ('Pending','Success','Failed','Conflict')),
  payload JSONB,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- E-27: GSAS Checkpoint
CREATE TABLE gsas_checkpoints (
  id SERIAL PRIMARY KEY,
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  stage_instance_id INTEGER REFERENCES stage_instances(id),
  checkpoint_type VARCHAR(50) NOT NULL CHECK (checkpoint_type IN ('Registration','Concept Assessment','Design Part 1','Design Part 2','LoC Application','LoC Issued','Construction Audit','Final Review','Final Certificate','Operations')),
  status VARCHAR(30) DEFAULT 'Not Started' CHECK (status IN ('Not Started','In Progress','Submitted','Approved')),
  submitted_date DATE,
  approved_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, checkpoint_type)
);

-- Project-User allocation (M:N)
CREATE TABLE project_users (
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role_in_project VARCHAR(50),
  PRIMARY KEY (project_id, user_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================
CREATE INDEX idx_documents_project ON documents(project_id);
CREATE INDEX idx_documents_status ON documents(status);
CREATE INDEX idx_approvals_status ON approvals(status);
CREATE INDEX idx_approvals_approver ON approvals(approver_id);
CREATE INDEX idx_variations_status ON variations(status);
CREATE INDEX idx_ipcs_status ON ipcs(status);
CREATE INDEX idx_ncrs_status ON ncrs(status);
CREATE INDEX idx_authority_status ON authority_submissions(status);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(timestamp);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_erp_sync_status ON erp_sync_records(status);
CREATE INDEX idx_kpi_snapshots_date ON kpi_snapshots(snapshot_date);
CREATE INDEX idx_correspondence_status ON correspondence(status);
CREATE INDEX idx_correspondence_fidic ON correspondence(fidic_sequence);
