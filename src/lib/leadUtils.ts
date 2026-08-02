import type { Lead } from './types';

/**
 * Calculates a 0-100 Lead Urgency Score based on move-in timeline and budget.
 */
export const calculateUrgencyScore = (lead: Lead): { score: number; level: 'High' | 'Medium' | 'Low' } => {
    let score = 0;

    // Budget threshold scoring (Max 50 pts)
    if (lead.budget >= 15000) {
        score += 50;
    } else if (lead.budget >= 12000) {
        score += 35;
    } else {
        score += 20;
    }

    // Intent / Stage boost (Max 50 pts)
    if (lead.intent === 'hot' || lead.stage === 'negotiation') {
        score += 50;
    } else if (lead.intent === 'warm' || lead.stage === 'tour-scheduled') {
        score += 30;
    } else {
        score += 15;
    }

    const level = score >= 75 ? 'High' : score >= 50 ? 'Medium' : 'Low';
    return { score, level };
};

/**
 * Opens a WhatsApp direct link pre-filled with property visit invitation text.
 */
export const triggerWhatsAppInvite = (lead: Lead): void => {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
        `Hi ${lead.name}! Thanks for reaching out to Gharpayy properties in ${lead.preferredArea}. ` +
        `We have great rooms matching your budget of ₹${lead.budget.toLocaleString('en-IN')}/mo. ` +
        `Would you like to schedule a site visit this week?`
    );

    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${message}`;
    window.open(whatsappUrl, '_blank');
};