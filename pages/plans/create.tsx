import type { NextPage } from "next";
import Head from "next/head";
import CreatePlanForm from "../../components/plans/PlanForm";
import DashboardLayout from "../../components/dashboard/Layout";
import { getStaticCountriesAndCurrencies } from "../../lib/static";
import { Currency } from "../../types";

const CreatePlan: NextPage<{
  currencies: Array<Currency>;
}> = ({ currencies }) => {
  return (
    <div>
      <Head>
        <title>Create a new plan | OurShop Africa</title>
      </Head>

      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4">Create your plan</h2>
        <CreatePlanForm currencies={currencies} />
      </DashboardLayout>
    </div>
  );
};

export async function getStaticProps() {
  return await getStaticCountriesAndCurrencies();
}

export default CreatePlan;
