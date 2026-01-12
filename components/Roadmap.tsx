import React, { useMemo } from "react";
import { roadmapData } from "../data/roadmapData";

const Roadmap: React.FC = () => {
  // Calculate progress percentage based on "Done" items
  const progressPercentage = useMemo(() => {
    // Flatten all items with their global index
    const allItems = roadmapData.flatMap((sprint) => sprint.items);
    const totalItems = allItems.length + roadmapData.length; // items + sprint headers

    // Find the last index of a "Done" item
    let lastDoneIndex = -1;
    let currentIndex = 0;

    roadmapData.forEach((sprint) => {
      currentIndex++; // Sprint header
      sprint.items.forEach((item) => {
        if (item.status === "Done") {
          lastDoneIndex = currentIndex;
        }
        currentIndex++;
      });
    });

    if (lastDoneIndex === -1) return 0;
    return ((lastDoneIndex + 1) / totalItems) * 100;
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
          Product Roadmap
        </h2>
        <p className="mt-2 text-lg text-slate-600">
          Tracking our journey from essential features to professional
          ecosystem.
        </p>
      </div>

      <div className="relative">
        {/* Continuous Vertical Line (Gray base) */}
        <div className="absolute left-8 top-0 bottom-10 w-0.5 bg-slate-200"></div>

        {/* Green Progress Line (Overlay) */}
        {progressPercentage > 0 && (
          <div
            className="absolute left-8 top-0 w-0.5 bg-green-500 z-[1]"
            style={{ height: `${progressPercentage}%` }}
          ></div>
        )}

        <div className="space-y-12">
          {roadmapData.map((sprint) => (
            <div key={sprint.id} className="relative">
              {/* Sprint Node & Header */}
              <div className="flex gap-8 mb-6">
                <div className="flex-shrink-0 z-10 w-16 flex justify-center">
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-indigo-50 shadow-sm flex items-center justify-center relative translate-x-0.5">
                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-inner ring-4 ring-white">
                      {sprint.id}
                    </div>
                  </div>
                </div>
                <div className="pt-2">
                  <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-1 block">
                    Sprint {sprint.id}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {sprint.title}
                  </h3>
                  <p className="text-slate-500 italic">"{sprint.goal}"</p>
                </div>
              </div>

              {/* Feature Nodes (Directly on timeline) */}
              <div className="space-y-8 mb-12">
                {sprint.items.map((item, idx) => (
                  <div key={idx} className="relative flex gap-8">
                    {/* Small Node on the main line */}
                    <div className="flex-shrink-0 w-16 flex justify-center z-10">
                      {item.status === "Done" ? (
                        item.type === "Free" ? (
                          <div className="w-4 h-4 rounded-full bg-green-500 ring-2 ring-green-500 shadow-sm mt-1.5 translate-x-0.5"></div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-pink-500 ring-2 ring-pink-500 shadow-sm mt-1.5 translate-x-0.5"></div>
                        )
                      ) : (
                        item.type === "Free" ? (
                          <div className="w-4 h-4 rounded-full bg-green-200 ring-2 ring-green-500 shadow-sm mt-1.5 translate-x-0.5"></div>
                        ) : (
                          <div className="w-4 h-4 rounded-full bg-pink-200 ring-2 ring-pink-500 shadow-sm mt-1.5 translate-x-0.5"></div>
                        )
                      )}
                    </div>

                    {/* Feature Content */}
                    <div className="flex-1 bg-white p-4 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow -mt-2">
                      <div className="flex items-center gap-3 flex-wrap mb-1">
                        <span className="font-bold text-slate-800 text-lg">
                          {item.title}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded font-medium uppercase tracking-wide border ${
                            item.type === "Free"
                              ? "bg-green-50 text-green-700 border-green-100"
                              : "bg-purple-50 text-purple-700 border-purple-100"
                          }`}
                        >
                          {item.type}
                        </span>
                        {item.score && (
                          <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-1 rounded">
                            {item.score}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Finish Line */}
          <div className="relative flex gap-8">
            <div className="flex-shrink-0 z-10 w-16 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center ring-4 ring-white translate-x-0.5">
                <div className="w-3 h-3 rounded-full bg-slate-400"></div>
              </div>
            </div>
            <div className="pt-1">
              <span className="text-slate-400 font-medium text-sm">
                Future Plans
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
