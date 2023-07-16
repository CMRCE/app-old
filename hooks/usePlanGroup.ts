import * as apiClient from "lib/api";
import {
  Business,
  CreateEntityFromType,
  SubscriptionPlan,
  SubscriptionPlanGroup,
} from "types";
import cookies from "js-cookie";

export type CreatePlanGroupParams = {
  business_id: Business["id"];
  name: string;
  description: string;
  plans?: CreateEntityFromType<SubscriptionPlan>[] | SubscriptionPlan["id"][];
};
type CreatePlanGroupFunc = (
  params: CreatePlanGroupParams
) => Promise<SubscriptionPlanGroup | null>;
type UpdatePlanGroupFunc = (
  params: Partial<CreatePlanGroupParams> & { id: SubscriptionPlanGroup["id"] }
) => Promise<SubscriptionPlanGroup | null>;
type GetPlanGroupFunc = ({
  id,
  business_id,
}: {
  id: SubscriptionPlanGroup["id"];
  business_id: Business["id"];
}) => Promise<SubscriptionPlanGroup | null>;
type GetAllPlanGroupsFunc = ({
  business_id,
}: {
  business_id: Business["id"];
}) => Promise<SubscriptionPlanGroup[] | null>;

const createPlanGroup: CreatePlanGroupFunc = async ({
  business_id,
  name,
  description,
  plans,
}) => {
  const response = await apiClient.post(
    `business/${business_id}/plangroups`,
    {
      name,
      description,
      plans: plans ?? [],
    },
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plangroup: SubscriptionPlanGroup = response.data;
    return plangroup;
  }
  return null;
};

const updatePlanGroup: UpdatePlanGroupFunc = async ({
  business_id,
  id,
  name,
  description,
  plans,
}) => {
  const response = await apiClient.put(
    `business/${business_id}/plangroups/${id}`,
    {
      name,
      description,
      plans: plans ?? [],
    },
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plangroup: SubscriptionPlanGroup = response.data;
    return plangroup;
  }
  return null;
};

const getPlanGroup: GetPlanGroupFunc = async ({ id, business_id }) => {
  const response = await apiClient.get(
    `business/${business_id}/plangroups/${id}`,
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plangroup: SubscriptionPlanGroup = response.data;
    return plangroup;
  }
  return null;
};

export const getAllPlanGroups: GetAllPlanGroupsFunc = async ({
  business_id,
}) => {
  const response = await apiClient.get(
    `business/${business_id}/plangroups`,
    cookies.get("ourshop_token")
  );
  if (response?.status === "error") {
    // TODO: Clean up exception throwing
    throw { messages: response?.errors };
  }
  if (response?.status === "success") {
    const plangroups: SubscriptionPlanGroup[] = response.data;
    return plangroups;
  }
  return null;
};

const usePlanGroup = () => ({
  createPlanGroup,
  updatePlanGroup,
  getPlanGroup,
  getAllPlanGroups,
});

export default usePlanGroup;
