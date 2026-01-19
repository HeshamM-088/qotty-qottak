export function isAuthenticated(user) {
  return Boolean(user && user.id);
}

export function isAdmin(user) {
  return Boolean(user && user.role === "admin");
}

export function isOwnerOnly(ownerId, user) {
  if (!isAuthenticated(user)) return false;

  return ownerId.toString() === user.id && user.role !== "admin";
}

export function isOwnerOrAdmin(ownerId, user) {
  if (!isAuthenticated(user)) return false;

  return ownerId.toString() === user.id || user.role === "admin";
}
