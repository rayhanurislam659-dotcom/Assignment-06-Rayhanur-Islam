import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">

        <p className="text-sm font-semibold tracking-widest text-yellow-500">
          FITLOG
        </p>

        <h1 className="text-7xl font-bold mt-4">
          404
        </h1>

        <h2 className="text-2xl font-bold mt-4">
          PAGE NOT FOUND
        </h2>

        <p className="mt-3 text-gray-600">
          The workout or page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-8 px-6 py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-500 transition"
        >
          BACK TO HOME
        </Link>

      </div>
    </main>
  );
}