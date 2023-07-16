import * as React from "react";
import cx from "clsx";
import TextInput from "components/ui/inputs/TextInput";
import { useForm } from "react-hook-form";
import Button from "components/ui/inputs/Button";
import Loading from "components/ui/icons/Loading";
import { SubscriptionPlanGroup } from "types";
import Select from "components/ui/inputs/Select";
import { useBusiness } from "components/business/BusinessProvider";
import { useRouter } from "next/router";
import TextArea from "components/ui/inputs/TextArea";
import usePlanGroup from "hooks/usePlanGroup";

export default function CreatePlanGroupForm({
  className,
  planGroup,
  onSuccess,
  ...props
}: React.HTMLProps<HTMLFormElement> & {
  planGroup?: SubscriptionPlanGroup;
  onSuccess?: (planGroup: SubscriptionPlanGroup) => void;
}) {
  const router = useRouter();
  const { register, handleSubmit } = useForm();
  const { business } = useBusiness();
  const { createPlanGroup, updatePlanGroup } = usePlanGroup();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const submit = async (data: any) => {
    if (!business) return;
    const tokenize_for_trial = Boolean(data.tokenize_for_trial);
    const benefits = [data.benefits];
    setErrors([]);
    setIsLoading(true);
    try {
      if (planGroup) {
        const result = await updatePlanGroup({
          ...data,
          tokenize_for_trial,
          benefits,
          business_id: business?.id,
          id: planGroup.id,
        });
        if (result && onSuccess) onSuccess(result);
      } else {
        const result = await createPlanGroup({
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
      data-component="CreatePlanGroupForm"
      className={cx(className)}
      onSubmit={handleSubmit((data) => submit(data as any))}
      {...props}
    >
      <div className="flex flex-wrap">
        <div className="w-full mb-6">
          <label htmlFor="name">Plan name</label>
          <TextInput
            defaultValue={planGroup?.name}
            id="name"
            {...register("name")}
            type="text"
            required
          />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="email">Description</label>
          <TextArea
            defaultValue={planGroup?.description}
            id="description"
            {...register("description")}
            required
          />
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
          {planGroup ? "Update plan group" : "Create my plan group"}
        </Button>
        {isLoading && <Loading play className="h-12 mr-3" />}
      </div>
    </form>
  );
}
