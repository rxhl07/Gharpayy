import React from 'react';

interface FilterProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    selectedArea: string;
    setSelectedArea: (area: string) => void;
    selectedStage: string;
    setSelectedStage: (stage: string) => void;
}

export const CRMWorkflowToolbar: React.FC<FilterProps> = ({
    searchQuery,
    setSearchQuery,
    selectedArea,
    setSelectedArea,
    selectedStage,
    setSelectedStage,
}) => {
    return (
        <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border shadow-sm mb-6">
            {/* Search Input */}
            <div className="flex-1 min-w-[200px]">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Target Area Filter */}
            <div>
                <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="ALL">All Areas</option>
                    <option value="Koramangala">Koramangala</option>
                    <option value="Indiranagar">Indiranagar</option>
                    <option value="HSR Layout">HSR Layout</option>
                    <option value="Bellandur">Bellandur</option>
                </select>
            </div>

            {/* Stage / Status Filter */}
            <div>
                <select
                    value={selectedStage}
                    onChange={(e) => setSelectedStage(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                    <option value="ALL">All Stages</option>
                    <option value="new">New</option>
                    <option value="tour-scheduled">Tour Scheduled</option>
                    <option value="tour-done">Tour Completed</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="booked">Booked 🎉</option>
                    <option value="dropped">Dropped ❌</option>
                </select>
            </div>
        </div>
    );
};