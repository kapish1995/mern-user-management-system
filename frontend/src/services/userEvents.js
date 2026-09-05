// Deliberately tiny - just enough so the Dashboard can refresh its counts
// the moment a user is created/updated/deleted, without prop-drilling a
// refetch function through the router or reaching for a full state library.
const target = new EventTarget();
const USERS_CHANGED = "users-changed";

export function emitUsersChanged() {
  target.dispatchEvent(new Event(USERS_CHANGED));
}

export function onUsersChanged(callback) {
  target.addEventListener(USERS_CHANGED, callback);
  return () => target.removeEventListener(USERS_CHANGED, callback);
}
