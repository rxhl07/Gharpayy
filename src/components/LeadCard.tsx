import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import type { Lead, LeadStage } from '@/lib/types';
import { calculateUrgencyScore, triggerWhatsAppInvite } from '@/lib/leadUtils';

interface LeadCardProps {
    lead: Lead;
}

export const LeadCard: React.FC<LeadCardProps> = ({ lead }) => {
    const setLeadStage = useApp((state) => state.setLeadStage);
    const addNote = useApp((state) => state.addNote);
    const activities = useApp((state) => state.activities).filter((a) => a.leadId === lead.id);

    const [noteText, setNoteText] = useState('');

    // Calculate dynamic urgency score
    const { score, level } = calculateUrgencyScore(lead);

    const badgeColor =
        level === 'High'
            ? 'bg-red-100 text-red-700 border-red-300'
            : level === 'Medium'
                ? 'bg-amber-100 text-amber-700 border-amber-300'
                : 'bg-slate-100 text-slate-700 border-slate-300';

    const handleStageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLeadStage(lead.id, e.target.value as LeadStage);
    };

    const handleAddNote = (e: React.FormEvent) => {
        e.preventDefault();
        if (!noteText.trim()) return;
        addNote(lead.id, noteText.trim());
        setNoteText('');
    };

    return (
        <div className="p-4 bg-white rounded-xl border shadow-sm space-y-3 relative">
            {/* Header Info */}
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{lead.name}</h4>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${badgeColor}`}>
                            {level} ({score})
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">{lead.phone} • {lead.preferredArea}</p>
                </div>
                <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-100 text-slate-700">
                    ₹{lead.budget.toLocaleString('en-IN')}/mo
                </span>
            </div>

            {/* Stage Selector & WhatsApp Trigger */}
            <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-gray-500 uppercase">Stage:</label>
                <select
                    value={lead.stage}
                    onChange={handleStageChange}
                    className="flex-1 px-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 bg-gray-50 font-medium"
                >
                    <option value="new">New</option>
                    <option value="tour-scheduled">Tour Scheduled</option>
                    <option value="tour-done">Tour Completed</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="booked">Booked 🎉</option>
                    <option value="dropped">Dropped ❌</option>
                </select>

                {/* WhatsApp Invite Button */}
                <button
                    onClick={() => triggerWhatsAppInvite(lead)}
                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-md transition-colors flex items-center gap-1"
                    title="Send WhatsApp Invite"
                >
                    💬 Invite
                </button>
            </div>

            {/* Inline Notes Logger */}
            <form onSubmit={handleAddNote} className="flex gap-2 pt-2 border-t">
                <input
                    type="text"
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Log a note..."
                    className="flex-1 px-2 py-1 text-xs border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="px-3 py-1 bg-slate-800 text-white text-xs font-medium rounded-md hover:bg-slate-700 transition-colors"
                >
                    Add
                </button>
            </form>

            {/* Activity / Notes History */}
            {activities.length > 0 && (
                <div className="max-h-24 overflow-y-auto text-[11px] text-gray-600 space-y-1 pt-1 bg-slate-50 p-2 rounded">
                    {activities.slice(0, 3).map((act) => (
                        <div key={act.id} className="truncate">
                            <span className="font-semibold text-gray-800">
                                {new Date(act.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}:
                            </span>{' '}
                            {act.text}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};