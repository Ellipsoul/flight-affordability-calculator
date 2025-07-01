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
  const [minutes, setMinutes] = useState<string>("0");

  const annualSalaryNum = Number(annualSalary);
  const afterTaxSalary = getAfterTaxSalary(annualSalaryNum);

  // Calculate hourly salary (after tax)
  const hourlySalary = afterTaxSalary / (52 * 40);
  // Calculate total flight hours
  const totalFlightHours = Number(hours) + Number(minutes) / 60;
  // Calculate opportunity cost
  const opportunityCost = hourlySalary * totalFlightHours;

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-100 px-2 sm:px-4">
      <h1 className="font-bold text-3xl md:text-4xl mb-8 text-center w-full">
        Flight Affordability Calculator
      </h1>
      <div className="
        bg-zinc-800
        w-full
        max-w-lg
        sm:rounded-2xl
        shadow-lg
        p-4
        sm:p-8
        mx-auto
        flex flex-col
        justify-center
      ">
        <label className="block mb-6">
          <span className="block mb-2 text-zinc-300">Annual Salary (£)</span>
          <input
            type="number"
            min="0"
            value={annualSalary}
            onChange={(e) => setAnnualSalary(e.target.value)}
            placeholder="100000"
            step={5000}
            className="w-full px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block mb-6">
          <span className="block mb-2 text-zinc-300">Flight Duration</span>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="Hours"
              step={1}
              className="w-20 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-zinc-400">h</span>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              placeholder="Minutes"
              step={5}
              className="w-20 px-3 py-2 rounded-lg bg-zinc-900 border border-zinc-700 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-zinc-400">m</span>
          </div>
        </label>
        <div className="mb-4 text-zinc-400 text-sm text-center">
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
        <div className="mt-8 text-center">
          <div className="text-zinc-400 mb-2 text-lg">
            You can afford to spend:
          </div>
          <div className="text-4xl font-extrabold text-white tracking-tight break-words">
            {isNaN(opportunityCost) || !isFinite(opportunityCost)
              ? "--"
              : opportunityCost.toLocaleString(undefined, {
                style: "currency",
                currency: "GBP",
                maximumFractionDigits: 2,
              })}
          </div>
        </div>
      </div>
    </main>
  );
}
