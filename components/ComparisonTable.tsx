import React from "react";
import Badge from "./Badge";

interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
  searchTerm: string;
  hiddenColumns?: string[];
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  headers,
  rows,
  searchTerm,
  hiddenColumns = [],
}) => {
  // Memoize visible comparison columns (indices ≥ 2)
  const visibleComparisonColumns = React.useMemo(() => {
    return headers
      .map((header, index) => ({ header, index }))
      .slice(2)
      .filter((col) => !hiddenColumns.includes(col.header));
  }, [headers, hiddenColumns]);

  // Filter rows based on the Feature name (first column), Description (second column),
  // and whether there is any visible data (blank/cross check)
  const filteredRows = rows.filter((row) => {
    const feature = row[0]?.toLowerCase() || "";
    const description = row[1]?.toLowerCase() || "";
    const term = searchTerm.toLowerCase();
    const matchesSearch = feature.includes(term) || description.includes(term);

    // If search term is present, we might want to still show it?
    // User request: "hide any row if all columns are blank or cross"
    // Usually invalid rows should be hidden regardless of search, unless specifically searching for them?
    // Let's apply the rule strictly: if it doesn't have visible valid data, hide it.

    const hasMeaningfulData = visibleComparisonColumns.some((col) => {
      const cellValue = row[col.index];
      // Check if "blank" (empty/null) or "cross" (❌)
      if (!cellValue || cellValue.trim() === "") return false;
      if (cellValue.includes("❌")) return false;
      return true; // It has data (e.g. ✅, 🟡, 'Coming Soon', etc.)
    });

    return matchesSearch && hasMeaningfulData;
  });

  if (headers.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">No data available</div>
    );
  }

  // Fixed widths for the sticky columns
  const COL_1_WIDTH = "w-[240px] min-w-[240px] max-w-[240px]"; // Feature
  const COL_2_WIDTH = "w-[320px] min-w-[320px] max-w-[320px]"; // Description

  // Memoize plugin map to avoid recalculation on every row render
  // structure: { [pluginName]: { freeIdx?: number, proIdx?: number } }
  const pluginMap = React.useMemo(() => {
    const map: Record<
      string,
      { freeIdx: number | null; proIdx: number | null }
    > = {};

    headers.forEach((h, idx) => {
      // Exclude Description/Feature cols (0,1) and CampaignBay
      if (idx < 2) return;
      if (hiddenColumns.includes(h)) return; // Skip hidden columns
      if (h.toLowerCase().includes("campaignbay")) return;

      let name = h;
      let type: "free" | "pro" = "pro"; // default

      if (h.endsWith(" Free")) {
        name = h.replace(" Free", "");
        type = "free";
      } else if (h.endsWith(" Pro")) {
        name = h.replace(" Pro", "");
        type = "pro";
      } else if (h.includes("(Pro Only)")) {
        name = h.replace(" (Pro Only)", "");
        type = "pro";
      }

      if (!map[name]) {
        map[name] = { freeIdx: null, proIdx: null };
      }

      if (type === "free") map[name].freeIdx = idx;
      else map[name].proIdx = idx;
    });
    return map;
  }, [headers, hiddenColumns]);

  // Helper to calculate ratio
  const getRatio = (rowData: string[]) => {
    let freeCount = 0;
    let proCount = 0;

    Object.values(pluginMap).forEach((plugin) => {
      const hasFree =
        plugin.freeIdx !== null && rowData[plugin.freeIdx]?.includes("✅");
      if (hasFree) {
        freeCount++;
        return; // Don't count pro if free is available
      }

      const hasPro =
        plugin.proIdx !== null && rowData[plugin.proIdx]?.includes("✅");
      if (hasPro) {
        proCount++;
      }
    });

    return `${freeCount} / ${proCount}`;
  };

  return (
    <div className="relative w-full border border-slate-200 rounded-xl shadow-sm bg-white flex flex-col h-[calc(100vh-12rem)]">
      {/* Scrollable Container */}
      <div
        className="overflow-auto flex-1 w-full relative"
        style={{ scrollBehavior: "smooth" }}
      >
        <table className="border-collapse w-full text-sm text-left">
          {/* Table Header */}
          <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-xs h-12 z-40 sticky top-0">
            <tr>
              {/* Sticky Column 1: Feature */}
              <th
                className={`sticky left-0 top-0 z-50 bg-slate-50 p-4 border-b border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)] ${COL_1_WIDTH}`}
              >
                <div className="flex items-center space-x-2">
                  <span>Feature</span>
                </div>
              </th>

              {/* Sticky Column 2: Description */}
              <th
                className={`sticky left-[240px] top-0 z-50 bg-slate-50 p-4 border-b border-r border-slate-300 shadow-[6px_0_12px_-4px_rgba(0,0,0,0.1)] ${COL_2_WIDTH}`}
              >
                Description
              </th>

              {/* Scrollable Comparison Columns */}
              {visibleComparisonColumns.map((col) => (
                <th
                  key={col.index}
                  className="p-4 border-b border-slate-200 min-w-[140px] text-center whitespace-nowrap hover:bg-slate-100 transition-colors"
                >
                  {col.header}
                </th>
              ))}

              {/* Ratio Column Header */}
              <th className="p-4 border-b border-slate-200 min-w-[100px] text-center whitespace-nowrap hover:bg-slate-100 transition-colors font-bold text-slate-700 bg-slate-100">
                RATIO
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {filteredRows.length > 0 ? (
              filteredRows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  {/* Sticky Cell 1: Feature Name */}
                  <td
                    className={`sticky left-0 bg-white group-hover:bg-slate-50 p-4 font-medium text-slate-900 border-r border-slate-200 shadow-[4px_0_8px_-4px_rgba(0,0,0,0.05)] z-20 ${COL_1_WIDTH}`}
                  >
                    <div className="line-clamp-2" title={row[0]}>
                      {row[0]}
                    </div>
                  </td>

                  {/* Sticky Cell 2: Description */}
                  <td
                    className={`sticky left-[240px] bg-white group-hover:bg-slate-50 p-4 text-slate-600 border-r border-slate-300 shadow-[6px_0_12px_-4px_rgba(0,0,0,0.1)] z-20 ${COL_2_WIDTH}`}
                  >
                    <div
                      className="line-clamp-3 text-xs leading-relaxed"
                      title={row[1]}
                    >
                      {row[1]}
                    </div>
                  </td>

                  {/* Scrollable Data Cells */}
                  {visibleComparisonColumns.map((col) => (
                    <td
                      key={col.index}
                      className="p-3 text-center border-slate-100 min-w-[140px]"
                    >
                      <div className="flex justify-center">
                        <Badge value={row[col.index]} />
                      </div>
                    </td>
                  ))}

                  {/* Ratio Data Cell */}
                  <td className="p-3 text-center border-slate-100 min-w-[100px] bg-slate-50/50">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-bold bg-white border border-slate-200 text-slate-700 shadow-sm">
                      {getRatio(row)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  className="p-12 text-center text-slate-400"
                >
                  No features found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Status Bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-3 text-xs text-slate-500 flex justify-between items-center rounded-b-xl sticky bottom-0 z-50">
        <span>Showing {filteredRows.length} features</span>
        <div className="flex gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
            Supported
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span> Upcoming
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>{" "}
            Unsupported
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;
