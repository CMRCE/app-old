import type { NextPage } from "next";
import Head from "next/head";
import CreatePlanForm from "../../components/plans/PlanForm";
import DashboardLayout from "../../components/dashboard/Layout";
import { getStaticCountriesAndCurrencies } from "../../lib/static";
import { Currency, SubscriptionPlan } from "../../types";
import { useRouter } from "next/router";

const CreatePlan: NextPage<{
  currencies: Array<Currency>;
}> = ({ currencies }) => {
  const router = useRouter();
  const onSuccess = (plan: SubscriptionPlan) => {
    router.push(`/plans/${plan.id}`);
  };

  return (
    <div>
      <Head>
        <title>Create a new plan | OurShop Africa</title>
      </Head>

      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4">Create your plan</h2>
        <CreatePlanForm currencies={currencies} onSuccess={onSuccess} />
      </DashboardLayout>
    </div>
  );
};

export async function getStaticProps() {
  return await getStaticCountriesAndCurrencies();
}

export default CreatePlan;
