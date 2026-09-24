"use client";

import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

export default function Home() {
  const [workouts, setWorkouts] = useState([]);
  const [sortBy, setSortBy] = useState("duration");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getWorkouts() {
      try {
        const response = await fetch(
          "https://api.abcz.workers.dev/api/fitlog"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getWorkouts();
  }, []);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return Number(a.duration) - Number(b.duration);
    }

    if (sortBy === "calories") {
      return Number(a.caloriesBurned) - Number(b.caloriesBurned);
    }

    if (sortBy === "rating") {
      return Number(b.rating) - Number(a.rating);
    }

    return 0;
  });

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-gray-200 rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

          {/* Hero Text */}
          <div>
            <p className="text-sm font-semibold tracking-widest mb-4 text-yellow-500">
              WORKOUT LIBRARY
            </p>

            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              TRAIN WITH INTENT.
              <br />
              LOG EVERY SET.
            </h1>

            <p className="mt-6 text-lg max-w-2xl">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock
              it into today&apos;s plan, and watch the week&apos;s work add up.
            </p>

            <a
              href="#library"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              BROWSE WORKOUTS
              <span className="text-lg">→</span>
            </a>
          </div>

          {/* Hero Image */}
          <div>
            <img
              src="/banner.png"
              alt="Fitness workout"
              className="w-full h-[450px] object-contain rounded-xl"
            />
          </div>

        </div>
      </section>

      {/* Workout Library */}
      <section
        id="library"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        {/* Library Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

          <div>
            <h2 className="text-3xl font-bold">
              THE LIBRARY
            </h2>

            <p className="mt-3">
              Twelve lifts covering every major muscle group.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-3 pr-10 border border-black rounded-lg bg-white text-sm font-medium cursor-pointer focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>

            {/* Chevron */}
            <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm">
              ▼
            </span>
          </div>

        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">

            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

            <p className="mt-4 text-lg font-medium">
              Loading workouts…
            </p>

          </div>
        ) : (
          /* Workout Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

            {sortedWorkouts.map((workout) => (
              <a
                key={workout.id}
                href={"/workout/" + workout.id}
                className="block border rounded-xl overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5">

                  <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold border rounded-full">
                    {workout.category}
                  </span>

                  <h3 className="text-xl font-bold mt-3">
                    {workout.name}
                  </h3>

                  <p className="mt-3 text-sm">
                    Equipment: {workout.equipment}
                  </p>

                  {/* Workout Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4 text-sm text-gray-600">
                    <span className="text-center">
                      ⏱ {workout.duration} min
                    </span>

                    <span className="text-center">
                      🔥 {workout.caloriesBurned} kcal
                    </span>

                    <span className="text-center">
                      ⭐ {workout.rating}
                    </span>
                  </div>

                </div>
              </a>
            ))}

          </div>
        )}
      </section>
    </main>
  );
}