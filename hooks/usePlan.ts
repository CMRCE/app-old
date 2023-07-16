import * as apiClient from "lib/api";
import { Business, SubscriptionPlan } from "types";
import cookies from "js-cookie";

export type CreatePlanParams = {
  business_id: Business["id"];
  name: string;
  description: string;
  benefits: string[];
  duration_type: string;
  duration_length: string;
  trial_duration_type: string;
  trial_duration_length: string;
  tokenize_for_trial: boolean;
  price: number;
  currency: string;
};
type CreatePlanFunc = (
  params: CreatePlanParams
) => Promise<SubscriptionPlan | null>;
type UpdatePlanFunc = (
  params: Partial<CreatePlanParams> & { id: SubscriptionPlan["id"] }
) => Promise<SubscriptionPlan | null>;
type GetPlanFunc = ({
  id,
  business_id,
}: {
  id: SubscriptionPlan["id"];
  business_id: Business["id"];
}) => Promise<SubscriptionPlan | null>;
type GetAllPlansFunc = ({
  business_id,
}: {
  business_id: Business["id"];
}) => Promise<SubscriptionPlan[] | null>;

const createPlan: CreatePlanFunc = async ({
  business_id,
  name,
  description,
  benefits,
  duration_type,
  duration_length,
  trial_duration_type,
  trial_duration_length,
  tokenize_for_trial,
  price,
  currency,
}) => {
  const response = await apiClient.post(
    `business/${business_id}/plans`,
    {
      name,
      description,
      benefits,
      duration_type,
      duration_length,
      trial_duration_type,
      trial_duration_length,
      tokenize_for_trial,
      price,
      currency,
    },
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plan: SubscriptionPlan = response.data;
    return plan;
  }
  return null;
};

const updatePlan: UpdatePlanFunc = async ({
  business_id,
  id,
  name,
  description,
  benefits,
  duration_type,
  duration_length,
  trial_duration_type,
  trial_duration_length,
  tokenize_for_trial,
  price,
  currency,
}) => {
  const response = await apiClient.put(
    `business/${business_id}/plans/${id}`,
    {
      name,
      description,
      benefits,
      duration_type,
      duration_length,
      trial_duration_type,
      trial_duration_length,
      tokenize_for_trial,
      price,
      currency,
    },
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plan: SubscriptionPlan = response.data;
    return plan;
  }
  return null;
};

const getPlan: GetPlanFunc = async ({ id, business_id }) => {
  const response = await apiClient.get(
    `business/${business_id}/plans/${id}`,
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plan: SubscriptionPlan = response.data;
    return plan;
  }
  return null;
};

const getAllPlans: GetAllPlansFunc = async ({ business_id }) => {
  const response = await apiClient.get(
    `business/${business_id}/plans`,
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plans: SubscriptionPlan[] = response.data;
    return plans;
  }
  return null;
};

const usePlan = () => ({ createPlan, updatePlan, getPlan, getAllPlans });

export default usePlan;
