import React, { useState, useMemo } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { rawCsvData } from "./data/rawCsv";
import { parseCSV } from "./utils/csvParser";
import ComparisonTable from "./components/ComparisonTable";
import Roadmap from "./components/Roadmap";
import Stats from "./components/Stats";

import { StatsProvider, useStats } from "./contexts/StatsContext";

const NavbarStats: React.FC = () => {
  const { stats } = useStats();
  if (!stats) return null;

  return (
    <div className="hidden lg:flex items-center gap-4 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
      <div className="flex flex-col items-end leading-none">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Downloads
        </span>
        <span className="text-sm font-bold text-slate-800">
          {stats.totalDownloads.toLocaleString()}
        </span>
      </div>
      <div className="h-6 w-px bg-slate-200"></div>
      <div className="flex flex-col items-start leading-none">
        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
          Today
        </span>
        <span className="text-sm font-bold text-green-600">
          +{stats.today.toLocaleString()}
        </span>
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  // Parse data only once on mount
  const { headers, rows } = useMemo(() => parseCSV(rawCsvData), []);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-800">
      {/* Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-[60] shadow-sm">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                FeatureMatrix<span className="text-indigo-600">.io</span>
              </h1>
            </Link>

            {/* Navigation Tabs */}
            <nav className="flex space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                Comparison
              </Link>
              <Link
                to="/roadmap"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/roadmap"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                Roadmap
              </Link>
              <Link
                to="/stats"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === "/stats"
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
              >
                Stats
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <NavbarStats />
            {location.pathname === "/" && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search features..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full sm:w-64 pl-10 pr-3 py-2 border border-slate-300 rounded-lg leading-5 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1920px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 h-[calc(100vh-4rem)] flex flex-col">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      Competitor Analysis
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      Comparing discount plugin features across top market
                      competitors.
                    </p>
                  </div>
                </div>

                <div className="flex-1 relative">
                  <ComparisonTable
                    headers={headers}
                    rows={rows}
                    searchTerm={searchTerm}
                  />
                </div>
              </>
            }
          />
          <Route
            path="/roadmap"
            element={
              <div className="flex-1 overflow-auto">
                <Roadmap />
              </div>
            }
          />
          <Route
            path="/stats"
            element={
              <div className="flex-1 overflow-auto">
                <Stats />
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <StatsProvider>
      <AppContent />
    </StatsProvider>
  );
};

export default App;
