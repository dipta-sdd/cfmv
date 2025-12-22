import React from 'react';

interface BadgeProps {
  value: string;
}

const Badge: React.FC<BadgeProps> = ({ value }) => {
  const lowerVal = value.toLowerCase();
  
  // Clean up the text for display (remove icons for the text part if needed, or keep them)
  // Logic: 
  // ✅ -> Green
  // ❌ -> Red/Gray
  // 🟡 -> Yellow
  
  let styles = "bg-gray-100 text-gray-800 border-gray-200";
  
  if (value.includes('✅')) {
    if (value.includes('Upcoming')) {
      styles = "bg-blue-50 text-blue-700 border-blue-200";
    } else {
      styles = "bg-green-50 text-green-700 border-green-200";
    }
  } else if (value.includes('❌')) {
    if (value.includes('Missing')) {
      styles = "bg-red-50 text-red-700 border-red-200";
    } else {
      styles = "bg-slate-50 text-slate-500 border-slate-200 opacity-75";
    }
  } else if (value.includes('🟡')) {
    styles = "bg-yellow-50 text-yellow-700 border-yellow-200";
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium border ${styles}`}>
      {value}
    </span>
  );
};

export default Badge;