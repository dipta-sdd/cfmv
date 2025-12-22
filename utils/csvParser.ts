export interface ParsedCSV {
  headers: string[];
  rows: string[][];
}

export const parseCSV = (csvText: string): ParsedCSV => {
  const lines = csvText.trim().split(/\r?\n/);
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }

  // Regex to match CSV fields, handling quotes
  // Matches a quoted string OR a sequence of non-comma characters
  const reValid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  
  // A simpler split approach that respects quotes for this specific dataset
  const splitLine = (text: string) => {
    const result: string[] = [];
    let current = '';
    let inQuote = false;
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (char === '"') {
        inQuote = !inQuote;
      } else if (char === ',' && !inQuote) {
        result.push(current.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
        current = '';
      } else {
        current += char;
      }
    }
    // Push the last field
    result.push(current.trim().replace(/^"|"$/g, '').replace(/""/g, '"'));
    return result;
  };

  const headers = splitLine(lines[0]);
  const rows = lines.slice(1).map(line => splitLine(line));

  return { headers, rows };
};