import * as React from "react";
import cx from "clsx";
import TextInput from "../ui/inputs/TextInput";
import { useForm } from "react-hook-form";
import Button from "../ui/inputs/Button";
import Loading from "../ui/icons/Loading";
import { SubscriptionPlan, Currency } from "../../types";
import Select from "../ui/inputs/Select";
import usePlan, { CreatePlanParams } from "../../hooks/usePlan";
import { useBusiness } from "../business/BusinessProvider";
import TextArea from "../ui/inputs/TextArea";

export default function CreatePlanForm({
  className,
  plan,
  currencies,
  onSuccess,
  ...props
}: React.HTMLProps<HTMLFormElement> & {
  currencies: Array<Currency>;
  plan?: SubscriptionPlan;
  onSuccess?: (plan: SubscriptionPlan) => void;
}) {
  const { register, handleSubmit } = useForm();
  const { business } = useBusiness();
  const { createPlan, updatePlan } = usePlan();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const submit = async (data: any) => {
    if (!business) return;
    const tokenize_for_trial = Boolean(data.tokenize_for_trial);
    const benefits = [data.benefits];
    setErrors([]);
    setIsLoading(true);
    try {
      if (plan) {
        const result = await updatePlan({
          ...data,
          tokenize_for_trial,
          benefits,
          business_id: business?.id,
          id: plan.id,
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
      onSubmit={handleSubmit((data) => submit(data as any))}
      {...props}
    >
      <div className="flex flex-wrap">
        <div className="w-full mb-6">
          <label htmlFor="name">Plan name</label>
          <TextInput
            defaultValue={plan?.name}
            id="name"
            {...register("name")}
            type="text"
            required
          />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="email">Description</label>
          <TextArea
            defaultValue={plan?.description}
            id="description"
            {...register("description")}
            required
          />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="name">Plan benefits</label>
          <TextInput
            defaultValue={plan?.benefits?.[0]}
            id="benefits"
            {...register("benefits")}
            type="text"
            required
          />
        </div>
        <div className="w-1/2 mb-6">
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
        </div>
        <div className="w-full mb-6">
          <label htmlFor="duration_length">Duration length</label>
          <TextInput
            defaultValue={plan?.duration_length}
            id="duration_length"
            {...register("duration_length")}
            type="number"
            required
          />
        </div>
        <div className="w-1/2 mb-6">
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
        </div>
        <div className="w-full mb-6">
          <label htmlFor="trial_duration_length">Trial duration length</label>
          <TextInput
            defaultValue={plan?.trial_duration_length}
            id="trial_duration_length"
            {...register("trial_duration_length")}
            type="number"
            required
          />
        </div>
        <div className="w-full mb-6">
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
        </div>
        <div className="w-full mb-6">
          <label htmlFor="price">Price</label>
          <TextInput
            defaultValue={plan?.price}
            id="price"
            {...register("price")}
            type="number"
            required
          />
        </div>
        <div className="w-1/2 mb-6">
          <label htmlFor="currency">Currency</label>
          <Select
            defaultValue={plan?.currency?.id}
            required
            className="w-full border-b-2 outline-none border-gray-300 focus:border-black bg-transparent font-semibold"
            id="currency"
            {...register("currency")}
          >
            <option value="">Select a currency</option>
            {currencies.map((currency, key) => (
              <option key={key} value={currency.id}>
                {currency.name} - {currency.code}
              </option>
            ))}
          </Select>
        </div>
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
          {plan ? "Update plan" : "Create my plan"}
        </Button>
        {isLoading && <Loading play className="h-12 mr-3" />}
      </div>
    </form>
  );
}
