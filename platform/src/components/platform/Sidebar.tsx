"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/platform/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/platform/documents", label: "Documents", icon: "📄" },
  { href: "/platform/approvals", label: "Approvals", icon: "✅" },
  { href: "/platform/contracts", label: "Contracts", icon: "📋" },
  { href: "/platform/quality", label: "Quality & HSE", icon: "🔍" },
  { href: "/platform/hse", label: "HSE", icon: "⚠️" },
  { href: "/platform/authority", label: "Authority", icon: "🏛️" },
  { href: "/platform/analytics", label: "Analytics & AI", icon: "🤖" },
  { href: "/platform/settings", label: "Settings", icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-hai-navy border-r border-hai-steel flex flex-col h-screen fixed left-0 top-0 z-50">
      {/* Logo */}
      <div className="p-5 border-b border-hai-steel">
        <Link href="/" className="text-xl font-bold">
          <span className="text-white">Sky</span>
          <span className="text-blue-400">Struct</span>
        </Link>
        <div className="text-[10px] text-gray-500 mt-1 tracking-wider uppercase">
          Governance Platform
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-all ${
                isActive
                  ? "bg-blue-500/10 text-blue-400 border-r-2 border-blue-400 font-semibold"
                  : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-hai-steel">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-hai-accent flex items-center justify-center text-white text-xs font-bold">
            HA
          </div>
          <div>
            <div className="text-sm font-medium text-white">HAI Admin</div>
            <div className="text-[10px] text-gray-500">Programme Director</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
