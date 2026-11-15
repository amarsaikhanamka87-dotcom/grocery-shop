/** Writes JSON to localStorage; ignores storage being unavailable (private mode, quota). */
export function saveToStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}
