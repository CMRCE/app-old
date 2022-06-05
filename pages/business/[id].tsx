import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import CreateBusinessForm from "../../components/business/BusinessForm";
import { useBusiness } from "../../components/business/BusinessProvider";
import DashboardLayout from "../../components/dashboard/Layout";
import Loading from "../../components/ui/icons/Loading";
import { getStaticCountriesAndCurrencies } from "../../lib/static";
import { Country, Currency } from "../../types";

const Business: NextPage<{
  countries: Array<Country>;
  currencies: Array<Currency>;
}> = ({ countries, currencies }) => {
  const { id } = useRouter().query;
  const { business, selectBusiness, loading } = useBusiness();

  useEffect(() => {
    if (business?.id === id) return;
    selectBusiness({ id: id as string });
  }, [id, business, selectBusiness]);

  return (
    <>
      <div>
        <Head>
          <title>Manage your Business | OurShop Africa</title>
        </Head>
      </div>

      {loading && (
        <div className="w-full h-96 flex items-center justify-center">
          <Loading play className="h-12 mr-3" />
        </div>
      )}

      {business && (
        <DashboardLayout>
          <p className="mb-2">Manage your business</p>
          <h1 className="text-3xl font-bold mb-6">{business.name}</h1>
          <CreateBusinessForm
            business={business}
            countries={countries}
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

export default Business;
