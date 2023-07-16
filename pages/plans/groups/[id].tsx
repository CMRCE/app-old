import CreatePlanGroupForm from "components/plans/PlanGroupForm";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useBusiness } from "components/business/BusinessProvider";
import DashboardLayout from "components/dashboard/Layout";
import Loading from "components/ui/icons/Loading";
import usePlan from "hooks/usePlan";
import { SubscriptionPlanGroup } from "types";
import usePlanGroup from "hooks/usePlanGroup";

const PlanGroup: NextPage = () => {
  const { query, push } = useRouter();
  const { id } = query;
  const [planGroup, setPlanGroup] = useState<SubscriptionPlanGroup>();
  const { business } = useBusiness();
  const { getPlanGroup } = usePlanGroup();

  useEffect(() => {
    (async () => {
      if (!planGroup && business && typeof id === "string") {
        const planGroup = await getPlanGroup({
          id: Number(id),
          business_id: business.id,
        });
        planGroup ? setPlanGroup(planGroup) : null;
      }
    })();
  }, [id, planGroup, business, getPlanGroup]);

  return (
    <>
      <div>
        <Head>
          <title>Manage your Plan | OurShop Africa</title>
        </Head>
      </div>

      {!planGroup && (
        <div className="w-full h-96 flex items-center justify-center">
          <Loading play className="h-12 mr-3" />
        </div>
      )}

      {planGroup && (
        <DashboardLayout>
          <p className="mb-2">Manage your plan</p>
          <h1 className="text-3xl font-bold mb-6">{planGroup.name}</h1>
          <CreatePlanGroupForm
            planGroup={planGroup}
            onSuccess={(planGroup) => push(`/plans/groups/${planGroup.id}`)}
          />
        </DashboardLayout>
      )}
    </>
  );
};

export default PlanGroup;
