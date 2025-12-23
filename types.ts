export interface DownloadStats {
    totalDownloads: number;
    today: number;
    lastUpdated: Date;
}

export interface HistoryDataPoint {
    date: string;
    downloads: number;
}
