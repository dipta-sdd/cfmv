import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { DownloadStats, HistoryDataPoint } from "../types";
import { fetchDownloadCount, fetchDownloadHistory } from "../utils/statsApi";

interface StatsContextType {
  stats: DownloadStats | null;
  chartData: HistoryDataPoint[];
  loading: boolean;
}

const StatsContext = createContext<StatsContextType | undefined>(undefined);

export const StatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [stats, setStats] = useState<DownloadStats | null>(null);
  const [chartData, setChartData] = useState<HistoryDataPoint[]>([]);
  const [loading, setLoading] = useState(true);

  // Refs to track fetch status and prevent duplicates
  const isFetchingSummary = useRef(false);
  const isFetchingHistory = useRef(false);

  const fetchData = async (isPolling = false) => {
    // Prevent duplicate calls if already fetching (unless forced functionality needed)
    if (isFetchingSummary.current) return;

    try {
      isFetchingSummary.current = true;
      const newStats = await fetchDownloadCount();

      // Determine if we need to fetch history:
      // 1. If it's the first load (!stats)
      // 2. If total downloads changed (newStats.totalDownloads !== stats.totalDownloads)
      const shouldFetchHistory =
        !stats || newStats.totalDownloads !== stats.totalDownloads;

      setStats(newStats); // Update stats immediately

      if (shouldFetchHistory && !isFetchingHistory.current) {
        isFetchingHistory.current = true;
        try {
          const historyHelper = await fetchDownloadHistory();

          // DATA INJECTION: Append "Today" to history
          // Find last date in history
          let finalHistory = [...historyHelper];
          if (historyHelper.length > 0 && newStats) {
            const lastPoint = historyHelper[historyHelper.length - 1];
            const lastDate = new Date(lastPoint.date);

            // Add 1 day
            const nextDate = new Date(lastDate);
            nextDate.setDate(lastDate.getDate() + 1);

            // Format YYYY-MM-DD
            const dateStr = nextDate.toISOString().split("T")[0];

            finalHistory.push({
              date: dateStr,
              downloads: newStats.today,
            });
          }

          setChartData(finalHistory);
        } catch (histErr) {
          console.error("Failed to update history:", histErr);
          // Keep old history if update fails
        } finally {
          isFetchingHistory.current = false;
        }
      }
    } catch (error) {
      console.error("Stats fetch failed:", error);
    } finally {
      isFetchingSummary.current = false;
      if (!isPolling) setLoading(false);
    }
  };

  useEffect(() => {
    // Initial Fetch
    fetchData();

    // Polling Interval (2 Minutes)
    const intervalId = setInterval(() => {
      fetchData(true);
    }, 2 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []); // Dependence on empty array to run once on mount + setup interval

  return (
    <StatsContext.Provider value={{ stats, chartData, loading }}>
      {children}
    </StatsContext.Provider>
  );
};

export const useStats = () => {
  const context = useContext(StatsContext);
  if (context === undefined) {
    throw new Error("useStats must be used within a StatsProvider");
  }
  return context;
};
