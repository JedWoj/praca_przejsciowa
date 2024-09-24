"use client";
export default function Error() {
  return (
    <div className="min-h-[calc(100vh-49px)] flex justify-center items-center">
      <div className="p-10 rounded-2xl bg-rose-400 text-white text-center">
        <h1 className="text-7xl mb-2">Error</h1>
        <p className="text-2xl">Something went wrong...</p>
      </div>
    </div>
  );
}
