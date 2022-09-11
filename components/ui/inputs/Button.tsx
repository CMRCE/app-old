import * as React from "react";
import cx from "clsx";

type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
  as?: any;
  variant?: "primary" | "secondary" | "outline-primary" | "outline-secondary";
};

function Button({
  as: Component = "button",
  variant = "primary",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <Component
      data-component="Button"
      className={cx(
        className,
        "text-sm font-semibold",
        "hover:text-opacity-60 hover:bg-gray-80",
        {
          "bg-black border p-2 rounded-md border-black text-white":
            variant === "primary",
          "bg-brand-yellow p-2 rounded-md border-black border text-black":
            variant === "secondary",
          "bg-transparent rounded-none px-1 pb-0 border-b border-black text-black":
            variant === "outline-primary",
          "bg-transparent rounded-none px-1 pb-0 border-b border-brand-yellow text-yellow":
            variant === "outline-secondary",
        }
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export default React.forwardRef<HTMLButtonElement, ButtonProps>(Button);
