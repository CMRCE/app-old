import * as React from "react";
import cx from "clsx";

export default function Card({
  as: Component = "div",
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement> & { as?: any }) {
  return (
    <Component
      data-component="Card"
      className={cx(className, "bg-white p-4 shadow-sm")}
      {...props}
    >
      {children}
    </Component>
  );
}
