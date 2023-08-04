import * as React from "react";
import cx from "clsx";
import TextInput from "components/ui/inputs/TextInput";
import { useForm } from "react-hook-form";
import Button from "components/ui/inputs/Button";
import Loading from "components/ui/icons/Loading";
import {
  SubscriptionPlan,
  Currency,
  SubscriptionPlanGroup,
  CreateSubscriptionPlan,
  Nullable,
} from "types";
import Select from "components/ui/inputs/Select";
import usePlan from "hooks/usePlan";
import { useBusiness } from "components/business/BusinessProvider";
import TextArea from "components/ui/inputs/TextArea";
import usePlanGroup from "hooks/usePlanGroup";
import InputCard from "components/ui/layout/InputCard";

const FormStatus = [
  "name",
  "benefits",
  "duration",
  "trial",
  "price",
  "groups",
] as const;

type PlanFormState = {
  plan: Nullable<CreateSubscriptionPlan>;
  error: Array<{ id: string; message: string }>;
  status: (typeof FormStatus)[number];
};

type PlanFormAction =
  | {
      type: "continue";
      payload: Omit<PlanFormState, "error" | "plan"> & {
        plan: Partial<CreateSubscriptionPlan>;
      };
    }
  | {
      type: "back";
    }
  | {
      type: "submit";
    };

function planReducer(
  state: PlanFormState,
  action: PlanFormAction
): PlanFormState {
  switch (action.type) {
    case "continue":
      return {
        ...state,
        plan: {
          ...state.plan,
          ...action.payload.plan,
        },
        status: action.payload.status,
      };
      break;

    default:
      break;
  }
  return state;
}

