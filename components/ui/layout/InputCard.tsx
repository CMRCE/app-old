import * as React from "react";
import cx from "clsx";

export default function InputCard({
  as: Component = "div",
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement> & { as?: any }) {
  return (
    <Component
      data-component="InputCard"
      className={cx(
        className,
        "bg-white w-full mb-6 p-6",
        "border-2 border-transparent",
        "transition-colors ease-linear delay-150 focus-within:border-black"
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
