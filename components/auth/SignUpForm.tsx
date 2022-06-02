import * as React from "react";
import cx from "clsx";
import TextInput from "../ui/inputs/TextInput";
import { useForm } from "react-hook-form";
import { SignUpParams, useAuth } from "./AuthProvider";
import Button from "../ui/inputs/Button";
import Loading from "../ui/icons/Loading";
import { Country } from "../../types";

export default function SignUpForm({
  as: Component = "div",
  className,
  children,
  countries,
  ...props
}: React.HTMLProps<HTMLFormElement> & { as?: any; countries: Array<Country> }) {
  const { register, handleSubmit } = useForm();
  const { signup } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [selectedCountry, setSelectedCountry] = React.useState<Country>();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);

  const toggleShowPassword = () => {
    setShowPassword((state) => !state);
  };

  const onCountrySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const index = parseInt(e.currentTarget.value);
    setSelectedCountry(countries[index]);
    register("selectedCountry").onChange(e);
  };

  const submit = async (data: SignUpParams & { selectedCountry: number }) => {
    setErrors([]);
    setIsLoading(true);
    const { selectedCountry, ...signupData } = data;
    try {
      await signup({
        ...signupData,
        dialing_code: countries[selectedCountry].dialing_code,
      });
    } catch (error: any) {
      setErrors(error.messages ?? ["There has been an error please try again"]);
    }
    setIsLoading(false);
  };
  return (
    <form
      data-component="SignUpForm"
      className={cx(className)}
      onSubmit={handleSubmit((data) => submit(data as any))}
      {...props}
    >
      <div className="flex flex-wrap">
        <div className="w-1/2 mb-6">
          <label htmlFor="first_name">First name</label>
          <TextInput
            id="first_name"
            {...register("first_name")}
            type="text"
            required
          />
        </div>
        <div className="w-1/2 mb-6">
          <label htmlFor="last_name">Last name</label>
          <TextInput
            id="last_name"
            {...register("last_name")}
            type="text"
            required
          />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="email">Email address</label>
          <TextInput id="email" {...register("email")} type="email" required />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="country">Country</label>
          <select
            required
            className="w-full border-b-2 outline-none border-gray-300 focus:border-black font-semibold"
            {...register("selectedCountry")}
            onChange={onCountrySelect}
          >
            <option value="">Select a country</option>
            {countries.map((country, key) => (
              <option key={key} value={key}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full">
          <label htmlFor="mobile">Phone number</label>
        </div>
        <div className="w-1/4 mb-6 text-center font-semibold">
          {selectedCountry?.id ? `+${selectedCountry.dialing_code}` : "-"}
        </div>
        <div className="w-3/4 mb-6">
          <TextInput id="mobile" {...register("mobile")} type="text" required />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="password">Password</label>
          <TextInput
            id="password"
            {...register("password")}
            type={showPassword ? "text" : "password"}
            required
          />
          <button type="button" className="font-semibold mt-2" onClick={toggleShowPassword}>
            {showPassword ? "Hide" : "Show"} password
          </button>
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
          Create my account
        </Button>
        {isLoading && <Loading play className="h-12 mr-3" />}
      </div>
    </form>
  );
}
