import type { NextPage } from "next";
import Head from "next/head";
import CreatePlanGroupForm from "components/plans/PlanGroupForm";
import DashboardLayout from "components/dashboard/Layout";
import { useRouter } from "next/router";
import { useBusiness } from "components/business/BusinessProvider";

const CreatePlanGroup: NextPage = () => {
  const { push } = useRouter();
  const { business } = useBusiness();
  return (
    <div>
      <Head>
        <title>Create a new Plan Group | OurShop Africa</title>
      </Head>

      <DashboardLayout>
        <h2 className="text-2xl font-bold mb-4">Create a Plan Group</h2>
        <CreatePlanGroupForm
          onSuccess={(planGroup) =>
            push(
              `/plans/create?group=${planGroup.id}${
                business ? `&business=${business.id}` : ""
              }`
            )
          }
        />
      </DashboardLayout>
    </div>
  );
};

export default CreatePlanGroup;
