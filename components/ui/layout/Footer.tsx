import * as React from "react";
import cx from "clsx";
import { Logomark, Textmark } from "../icons/Logo";
import Link from "next/link";

export default function Footer({
  className,
  children,
  ...props
}: React.HTMLProps<HTMLDivElement> & {}) {
  return (
    <footer
      data-component="Footer"
      className="bg-gray-800 text-white py-6"
      {...props}
    >
      <div className="mx-auto container px-5 mb-12 grid md:grid-cols-5">
        <div className="col-span-2">
          <Link href="/">
            <a className="flex title-font font-medium items-center text-gray-900 mb-3">
              <Logomark className="text-white h-8 mr-3" />
              <Textmark className="text-white h-6" />
            </a>
          </Link>
          <p>
            Offer digital subscriptions quickly with our digital tools and turn
            on recurring revenue for your business.
          </p>
        </div>
        <div className="col-span-3 grid lg:grid-cols-3 lg:gap-12">
          <div>
            <h4 className="text-lg font-semibold mb-3">Why OurShop</h4>
            <div className="mb-3 space-y-1">
              <div>
                <Link href="/why-subscriptions">
                  <a className="text-brand-yellow">
                    Why switch to subscriptions?
                  </a>
                </Link>
              </div>
              <div>
                <Link href="/why-subscriptions">
                  <a className="text-brand-yellow">Why choose OurShop?</a>
                </Link>
              </div>
            </div>
            <div className="space-y-1">
              <div>
                <Link href="/pricing">
                  <a className="text-brand-yellow">Pricing and Commissions</a>
                </Link>
              </div>
              <div>
                <Link href="/merchant-support">
                  <a className="text-brand-yellow">Merchant Support Programs</a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Company</h4>
            <div className="mb-3 space-y-1">
              <div>
                <Link href="/about">
                  <a className="text-brand-yellow">About</a>
                </Link>
              </div>
              <div>
                <Link href="/contact">
                  <a className="text-brand-yellow">Contact</a>
                </Link>
              </div>
              <div>
                <Link href="/updates">
                  <a className="text-brand-yellow">Updates</a>
                </Link>
              </div>
            </div>
            <div />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Developers</h4>
            <div className="mb-3 space-y-1">
              <div>
                <Link href="/developers">
                  <a className="text-brand-yellow">Overview</a>
                </Link>
              </div>
              <div>
                <Link href="/api/docs">
                  <a className="text-brand-yellow">API Documentation</a>
                </Link>
              </div>
              <div>
                <Link href="/product-roadmap">
                  <a className="text-brand-yellow">Product Roadmap</a>
                </Link>
              </div>
            </div>
            <div />
          </div>
        </div>
      </div>
      <div className="mx-auto container px-5 flex flex-wrap justify-between">
        <div>
          <p>OurShop Africa</p>
        </div>
        <div className="space-x- inline-block">
          <a href="https://facebook.com/ourshopafrica">Facebook</a>
          <a href="https://instagram.com/ourshopafrica">Instagram</a>
          <a href="https://twitter.com/ourshopafrica">Twitter</a>
          <a href="https://github.com/ourshopafrica">Github</a>
          <a href="mailto:us@ourshop.tools">Email</a>
        </div>
      </div>
    </footer>
  );
}
