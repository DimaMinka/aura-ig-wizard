interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}

export function SectionHeader({ badge, title, subtitle, action }: SectionHeaderProps) {
  return (
    <div className="flex flex-col space-y-1 pt-1 mb-3">
      <div className="flex items-center justify-between">
        {badge && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary-fixed/50 text-secondary text-[10px] font-label-sm uppercase tracking-wider font-bold">
            {badge}
          </span>
        )}
        {action}
      </div>
      <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="font-body-md text-body-md text-on-surface-variant font-light">
          {subtitle}
        </p>
      )}
    </div>
  );
}
