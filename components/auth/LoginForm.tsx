import * as React from "react";
import cx from "clsx";
import TextInput from "../ui/inputs/TextInput";
import { useForm } from "react-hook-form";
import { useAuth } from "./AuthProvider";
import Button from "../ui/inputs/Button";
import Loading from "../ui/icons/Loading";

type LoginParams = { email: string; password: string };

export default function LoginForm({
  as: Component = "div",
  className,
  children,
  ...props
}: React.HTMLProps<HTMLFormElement> & { as?: any }) {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<Array<string>>([]);
  const submit = async (data: LoginParams) => {
    setErrors([]);
    setIsLoading(true);
    try {
      await login({ ...data });
    } catch (error: any) {
      setErrors(error.messages ?? ["There has been an error please try again"]);
    }
    setIsLoading(false);
  };
  return (
    <form
      data-component="LoginForm"
      className={cx(className)}
      onSubmit={handleSubmit((data)  => submit(data as LoginParams))}
      {...props}
    >
      <div className="flex flex-wrap">
        <div className="w-full mb-6">
          <label htmlFor="email">Email address</label>
          <TextInput id="email" {...register("email")} type="email" required />
        </div>
        <div className="w-full mb-6">
          <label htmlFor="password">Password</label>
          <TextInput
            id="password"
            {...register("password")}
            type="password"
            required
          />
        </div>
      </div>
      <div className="mb-3">
        {errors.map((error, key) => (
          <p className="text-sm text-red-500">{error}</p>
        ))}
      </div>
      <div className="mb-6 flex items-center justify-between">
        <Button type="submit" as="button" variant="primary">
          Sign in
        </Button>
        {isLoading && <Loading play className="h-12 mr-3" />}
      </div>
    </form>
  );
}
