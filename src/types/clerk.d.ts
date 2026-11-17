// Typed Clerk metadata. publicMetadata is readable by the browser but writable only by the server.
export {};

declare global {
  interface UserPublicMetadata {
    /** "admin" = shop owner; "b2b" = approved business buyer (free delivery). Unset = regular buyer. */
    role?: "admin" | "b2b" | null;
  }
}
