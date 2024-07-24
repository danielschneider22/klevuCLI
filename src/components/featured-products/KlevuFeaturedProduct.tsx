'use client'
import Link from "next/link";
import { EyeSlashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { KlevuRecord } from "@klevu/core";
import { sendClickEv } from "../../lib/klevu";

interface KlevuFeaturedProductProps {
    product: KlevuRecord;
}
  
export default function KlevuFeaturedProduct({ product }: KlevuFeaturedProductProps) {
    return (
        <Link key={product.id} href={`/products/${product.id}`} onClick={() => sendClickEv(product)}>
                <li className="relative group">
                <div className=" aspect-square block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                    <div className="relative w-full h-full bg-[#f6f7f9] rounded-lg text-center animate-fadeIn  transition duration-300 ease-in-out group-hover:scale-105">
                    {product.image ? (
                        <Image
                        alt={`${product.name!} image`}
                        src={product.image}
                        className="rounded-lg"
                        sizes="(max-width: 200px)"
                        fill
                        style={{
                            objectFit: "contain",
                            objectPosition: "center",
                        }}
                        />
                    ) : (
                        <div className="w-[64px] h-[64px] flex items-center justify-center text-white bg-gray-200 rounded-md shadow-sm object-cover">
                        <EyeSlashIcon className="w-3 h-3" />
                        </div>
                    )}
                    </div>
                </div>
                <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                    {product.name}
                </p>
                <p className="pointer-events-none block text-sm font-medium text-gray-500">
                    {product.price}
                </p>
                </li>
        </Link>
    );
}
