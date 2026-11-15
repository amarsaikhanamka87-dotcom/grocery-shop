/** Unsplash photo id -> sized image URL (the only remote image host allowed in next.config.ts). */
export function img(id: string, w = 600) {
  return `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
}
