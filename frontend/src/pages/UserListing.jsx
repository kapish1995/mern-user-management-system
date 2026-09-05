import { useCallback, useEffect, useMemo, useState } from "react";
import UserTable from "../components/UserTable.jsx";
import UserFormModal from "../components/UserFormModal.jsx";
import ConfirmModal from "../components/ConfirmModal.jsx";
import UserDetailModal from "../components/UserDetailModal.jsx";
import { fetchUsers, createUser, updateUser, deleteUser } from "../services/userService.js";
import { emitUsersChanged } from "../services/userEvents.js";

export default function UserListing() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewingUser, setViewingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);

  const loadUsers = useCallback(async (searchTerm) => {
    setLoading(true);
    try {
      const data = await fetchUsers(searchTerm);
      setUsers(data);
      setError("");
    } catch (err) {
      setError(err.message || "Could not load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => loadUsers(search), 300);
    return () => clearTimeout(timeout);
  }, [search, loadUsers]);

  async function handleCreate(form) {
    await createUser(form);
    setShowCreate(false);
    loadUsers(search);
    emitUsersChanged();
  }

  async function handleUpdate(form) {
    await updateUser(editingUser._id, form);
    setEditingUser(null);
    loadUsers(search);
    emitUsersChanged();
  }

  async function handleDelete() {
    setDeleteBusy(true);
    try {
      await deleteUser(deletingUser._id);
      setDeletingUser(null);
      loadUsers(search);
      emitUsersChanged();
    } catch (err) {
      setError(err.message || "Could not delete this user");
      setDeletingUser(null);
    } finally {
      setDeleteBusy(false);
    }
  }

  const subtitle = useMemo(
    () => (loading ? "Loading…" : `${users.length} user${users.length === 1 ? "" : "s"}`),
    [loading, users.length]
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Users</h1>
          <p className="page-subtitle">{subtitle}</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowCreate(true)} type="button">
          Add user
        </button>
      </div>

      <div className="toolbar">
        <input
          className="search-input"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {error && <div className="error-banner">{error}</div>}

      <UserTable
        users={users}
        onEdit={setEditingUser}
        onDelete={setDeletingUser}
        onView={setViewingUser}
      />

      {showCreate && <UserFormModal onClose={() => setShowCreate(false)} onSubmit={handleCreate} />}

      {editingUser && (
        <UserFormModal initialUser={editingUser} onClose={() => setEditingUser(null)} onSubmit={handleUpdate} />
      )}

      {viewingUser && (
        <UserDetailModal
          user={viewingUser}
          onClose={() => setViewingUser(null)}
          onEdit={() => {
            setEditingUser(viewingUser);
            setViewingUser(null);
          }}
        />
      )}

      {deletingUser && (
        <ConfirmModal
          title="Delete this user?"
          message={`This will permanently remove ${deletingUser.name} from the system. This can't be undone.`}
          confirmLabel={deleteBusy ? "Deleting…" : "Delete"}
          danger
          onConfirm={handleDelete}
          onCancel={() => setDeletingUser(null)}
        />
      )}
    </>
  );
}
