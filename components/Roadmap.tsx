import React from "react";

interface RoadmapItem {
  title: string;
  type: "Free" | "Pro";
  desc: string;
  score?: string;
}

interface Sprint {
  id: number;
  title: string;
  goal: string;
  items: RoadmapItem[];
}

const roadmapData: Sprint[] = [
  {
    id: 1,
    title: "Market Fundamentals",
    goal: "Remove basic objections and provide essential logic.",
    items: [
      {
        title: "User Role Restriction",
        type: "Free",
        desc: 'Essential for B2B/Wholesale users (e.g., "Wholesale" or "VIP" roles).',
        score: "5/3",
      },
      {
        title: "Customer-Specific Pricing & Group Discounts",
        type: "Pro",
        desc: "Targeted pricing for specific individuals.",
        score: "2/5",
      },
      {
        title: "Product in Cart Based on Condition",
        type: "Pro",
        desc: '"Buy A, get a discount on B" logic.',
        score: "5/2",
      },
      {
        title: "Bundle/Set Discounts",
        type: "Pro",
        desc: 'Special pricing for pre-defined sets (e.g., "3 for $10").',
        score: "2/2",
      },
    ],
  },
  {
    id: 2,
    title: "Visibility & UX",
    goal: "Add visual value to the cart to improve merchant conversion and retention.",
    items: [
      {
        title: "Conditional Cart-Based Discounts",
        type: "Free",
        desc: "Apply rules based on subtotal or item count.",
        score: "7/1",
      },
      {
        title: "Fixed Cart Discounts",
        type: "Free",
        desc: "Support for flat-rate discounts on the entire cart.",
        score: "4/2",
      },
      {
        title: "Total Savings Display in Cart",
        type: "Free",
        desc: 'A major missing feature. Showing "You saved $X" is critical.',
        score: "3/1",
      },
      {
        title: "Cart Page Discount Notice",
        type: "Free",
        desc: 'Confirmation messages like "Success! Your discount has been applied".',
        score: "0/1",
      },
      {
        title: "Dynamic Sale Badges & Timers",
        type: "Pro",
        desc: "Visual urgency for product pages to drive faster checkouts.",
        score: "1/1",
      },
      {
        title: "Customizable Pricing Table Style",
        type: "Pro",
        desc: "Advanced table designs to match different themes.",
        score: "4/1",
      },
    ],
  },
  {
    id: 3,
    title: "Revenue Boosters",
    goal: "Incentivize customers to spend more per order.",
    items: [
      {
        title: "Free Shipping Thresholds",
        type: "Free",
        desc: '"Spend $50 more for free shipping".',
        score: "3/4",
      },
      {
        title: "Free Gift Offers",
        type: "Pro",
        desc: "Threshold-based free products.",
        score: "3/4",
      },
      {
        title: "Spending Goal Bar",
        type: "Pro",
        desc: "A progress bar in the cart showing how close the user is to a reward.",
        score: "1/0",
      },
      {
        title: "Cart Upsells",
        type: "Free",
        desc: "Suggesting items directly in the cart to reach a discount tier.",
      },
    ],
  },
  {
    id: 4,
    title: "Advanced Targeting & Logic",
    goal: "Provide precision tools for high-end professional stores.",
    items: [
      {
        title: "Location-Based Discounts",
        type: "Pro",
        desc: "Targeting by City, State, or Zip code.",
      },
      {
        title: "Purchase History Targeting",
        type: "Pro",
        desc: "Reward returning customers based on lifetime spend.",
      },
      {
        title: "New User One-Time Discount",
        type: "Free",
        desc: 'A powerful "lead magnet" feature to help merchants get new users.',
      },
      {
        title: "Attribute & SKU-Based Discounts",
        type: "Pro",
        desc: "Precise targeting for specific variations or stock units.",
      },
      {
        title: "Discount on Nth Item",
        type: "Pro",
        desc: 'Advanced sales logic like "Buy 3, get 50% off the 4th".',
      },
    ],
  },
  {
    id: 5,
    title: "Ecosystem & Automation",
    goal: "Integrate with the wider WordPress ecosystem for the Pro launch.",
    items: [
      {
        title: "Multicurrency Support",
        type: "Pro",
        desc: "Essential for international stores. (WPML/FOX/CURCY)",
      },
      {
        title: "A/B Testing Support",
        type: "Pro",
        desc: "A unique differentiator for CampaignBay to test which discount performs better.",
      },
      {
        title: "Dynamic Coupon Generation",
        type: "Pro",
        desc: "Automatically create one-time-use unique codes.",
      },
      {
        title: "REST API Support",
        type: "Pro",
        desc: "For headless WooCommerce setups and developer custom work.",
      },
      {
        title: "Auto-Apply Coupons",
        type: "Pro",
        desc: "Triggering coupon codes automatically without customer input.",
      },
    ],
  },
];

const Roadmap: React.FC = () => {
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
        {/* Continuous Vertical Line */}
        <div className="absolute left-8 top-0 bottom-10 w-0.5 bg-slate-200"></div>

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
                      {item.type === "Free" ? (
                        <div className="w-4 h-4 rounded-full bg-green-500 ring-4 ring-white shadow-sm mt-1.5 translate-x-0.5"></div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-purple-500 ring-4 ring-white shadow-sm mt-1.5 translate-x-0.5"></div>
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
