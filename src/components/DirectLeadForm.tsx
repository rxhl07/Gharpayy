import React, { useState } from "react";
import { useApp } from "@/lib/store";

export const DirectLeadForm: React.FC = () => {
  // Access addLead directly from the Zustand store
  const addLead = useApp((state) => state.addLead);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState<number | "">("");
  const [preferredArea, setPreferredArea] = useState("Koramangala");
  const [intent, setIntent] = useState<"hot" | "warm" | "cold">("warm");
  const [moveInDate, setMoveInDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !budget) return;

    // Call store action
    addLead({
      name,
      phone,
      budget: Number(budget),
      preferredArea,
      intent,
      moveInDate: moveInDate ? new Date(moveInDate).toISOString() : undefined,
      source: "Direct Ingestion",
    });

    // Reset form fields
    setName("");
    setPhone("");
    setBudget("");
    setPreferredArea("Koramangala");
    setIntent("warm");
    setMoveInDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-5 bg-white rounded-xl border shadow-sm space-y-4 max-w-md">
      <h3 className="text-lg font-bold text-gray-900">Direct Lead Ingestion</h3>

      <div>
        <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Rahul Sharma"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Phone Number</label>
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. +91 9876543210"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Budget (₹/mo)</label>
          <input
            type="number"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : "")}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="25000"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Move-in Date</label>
          <input
            type="date"
            value={moveInDate}
            onChange={(e) => setMoveInDate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Target Area</label>
          <select
            value={preferredArea}
            onChange={(e) => setPreferredArea(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Koramangala">Koramangala</option>
            <option value="Indiranagar">Indiranagar</option>
            <option value="HSR Layout">HSR Layout</option>
            <option value="Bellandur">Bellandur</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase text-gray-600 mb-1">Initial Intent</label>
          <select
            value={intent}
            onChange={(e) => setIntent(e.target.value as "hot" | "warm" | "cold")}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="hot">Hot 🔥</option>
            <option value="warm">Warm 🟡</option>
            <option value="cold">Cold ❄️</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg text-sm transition-colors"
      >
        Ingest Lead
      </button>
    </form>
  );
};