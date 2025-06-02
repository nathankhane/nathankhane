import Image from "next/image";

export default function Home() {
  return (
    <section className="mx-auto max-w-4xl text-center space-y-8">
      <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight">
        Business <span className="text-cyan-400">≡</span> Poetry
      </h1>
      <p className="text-xl sm:text-2xl max-w-2xl mx-auto">
        Turning narrative into revenue for founders & creators.
      </p>
      <a
        href="/contact"
        className="inline-block rounded-2xl px-8 py-3 font-medium bg-cyan-400 text-black hover:scale-105 transition"
      >
        Book a Discovery Call
      </a>
    </section>
  );
}
