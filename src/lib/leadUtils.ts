import type { Lead, Property } from './types';

// Calculates dynamic urgency score based on lead properties
export function calculateUrgencyScore(lead: Lead): { score: number; level: 'High' | 'Medium' | 'Low' } {
    let score = 50; // Base score

    // Budget weighting
    if (lead.budget >= 20000) score += 30;
    else if (lead.budget >= 15000) score += 15;

    // Stage weighting
    if (lead.stage === 'negotiation') score += 20;
    else if (lead.stage === 'tour-scheduled' || lead.stage === 'tour-done') score += 15;
    else if (lead.stage === 'dropped') score = 10;

    // Determine level badge
    let level: 'High' | 'Medium' | 'Low' = 'Low';
    if (score >= 80) level = 'High';
    else if (score >= 50) level = 'Medium';

    return { score: Math.min(score, 100), level };
}

// Standard 1-Click WhatsApp Invite Trigger
export function triggerWhatsAppInvite(lead: Lead) {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    const message = encodeURIComponent(
        `Hi ${lead.name}! 👋 Thank you for inquiring about properties in ${lead.preferredArea} with Gharpayy. We have great options matching your budget of ₹${lead.budget.toLocaleString('en-IN')}/mo. When would be a good time for a quick site visit?`
    );

    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
}

// ==========================================
// 🔥 GHOST-LEAD AUTO-REVIVAL FUNCTIONS
// ==========================================

// Check if a dropped lead matches available property inventory
export function getRevivalPropertyMatch(lead: Lead, properties: Property[] = []): Property | null {
    if (lead.stage !== 'dropped') return null;

    // Safely resolve property price regardless of property key naming
    return properties.find((p) => {
        const propertyPrice = (p as any).basePrice ?? (p as any).startingPrice ?? (p as any).rent ?? 0;
        return (
            p.area.toLowerCase() === lead.preferredArea.toLowerCase() &&
            p.vacantBeds > 0 &&
            propertyPrice <= lead.budget
        );
    }) || null;
}

// Trigger tailored WhatsApp re-engagement deal pitch
export function triggerRevivalWhatsAppInvite(lead: Lead, propertyName: string, price: number) {
    const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
    const formattedPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;

    const message = encodeURIComponent(
        `Hey ${lead.name}! 👋 A bed just opened up at ${propertyName} in ${lead.preferredArea} for ₹${price.toLocaleString('en-IN')}/mo (matching your target budget!). Would you like to schedule a quick tour today before it fills up?`
    );

    window.open(`https://wa.me/${formattedPhone}?text=${message}`, '_blank');
}