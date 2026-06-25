"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function TopBar() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const crumbs = ["Wokkah", ...segments.map((s) => s.replace(/-/g, " "))];

  return (
    <header className="sticky top-0 z-20 border-b border-rule bg-paper/80 backdrop-blur-md">
      <div className="h-14 px-8 flex items-center justify-between">
        <nav className="flex items-center gap-2 text-[12px] font-mono uppercase tracking-widest text-inkMuted">
          {crumbs.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-rule">/</span>}
              <span className={i === crumbs.length - 1 ? "text-ink" : ""}>{c || "Overview"}</span>
            </span>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-leafSoft rounded-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-leaf pulse-dot" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-leaf">
              Live Cohort
            </span>
          </div>
          <Link
            href="/discover"
            className="px-3 py-1.5 bg-ink text-paper text-[12px] font-mono uppercase tracking-wider rounded-sm hover:bg-rust transition-colors"
          >
            Discover Talent →
          </Link>
        </div>
      </div>
    </header>
  );
}
