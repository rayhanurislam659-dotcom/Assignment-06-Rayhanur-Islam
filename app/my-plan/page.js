"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";

export default function MyPlan() {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [activeTab, setActiveTab] = useState("plan");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const savedWorkouts = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    setPlan(savedPlan);
    setSaved(savedWorkouts);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [message]);

  const totalMinutes = plan.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = plan.reduce(
    (total, workout) =>
      total + Number(workout.caloriesBurned || 0),
    0
  );

  const currentList = activeTab === "plan" ? plan : saved;

  function notifyNavbar() {
    window.dispatchEvent(new Event("fitlog-storage"));
  }

  function removeWorkout(id) {
    if (activeTab === "plan") {
      const updatedPlan = plan.filter(
        (workout) => workout.id !== id
      );

      setPlan(updatedPlan);

      localStorage.setItem(
        "fitlog-plan",
        JSON.stringify(updatedPlan)
      );

      notifyNavbar();

      setMessage("Workout removed from today's plan.");
    } else {
      const updatedSaved = saved.filter(
        (workout) => workout.id !== id
      );

      setSaved(updatedSaved);

      localStorage.setItem(
        "fitlog-saved",
        JSON.stringify(updatedSaved)
      );

      notifyNavbar();

      setMessage("Workout removed from saved.");
    }
  }

  function markAsDone(id) {
    const updatedPlan = plan.filter(
      (workout) => workout.id !== id
    );

    setPlan(updatedPlan);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    notifyNavbar();

    setMessage("Workout marked as done!");
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-yellow-500">
            FITLOG
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            MY PLAN
          </h1>

          <p className="mt-3 text-gray-600 max-w-xl">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <p className="text-sm text-gray-500">
              EXERCISES
            </p>

            <p className="text-3xl font-bold mt-2">
              {plan.length}
            </p>
          </div>

          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <p className="text-sm text-gray-500">
              MINUTES
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalMinutes}
            </p>
          </div>

          <div className="border rounded-xl p-5 hover:shadow-md transition">
            <p className="text-sm text-gray-500">
              CALORIES
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="flex gap-3 mt-10 border-b pb-3">

          <button
            onClick={() => setActiveTab("plan")}
            aria-label="Show today's workout plan"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "plan"
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            aria-label="Show saved workouts"
            className={`px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "saved"
                ? "bg-black text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Workout List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

            <p className="mt-4 text-lg font-medium">
              Loading workouts…
            </p>
          </div>
        ) : currentList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition"
              >

                {/* Image */}
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="w-full h-52 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-xl font-bold">
                    {workout.name}
                  </h2>

                  <p className="mt-2 text-sm text-gray-600">
                    Equipment: {workout.equipment}
                  </p>

                  {/* Stats */}
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

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3 mt-5">

                    <Link
                      href={`/workout/${workout.id}`}
                      aria-label={`View details for ${workout.name}`}
                      className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" ? (
                      <>
                        <button
                          onClick={() => markAsDone(workout.id)}
                          aria-label={`Mark ${workout.name} as done`}
                          className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                        >
                          ✓ Done
                        </button>

                        <button
                          onClick={() => removeWorkout(workout.id)}
                          aria-label={`Remove ${workout.name} from today's plan`}
                          className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                          title="Remove workout"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => removeWorkout(workout.id)}
                        aria-label={`Remove ${workout.name} from saved`}
                        className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                        title="Remove saved workout"
                      >
                        ✕
                      </button>
                    )}

                  </div>

                </div>
              </div>
            ))}

          </div>
        ) : (
          /* Empty State */
          <div className="mt-10 border rounded-2xl px-6 py-16 sm:py-20 text-center bg-gray-50">

            <div className="text-4xl">
              🏋️
            </div>

            <h2 className="text-2xl font-bold mt-4">
              NOTHING HERE YET
            </h2>

            <p className="mt-3 text-gray-600 max-w-md mx-auto">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "Save a workout from the library to see it here."}
            </p>

            <Link
              href="/#library"
              className="inline-block mt-6 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Go to workouts
            </Link>

          </div>
        )}

      </main>

      {/* Toast Notification */}
      {message && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-4 sm:right-6 z-50 bg-black text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium"
        >
          {message}
        </div>
      )}
    </>
  );
}