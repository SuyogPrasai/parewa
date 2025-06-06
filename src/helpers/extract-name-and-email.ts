export function extractRollAndName(email: string): { roll: string; name: string } | null {
    const match = email.match(/^(\d+)([a-zA-Z]+)@bnks\.edu\.np$/);
    return match ? { roll: match[1], name: match[2] } : null;
}