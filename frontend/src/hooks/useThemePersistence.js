
const STORAGE_KEY = "user-mgmt.theme-preferences.v1";

export function loadThemePreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    console.warn("Could not read theme preferences from localStorage:", err);
    return null;
  }
}

export function saveThemePreferences(prefs) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch (err) {
 
    console.warn("Could not save theme preferences to localStorage:", err);
  }
}

export function clearThemePreferences() {
  localStorage.removeItem(STORAGE_KEY);
}
