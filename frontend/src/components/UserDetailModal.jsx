export default function UserDetailModal({ user, onClose, onEdit }) {
  const rows = [
    ["Name", user.name],
    ["Email", user.email],
    ["Phone", user.phone || "Not provided"],
    ["Role", user.role],
    ["Status", user.status],
    ["Added on", new Date(user.createdAt).toLocaleDateString()],
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" role="dialog" aria-label="User details" onClick={(e) => e.stopPropagation()}>
        <h2>{user.name}</h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {rows.map(([label, value]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span className="cell-muted">{label}</span>
              <span style={{ textTransform: label === "Role" || label === "Status" ? "capitalize" : "none" }}>{value}</span>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose} type="button">
            Close
          </button>
          <button className="btn btn-primary" onClick={onEdit} type="button">
            Edit user
          </button>
        </div>
      </div>
    </div>
  );
}
