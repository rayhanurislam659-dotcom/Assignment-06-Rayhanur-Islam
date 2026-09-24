import { notFound } from "next/navigation";
import Navbar from "../../../components/Navbar";
import PlanButtons from "../../../components/PlanButtons";

async function getWorkout(id) {
  const response = await fetch(
    `https://api.abcz.workers.dev/api/fitlog/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    notFound();
  }

  return response.json();
}

export default async function WorkoutDetails({ params }) {
  const { id } = await params;
  const workout = await getWorkout(id);

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

          {/* Image */}
          <div>
            <img
              src={workout.image}
              alt={workout.name}
              className="w-full h-72 sm:h-96 lg:h-[450px] object-cover rounded-2xl"
            />
          </div>

          {/* Details */}
          <div>

            {/* Category Tags */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="px-3 py-1 text-xs font-semibold border rounded-full"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Workout Name */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-4 leading-tight">
              {workout.name}
            </h1>

            {/* Description */}
            <p className="mt-5 text-gray-600 leading-relaxed">
              {workout.description}
            </p>

            {/* Key Specs */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">
                KEY SPECS
              </h2>

              <div className="border rounded-xl overflow-hidden">

                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 sm:p-4 text-sm font-semibold">
                    EQUIPMENT
                  </div>
                  <div className="p-3 sm:p-4 text-sm break-words">
                    {workout.equipment}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 sm:p-4 text-sm font-semibold">
                    DIFFICULTY
                  </div>
                  <div className="p-3 sm:p-4 text-sm">
                    {workout.difficulty}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 sm:p-4 text-sm font-semibold">
                    SETS
                  </div>
                  <div className="p-3 sm:p-4 text-sm">
                    {workout.sets}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 sm:p-4 text-sm font-semibold">
                    REPS
                  </div>
                  <div className="p-3 sm:p-4 text-sm">
                    {workout.reps}
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 sm:p-4 text-sm font-semibold">
                    DURATION
                  </div>
                  <div className="p-3 sm:p-4 text-sm">
                    {workout.duration} min
                  </div>
                </div>

                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 sm:p-4 text-sm font-semibold">
                    CALORIES
                  </div>
                  <div className="p-3 sm:p-4 text-sm">
                    {workout.caloriesBurned} kcal
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="p-3 sm:p-4 text-sm font-semibold">
                    RATING
                  </div>
                  <div className="p-3 sm:p-4 text-sm">
                    ⭐ {workout.rating}
                  </div>
                </div>

              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8">
              <h2 className="text-xl font-bold mb-4">
                INSTRUCTIONS
              </h2>

              <ol className="space-y-3 list-decimal list-inside">
                {workout.instructions?.map((instruction, index) => (
                  <li
                    key={index}
                    className="text-gray-600 leading-relaxed"
                  >
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Buttons */}
            <PlanButtons workout={workout} />

          </div>
        </div>
      </main>
    </>
  );
}