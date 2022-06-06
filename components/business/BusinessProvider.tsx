import * as React from "react";
import * as apiClient from "../../lib/api";
import cookies from "js-cookie";
import { Business, User } from "../../types";
import { useRouter } from "next/router";
import { useAuth } from "../auth/AuthProvider";

type SelectBusinessParams =
  | { id: string; index?: never }
  | { id?: never; index: number };
type SelectBusinessFunc = (params: SelectBusinessParams) => void;

export type CreateBusinessParams = {
  name: string;
  email: string;
  address: string;
  country_id: number;
  currency_id: number;
};
type CreateBusinessFunc = (params: CreateBusinessParams) => void;
type UpdateBusinessFunc = (
  params: Partial<CreateBusinessParams> & { id: string }
) => void;

type BusinessContextType = {
  loading?: boolean;
  business?: Business;
  selectBusiness: SelectBusinessFunc;
  createBusiness: CreateBusinessFunc;
  updateBusiness: UpdateBusinessFunc;
};

export const BusinessContext = React.createContext<BusinessContextType>({
  selectBusiness: () => {},
  createBusiness: () => {},
  updateBusiness: () => {},
});

export const useBusiness = () => React.useContext(BusinessContext);

const BusinessProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [business, setBusiness] = React.useState<Business>();
  const router = useRouter();

  const selectBusiness: SelectBusinessFunc = async ({ id, index }) => {
    if (id) {
      const business = await apiClient.get(
        `business/${id}`,
        cookies.get("ourshop_token")
      );
      if (business?.status === "success") {
        setBusiness(business.data);
      }
      return;
    }

    if (index) {
      setBusiness(user?.businesses[index] ?? undefined);
      return;
    }
  };

  React.useEffect(() => {
    if (business && user?.businesses.some((b) => b.id === business.id)) return;
    if (user && user.businesses.length > 0) {
      setBusiness(user.businesses[0]);
    }
  }, [user, business, setBusiness]);

  const createBusiness: CreateBusinessFunc = async ({
    name,
    email,
    address,
    country_id,
    currency_id,
  }) => {
    const response = await apiClient.post(
      "business",
      {
        name,
        email,
        address,
        country_id,
        currency_id,
      },
      cookies.get("ourshop_token")
    );
    if (response?.status === "error") {
      // TODO: Clean up exception throwing
      throw { messages: response?.errors };
    }
    if (response?.status === "success") {
      const business: Business = response.data;
      setBusiness(business);
      await router.push(`/business/${business.id}`);
    }
    return;
  };

  const updateBusiness: UpdateBusinessFunc = async ({
    id,
    name,
    email,
    address,
    country_id,
    currency_id,
  }) => {
    const response = await apiClient.post(
      `business/${id}`,
      {
        name,
        email,
        address,
        country_id,
        currency_id,
      },
      cookies.get("ourshop_token")
    );
    if (response?.status === "error") {
      // TODO: Clean up exception throwing
      throw { messages: response?.errors };
    }
    if (response?.status === "success") {
      const business: Business = response.data;
      setBusiness(business);
      await router.push(`/business/${business.id}`);
    }
    return;
  };

  return (
    <BusinessContext.Provider
      value={{
        loading: !business,
        business,
        selectBusiness,
        createBusiness,
        updateBusiness,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export default BusinessProvider;
