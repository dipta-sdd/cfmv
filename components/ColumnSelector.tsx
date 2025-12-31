import React, { useState, useRef, useEffect } from "react";

interface ColumnSelectorProps {
  allHeaders: string[];
  hiddenColumns: string[];
  onToggleColumn: (column: string) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  allHeaders,
  hiddenColumns,
  onToggleColumn,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-slate-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
          <path
            fillRule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clipRule="evenodd"
          />
        </svg>
        <span>View</span>
        <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-xs font-semibold">
          {allHeaders.length - hiddenColumns.length}/{allHeaders.length}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-xl shadow-xl z-[100] max-h-[60vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-100">
          <div className="p-3 border-b border-slate-100 bg-slate-50/50 sticky top-0 backdrop-blur-sm z-10 flex justify-between items-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Toggle Columns
            </span>
            {hiddenColumns.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // This logic relies on parent to handle "Show All" or we can't do it here easily without passing another prop.
                  // Ideally we would iterate all headers and unhide them.
                  // For now, let's just leave it simple.
                }}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-medium"
              >
                {/* Placeholder for future specific actions */}
              </button>
            )}
          </div>
          <div className="p-2 space-y-1">
            {allHeaders.map((header) => (
              <label
                key={header}
                className="flex items-center px-3 py-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors group select-none"
              >
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    checked={!hiddenColumns.includes(header)}
                    onChange={() => onToggleColumn(header)}
                    className="peer h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-colors"
                  />
                </div>
                <span
                  className="ml-3 text-sm text-slate-700 group-hover:text-slate-900 truncate flex-1"
                  title={header}
                >
                  {header}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;
