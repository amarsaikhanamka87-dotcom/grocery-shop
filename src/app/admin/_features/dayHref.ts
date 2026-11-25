/** Dashboard URL for a day; today is plain /admin so the address stays clean. */
export function dayHref(key: string, todayKey: string): string {
  return key === todayKey ? "/admin" : `/admin?day=${key}`;
}
