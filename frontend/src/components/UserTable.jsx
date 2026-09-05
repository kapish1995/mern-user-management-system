export default function UserTable({ users, onEdit, onDelete, onView }) {
  if (users.length === 0) {
    return (
      <div className="table-card">
        <div className="empty-state">No users match your search yet.</div>
      </div>
    );
  }

  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="cell-primary">
                <button className="link-btn" onClick={() => onView(user)} type="button">
                  {user.name}
                </button>
              </td>
              <td className="cell-muted">{user.email}</td>
              <td className="cell-muted">{user.phone || "—"}</td>
              <td style={{ textTransform: "capitalize" }}>{user.role}</td>
              <td>
                <span className={`badge status-${user.status}`}>{user.status}</span>
              </td>
              <td>
                <div className="row-actions">
                  <button className="btn btn-ghost btn-sm" onClick={() => onEdit(user)} type="button">
                    Edit
                  </button>
                  <button className="btn btn-ghost btn-sm" onClick={() => onDelete(user)} type="button">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
