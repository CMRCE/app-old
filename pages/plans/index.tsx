import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "../../components/dashboard/Layout";
import { SubscriptionPlan } from "../../types";
import usePlan from "../../hooks/usePlan";
import { useEffect, useState } from "react";
import { useBusiness } from "../../components/business/BusinessProvider";
import PlanSummary from "../../components/plans/PlanSummary";

const AllPlans: NextPage = () => {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);

  const { business } = useBusiness();
  const { getAllPlans } = usePlan();

  useEffect(() => {
    (async () => {
      if (business) {
        const plans = await getAllPlans({ business_id: business.id });
        plans ? setPlans(plans) : null;
      }
    })();
  }, [business, getAllPlans]);
  return (
    <div>
      <Head>
        <title>All plans | OurShop Africa</title>
      </Head>

      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4">All plans</h2>
        {plans.map((plan) => (
          <PlanSummary key={plan.id} plan={plan} />
        ))}
      </DashboardLayout>
    </div>
  );
};

export default AllPlans;