export default function CreatePlanForm({
  className,
  plan: existingPlan,
  currencies,
  groupId,
  onSuccess,
  ...props
}: React.HTMLProps<HTMLFormElement> & {
  currencies: Array<Currency>;
  plan?: SubscriptionPlan;
  groupId?: number;
  onSuccess?: (plan: SubscriptionPlan) => void;
}) {
  const { register, handleSubmit } = useForm();
  const { business } = useBusiness();
  const { createPlan, updatePlan } = usePlan();
  const { getAllPlanGroups } = usePlanGroup();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const [planGroups, setPlanGroups] = React.useState<SubscriptionPlanGroup[]>();

  const [formState, dispatchUpdatedFormState] = React.useReducer(planReducer, {
    plan: {
      name: existingPlan?.name,
      description: existingPlan?.description,
      price: existingPlan?.price,
      benefits: existingPlan?.benefits,
      duration_type: existingPlan?.duration_type,
      duration_length: existingPlan?.duration_length,
      trial_duration_type: existingPlan?.trial_duration_type,
      trial_duration_length: existingPlan?.trial_duration_length,
      tokenize_for_trial: existingPlan?.tokenize_for_trial,
      currency: existingPlan?.currency.code,
    },
    error: [],
    status: FormStatus[0],
  });

  const formStatus = formState.status;
  const plan = formState.plan;

  React.useEffect(() => {
    (async () => {
      if (business) {
        const plangroups = await getAllPlanGroups({ business_id: business.id });
        plangroups ? setPlanGroups(plangroups) : null;
      }
    })();
  }, [business, getAllPlanGroups]);

  const submit = async (data: any) => {
    if (!business) return;
    const tokenize_for_trial = Boolean(data.tokenize_for_trial);
    const benefits = [data.benefits];
    setErrors([]);
    setIsLoading(true);
    try {
      if (existingPlan) {
        const result = await updatePlan({
          ...data,
          tokenize_for_trial,
          benefits,
          business_id: business?.id,
          id: existingPlan.id,
        });
        if (result && onSuccess) onSuccess(result);
      } else {
        const result = await createPlan({
          ...data,
          tokenize_for_trial,
          benefits,
          business_id: business.id,
        });
        if (result && onSuccess) onSuccess(result);
      }
    } catch (error: any) {
      setErrors(error.messages ?? ["There has been an error please try again"]);
    }
    setIsLoading(false);
  };

  return (
    <form
      data-component="CreatePlanForm"
      className={cx(className)}
      onSubmit={handleSubmit((data) => {
        const formStatusIndex = FormStatus.findIndex((s) => s === formStatus);
        if (
          formStatusIndex === -1 ||
          formStatusIndex !== FormStatus.length - 1
        ) {
          dispatchUpdatedFormState({
            type: "continue",
            payload: { plan: data, status: FormStatus[formStatusIndex + 1] },
          });
          return;
        } else {
          dispatchUpdatedFormState({ type: "submit" });
        }
        submit(data as any);
      })}
      {...props}
    >
      <div className="flex flex-wrap">
        {formStatus === "name" && (
          <>
            <InputCard>
              <label htmlFor="name">Plan name</label>
              <TextInput
                defaultValue={plan?.name}
                id="name"
                {...register("name")}
                type="text"
                required
              />
            </InputCard>
            <InputCard>
              <label htmlFor="email">Description</label>
              <TextArea
                defaultValue={plan?.description}
                id="description"
                {...register("description")}
                required
              />
            </InputCard>
          </>
        )}
        {formStatus === "benefits" && (
          <>
            <InputCard>
              <label htmlFor="name">Plan benefits</label>
              <TextInput
                defaultValue={plan?.benefits?.[0]}
                id="benefits"
                {...register("benefits")}
                type="text"
                required
              />
            </InputCard>
          </>
        )}
        {formStatus === "duration" && (
          <>
            <InputCard>
              <label htmlFor="duration_type">Duration type</label>
              <Select
                required
                defaultValue={plan?.duration_type}
                id="duration_type"
                {...register("duration_type")}
              >
                <option value="">Select a duration type</option>
                {["Monthly", "Weekly", "Daily"].map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </Select>
            </InputCard>
            <InputCard>
              <label htmlFor="duration_length">Duration length</label>
              <TextInput
                defaultValue={plan?.duration_length}
                id="duration_length"
                {...register("duration_length")}
                type="number"
                required
              />
            </InputCard>
          </>
        )}
        {formStatus === "trial" && (
          <>
            <InputCard>
              <label htmlFor="trial_duration_type">Trial duration type</label>
              <Select
                required
                defaultValue={plan?.trial_duration_type}
                id="trial_duration_type"
                {...register("trial_duration_type")}
              >
                <option value="">Select a trial duration type</option>
                {["Monthly", "Weekly", "Daily"].map((type) => (
                  <option key={type} value={type.toLowerCase()}>
                    {type}
                  </option>
                ))}
              </Select>
            </InputCard>
            <InputCard>
              <label htmlFor="trial_duration_length">
                Trial duration length
              </label>
              <TextInput
                defaultValue={plan?.trial_duration_length}
                id="trial_duration_length"
                {...register("trial_duration_length")}
                type="number"
                required
              />
            </InputCard>
            <InputCard>
              <label htmlFor="trial_duration_length">Tokenize for trial</label>
              <div className="grid grid-cols-2">
                <div className="flex">
                  <label htmlFor="tokenize_for_trial--yes">Yes</label>
                  <TextInput
                    className="accent-black"
                    defaultChecked={plan?.tokenize_for_trial}
                    id="tokenize_for_trial--yes"
                    {...register("tokenize_for_trial")}
                    type="radio"
                    value="true"
                    required
                  />
                </div>
                <div className="flex">
                  <label htmlFor="tokenize_for_trial--no">No</label>
                  <TextInput
                    className="accent-black"
                    defaultChecked={!plan?.tokenize_for_trial}
                    id="tokenize_for_trial--no"
                    {...register("tokenize_for_trial")}
                    type="radio"
                    value=""
                    required
                  />
                </div>
              </div>
            </InputCard>
          </>
        )}
        {formStatus === "price" && (
          <>
            <InputCard>
              <label htmlFor="price">Price</label>
              <TextInput
                defaultValue={plan?.price}
                id="price"
                {...register("price")}
                type="number"
                required
              />
            </InputCard>
            <InputCard>
              <label htmlFor="currency">Currency</label>
              <Select
                defaultValue={plan?.currency}
                required
                className="w-full border-b-2 outline-none border-gray-300 focus:border-black bg-transparent font-semibold"
                id="currency"
                {...register("currency")}
              >
                <option value="">Select a currency</option>
                {currencies.map((currency) => (
                  <option key={currency.id} value={currency.code}>
                    {currency.name} - {currency.code}
                  </option>
                ))}
              </Select>
            </InputCard>
          </>
        )}
        {formStatus === "groups" && (
          <>
            {planGroups && (
              <InputCard>
                <label htmlFor="currency">Add to Plan Group</label>
                <Select
                  defaultValue={groupId}
                  required
                  id="group"
                  {...register("group")}
                >
                  <option value="">Select a plan group</option>
                  {planGroups.map((group, key) => (
                    <option key={key} value={group.id}>
                      {group.name}
                    </option>
                  ))}
                </Select>
              </InputCard>
            )}
          </>
        )}
      </div>
      <div className="mb-3">
        {errors.map((error, key) => (
          <p key={key} className="text-sm text-red-500">
            {error}
          </p>
        ))}
      </div>
      <div className="mb-6 flex items-center justify-between">
        <Button type="submit" as="button" variant="primary">
          {formStatus !== "groups"
            ? "Next"
            : existingPlan
            ? "Update plan"
            : "Create my plan"}
        </Button>
        {isLoading && <Loading play className="h-12 mr-3" />}
      </div>
    </form>
  );
}
