const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateUserPayload(body, { partial = false } = {}) {
  const errors = {};
  const { name, email, role, status } = body;

  if (!partial || name !== undefined) {
    if (!name || !name.trim()) errors.name = "Name is required";
    else if (name.trim().length < 2) errors.name = "Name must be at least 2 characters";
  }

  if (!partial || email !== undefined) {
    if (!email || !email.trim()) errors.email = "Email is required";
    else if (!EMAIL_REGEX.test(email.trim())) errors.email = "Enter a valid email address";
  }

  if (role !== undefined && !["admin", "member", "viewer"].includes(role)) {
    errors.role = "Role must be admin, member or viewer";
  }

  if (status !== undefined && !["active", "inactive"].includes(status)) {
    errors.status = "Status must be active or inactive";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
}

module.exports = { validateUserPayload };
