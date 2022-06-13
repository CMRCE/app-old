import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../components/auth/AuthProvider";
import { useBusiness } from "../components/business/BusinessProvider";
import BusinessSummary from "../components/business/BusinessSummary";
import DashboardLayout from "../components/dashboard/Layout";
import PlanSummary from "../components/plans/PlanSummary";
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
                  <div className="space-y-3">
                    <PlanSummary
                      plan={{
                        id: "123",
                        name: "Gold Plan",
                        price: 12500,
                        interval: {
                          name: "Monthly",
                          duration: 1,
                        },
                        active_subscribers: 54,
                        pending_payments: 5,
                        cancellations: 12,
                        currency: business.currency,
                      }}
                    />
                    <PlanSummary
                      plan={{
                        id: "124",
                        name: "Silver Plan",
                        price: 8500,
                        interval: {
                          name: "Monthly",
                          duration: 1,
                        },
                        active_subscribers: 174,
                        pending_payments: 29,
                        cancellations: 56,
                        currency: business.currency,
                      }}
                    />
                    <PlanSummary
                      plan={{
                        id: "127",
                        name: "Bronze Plan",
                        price: 5000,
                        interval: {
                          name: "Monthly",
                          duration: 1,
                        },
                        active_subscribers: 92,
                        pending_payments: 18,
                        cancellations: 8,
                        currency: business.currency,
                      }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {!user.businesses.length && (
            <>
              <h1 className="text-3xl font-bold mb-3">
                Create a business to get started
              </h1>
              <p className="text-xl font-bold mb-3">
                Get started with collecting recurring revenue from your
                customers. Create a business to begin offering subscriptions
                now.
              </p>
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
