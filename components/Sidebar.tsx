"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

const NAV = [
  { label: "Overview", href: "/", section: "Intelligence" },
  { label: "Discover", href: "/discover", section: "Intelligence", badge: "AI" },
  { label: "Talent Pool", href: "/talent", section: "Intelligence" },
  { label: "Submissions", href: "/evaluate", section: "Evaluation", badge: "AI" },
  { label: "Interviews", href: "/interview", section: "Evaluation", badge: "AI" },
  { label: "Grant Tracker", href: "/grants", section: "Grants" },
  { label: "Wokkahthons", href: "/wokkahthons", section: "Pipeline" },
  { label: "Taxonomy", href: "/taxonomy", section: "Pipeline" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isAuthenticated, signOut } = useAuth();
  const sections = Array.from(new Set(NAV.map((n) => n.section)));

  return (
    <aside className="w-64 shrink-0 border-r border-rule bg-paper/70 backdrop-blur-sm sticky top-0 h-screen flex flex-col">
      <div className="px-6 pt-7 pb-6 border-b border-rule">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 bg-ink text-paper grid place-items-center rounded-sm">
            <span className="font-display text-[15px] leading-none font-semibold">W</span>
          </div>
          <div>
            <div className="font-display text-[17px] leading-none tracking-tightest">Wokkah</div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mt-1">
              Talent Intelligence
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-5">
        {sections.map((section) => (
          <div key={section} className="mb-5">
            <div className="px-6 mb-2 text-[10px] font-mono uppercase tracking-widest text-inkMuted">
              {section}
            </div>
            {NAV.filter((n) => n.section === section).map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 pl-6 pr-4 py-2 text-[14px] transition-colors ${
                    active
                      ? "bg-paperDark text-ink border-l-2 border-rust"
                      : "text-inkSoft border-l-2 border-transparent hover:bg-paperDark/50 hover:text-ink"
                  }`}
                >
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] font-mono px-1.5 py-0.5 bg-rust text-paper rounded-sm">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="px-6 py-4 border-t border-rule">
        {isAuthenticated && user ? (
          <>
            <div className="text-[10px] font-mono uppercase tracking-widest text-inkMuted mb-2">
              {user.role}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-full bg-leafSoft grid place-items-center font-display text-sm text-ink">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[13px] truncate text-ink">{user.name}</div>
                <button
                  onClick={() => signOut()}
                  className="text-[11px] text-inkMuted hover:text-rust transition-colors"
                >
                  Sign out
                </button>
              </div>
            </div>
          </>
        ) : (
          <Link
            href="/auth/login"
            className="flex items-center gap-2.5 text-[13px] text-inkSoft hover:text-rust transition-colors"
          >
            <div className="h-8 w-8 rounded-full bg-paperDark grid place-items-center font-display text-sm text-inkMuted">
              ?
            </div>
            <span>Sign in</span>
          </Link>
        )}
      </div>
    </aside>
  );
}
