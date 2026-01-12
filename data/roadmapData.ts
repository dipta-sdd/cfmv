export interface RoadmapItem {
    title: string;
    type: "Free" | "Pro";
    desc: string;
    score?: string;
}

export interface Sprint {
    id: number;
    title: string;
    goal: string;
    items: RoadmapItem[];
}

export const roadmapData: Sprint[] = [
    {
        id: 1,
        title: "",
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
        ],
    },
    {
        id: 2,
        title: "Launch CampaignBay Pro",
        goal: "Launch CampaignBay Pro",
        items: [
            {
                title: "Auto Update",
                type: "Pro",
                desc: "Automatic plugin updates for Pro users.",
            },
            {
                title: "UI Improvement",
                type: "Free",
                desc: "Campaigns page filters, dashboard skeleton, and other UI enhancements.",
            },
            {
                title: "Conditional Cart-Based Discounts (Subtotal)",
                type: "Free",
                desc: "Apply discounts based on cart subtotal.",
            },
            {
                title: "Conditional Cart-Based Discounts (Total)",
                type: "Pro",
                desc: "Apply discounts based on cart total amount.",
            },
        ],
    },
    {
        id: 3,
        title: "Cart Intelligence & Visual Polish",
        goal: "Smarter cart rules and a premium user experience.",
        items: [
            {
                title: "Full UI Redesign",
                type: "Pro",
                desc: "Complete visual overhaul of the plugin interface.",
            },
            {
                title: "Conditional Cart-Based Discounts (Item Count)",
                type: "Pro",
                desc: "Apply discounts based on number of items in cart.",
            },
            {
                title: "Fixed Cart Discounts",
                type: "Free",
                desc: "Fixed amount discount applied to the entire cart.",
            },
            {
                title: "Location-Based Discounts",
                type: "Pro",
                desc: "Discounts based on customer shipping/billing location (city, state, zip).",
            },
        ],
    },
    {
        id: 4,
        title: "Checkout & Engagement",
        goal: "Drive conversions with payment incentives and urgency tools.",
        items: [
            {
                title: "Payment Method Discounts",
                type: "Pro",
                desc: "Discounts for using specific payment methods (e.g., cash, bank transfer).",
            },
            {
                title: "Set User Limit",
                type: "Pro",
                desc: "Usage limits across different discount types per user.",
            },
            {
                title: "Dynamic Sale Badges & Timers",
                type: "Pro",
                desc: "Display countdown timers and sale badges on products.",
            },
        ],
    }
];