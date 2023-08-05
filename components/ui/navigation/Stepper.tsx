import * as React from "react";
import cx from "clsx";

type StepperProps = React.HTMLProps<HTMLDivElement> & {
  as?: any;
  steps: number;
  currentStep: number;
};

function Stepper(
  {
    as: Component = "div",
    className,
    steps,
    currentStep,
    ...props
  }: StepperProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const items = Array.from(Array(steps), (_, i) => i + 1);
  return (
    <Component
      ref={ref}
      data-component="Stepper"
      className={cx(className, "relative")}
      {...props}
    >
      <ul className="flex flex-wrap list-none">
        {items.map((i) => (
          <li
            key={i}
            className={cx(
              "flex mx-auto items-center justify-center w-9 h-9 rounded-full border",
              {
                "bg-gray-100 text-gray-400 border-gray-300": currentStep < i,
                "bg-black border-white text-white": currentStep > i,
                "bg-white border-black": currentStep === i,
              }
            )}
          >
            {i}
          </li>
        ))}
      </ul>
      <span
        className={cx(
          "absolute z-[-1] top-1/2 -translate-y-1/2",
          "w-full h-0.5 bg-black"
        )}
      />
    </Component>
  );
}

export default React.forwardRef<HTMLDivElement, StepperProps>(Stepper);
