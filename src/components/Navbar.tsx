"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <nav className="border-gray-200 bg-gray-50 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap">
            Stickeria
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <li>
              <Link
                href="/"
                className={`${
                  pathname === "/" ? "text-blue-700" : "text-gray-900"
                } block py-2 px-3 md:p-0  hover:text-blue-700 bg-blue-700 rounded-sm md:bg-transparent md:dark:bg-transparent`}
                aria-current="page"
              >
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="/sticker-calculator"
                className={`${
                  pathname === "/sticker-calculator"
                    ? "text-blue-700"
                    : "text-gray-900"
                } block py-2 px-3 md:p-0  hover:text-blue-700 bg-blue-700 rounded-sm md:bg-transparent md:dark:bg-transparent`}
              >
                Calcular Stickers
              </Link>
            </li>
            <li>
              <Link
                href="/plotter-calculator"
                className={`${
                  pathname === "/plotter-calculator"
                    ? "text-blue-700"
                    : "text-gray-900"
                } block py-2 px-3 md:p-0  hover:text-blue-700 bg-blue-700 rounded-sm md:bg-transparent md:dark:bg-transparent`}
              >
                Calcular Plotter
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
