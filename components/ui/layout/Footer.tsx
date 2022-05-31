import * as React from "react";
import cx from "clsx";
import { Logomark, Textmark } from "../icons/Logo";

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
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-3"
            href="/"
          >
            <Logomark className="text-white h-8 mr-3" />
            <Textmark className="text-white h-6" />
          </a>
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
                <a className="text-brand-yellow" href="/why-subscriptions">
                  Why switch to subscriptions?
                </a>
              </div>
              <div>
                <a className="text-brand-yellow" href="/why-subscriptions">
                  Why choose OurShop?
                </a>
              </div>
            </div>
            <div className="space-y-1">
              <div>
                <a className="text-brand-yellow" href="/pricing">
                  Pricing and Commissions
                </a>
              </div>
              <div>
                <a className="text-brand-yellow" href="/merchant-support">
                  Merchant Support Programs
                </a>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Company</h4>
            <div className="mb-3 space-y-1">
              <div>
                <a className="text-brand-yellow" href="/about">
                  About
                </a>
              </div>
              <div>
                <a className="text-brand-yellow" href="/contact">
                  Contact
                </a>
              </div>
              <div>
                <a className="text-brand-yellow" href="/updates">
                  Updates
                </a>
              </div>
            </div>
            <div />
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Developers</h4>
            <div className="mb-3 space-y-1">
              <div>
                <a className="text-brand-yellow" href="/developers">
                  Overview
                </a>
              </div>
              <div>
                <a className="text-brand-yellow" href="/api/docs">
                  API Documentation
                </a>
              </div>
              <div>
                <a className="text-brand-yellow" href="/product-roadmap">
                  Product Roadmap
                </a>
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
