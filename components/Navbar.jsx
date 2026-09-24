"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function updateCounts() {
      const plan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      const saved = JSON.parse(
        localStorage.getItem("fitlog-saved") || "[]"
      );

      setPlanCount(plan.length);
      setSavedCount(saved.length);
    }

    updateCounts();

    window.addEventListener("storage", updateCounts);
    window.addEventListener("fitlog-storage", updateCounts);

    return () => {
      window.removeEventListener("storage", updateCounts);
      window.removeEventListener("fitlog-storage", updateCounts);
    };
  }, []);

  const isWorkoutActive = pathname === "/";
  const isPlanActive = pathname === "/my-plan";

  return (
    <nav className="max-w-7xl mx-auto bg-black text-white rounded-xl px-6 py-5">

      {/* Top Navbar */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-wide"
        >
          FITLOG
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">

          <Link
            href="/"
            className={`text-sm font-medium px-3 py-2 rounded-lg transition ${
              isWorkoutActive
                ? "bg-yellow-400 text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className={`text-sm font-medium px-3 py-2 rounded-lg transition ${
              isPlanActive
                ? "bg-yellow-400 text-black"
                : "hover:bg-white hover:text-black"
            }`}
          >
            My Plan
          </Link>

        </div>

        {/* Desktop Counters */}
        <div className="hidden md:flex items-center gap-3">

          <Link
            href="/my-plan"
            className="px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold hover:bg-yellow-500 transition"
          >
            Plan <span className="font-bold">{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="px-4 py-2 rounded-full border border-white text-white text-sm font-semibold hover:bg-white hover:text-black transition"
          >
            Saved <span className="font-bold">{savedCount}</span>
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-5 pt-5 border-t border-gray-700">

          <div className="flex flex-col gap-3">

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium ${
                isWorkoutActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-white hover:text-black transition"
              }`}
            >
              Workout
            </Link>

            <Link
              href="/my-plan"
              onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-lg font-medium ${
                isPlanActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-white hover:text-black transition"
              }`}
            >
              My Plan
            </Link>

            <div className="flex gap-3 pt-2">

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-full bg-yellow-400 text-black text-sm font-semibold"
              >
                Plan {planCount}
              </Link>

              <Link
                href="/my-plan"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2 rounded-full border border-white text-sm font-semibold"
              >
                Saved {savedCount}
              </Link>

            </div>

          </div>

        </div>
      )}

    </nav>
  );
}