import * as React from "react";
import cx from "clsx";
import { Subscriber } from "../../types";
import Link from "next/link";
import Button from "../ui/inputs/Button";

export default function SubscriberList({
  as: Component = "div",
  className,
  subscribers,
  ...props
}: React.HTMLProps<HTMLDivElement> & {
  as?: any;
  subscribers: Array<Subscriber>;
}) {
  return (
    <Component
      data-component="SubscriberList"
      className={cx(className)}
      {...props}
    >
      <table className="table-fixed w-full text-left">
        <thead>
          <tr>
            <th className="py-3 pl-3 w-2/6">Name</th>
            <th className="py-3">Amount</th>
            <th className="py-3">Plan</th>
            <th className="py-3">Date</th>
            <th className="py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {subscribers.map((subscriber) => (
            <tr className="odd:bg-white even:bg-slate-100" key={subscriber.id}>
              <td className="py-3 pl-3 w-2/6">{subscriber.name}</td>
              <td className="py-3">{subscriber.total_spend}</td>
              <td className="py-3">{subscriber.current_plan.name}</td>
              <td className="py-3">{subscriber.subscribed_at}</td>
              <td className="py-3">
                <Link href={`/subscribers/${subscriber.id}`}>
                  <Button href={`/subscribers/${subscriber.id}`} as="a" variant="outline-primary">View more</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Component>
  );
}
