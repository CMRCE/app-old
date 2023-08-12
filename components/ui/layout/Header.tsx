import * as React from "react";
import cx from "clsx";
import { Logomark, Textmark } from "../icons/Logo";
import Hamburger from "../icons/Hamburger";
import { useAuth } from "../../auth/AuthProvider";
import Button from "../inputs/Button";
import Link from "next/link";
import { useRouter } from "next/router";

const LinkItem = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLProps<HTMLAnchorElement> & { as?: any; active?: boolean }
>(({ as: Component = "a", active, className, children, ...props }, ref) => (
  <Component
    ref={ref}
    className={cx(
      className,
      "font-semibold cursor-pointer mb-6 md:mb-0 md:mr-5 hover:text-gray-900",
      {
        "text-gray-600": !active,
        "text-black border-b border-black": active,
      }
    )}
    {...props}
  >
    {children}
  </Component>
));

LinkItem.displayName = "LinkItem";

const NavItems: React.FC<React.HTMLProps<HTMLDivElement>> = () => {
  const { isLoggedIn, loading, logout } = useAuth();
  const { pathname } = useRouter();
  return (
    <>
      {isLoggedIn && !loading && (
        <>
          <Link href="/">
            <LinkItem active={pathname === "/"}>Dashboard</LinkItem>
          </Link>
          <Link href="/">
            <LinkItem active={pathname.includes("/notifications")}>
              Notifications
            </LinkItem>
          </Link>
          <Link href="/">
            <LinkItem active={pathname.includes("/account")}>Account</LinkItem>
          </Link>
          <LinkItem as="button" onClick={logout}>
            Log out
          </LinkItem>
        </>
      )}
      {!isLoggedIn && !loading && (
        <>
          <Link href="/app/auth/login/">
            <LinkItem>Log in</LinkItem>
          </Link>
          <Link href="/app/auth/signup/">
            <Button>Create a new account</Button>
          </Link>
        </>
      )}
    </>
  );
};

export default function Header({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement> & {}) {
  const [isMobileMenuExpanded, expandMobileMenu] = React.useState(false);
  return (
    <>
      <header
        data-component="Header"
        className={cx(className, "bg-white fixed w-full lg:w-[calc(100%-256px)] z-30 body-font")}
        {...props}
      >
        <div
          className={cx(
            "container mx-auto",
            "flex flex-row",
            "md:items-center justify-between",
            "px-5 lg:px-12 py-2 md:py-5"
          )}
        >
          <Link href="/">
            <a
              onClick={() => expandMobileMenu(false)}
              className="flex title-font font-medium items-center text-gray-900"
            >
              <Logomark className="text-black h-12 mr-3" />
              <Textmark className="text-black h-8" />
            </a>
          </Link>
          <nav className="hidden md:ml-4 md:py-1 md:pl-4 md:border-gray-400	md:flex flex-wrap items-center text-base justify-center">
            <NavItems />
          </nav>
          <button className="md:hidden inline-block z-30">
            <Hamburger
              className="h-6 text-black"
              onClick={() => expandMobileMenu((state) => !state)}
              expanded={isMobileMenuExpanded}
            />
          </button>
        </div>
      </header>
      {isMobileMenuExpanded && (
        <div className="fixed inset-0 pt-20 z-20 flex flex-col items-center bg-white">
          <NavItems />
        </div>
      )}
    </>
  );
}
