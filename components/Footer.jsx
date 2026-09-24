import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide"
        >
          FITLOG
        </Link>

        {/* Copyright */}
        <p className="text-sm text-gray-400 text-center">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
}