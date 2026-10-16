export function SchoolLogo({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Lingkaran luar */}
      <circle cx="24" cy="24" r="22" className="fill-primary" />
      {/* Kubah masjid */}
      <path
        d="M24 8c-4.5 3.2-7 6.5-7 10.5V21h14v-2.5C31 14.5 28.5 11.2 24 8Z"
        className="fill-primary-foreground"
      />
      <rect x="16.5" y="21.5" width="15" height="1.8" rx="0.9" className="fill-primary-foreground" />
      {/* Buku terbuka */}
      <path
        d="M10 27c4.5-1.8 8.5-1.2 12 1.5v10c-3.5-2.7-7.5-3.3-12-1.5V27Z"
        className="fill-primary-foreground"
      />
      <path
        d="M38 27c-4.5-1.8-8.5-1.2-12 1.5v10c3.5-2.7 7.5-3.3 12-1.5V27Z"
        className="fill-primary-foreground/80"
      />
      {/* Bintang */}
      <path
        d="m24 42 1.2-3 3-1.2-3-1.2-1.2-3-1.2 3-3 1.2 3 1.2 1.2 3Z"
        className="fill-primary-foreground"
      />
    </svg>
  )
}

export function KemenagText({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col leading-tight ${className}`}>
      <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground">
        KEMENTERIAN AGAMA RI
      </span>
      <span className="text-xl font-extrabold tracking-wide text-primary">MAN 2 PATI</span>
    </div>
  )
}
