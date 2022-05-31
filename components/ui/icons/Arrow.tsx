import * as React from "react";
import cx from "clsx";

export default function Arrow({
  direction,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { direction: "up" | "down" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      data-component="Arrow"
      className={cx(className, {
        "transform rotate-90": direction === "down",
      })}
      {...props}
    >
      <path
        d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1 2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1z"
        fill="currentColor"
      />
    </svg>
  );
}
