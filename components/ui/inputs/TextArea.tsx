import * as React from "react";
import cx from "clsx";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.HTMLProps<HTMLTextAreaElement>
>(
  (
    { className, children, ...props }: React.HTMLProps<HTMLTextAreaElement>,
    ref
  ) => {
    return (
      <textarea
        ref={ref}
        data-component="TextTextArea"
        className={cx(
          className,
          "block w-full border-b-2 outline-none border-gray-300 focus:border-black bg-transparent font-semibold"
        )}
        {...props}
      />
    );
  }
);
TextArea.displayName = "TextTextArea";

export default TextArea;
