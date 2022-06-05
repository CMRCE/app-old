import * as React from "react";
import cx from "clsx";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.HTMLProps<HTMLSelectElement>
>(
  (
    { className, children, ...props }: React.HTMLProps<HTMLSelectElement>,
    ref
  ) => {
    return (
      <select
        ref={ref}
        data-component="Select"
        className={cx(
          className,
          "w-full border-b-2 outline-none border-gray-300",
          "focus:border-black bg-transparent font-semibold"
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";

export default Select;
