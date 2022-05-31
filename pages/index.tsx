import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAuth } from "../components/auth/AuthProvider";
import BusinessSummary from "../components/business/BusinessSummary";
import Loading from "../components/ui/icons/Loading";
import Button from "../components/ui/inputs/Button";
import Header from "../components/ui/layout/Header";

const Home: NextPage = () => {
  const { loading, user } = useAuth();
  const [selectedBusiness, setSelectedBusiness] = useState(0);
  return (
    <div>
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
        <div className="">
          <aside className="bg-slate-900 text-white md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"></aside>
          <div className="min-h-screen px-5 lg:px-12 relative bg-brand-yellow-light bg-opacity-60 md:ml-64">
            <Header className="-mx-5 lg:-mx-12 mb-6" />
            <div className="container mx-auto">
              {user.businesses.length > 0 &&
                user.businesses.length > selectedBusiness && (
                  <>
                    <h1 className="text-3xl font-bold mb-6">
                      {user.businesses[selectedBusiness].name}
                    </h1>
                    <div>
                      <BusinessSummary
                        business={user.businesses[selectedBusiness]}
                      />
                    </div>
                  </>
                )}
              {!user.businesses.length && (
                <>
                  <h1 className="text-3xl font-bold mb-3">
                    Create a business to get started
                  </h1>
                  <Button as="a" href="/app/business/create">
                    Create a business
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
