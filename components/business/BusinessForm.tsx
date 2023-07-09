import * as React from "react";
import cx from "clsx";
import TextInput from "../ui/inputs/TextInput";
import { useForm } from "react-hook-form";
import Button from "../ui/inputs/Button";
import Loading from "../ui/icons/Loading";
import { Business, Country, Currency } from "../../types";
import { CreateBusinessParams, useBusiness } from "./BusinessProvider";
import Select from "../ui/inputs/Select";

export default function CreateBusinessForm({
  as: Component = "div",
  className,
  business,
  countries,
  currencies,
  ...props
}: React.HTMLProps<HTMLFormElement> & {
  as?: any;
  countries: Array<Country>;
  currencies: Array<Currency>;
} & { business?: Business }) {
  const { register, handleSubmit } = useForm();
  const { createBusiness, updateBusiness } = useBusiness();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const submit = async (
    data: CreateBusinessParams & {
      selectedCountry: number;
      selectedCurrency: number;
    }
  ) => {
    setErrors([]);
    setIsLoading(true);
    const { selectedCountry, selectedCurrency, ...businessData } = data;
    try {
      if (business) {
        await updateBusiness({
          ...businessData,
          id: business.id,
          country_id: selectedCountry,
          currency_id: selectedCurrency,
        });
        return;
      }
      await createBusiness({
        ...businessData,
        country_id: selectedCountry,
        currency_id: selectedCurrency,
      });
    } catch (error: any) {
      setErrors(error.messages ?? ["There has been an error please try again"]);
    }
    setIsLoading(false);
  };
  return (
    <form
      data-component="CreateBusinessForm"
      className={cx(className)}
      onSubmit={handleSubmit((data) => submit(data as any))}
      {...props}
    >
      <div className="flex flex-wrap">
        <div className="w-full mb-6">
          <label htmlFor="name">Business name</label>
          <TextInput
            defaultValue={business?.name}
            id="name"
            {...register("name")}
            type="text"
            required
          />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="email">Email address</label>
          <TextInput
            defaultValue={business?.email}
            id="email"
            {...register("email")}
            type="email"
            required
          />
        </div>
        <div className="w-1/2 mb-6">
          <label htmlFor="country">Country</label>
          <Select
            required
            defaultValue={business?.country?.id}
            {...register("selectedCountry")}
          >
            <option value="">Select a country</option>
            {countries.map((country, key) => (
              <option key={key} value={country.id}>
                {country.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="w-1/2 mb-6">
          <label htmlFor="currency">Currency</label>
          <Select
            defaultValue={business?.currency.id}
            required
            className="w-full border-b-2 outline-none border-gray-300 focus:border-black bg-transparent font-semibold"
            {...register("selectedCurrency")}
          >
            <option value="">Select a currency</option>
            {currencies.map((currency) => (
              <option key={currency.id} value={currency.id}>
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
          {business ? "Update business" : "Create my business"}
        </Button>
        {isLoading && <Loading play className="h-12 mr-3" />}
      </div>
    </form>
  );
}
