import { useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = { name: "", email: "", phone: "", role: "member", status: "active" };

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = "Name is required";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters";

  if (!form.email.trim()) errors.email = "Email is required";
  else if (!EMAIL_REGEX.test(form.email.trim())) errors.email = "Enter a valid email address";

  return errors;
}

export default function UserFormModal({ initialUser, onClose, onSubmit }) {
  const [form, setForm] = useState(initialUser ? { ...emptyForm, ...initialUser } : emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const isEditing = Boolean(initialUser);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const clientErrors = validate(form);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    setSubmitting(true);
    setSubmitError("");
    try {
      // Only send the fields the API actually accepts - initialUser can carry
      // _id/createdAt/etc that we don't want echoed back in the update body.
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        role: form.role,
        status: form.status,
      };
      await onSubmit(payload);
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setSubmitError(err.message || "Something went wrong, please try again");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-label={isEditing ? "Edit user" : "Add user"} onClick={(e) => e.stopPropagation()}>
        <h2>{isEditing ? "Edit user" : "Add user"}</h2>

        <form onSubmit={handleSubmit}>
          {submitError && <div className="error-banner">{submitError}</div>}

          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input id="name" value={form.name} onChange={(e) => update("name", e.target.value)} autoFocus />
            {errors.name && <div className="field-error">{errors.name}</div>}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Optional" />
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="role">Role</label>
              <select id="role" value={form.role} onChange={(e) => update("role", e.target.value)}>
                <option value="admin">Admin</option>
                <option value="member">Member</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="status">Status</label>
              <select id="status" value={form.status} onChange={(e) => update("status", e.target.value)}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Saving…" : isEditing ? "Save changes" : "Add user"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
