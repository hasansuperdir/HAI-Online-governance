import { NextRequest, NextResponse } from "next/server";

// Authentication API — placeholder for production auth (OAuth2/SSO)
// Supports role-based access based on E-12 User/Role entity

interface AuthUser {
  id: number;
  email: string;
  name: string;
  department: string;
  role: string;
  projects: string[];
  permissions: string[];
}

const mockUsers: AuthUser[] = [
  {
    id: 1,
    email: "ahmed@haigroup.qa",
    name: "Ahmed Al-Thani",
    department: "PM",
    role: "PM",
    projects: ["ARADA-A", "ARADA-B", "MARINA", "SPORTS", "SCHOOL"],
    permissions: ["dashboard.view", "documents.manage", "approvals.approve", "reports.export", "settings.manage"],
  },
  {
    id: 2,
    email: "sarah@haigroup.qa",
    name: "Sarah Williams",
    department: "Contracts",
    role: "QS",
    projects: ["ARADA-A", "ARADA-B"],
    permissions: ["dashboard.view", "contracts.manage", "variations.manage", "ipcs.certify"],
  },
  {
    id: 3,
    email: "omar@haigroup.qa",
    name: "Omar Khalid",
    department: "Finance",
    role: "Finance",
    projects: ["ARADA-A", "ARADA-B", "MARINA", "SPORTS", "SCHOOL"],
    permissions: ["dashboard.view", "ipcs.approve", "budgets.manage", "erp.sync"],
  },
];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const user = mockUsers.find((u) => u.email === email);
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // In production: validate password, generate JWT, set secure cookie
  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      department: user.department,
      role: user.role,
      projects: user.projects,
      permissions: user.permissions,
    },
    token: "mock-jwt-token",
    expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
  });
}
