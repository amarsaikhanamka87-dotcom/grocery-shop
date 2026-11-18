/** Google Maps URLs for a place: `open` = new tab / phone app, `embed` = <iframe> (no API key). */
export function googleMapsLinks(query: string) {
  const q = encodeURIComponent(query);
  return {
    open: `https://www.google.com/maps/search/?api=1&query=${q}`,
    embed: `https://www.google.com/maps?q=${q}&z=16&output=embed`,
  };
}
