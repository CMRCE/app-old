import * as React from "react";
import cx from "clsx";
import Header from "../ui/layout/Header";
import { useBusiness } from "../business/BusinessProvider";
import Link from "next/link";
import { useRouter } from "next/router";
import Select from "../ui/inputs/Select";
import { useAuth } from "../auth/AuthProvider";
import Image from "next/image";

function SidebarLink({
  className,
  href,
  text,
  ...props
}: React.HTMLProps<HTMLAnchorElement> & { href: string; text: string }) {
  const { pathname } = useRouter();
  return (
    <Link href={href}>
      <a
        className={cx("py-3 px-6 hover:bg-slate-500", {
          "bg-white hover:bg-white text-black": pathname === href,
        })}
        {...props}
      >
        {text}
      </a>
    </Link>
  );
}

function Sidebar({
  as: Component = "div",
  className,
  ...props
}: React.HTMLProps<HTMLDivElement> & { as?: any }) {
  const { user } = useAuth();
  const { business } = useBusiness();
  return (
    <Component className={cx(className)} {...props}>
      <aside
        className={cx(
          "bg-slate-900 text-white",
          "md:left-0 md:block md:fixed md:top-0 md:bottom-0",
          "md:overflow-y-auto md:flex-row md:flex-nowrap",
          "md:overflow-hidden shadow-xl",
          "flex flex-wrap items-center justify-between",
          "relative md:w-64 z-10 py-4 px-6",
        )}
      >
        <Image
          width={48}
          height={48}
          className="rounded-full w-12 mb-2"
          src={business?.logo ?? "https://services.etin.space/ourshop_placeholder.png"}
          alt={`${business?.name} logo`}
        />
        <h3 className="text-2xl font-bold mb-3">Dashboard</h3>
        <div>
          <Select className="focus:border-b-white mb-6" defaultValue={business?.id}>
            {user?.businesses.map((business, key) => (
              <option key={key} value={business.id}>
                {business.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-6">
          <h4 className="text-xl font-semibold pb-2 border-b mb-2">General</h4>
          <div className="flex flex-col -mx-6">
            <SidebarLink href="/" text="Business Summary" />
            <SidebarLink href="/business/create" text="New Business" />
            <SidebarLink href={`/business/${business?.id}`} text="Manage Business" />
            <SidebarLink href="/users" text="Manage Users" />
          </div>
        </div>

        <div className="">
          <h4 className="text-xl font-semibold pb-2 border-b mb-2">Business</h4>
          <div className="flex flex-col -mx-6">
            <SidebarLink href="/plans/create" text="New Plan" />
            <SidebarLink href="/plans" text="Manage Plans" />
            <SidebarLink href="/payment" text="Payment Info" />
          </div>
        </div>
      </aside>
    </Component>
  );
}

export default function DashboardLayout({
  as: Component = "div",
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement> & { as?: any }) {
  return (
    <Component
      data-component="DashboardLayout"
      className={cx(className)}
      {...props}
    >
      <Sidebar />
      <div className="min-h-screen px-5 lg:px-12 relative bg-brand-yellow-light bg-opacity-60 md:ml-64">
        <Header className="-mx-5 lg:-mx-12 mb-6" />
        <div className="container mx-auto">{children}</div>
      </div>
    </Component>
  );
}