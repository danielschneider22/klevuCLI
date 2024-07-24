"use server";
import clsx from "clsx";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import KlevuFeaturedProduct from "./KlevuFeaturedProduct";
import { fetchFeatureProducts } from "../../lib/klevu";

interface IFeaturedProductsProps {
  title: string;
  linkProps?: {
    link: string;
    text: string;
  };
}

export default async function FeaturedProducts({
  title,
  linkProps,
}: IFeaturedProductsProps) {
  const queryResults = await fetchFeatureProducts();
  if(!queryResults) { return <></>}

  return (
    <div
      className={clsx(
        queryResults.records.length ? "block" : "hidden",
        "max-w-7xl my-0 mx-auto",
      )}
    >
      <div className="flex justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-base md:text-[1.1rem] lg:text-[1.3rem] font-extrabold">
          {title}
        </h2>
        {linkProps && (
          <Link
            className="text-sm md:text-md lg:text-lg font-bold hover:cursor-pointer"
            href={linkProps.link}
          >
            <span className="flex items-center gap-2 font-bold hover:text-brand-primary hover:cursor-pointer">
              {linkProps.text} <ArrowRightIcon className="h-4 w-4" />
            </span>
          </Link>
        )}
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {queryResults.records.map((product) => (
          <KlevuFeaturedProduct product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
