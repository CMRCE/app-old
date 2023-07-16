import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import CreatePlanForm from "../../components/plans/PlanForm";
import DashboardLayout from "../../components/dashboard/Layout";
import { getStaticCountriesAndCurrencies } from "../../lib/static";
import { Currency, SubscriptionPlan } from "../../types";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { getAllPlanGroups } from "hooks/usePlanGroup";

const CreatePlan: NextPage<{
  currencies: Array<Currency>;
}> = ({ currencies }) => {
  const { query, push } = useRouter();
  const { group } = query;
  const onSuccess = (plan: SubscriptionPlan) => {
    if (group) {
      push(`/plans/create?group=${group}`);
    }
    push(`/plans/${plan.id}`);
  };

  return (
    <div>
      <Head>
        <title>Create a new plan | OurShop Africa</title>
      </Head>

      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4">Create your plan</h2>
        <CreatePlanForm
          groupId={group ? Number(group) : undefined}
          currencies={currencies}
          onSuccess={onSuccess}
        />
      </DashboardLayout>
    </div>
  );
};

export async function getStaticProps() {
  return await getStaticCountriesAndCurrencies();
}

export default CreatePlan;
