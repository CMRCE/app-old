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
	name: string;
	symbol: string;
	code: string;
}

export interface SubscriptionPlanInterval {
	name: string,
	duration: number,
}

export interface SubscriptionPlan {
	id: string,
	name: string,
	price: number,
	interval: SubscriptionPlanInterval,
	active_subscribers: number,
	pending_payments:number,
	cancellations: number,
	currency: Currency,
}

export interface Subscriber {
	id: string;
	name: string;
	total_spend: number;
	subscribed_at: string;
	current_plan: SubscriptionPlan;
}
