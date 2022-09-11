export const CURRENCIES = [
  {
    name: "Naira",
    symbol: "₦",
    code: "NGN",
  },
  {
    name: "US Dollar",
    symbol: "$",
    code: "USD",
  },
  {
    name: "Ghanian Cedi",
    symbol: "GH₵",
    code: "GHC",
  },
];

export const PLANS = [
  {
    id: "123",
    name: "Gold Plan",
    price: 12500,
    interval: {
      name: "Monthly",
      duration: 1,
    },
    active_subscribers: 54,
    pending_payments: 5,
    cancellations: 12,
    currency: CURRENCIES[0],
  },
  {
    id: "124",
    name: "Silver Plan",
    price: 8500,
    interval: {
      name: "Monthly",
      duration: 1,
    },
    active_subscribers: 174,
    pending_payments: 29,
    cancellations: 56,
    currency: CURRENCIES[0],
  },
  {
    id: "127",
    name: "Bronze Plan",
    price: 5000,
    interval: {
      name: "Monthly",
      duration: 1,
    },
    active_subscribers: 92,
    pending_payments: 18,
    cancellations: 8,
    currency: CURRENCIES[0],
  },
];

export const SUBSCRIBERS = [
  {
    id: "id1",
    name: "John Doe",
    total_spend: 1700,
    current_plan: PLANS[0],
    subscribed_at: "2022-07-19 12:57:33",
  },
  {
    id: "id1",
    name: "Jane Fawn",
    total_spend: 5900,
    current_plan: PLANS[1],
    subscribed_at: "2022-07-21 17:25:13",
  },
  {
    id: "id1",
    name: "Sienna Roadback",
    total_spend: 11700,
    current_plan: PLANS[0],
    subscribed_at: "2022-07-19 12:57:33",
  },
  {
    id: "id1",
    name: "Vanilla Sugary",
    total_spend: 21820,
    current_plan: PLANS[2],
    subscribed_at: "2020-03-21 02:37:33",
  },
  {
    id: "id1",
    name: "Chidi Nwosu",
    total_spend: 95030,
    current_plan: PLANS[1],
    subscribed_at: "2022-07-19 12:57:33",
  },
  {
    id: "id1",
    name: "Starlight Mine",
    total_spend: 111750,
    current_plan: PLANS[0],
    subscribed_at: "2022-07-19 12:57:33",
  },
  {
    id: "id1",
    name: "Elizabeth Tudor",
    total_spend: 1700,
    current_plan: PLANS[1],
    subscribed_at: "2022-07-19 12:57:33",
  },
  {
    id: "id1",
    name: "Osaro Okundaye",
    total_spend: 31500,
    current_plan: PLANS[1],
    subscribed_at: "2022-07-19 12:57:33",
  },
  {
    id: "id1",
    name: "Etim Enya",
    total_spend: 12750,
    current_plan: PLANS[2],
    subscribed_at: "2022-07-19 12:57:33",
  },
  {
    id: "id1",
    name: "David Orshun",
    total_spend: 70000,
    current_plan: PLANS[2],
    subscribed_at: "2019-04-30 12:57:33",
  },
];
