import * as React from "react";
import cx from "clsx";

export default function Hamburger({
  expanded,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { expanded: boolean }) {
  return (
    <svg
      data-component="Hamburger"
      className={cx(className)}
      viewBox="-12 -12 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="square"
      {...props}
    >
      <path
        d="M-11 0h22"
        stroke="currentColor"
        className={cx("transition-transform duration-200")}
        transform={expanded ? "rotate(45) rotate(180)" : "translate(0 -6)"}
      />
      <path
        d="M-11 0h22"
        stroke="currentColor"
        className={cx("transition-opacity duration-200", {
          "opacity-0": expanded,
        })}
      />
      <path
        d="M-11 0h22"
        stroke="currentColor"
        className={cx("transition-transform duration-200")}
        transform={expanded ? "rotate(-45) rotate(-180)" : "translate(0 6)"}
      />
    </svg>
  );
}
