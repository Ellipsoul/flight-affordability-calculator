"use client";

import { useState } from "react";

// Helper function to calculate UK tax based on bands
function calculateUKTax(annualSalary: number): number {
  // UK tax bands and rates
  const bands = [
    { threshold: 0, rate: 0 },
    { threshold: 12570, rate: 0.28 },
    { threshold: 50270, rate: 0.42 },
    { threshold: 100000, rate: 0.62 },
    { threshold: 125140, rate: 0.47 },
  ];
  const limits = [12570, 50270, 100000, 125140, Infinity];

  let tax = 0;
  let prevLimit = 0;

  for (let i = 0; i < bands.length; i++) {
    const bandLimit = limits[i];
    const bandRate = bands[i].rate;
    if (annualSalary > prevLimit) {
      const taxable = Math.min(annualSalary, bandLimit) - prevLimit;
      tax += taxable * bandRate;
      prevLimit = bandLimit;
    } else {
      break;
    }
  }
  return tax;
}

// Helper to get after-tax salary
function getAfterTaxSalary(annualSalary: number): number {
  const tax = calculateUKTax(annualSalary);
  return annualSalary - tax;
}

export default function Home() {
  const [annualSalary, setAnnualSalary] = useState<string>("100000");
  const [hours, setHours] = useState<string>("3");
  const [minutes, setMinutes] = useState<string>("30");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");

  const annualSalaryNum = Number(annualSalary);
  const hoursPerWeekNum = Number(hoursPerWeek);
  const afterTaxSalary = getAfterTaxSalary(annualSalaryNum);

  // Error handling for hours per week
  const hoursPerWeekError = hoursPerWeekNum === 0;

  // Calculate hourly salary (after tax)
  const hourlySalary = hoursPerWeekError
    ? 0
    : afterTaxSalary / (52 * hoursPerWeekNum);
  // Calculate total flight hours
  const totalFlightHours = Number(hours) + Number(minutes) / 60;
  // Calculate opportunity cost
  const opportunityCost = hoursPerWeekError
    ? 0
    : hourlySalary * totalFlightHours;
  const returnOpportunityCost = opportunityCost * 2;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-100 px-2 sm:px-4">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-4 sm:mb-8 text-center w-full">
        Flight Affordability Calculator
      </h1>
      <div className="
        bg-zinc-800
        w-full
        max-w-lg
        rounded-lg
        sm:rounded-2xl
        shadow-lg
        p-4
        sm:p-8
        mx-auto
        flex flex-col
        justify-center
      ">
        <label className="block mb-6">
          <span className="block mb-2 text-zinc-300 text-lg sm:text-xl">
            Annual Salary (£)
          </span>
          <input
            type="number"
            min="0"
            inputMode="numeric"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
            placeholder="100000"
            step={5000}
            className="w-full px-4 py-3 rounded-lg text-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-5">
          <span className="block mb-2 text-zinc-300 text-base sm:text-lg">
            Hours per week
          </span>
          <input
            type="number"
            min="1"
            value={hoursPerWeek}
            inputMode="numeric"
            onChange={(e) => setHoursPerWeek(e.target.value)}
            placeholder="40"
            step={0.5}
            className="w-full px-4 py-3 rounded-lg text-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        {hoursPerWeekError && (
          <div className="mb-4 text-red-400 text-sm text-center font-semibold">
            Please enter a valid number of hours per week (cannot be zero).
          </div>
        )}
        <div className="mb-2 sm:mb-4 text-zinc-400 text-center">
          After-tax salary:{" "}
          <span className="font-semibold text-zinc-200">
            {isNaN(afterTaxSalary) || !isFinite(afterTaxSalary)
              ? "--"
              : afterTaxSalary.toLocaleString(undefined, {
                style: "currency",
                currency: "GBP",
                maximumFractionDigits: 2,
              })}
          </span>
        </div>
        <div className="mb-4 sm:mb-6 text-zinc-400 text-center">
          After-tax hourly pay:{" "}
          <span className="font-semibold text-zinc-200">
            {hoursPerWeekError || isNaN(hourlySalary) || !isFinite(hourlySalary)
              ? "--"
              : hourlySalary.toLocaleString(undefined, {
                style: "currency",
                currency: "GBP",
                maximumFractionDigits: 2,
              })}
          </span>
        </div>
        <label className="block mb-2 sm:mb-6">
          <span className="block mb-2 text-zinc-300 text-base sm:text-lg">
            Flight Duration
          </span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="3"
              step={1}
              className="w-20 px-3 py-2 rounded-lg text-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-zinc-400 mr-3">hours</span>
            <input
              type="number"
              inputMode="numeric"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="30"
              step={5}
              className="w-20 px-3 py-2 rounded-lg text-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-zinc-400">minutes</span>
          </div>
        </label>
        <div className="mt-8 text-center">
          <div className="text-zinc-400 mb-2 text-lg">
            For a one-way flight, you can afford:
          </div>
          <div className="text-4xl font-extrabold text-white tracking-tight break-words">
            {hoursPerWeekError || isNaN(opportunityCost) ||
                !isFinite(opportunityCost)
              ? "--"
              : opportunityCost.toLocaleString(undefined, {
                style: "currency",
                currency: "GBP",
                maximumFractionDigits: 2,
              })}
          </div>
          <div className="mt-6">
            <div className="text-zinc-400 mb-2 text-lg">
              For a return flight, you can afford:
            </div>
            <div className="text-4xl font-bold text-white tracking-tight break-words">
              {hoursPerWeekError || isNaN(returnOpportunityCost) ||
                  !isFinite(returnOpportunityCost)
                ? "--"
                : returnOpportunityCost.toLocaleString(undefined, {
                  style: "currency",
                  currency: "GBP",
                  maximumFractionDigits: 2,
                })}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
