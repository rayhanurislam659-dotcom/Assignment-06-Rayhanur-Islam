"use client";

import { useEffect, useState } from "react";

export default function PlanButtons({ workout }) {
  const [message, setMessage] = useState("");
  const [planCount, setPlanCount] = useState(0);

  useEffect(() => {
    function updatePlanCount() {
      const existingPlan = JSON.parse(
        localStorage.getItem("fitlog-plan") || "[]"
      );

      setPlanCount(existingPlan.length);
    }

    updatePlanCount();

    window.addEventListener("fitlog-storage", updatePlanCount);

    return () => {
      window.removeEventListener("fitlog-storage", updatePlanCount);
    };
  }, []);

  function showMessage(text) {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  }

  function addToPlan() {
    const existingPlan = JSON.parse(
      localStorage.getItem("fitlog-plan") || "[]"
    );

    const alreadyAdded = existingPlan.some(
      (item) => item.id === workout.id
    );

    if (alreadyAdded) {
      showMessage("Already added to today's plan.");
      return;
    }

    if (existingPlan.length >= 5) {
      showMessage("Today's plan is full. Maximum 5 workouts.");
      return;
    }

    const updatedPlan = [...existingPlan, workout];

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setPlanCount(updatedPlan.length);

    window.dispatchEvent(new Event("fitlog-storage"));

    showMessage("Added to today's plan!");
  }

  function saveForLater() {
    const existingSaved = JSON.parse(
      localStorage.getItem("fitlog-saved") || "[]"
    );

    const alreadySaved = existingSaved.some(
      (item) => item.id === workout.id
    );

    if (alreadySaved) {
      showMessage("Already saved for later.");
      return;
    }

    const updatedSaved = [...existingSaved, workout];

    localStorage.setItem(
      "fitlog-saved",
      JSON.stringify(updatedSaved)
    );

    window.dispatchEvent(new Event("fitlog-storage"));

    showMessage("Saved for later!");
  }

  const planFull = planCount >= 5;

  return (
    <div className="mt-8">

      {/* Buttons */}
      <div className="flex flex-wrap gap-4">

        <button
          onClick={addToPlan}
          disabled={planFull}
          className={`px-6 py-3 rounded-lg transition ${
            planFull
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800"
          }`}
        >
          {planFull
            ? "✓ Today's plan is full"
            : "➕ Add to today's plan"}
        </button>

        <button
          onClick={saveForLater}
          className="px-6 py-3 border border-black rounded-lg hover:bg-black hover:text-white transition"
        >
          🔖 Save for later
        </button>

      </div>

      {/* Toast */}
      {message && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-lg shadow-lg text-sm font-medium">
          {message}
        </div>
      )}

    </div>
  );
}