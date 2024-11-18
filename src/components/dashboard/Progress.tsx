interface ProgressProps {
    current: number; // Current progress value
    total: number; // Total progress value
  }
  
  export function Progress({ current, total }: ProgressProps) {
    const percentage = (current / total) * 100;
  
    return (
      <div className="p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Sending Progress</h4>
        <div className="relative h-4 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-indigo-600 transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-right text-xs text-gray-500 mt-1">
          {current} of {total} emails sent
        </p>
      </div>
    );
  }
  