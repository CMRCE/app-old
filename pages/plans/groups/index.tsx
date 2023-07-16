import type { NextPage } from "next";
import Head from "next/head";
import DashboardLayout from "components/dashboard/Layout";
import { SubscriptionPlanGroup } from "types";
import usePlanGroup from "hooks/usePlanGroup";
import { useEffect, useState } from "react";
import { useBusiness } from "components/business/BusinessProvider";

const AllPlanGroups: NextPage = () => {
  const [plangroups, setPlanGroups] = useState<SubscriptionPlanGroup[]>([]);

  const { business } = useBusiness();
  const { getAllPlanGroups } = usePlanGroup();

  useEffect(() => {
    (async () => {
      if (business) {
        const plangroups = await getAllPlanGroups({ business_id: business.id });
        plangroups ? setPlanGroups(plangroups) : null;
      }
    })();
  }, [business, getAllPlanGroups]);
  return (
    <div>
      <Head>
        <title>All Plan Groups | OurShop Africa</title>
      </Head>

      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4">All Plan Groups</h2>
        {plangroups.map((plangroup) => (
          <h1 key={plangroup.id}>{plangroup.name}</h1>
          // <PlanGroupSummary key={plangroup.id} plangroup={plangroup} />
        ))}
      </DashboardLayout>
    </div>
  );
};

export default AllPlanGroups;
