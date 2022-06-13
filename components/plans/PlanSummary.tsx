import * as React from "react";
import cx from "clsx";
import Card from "../ui/layout/Card";
import { formatMoney } from "../../lib/format";
import Button from "../ui/inputs/Button";
import Link from "next/link";

export default function PlanSummary({
  as: Component = "div",
  className,
  plan,
  ...props
}: React.HTMLProps<HTMLDivElement> & { as?: any; plan: any }) {
  return (
    <Component
      data-component="PlanSummary"
      className={cx(className)}
      {...props}
    >
      <Card>
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-sm">{plan.interval.name} - {plan.interval.duration}</p>
          </div>
          <h4 className="text-xl font-semibold">
            {formatMoney(plan.price, plan.currency.code)}
          </h4>
        </div>
        <hr className="border-t-2 border-black my-4 px-3" />
        <div className="lg:flex justify-between">
          <p>Active Subscribers - {plan.active_subscribers}</p>
          <p>Pending Payments - {plan.pending_payments}</p>
          <p>Cancellations - {plan.cancellations}</p>
        </div>
        <div className="mt-9 flex justify-end">
          <Link href={`/plan/${plan.id}`}>
            <Button>Manage Plan &rsaquo;</Button>
          </Link>
        </div>
      </Card>
    </Component>
  );
}
