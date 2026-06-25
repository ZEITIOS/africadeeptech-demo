export default function RedFlagAlert({ flags }: { flags: string[] }) {
  if (flags.length === 0) return null;

  return (
    <div className="border-2 border-rust/40 bg-rustSoft p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <svg
          className="w-4 h-4 text-rustDeep"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <span className="text-[11px] font-mono uppercase tracking-widest text-rustDeep font-semibold">
          Red Flags Detected
        </span>
      </div>

      {/* Flags list */}
      <ul className="space-y-1.5">
        {flags.map((flag, i) => (
          <li key={i} className="flex gap-2 text-[13px] text-rustDeep leading-relaxed">
            <span className="shrink-0 text-rust">&bull;</span>
            <span>{flag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
