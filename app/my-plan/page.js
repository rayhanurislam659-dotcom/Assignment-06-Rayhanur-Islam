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

    setMessage("Workout marked as done!");
  }

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Header */}
        <div>
          <p className="text-sm font-semibold tracking-widest text-yellow-500">
            FITLOG
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            MY PLAN
          </h1>

          <p className="mt-3 text-gray-600">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">

          <div className="border rounded-xl p-5">
            <p className="text-sm text-gray-500">
              EXERCISES
            </p>

            <p className="text-3xl font-bold mt-2">
              {plan.length}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-sm text-gray-500">
              MINUTES
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalMinutes}
            </p>
          </div>

          <div className="border rounded-xl p-5">
            <p className="text-sm text-gray-500">
              CALORIES
            </p>

            <p className="text-3xl font-bold mt-2">
              {totalCalories}
            </p>
          </div>

        </div>

        {/* Tabs */}
        <div className="flex gap-4 mt-10 border-b pb-3">

          <button
            onClick={() => setActiveTab("plan")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "plan"
                ? "bg-black text-white"
                : "border"
            }`}
          >
            Today&apos;s Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-lg ${
              activeTab === "saved"
                ? "bg-black text-white"
                : "border"
            }`}
          >
            Saved
          </button>

        </div>

        {/* Workout List */}
            {loading ? (
            <div className="py-20 text-center">
                <p className="text-lg font-medium">
                Loading workouts…
                </p>
            </div>
            ) : currentList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                {currentList.map((workout) => (
                <div
                    key={workout.id}
                    className="border rounded-xl overflow-hidden"
                >

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

                    <div className="flex justify-between mt-4 text-sm">
                        <span>{workout.duration} min</span>
                        <span>{workout.caloriesBurned} kcal</span>
                        <span>⭐ {workout.rating}</span>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">

                        <Link
                        href={`/workout/${workout.id}`}
                        className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
                        >
                        View Details
                        </Link>

                        {activeTab === "plan" ? (
                            <>
                                <button
                                onClick={() => markAsDone(workout.id)}
                                className="px-4 py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
                                >
                                ✓ Done
                                </button>

                                <button
                                onClick={() => removeWorkout(workout.id)}
                                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                                title="Remove workout"
                                >
                                ✕
                                </button>
                            </>
                            ) : (
                            <button
                                onClick={() => removeWorkout(workout.id)}
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
            <div className="text-center py-20">

                <h2 className="text-2xl font-bold">
                NOTHING HERE YET
                </h2>

                <p className="mt-3 text-gray-600">
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
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
          {message}
        </div>
      )}
    </>
  );
}