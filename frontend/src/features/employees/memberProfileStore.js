const PROFILE_STORAGE_KEY = '179fc-member-profiles-v1';
const editableFields = ['avatar', 'team', 'dateOfBirth', 'phone'];

function getStorage() {
  try { return typeof window === 'undefined' ? null : window.localStorage; } catch { return null; }
}

export function loadMemberProfileOverrides(storage = getStorage()) {
  try {
    const saved = JSON.parse(storage?.getItem(PROFILE_STORAGE_KEY) || '{}');
    return saved && typeof saved === 'object' && !Array.isArray(saved) ? saved : {};
  } catch { return {}; }
}

export function applyMemberProfile(member, overrides = loadMemberProfileOverrides()) {
  const saved = overrides[member.id];
  return saved && typeof saved === 'object' ? { ...member, ...saved } : member;
}

export function saveMemberProfile(memberId, profile, storage = getStorage()) {
  const overrides = loadMemberProfileOverrides(storage);
  const savedProfile = Object.fromEntries(editableFields.filter((field) => typeof profile[field] === 'string').map((field) => [field, profile[field]]));
  const next = { ...overrides, [memberId]: savedProfile };
  try { storage?.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next)); } catch { /* Storage can be unavailable in private browsing. */ }
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('179fc-member-profile-changed'));
  return next;
}
