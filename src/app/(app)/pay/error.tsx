"use client";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-screen-lg  rounded-xl border text-black bg-white min-h-[30rem] grid grid-rows-[1fr,auto] gap-4 p-6">
      <div>
        <h1 className="font-bold text-2xl mb-2 text-center">
          Something went wrong!
        </h1>
        <div className="mt-10 text-center font-bold text-red-500">
          {error.message}
        </div>
      </div>

      <div>
        <div className="grid grid-cols-1 justify-items-center">
          <button
            className={`max-w-sm w-full py-2 px-4 rounded cursor-not-allowed bg-orbita-iris text-white`}
            disabled={true}
          >
            {"Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
