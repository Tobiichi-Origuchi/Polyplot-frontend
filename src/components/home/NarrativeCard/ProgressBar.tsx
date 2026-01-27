interface ProgressBarProps {
  longPercentage: number;
  shortPercentage: number;
}

export default function ProgressBar({ longPercentage, shortPercentage }: ProgressBarProps) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-xs mb-2">
        <span className="text-long font-semibold">{longPercentage}% LONG</span>
        <span className="text-short font-semibold">{shortPercentage}% SHORT</span>
      </div>
      <div className="h-2 bg-bg-secondary rounded-full overflow-hidden flex">
        <div
          className="bg-long transition-all duration-300"
          style={{ width: `${longPercentage}%` }}
        ></div>
        <div
          className="bg-short transition-all duration-300"
          style={{ width: `${shortPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}
