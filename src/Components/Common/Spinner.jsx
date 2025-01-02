import React from "react";

export default function Spinner() {
  return (
    <div className="relative flex animate-pulse gap-2 p-4r min-h-[33vh] min-w-[20vw]">
      <div className="flex-1 p-2 min-h-full rounded-lg bg-slate-200 text-lg m-2"></div>
    </div>
  );
}
