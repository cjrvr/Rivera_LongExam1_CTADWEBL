import Button from "../../components/Button";
import logo from "../../assets/img/nubdexchange_logo.png";

import textbookImage from "../../assets/img/Textbook.png";
import calculatorImage from "../../assets/img/Calculator.png";
import shirtImage from "../../assets/img/Shirt.png";
import labGownImage from "../../assets/img/LabGown.png";

const AboutPage = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="rounded-3xl border-2 border-dashed border-zinc-300 bg-zinc-100 p-6">
            <div className="flex min-h-72 items-center justify-center rounded-[1.25rem] bg-zinc-200">
              <img
                src={logo}
                alt="BulldogEx"
                className="h-32 w-32 rounded-full border-2 border-zinc-900 bg-zinc-50 object-contain"
              />
            </div>
          </div>

          <div>
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              About Store
            </p>

            <h1 className="max-w-xl text-3xl font-bold leading-tight text-zinc-900 sm:text-4xl">
              A campus marketplace built for simple and convenient student shopping.
            </h1>

            <p className="mt-4 max-w-lg text-sm leading-7 text-zinc-600 sm:text-base">
              BulldogEx Shop allows students to browse campus products,
              manage their cart, place orders, track order status, and
              review products through one simple storefront.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button to="/" variant="primary">
                Back Home
              </Button>

              <Button to="/products">
                Open Products
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Store Overview
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
            BulldogEx at a glance
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">
              05
            </p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Products
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">
              03
            </p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Categories
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">
              24/7
            </p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Online Access
            </p>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-2xl font-bold text-zinc-900">
              01
            </p>

            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
              Campus Store
            </p>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-zinc-900 bg-zinc-50 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Store Flow
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-zinc-900">
              How BulldogEx works
            </h2>

            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Browse Products
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Customers can search products, filter by category,
                  view product details, and read customer reviews.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Simple Ordering
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Products can be added to the cart before the customer
                  places an order through the checkout page.
                </p>
              </article>

              <article className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
                <h3 className="text-lg font-semibold text-zinc-900">
                  Track Order Status
                </h3>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Customers can monitor whether an order is pending,
                  confirmed, or ready for claiming.
                </p>
              </article>
            </div>
          </div>

          <div className="rounded-3xl border-2 border-zinc-900 bg-zinc-100 p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Product Preview
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
                <img
                  src={textbookImage}
                  alt="Textbook"
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
                <img
                  src={calculatorImage}
                  alt="Scientific Calculator"
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
                <img
                  src={shirtImage}
                  alt="National University T-Shirt"
                  className="h-full w-full object-contain p-4"
                />
              </div>

              <div className="flex aspect-square items-center justify-center overflow-hidden rounded-[1.25rem] bg-zinc-200">
                <img
                  src={labGownImage}
                  alt="Medical Lab Gown"
                  className="h-full w-full object-contain p-4"
                />
              </div>
            </div>

            <Button to="/products" className="mt-5">
              View Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;