import Link from "next/link";

export default function Home() {
  return (
    <section className="w-full h-screen bg-white flex justify-center items-center pb-20">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          Calculadora de Costos
        </h1>
        <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 pt-6">
          <Link
            href="/sticker-calculator"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 hover:bg-blue-900"
          >
            Calcular Stickers
          </Link>
          <Link
            href="/plotter-calculator"
            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-blue-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
          >
            Calcular Plotter
          </Link>
        </div>
      </div>
    </section>
  );
}
