import * as React from "react";
import cx from "clsx";
import { Business } from "../../types";
import { formatMoney, formatPercentageChange } from "../../lib/format";

export const SummaryCard: React.FC<
  Omit<React.HTMLProps<HTMLDivElement>, "title"> & {
    as?: any;
    title: React.ReactNode;
    percentageChange: number;
    currentValue: React.ReactNode;
  }
> = ({
  as: Component = "div",
  className,
  title,
  percentageChange,
  currentValue,
  ...props
}) => {
  return (
    <Component className={cx(className)} {...props}>
      <div className="bg-white p-4 shadow-sm">
        <div className="w-3/5">
          <p className="text-base md:text-xl xl:text-2xl">{title}</p>
        </div>
        <div className="flex justify-between items-end">
          <div className="text-base md:text-xl xl:text-2xl">
            <span
              className={cx("font-semibold text-2xl md:text-4xl", {
                "text-green-500": percentageChange > 0,
                "text-black": percentageChange === 0,
                "text-red-500": percentageChange < 0,
              })}
            >
              {percentageChange > 0 && <>&uarr;</>}
              {percentageChange === 0 && <>-</>}
              {percentageChange < 0 && <>&darr;</>}
            </span>{" "}
            {formatPercentageChange(percentageChange, true)}
          </div>
          <div>
            <h3 className="font-semibold text-xl md:text-3xl lg:text-5xl xl:text-6xl">{currentValue}</h3>
          </div>
        </div>
      </div>
    </Component>
  );
};

export default function BusinessSummary({
  className,
  business,
  ...props
}: React.HTMLProps<HTMLDivElement> & { business: Business }) {
  return (
    <div data-component="BusinessSummary" className={cx(className)} {...props}>
      <div className="flex justify-between my-3">
        <p>This month - {"July 2021"}</p>
        <p>Click on a card for more details</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          title={
            <>
              Active <br className="hidden md:inline" />
              Subscriptions
            </>
          }
          percentageChange={6.3478}
          currentValue={25}
        />
        <SummaryCard
          title={
            <>
              Pending <br className="hidden md:inline" />
              Payments
            </>
          }
          percentageChange={-10.1679}
          currentValue={3}
        />
        <SummaryCard
          title={
            <>
              Cancelled <br className="hidden md:inline" />
              Subscriptions
            </>
          }
          percentageChange={-50}
          currentValue={10}
        />

        <SummaryCard
          className="col-span-2 order-last lg:order-none"
          title={
            <>
              Total <br className="hidden md:inline" />
              Revenue
            </>
          }
          percentageChange={13.658}
          currentValue={formatMoney(13600, business.currency.code)}
        />
        <SummaryCard
          title={
            <>
              Subscriber <br className="hidden md:inline" />
              Actions
            </>
          }
          percentageChange={0}
          currentValue={0}
        />
      </div>
    </div>
  );
}
