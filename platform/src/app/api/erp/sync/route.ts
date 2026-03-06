import { NextRequest, NextResponse } from "next/server";

// ERP Sync Types based on E-26 data model
type SyncDirection = "SkyStruct->ERP" | "ERP->SkyStruct";
type EntityType = "Budget" | "PO" | "IPC" | "Payment" | "Actuals";
type SyncStatus = "Pending" | "Success" | "Failed" | "Conflict";

interface SyncRecord {
  sync_id: string;
  direction: SyncDirection;
  entity_type: EntityType;
  entity_id: number;
  status: SyncStatus;
  payload: Record<string, unknown>;
  error_message?: string;
  retry_count: number;
  created_at: string;
  completed_at?: string;
}

// Mock sync records for demo
const syncRecords: SyncRecord[] = [
  {
    sync_id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    direction: "SkyStruct->ERP",
    entity_type: "IPC",
    entity_id: 24,
    status: "Success",
    payload: { ipc_number: "IPC-024", amount: 3200000, contractor: "ABC Construction" },
    retry_count: 0,
    created_at: "2026-03-06T14:32:00Z",
    completed_at: "2026-03-06T14:32:02Z",
  },
  {
    sync_id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    direction: "ERP->SkyStruct",
    entity_type: "Payment",
    entity_id: 22,
    status: "Success",
    payload: { payment_ref: "PAY-2026-0342", amount: 2300000 },
    retry_count: 0,
    created_at: "2026-03-06T13:15:00Z",
    completed_at: "2026-03-06T13:15:01Z",
  },
  {
    sync_id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    direction: "SkyStruct->ERP",
    entity_type: "Budget",
    entity_id: 1,
    status: "Conflict",
    payload: { project: "ARADA-A", baseline: 245000000, revised: 250200000 },
    error_message: "ERP budget lock active — manual resolution required",
    retry_count: 3,
    created_at: "2026-03-06T12:00:00Z",
  },
];

// GET: Retrieve sync status and records
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const entityType = searchParams.get("entity_type");

  let filtered = [...syncRecords];
  if (status) filtered = filtered.filter((r) => r.status === status);
  if (entityType) filtered = filtered.filter((r) => r.entity_type === entityType);

  return NextResponse.json({
    status: "connected",
    last_sync: "2026-03-06T14:32:02Z",
    records_today: 147,
    success_rate: 99.2,
    records: filtered,
    summary: {
      pending: syncRecords.filter((r) => r.status === "Pending").length,
      success: syncRecords.filter((r) => r.status === "Success").length,
      failed: syncRecords.filter((r) => r.status === "Failed").length,
      conflict: syncRecords.filter((r) => r.status === "Conflict").length,
    },
  });
}

// POST: Trigger a sync operation
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { direction, entity_type, entity_id, payload } = body;

  // Validate required fields
  if (!direction || !entity_type) {
    return NextResponse.json(
      { error: "Missing required fields: direction, entity_type" },
      { status: 400 }
    );
  }

  // Validate enums
  const validDirections: SyncDirection[] = ["SkyStruct->ERP", "ERP->SkyStruct"];
  const validEntityTypes: EntityType[] = ["Budget", "PO", "IPC", "Payment", "Actuals"];

  if (!validDirections.includes(direction)) {
    return NextResponse.json({ error: `Invalid direction. Must be one of: ${validDirections.join(", ")}` }, { status: 400 });
  }
  if (!validEntityTypes.includes(entity_type)) {
    return NextResponse.json({ error: `Invalid entity_type. Must be one of: ${validEntityTypes.join(", ")}` }, { status: 400 });
  }

  const newRecord: SyncRecord = {
    sync_id: crypto.randomUUID(),
    direction,
    entity_type,
    entity_id: entity_id || 0,
    status: "Pending",
    payload: payload || {},
    retry_count: 0,
    created_at: new Date().toISOString(),
  };

  // In production, this would queue the sync job and process async
  // For demo, simulate immediate success
  newRecord.status = "Success";
  newRecord.completed_at = new Date().toISOString();

  return NextResponse.json({
    message: "Sync operation completed",
    record: newRecord,
  });
}
