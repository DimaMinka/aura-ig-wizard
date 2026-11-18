interface StepProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
}

export function StepProgressBar({ currentStep = 2, totalSteps = 3 }: StepProgressBarProps) {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="flex flex-col space-y-1 mb-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-title-md text-primary font-bold">
          Шаг {currentStep} из {totalSteps} • Pre-Flight аудит и подготовка
        </span>
        <span className="text-[11px] text-on-surface-variant font-medium">{percent}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
