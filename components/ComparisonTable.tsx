import React from 'react';
import Badge from './Badge';

interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
  searchTerm: string;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({ headers, rows, searchTerm }) => {
  // Filter rows based on the Feature name (first column) or Description (second column)
  const filteredRows = rows.filter(row => {
    const feature = row[0]?.toLowerCase() || '';
    const description = row[1]?.toLowerCase() || '';
    const term = searchTerm.toLowerCase();
    return feature.includes(term) || description.includes(term);
  });

  if (headers.length === 0) {
    return <div className="p-8 text-center text-gray-500">No data available</div>;
  }

  // Fixed widths for the sticky columns
  const COL_1_WIDTH = "w-[240px] min-w-[240px] max-w-[240px]"; // Feature
  const COL_2_WIDTH = "w-[320px] min-w-[320px] max-w-[320px]"; // Description

  return (
    <div className="relative w-full border border-slate-200 rounded-xl shadow-sm bg-white flex flex-col h-[calc(100vh-12rem)]">
       {/* Scrollable Container */}
      <div className="overflow-auto flex-1 w-full relative" style={{ scrollBehavior: 'smooth' }}>
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
              {headers.slice(2).map((header, index) => (
                <th 
                  key={index} 
                  className="p-4 border-b border-slate-200 min-w-[140px] text-center whitespace-nowrap hover:bg-slate-100 transition-colors"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="divide-y divide-slate-100">
            {filteredRows.length > 0 ? (
              filteredRows.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-slate-50/80 transition-colors group">
                  
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
                    <div className="line-clamp-3 text-xs leading-relaxed" title={row[1]}>
                      {row[1]}
                    </div>
                  </td>

                  {/* Scrollable Data Cells */}
                  {row.slice(2).map((cellData, cellIndex) => (
                    <td 
                      key={cellIndex} 
                      className="p-3 text-center border-slate-100 min-w-[140px]"
                    >
                      <div className="flex justify-center">
                        <Badge value={cellData} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="p-12 text-center text-slate-400">
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
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> Supported</span>
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Upcoming</span>
           <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-300"></span> Unsupported</span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;