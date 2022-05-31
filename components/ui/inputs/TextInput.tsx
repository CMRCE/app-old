import * as React from "react";
import cx from "clsx";

const TextInput = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement>
>(
  (
    { className, children, ...props }: React.HTMLProps<HTMLInputElement>,
    ref
  ) => {
    return (
      <input
        ref={ref}
        data-component="TextInput"
        className={cx(
          className,
          "block w-full border-b-2 outline-none border-gray-300 focus:border-black font-semibold"
        )}
        {...props}
      />
    );
  }
);

export default TextInput;
