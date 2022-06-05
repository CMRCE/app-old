import type { NextPage } from "next";
import Head from "next/head";
import CreateBusinessForm from "../../components/business/BusinessForm";
import DashboardLayout from "../../components/dashboard/Layout";
import { getStaticCountriesAndCurrencies } from "../../lib/static";
import { Country, Currency } from "../../types";

const CreateBusiness: NextPage<{
  countries: Array<Country>;
  currencies: Array<Currency>;
}> = ({ countries, currencies }) => {
  return (
    <div>
      <Head>
        <title>Create a new business | OurShop Africa</title>
      </Head>

      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4">Create your business</h2>
        <CreateBusinessForm countries={countries} currencies={currencies} />
      </DashboardLayout>
    </div>
  );
};

export async function getStaticProps() {
  return await getStaticCountriesAndCurrencies();
}

export default CreateBusiness;
