import Sidebar from "@/components/platform/Sidebar";

export const metadata = {
  title: "SkyStruct | Governance Platform",
  description: "HAI Group governance platform for project lifecycle management",
};

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-hai-primary text-gray-200">
      <Sidebar />
      <main className="ml-60">
        {/* Top Header */}
        <header className="h-12 bg-hai-navy border-b border-hai-steel flex items-center justify-between px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">ARADA Governance Programme</span>
            <span className="text-xs px-2 py-0.5 rounded bg-green-500/10 text-green-400 border border-green-500/20">
              Stage 6 — Construction
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-500">ERP Sync: <span className="text-green-400">Live</span></span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
              8 Active Projects
            </span>
          </div>
        </header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
