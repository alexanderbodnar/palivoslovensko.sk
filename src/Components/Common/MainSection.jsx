"use server";
import { Outlet } from "react-router-dom";

export default function MainSection() {
  return (
    <span id="main--section">
      <div className="grid h-full justify-items-center mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </span>
  );
}
// <PriceDevelopmentGraph data={data} />
