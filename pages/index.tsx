import type { NextPage } from "next";
import Head from "next/head";
import { useAuth } from "../components/auth/AuthProvider";
import { useBusiness } from "../components/business/BusinessProvider";
import BusinessSummary from "../components/business/BusinessSummary";
import DashboardLayout from "../components/dashboard/Layout";
import Loading from "../components/ui/icons/Loading";
import Button from "../components/ui/inputs/Button";

const Home: NextPage = () => {
  const { loading, user } = useAuth();
  const { business } = useBusiness();

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {loading && (
        <div className="w-full h-96 flex items-center justify-center">
          <Loading play className="h-12 mr-3" />
        </div>
      )}

      {user && (
        <DashboardLayout>
          {user.businesses.length > 0 && business && (
            <>
              <h1 className="text-3xl font-bold mb-6">{business.name}</h1>
              <div>
                <BusinessSummary business={business} />
              </div>
            </>
          )}
          {!user.businesses.length && (
            <>
              <h1 className="text-3xl font-bold mb-3">
                Create a business to get started
              </h1>
              <Button as="a" href="/business/create">
                Create a business
              </Button>
            </>
          )}
        </DashboardLayout>
      )}
    </>
  );
};

export default Home;
