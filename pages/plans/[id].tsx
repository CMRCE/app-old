import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useBusiness } from "../../components/business/BusinessProvider";
import DashboardLayout from "../../components/dashboard/Layout";
import CreatePlanForm from "../../components/plans/PlanForm";
import Loading from "../../components/ui/icons/Loading";
import usePlan from "../../hooks/usePlan";
import { getStaticCountriesAndCurrencies } from "../../lib/static";
import { Currency, SubscriptionPlan } from "../../types";

const Plan: NextPage<{
  currencies: Array<Currency>;
}> = ({ currencies }) => {
  const { id } = useRouter().query;
  const [plan, setPlan] = useState<SubscriptionPlan>();
  const { business } = useBusiness();
  const { getPlan } = usePlan();

  useEffect(() => {
    (async () => {
    if (!plan && business && typeof id === 'string') {
      const plan = await getPlan({id: Number(id), business_id: business.id});
      plan ? setPlan(plan) : null;
    }
  })()
}, [id, plan, business]);

  return (
    <>
      <div>
        <Head>
          <title>Manage your Plan | OurShop Africa</title>
        </Head>
      </div>

      {!plan && (
        <div className="w-full h-96 flex items-center justify-center">
          <Loading play className="h-12 mr-3" />
        </div>
      )}

      {plan && (
        <DashboardLayout>
          <p className="mb-2">Manage your plan</p>
          <h1 className="text-3xl font-bold mb-6">{plan.name}</h1>
          <CreatePlanForm
            plan={plan}
            currencies={currencies}
          />
        </DashboardLayout>
      )}
    </>
  );
};

export async function getServerSideProps() {
  return await getStaticCountriesAndCurrencies();
}

export default Plan;
