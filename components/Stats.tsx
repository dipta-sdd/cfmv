import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useStats } from "../contexts/StatsContext";

const Stats: React.FC = () => {
  const { stats, chartData, loading } = useStats();

  const cumulativeData = useMemo(() => {
    let runningTotal = 0;
    return chartData.map((point) => {
      runningTotal += point.downloads;
      return {
        ...point,
        cumulative: runningTotal,
      };
    });
  }, [chartData]);

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-500">Loading stats...</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Download Statistics
        </h2>
        <p className="mt-2 text-lg text-slate-600">
          Real-time download metrics for CampaignBay.
        </p>
      </div>

      {/* Hero Card */}
      {stats && (
        <div className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 p-8 text-center ring-1 ring-slate-900/5">
          {/* Decorative Elements */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-60"></div>

          {/* Main Count */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="flex items-start text-slate-900 leading-none font-sans tracking-tight">
              <span className="text-[30vw] font-bold tracking-tighter">
                {stats.totalDownloads}
              </span>
              {/* Arrow Icon */}
              <svg
                className="w-12 h-12 text-indigo-600 mt-4 ml-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                  transform="rotate(45 12 12)"
                />
              </svg>
            </div>

            <div className="mt-2 text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">
              Total Downloads
            </div>

            {/* Today Pill */}
            <div className="w-[58vw]mt-8 bg-slate-50 border border-slate-200 rounded-full px-[2vw] py-[2vw] flex items-center gap-3 shadow-sm">
              <div className=" rounded-full bg-green-100 flex items-center justify-center">
                <svg
                  className="w-[10vw] h-[10vw] text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10vw] font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                  Today
                </span>
                <span className="text-[10vw] font-bold text-slate-900">
                  +{stats.today}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cumulative Downloads Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[500px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          Cumulative Growth
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={cumulativeData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#10b981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCumulative)"
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Daily Downloads Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-[500px]">
        <h3 className="text-lg font-bold text-slate-800 mb-6">
          Daily Downloads
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
              minTickGap={30}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#64748b" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Area
              type="monotone"
              dataKey="downloads"
              stroke="#4f46e5"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorDownloads)"
              activeDot={{ r: 6, strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stats;
