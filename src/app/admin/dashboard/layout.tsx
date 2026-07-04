"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, FolderKanban } from "lucide-react";
import SignOutButton from "@/src/components/admin/SignOutButton";

const DASHBOARD_TABS = [
  { label: "Leads", href: "/admin/dashboard", icon: Users },
  { label: "Projects", href: "/admin/dashboard/projects", icon: FolderKanban },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Tab nav */}
      <div className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-1">
            {DASHBOARD_TABS.map((tab) => {
              const isActive =
                tab.href === "/admin/dashboard"
                  ? pathname === "/admin/dashboard"
                  : pathname.startsWith(tab.href);

              const Icon = tab.icon;

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={`relative flex items-center gap-2 px-4 py-4 text-sm transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}

                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-blue-500" />
                  )}
                </Link>
              );
            })}
          </div>

          <SignOutButton />
        </div>
      </div>

      {children}
    </div>
  );
}