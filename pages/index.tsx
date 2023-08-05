import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useAuth } from "../components/auth/AuthProvider";
import { useBusiness } from "../components/business/BusinessProvider";
import BusinessSummary from "../components/business/BusinessSummary";
import DashboardLayout from "../components/dashboard/Layout";
import PlanSummary from "../components/plans/PlanSummary";
import SubscriberList from "../components/subscribers/SubscriberList";
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
                <BusinessSummary className="mb-12" />
                <div className="mb-12">
                  <div className="flex flex-wrap gap-y-2 justify-between mb-6">
                    <h2 className="text-2xl font-semibold">Subscribers</h2>
                    <Link href="/subscribers">
                      <Button as="a" href="/plans">View all subscribers</Button>
                    </Link>
                  </div>
                  <SubscriberList subscribers={business.subscribers} />
                </div>
                <div>
                  <div className="flex flex-wrap gap-y-2 justify-between mb-3">
                    <h2 className="text-2xl font-semibold">Plans</h2>
                    <div className="space-x-3">
                      <Link href="/plans/create">
                        <Button variant="secondary">Add plan +</Button>
                      </Link>
                      <Link href="/plans">
                        <Button as="a" href="/plans">View all plans</Button>
                      </Link>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {business.plans.length === 0 ? (
                      <p>
                        No plans created yet.{" "}
                        <Link href="/plans/create">
                          <a className="underline font-semibold">
                            Get started by creating your first plan
                          </a>
                        </Link>
                      </p>
                    ) : (
                      <>
                        {business.plans.map((plan) => (
                          <PlanSummary key={plan.id} plan={plan} />
                        ))}
                      </>
                    )}
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
