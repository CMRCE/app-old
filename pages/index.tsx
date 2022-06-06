import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../components/auth/AuthProvider";
import { useBusiness } from "../components/business/BusinessProvider";
import BusinessSummary from "../components/business/BusinessSummary";
import DashboardLayout from "../components/dashboard/Layout";
import Loading from "../components/ui/icons/Loading";
import Button from "../components/ui/inputs/Button";
import Card from "../components/ui/layout/Card";
import { formatMoney } from "../lib/format";

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
                <BusinessSummary className="mb-12" />
                <div className="mb-12">
                  <div className="flex justify-between">
                    <h2 className="text-2xl font-semibold">Subscribers</h2>
                    <Link href="/subscribers">
                      <Button>View all subscribers</Button>
                    </Link>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-3">
                    <h2 className="text-2xl font-semibold">Plans</h2>
                    <Link href="/subscribers">
                      <Button>View all plans</Button>
                    </Link>
                  </div>
                  <Card>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-semibold">Gold Plan</h3>
                        <p className="text-sm">Monthly - 1</p>
                      </div>
                      <h4 className="text-xl font-semibold">{formatMoney(12250, business.currency.code)}</h4>
                    </div>
                    <hr className="border-t-2 border-black my-4 px-3" />
                    <div className="lg:flex justify-between">
                      <p>Active Subscribers - 54</p>
                      <p>Pending Payments - 5</p>
                      <p>Cancellations - 12</p>
                    </div>
                    <div className="mt-9 flex justify-end">
                      <Button>Manage Plan &rsaquo;</Button>
                    </div>
                  </Card>
                </div>
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
