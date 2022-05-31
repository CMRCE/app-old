import * as React from "react";
import cx from "clsx";

export default function Loading({
  play,
  className,
  ...props
}: React.SVGProps<SVGSVGElement> & { play: boolean }) {
  return (
    <>
      {play && (
        <svg
          data-component="Loading"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: "block", shapeRendering: "auto" }}
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          {...props}
        >
          <circle cx="25" cy="50" fill="#f4d35e" r="25">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.5;1"
              values="25;75;25"
              begin="-0.6578947368421053s"
            />
          </circle>
          <circle cx="75" cy="50" fill="#000000" r="25">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.5;1"
              values="25;75;25"
              begin="0s"
            />
          </circle>
          <circle cx="25" cy="50" fill="#f4d35e" r="25">
            <animate
              attributeName="cx"
              repeatCount="indefinite"
              dur="1.3157894736842106s"
              keyTimes="0;0.5;1"
              values="25;75;25"
              begin="-0.6578947368421053s"
            />
            <animate
              attributeName="fill-opacity"
              values="0;0;1;1"
              calcMode="discrete"
              keyTimes="0;0.499;0.5;1"
              dur="1.3157894736842106s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      )}
      {!play && (
        <svg
          data-component="Loading"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          style={{ display: "block", animationPlayState: "paused" }}
          {...props}
        >
          <circle
            cx="74.99996185302734"
            cy="50"
            fill="#f4d35e"
            r="25"
            style={{ animationPlayState: "paused" }}
          />

          <circle
            cx="25"
            cy="50"
            fill="#000000"
            r="25"
            style={{ animationPlayState: "paused" }}
          />

          <circle
            cx="74.99996185302734"
            cy="50"
            fill="#f4d35e"
            r="25"
            fill-opacity="0"
            style={{ animationPlayState: "paused" }}
          />
        </svg>
      )}
    </>
  );
}
