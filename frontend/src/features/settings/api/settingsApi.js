import { initialSettings } from '../../../mocks/settings.js';
const key = '179fc-demo-settings';
export async function getSettings() { try { return { ...initialSettings, ...JSON.parse(localStorage.getItem(key) || '{}') }; } catch { return { ...initialSettings }; } }
export async function saveSettings(changes) { if ('clubName' in changes && !changes.clubName.trim()) throw new Error('Club name is required.'); const result = { ...await getSettings(), ...changes }; localStorage.setItem(key, JSON.stringify(result)); window.dispatchEvent(new Event('179fc-settings-changed')); return result; }
