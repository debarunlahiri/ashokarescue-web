const IMMEDIATE_EMERGENCY = /\b(?:not breathing|stopped breathing|unconscious|unresponsive|cardiac arrest|severe bleeding|cannot breathe|can['’]?t breathe|life[ -]threatening|(?:medical )?emergency (?:right )?now)\b/i;
const URGENT_TRANSFER = /\b(?:urgent(?:ly)?|asap|(?:ambulance|transfer) (?:needed )?(?:right )?now|need (?:an? )?(?:(?:air|road) )?ambulance)\b/i;

export const emergencyGuidance = "For an immediate medical emergency, call local emergency services first.";

export function getChatUrgency(message: string): "emergency" | "urgent" | null {
  if (IMMEDIATE_EMERGENCY.test(message)) return "emergency";
  if (URGENT_TRANSFER.test(message)) return "urgent";
  return null;
}

export function getUrgentChatMessage(urgency: "emergency" | "urgent") {
  if (urgency === "emergency") return emergencyGuidance;
  return "For an urgent patient transfer, call the Ashoka Rescue coordination team now. Have the pickup and drop locations ready when you call.";
}
