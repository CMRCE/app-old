export interface Locals {
  userid: string;
}

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  dialing_code: string;
  mobile: string;
  email_verified: boolean;
  token?: string;
  businesses: Business[];
}

export interface Business {
  id: string;
  name: string;
  email: string;
  address: string;
  country: Country;
  currency: Currency;
  role?: string;
  logo?: string;
  plans: SubscriptionPlan[];
  subscribers: Subscriber[];
}

export interface Country {
  id: number;
  name: string;
  dialing_code: string;
  flag_unicode: string;
  enabled: boolean;
}

export interface Currency {
  id: number;
  name: string;
  symbol: string;
  code: string;
}

export interface SubscriptionPlanInterval {
  name: "monthly" | "weekly" | "daily";
  duration: number;
}

type SubscriptionPlanBenefit = string;
export interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  benefits: SubscriptionPlanBenefit[];
  duration_type: SubscriptionPlanInterval["name"];
  duration_length: SubscriptionPlanInterval["duration"];
  trial_duration_type: SubscriptionPlanInterval["name"];
  trial_duration_length: SubscriptionPlanInterval["duration"];
  tokenize_for_trial: boolean;
  active_subscribers: number;
  pending_payments: number;
  cancellations: number;
  currency: Currency;
}

export interface SubscriptionPlanGroup {
  id: number;
  name: string;
  description: string;
  plans: Array<SubscriptionPlan>;
}

export interface Subscriber {
  id: string;
  name: string;
  total_spend: number;
  subscribed_at: string;
  current_plan: SubscriptionPlan;
}

export type CreateEntityFromType<T extends { id: number | string }> = Omit<
  T,
  "id"
>;

export type Nullable<T> = T extends Array<infer U>
  ? Array<U> | undefined
  : T extends Record<K, V>
  ? {
      [K in keyof T]: Nullable<T[K]>;
    }
  : T | undefined;

export type CreateSubscriptionPlan = Omit<
  CreateEntityFromType<SubscriptionPlan>,
  "active_subscribers" | "pending_payments" | "cancellations" | "currency"
> & { currency: string | number };
