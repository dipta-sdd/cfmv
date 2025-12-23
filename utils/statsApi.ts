import { DownloadStats, HistoryDataPoint } from '../types';

// Official WordPress Stats API endpoint for the plugin summary
const SUMMARY_URL = 'https://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=campaignbay&historical_summary=1';
// Endpoint for historical graph data
const HISTORY_URL = 'https://api.wordpress.org/stats/plugin/1.0/downloads.php?slug=campaignbay&limit=267';

/**
 * Helper to fetch with a specific proxy url
 */
const fetchWithProxy = async (proxyUrl: string): Promise<string> => {
    const response = await fetch(proxyUrl);
    if (!response.ok) {
        throw new Error(`Proxy responded with status: ${response.status}`);
    }
    return response.text();
}

/**
 * Reusable function to fetch data through multiple fallback proxies
 */
const fetchDataWithFallback = async (targetUrl: string): Promise<string> => {
    let responseContent = '';
    let lastError: Error | null = null;

    // We use multiple proxies as fallbacks to ensure reliability
    const proxyGenerators = [
        // Option 1: AllOrigins (Raw)
        (url: string) => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
        // Option 2: CORS Proxy IO
        (url: string) => `https://corsproxy.io/?${encodeURIComponent(url)}`,
        // Option 3: CodeTabs
        (url: string) => `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(url)}`
    ];

    for (const generateProxyUrl of proxyGenerators) {
        try {
            const proxyUrl = generateProxyUrl(targetUrl);
            responseContent = await fetchWithProxy(proxyUrl);

            // Basic validation that we got a JSON-like response
            if (responseContent && responseContent.trim().startsWith('{')) {
                // Try parsing strictly to verify it's valid JSON
                JSON.parse(responseContent);
                return responseContent; // Success
            }
        } catch (e: any) {
            console.warn(`Proxy attempt failed for ${generateProxyUrl(targetUrl).split('?')[0]}:`, e.message);
            lastError = e;
            continue; // Try next proxy
        }
    }

    throw new Error(`Unable to connect to data source. Please try again later. (${lastError?.message || 'Network error'})`);
};

/**
 * Fetches the JSON content via a CORS proxy and parses specific fields
 * to retrieve the total download count.
 */
export const fetchDownloadCount = async (): Promise<DownloadStats> => {
    try {
        const responseContent = await fetchDataWithFallback(SUMMARY_URL);
        const data = JSON.parse(responseContent);

        // Check if the expected field exists
        if (!data || typeof data.all_time === 'undefined') {
            throw new Error('Invalid API response: missing "all_time" field');
        }

        const rawAllTime = data.all_time;
        const rawToday = data.today;

        if (rawAllTime === null || rawAllTime === undefined) {
            throw new Error('Download count is null or undefined');
        }

        // Remove commas just in case and parse
        const cleanNumber = parseInt(String(rawAllTime).replace(/,/g, ''), 10);
        const cleanToday = parseInt(String(rawToday || 0).replace(/,/g, ''), 10);

        if (isNaN(cleanNumber)) {
            throw new Error(`Could not parse number from API: "${rawAllTime}"`);
        }

        return {
            totalDownloads: cleanNumber,
            today: isNaN(cleanToday) ? 0 : cleanToday,
            lastUpdated: new Date()
        };

    } catch (error) {
        console.error('Failed to parse API stats:', error);
        throw error;
    }
};

/**
 * Fetches historical download data for the graph.
 */
export const fetchDownloadHistory = async (): Promise<HistoryDataPoint[]> => {
    try {
        const responseContent = await fetchDataWithFallback(HISTORY_URL);
        const data = JSON.parse(responseContent);

        // The API returns an object where keys are dates: {"2023-01-01": "5", ...}
        // We transform this into an array of objects
        const history: HistoryDataPoint[] = Object.entries(data).map(([date, count]) => {
            return {
                date,
                downloads: parseInt(String(count).replace(/,/g, ''), 10) || 0
            };
        });

        // Sort by date ascending
        return history.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    } catch (error) {
        console.error('Failed to parse API history:', error);
        throw error;
    }
};
