"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAdmins,
  createAdmin,
  updateAdmin,
  removeAdmin,
  clearAdminError,
} from "@/store/adminManageSlice";

const EMPTY_FORM = { name: "", email: "", password: "", mobile: "", is_active: true };

// text-base on mobile: iOS input focus pe zoom nahi karta
const inputCls =
  "w-full rounded-xl border border-[#E8E3D9] bg-white px-4 py-3 text-base text-[#1F1B44] outline-none focus:border-[#4B3FA0] focus:ring-2 focus:ring-[#4B3FA0]/15 sm:py-2.5 sm:text-sm";

const roleLabel = (r) => (r || "admin").replace(/_/g, " ");

export default function AdminManagementPage() {
  const dispatch = useDispatch();
  const { list = [], loading = false, saving = false, error = null } =
    useSelector((s) => s.adminManage) ?? {};
  const me = useSelector((s) => s.adminAuth?.user);

  const [modal, setModal] = useState(null); // null | "create" | "edit"
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [search, setSearch] = useState("");
  const nameRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  const closeModal = () => {
    setModal(null);
    setEditingId(null);
  };

  const dialogOpen = Boolean(modal || deleteTarget);

  // Dialog khula ho: Escape se band, background scroll lock
  useEffect(() => {
    if (!dialogOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key !== "Escape" || saving) return;
      setModal(null);
      setEditingId(null);
      setDeleteTarget(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [dialogOpen, saving]);

  // Autofocus sirf desktop pe (mobile pe keyboard sheet ko dabata hai)
  useEffect(() => {
    if (!modal) return;
    if (window.matchMedia("(min-width: 640px)").matches) {
      nameRef.current?.focus();
    }
  }, [modal]);

  const openCreate = () => {
    dispatch(clearAdminError());
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModal("create");
  };

  const openEdit = (admin) => {
    dispatch(clearAdminError());
    setForm({
      name: admin.name || "",
      email: admin.email || "",
      password: "",
      mobile: admin.mobile || "",
      is_active: !!admin.is_active,
    });
    setEditingId(admin.id);
    setModal("edit");
  };

  const askDelete = (admin) => {
    dispatch(clearAdminError());
    setDeleteTarget(admin);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    if (modal === "create") {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
        mobile: form.mobile.trim(),
      };
      const res = await dispatch(createAdmin(payload));
      if (createAdmin.fulfilled.match(res)) closeModal();
    } else {
      // Update API accepts only name + is_active
      const payload = { name: form.name.trim(), is_active: form.is_active };
      const res = await dispatch(updateAdmin({ id: editingId, payload }));
      if (updateAdmin.fulfilled.match(res)) closeModal();
    }
  };

  const toggleActive = (admin) => {
    if (admin.id === me?.id) return; // apna account kabhi deactivate nahi
    dispatch(
      updateAdmin({
        id: admin.id,
        payload: { name: admin.name, is_active: !admin.is_active },
      })
    );
  };

  const confirmDelete = async () => {
    if (!deleteTarget || saving) return;
    const res = await dispatch(removeAdmin(deleteTarget.id));
    if (removeAdmin.fulfilled.match(res)) setDeleteTarget(null);
  };

  const q = search.trim().toLowerCase();
  const filtered = list.filter((a) =>
    `${a.name ?? ""} ${a.email ?? ""} ${a.mobile ?? ""}`.toLowerCase().includes(q)
  );

  const showSkeleton = loading && list.length === 0;
  const dim = loading && list.length ? "opacity-60" : "";
  const emptyText = q ? "No admins match your search." : "No admins found.";

  return (
    <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-serif text-2xl text-[#1F1B44] sm:text-3xl">Admin Management</h1>
          <p className="mt-1 text-sm text-[#7A7589]">
            Add, update or remove people who can access this admin panel.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="min-h-[44px] w-full rounded-xl bg-[#1F1B44] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2c2760] sm:w-auto"
        >
          + Add admin
        </button>
      </div>

      {/* Search */}
      <div className="mt-5 w-full sm:mt-6 sm:max-w-sm">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, email or mobile…"
          aria-label="Search admins"
          className={inputCls}
        />
      </div>

      {error && !modal && !deleteTarget && (
        <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span className="min-w-0 break-words">{error}</span>
          <button onClick={() => dispatch(fetchAdmins())} className="shrink-0 font-medium underline">
            Retry
          </button>
        </div>
      )}

      {/* Desktop table (lg+) */}
      <div className={`mt-6 hidden overflow-x-auto rounded-2xl border border-[#EFEADF] bg-white shadow-sm lg:block ${dim}`}>
        <table className="w-full text-left text-sm">
          <thead className="bg-[#FAF8F3] text-xs uppercase tracking-wide text-[#7A7589]">
            <tr>
              <th className="px-5 py-3">Name</th>
              <th className="px-5 py-3">Email</th>
              <th className="px-5 py-3">Mobile</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {showSkeleton &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-t border-[#F3EFE6]">
                  <td colSpan={6} className="px-5 py-4">
                    <div className="h-5 animate-pulse rounded-lg bg-[#F3EFE6]" />
                  </td>
                </tr>
              ))}

            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-[#7A7589]">{emptyText}</td>
              </tr>
            )}

            {filtered.map((a) => {
              const isMe = a.id === me?.id;
              return (
                <tr key={a.id} className="border-t border-[#F3EFE6]">
                  <td className="px-5 py-4 font-medium text-[#1F1B44]">
                    {a.name}
                    {isMe && <YouBadge />}
                  </td>
                  <td className="break-all px-5 py-4 text-[#4a4660]">{a.email}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-[#4a4660]">{a.mobile || "—"}</td>
                  <td className="px-5 py-4"><RolePill role={a.role} /></td>
                  <td className="px-5 py-4">
                    <StatusToggle admin={a} isMe={isMe} saving={saving} onToggle={toggleActive} />
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-right">
                    <button
                      onClick={() => openEdit(a)}
                      className="text-sm font-medium text-[#4B3FA0] hover:underline"
                    >
                      Edit
                    </button>
                    {!isMe && (
                      <button
                        onClick={() => askDelete(a)}
                        className="ml-4 text-sm font-medium text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Cards (< lg): phone pe 1 column, tablet pe 2 */}
      <div className={`mt-6 grid gap-3 sm:gap-4 md:grid-cols-2 lg:hidden ${dim}`}>
        {showSkeleton &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-36 animate-pulse rounded-2xl bg-[#F3EFE6]" />
          ))}

        {!loading && filtered.length === 0 && (
          <div className="rounded-2xl border border-[#EFEADF] bg-white px-5 py-10 text-center text-sm text-[#7A7589] md:col-span-2">
            {emptyText}
          </div>
        )}

        {filtered.map((a) => {
          const isMe = a.id === me?.id;
          return (
            <article key={a.id} className="flex min-w-0 flex-col rounded-2xl border border-[#EFEADF] bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="break-words font-medium text-[#1F1B44]">
                    {a.name}
                    {isMe && <YouBadge />}
                  </div>
                  <a href={`mailto:${a.email}`} className="block break-all text-sm text-[#4a4660]">{a.email}</a>
                  {a.mobile && (
                    <a href={`tel:${a.mobile}`} className="text-sm text-[#7A7589]">{a.mobile}</a>
                  )}
                </div>
                <RolePill role={a.role} />
              </div>

              <div className="mt-3">
                <StatusToggle admin={a} isMe={isMe} saving={saving} onToggle={toggleActive} touch />
              </div>

              <div className="mt-auto flex gap-2 border-t border-[#F3EFE6] pt-3">
                <button
                  onClick={() => openEdit(a)}
                  className="min-h-[44px] flex-1 rounded-xl border border-[#E4DFF5] text-sm font-medium text-[#4B3FA0] transition hover:bg-[#F4F1FC]"
                >
                  Edit
                </button>
                {!isMe && (
                  <button
                    onClick={() => askDelete(a)}
                    className="min-h-[44px] flex-1 rounded-xl border border-red-200 text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Create / Edit: phone pe bottom sheet, bade screen pe centered modal */}
      {modal && (
        <div
          className="fixed inset-x-0 top-0 z-50 flex h-[100dvh] items-end justify-center bg-black/40 sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) closeModal();
          }}
        >
          <form
            onSubmit={handleSubmit}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-modal-title"
            className="flex max-h-[88dvh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:max-h-[90dvh] sm:rounded-2xl"
          >
            {/* Header (fixed) */}
            <div className="shrink-0 px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
              <h2 id="admin-modal-title" className="font-serif text-2xl text-[#1F1B44]">
                {modal === "create" ? "Add new admin" : "Edit admin"}
              </h2>
            </div>

            {/* Body (scrollable) */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 sm:px-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="adm-name" className="mb-1 block text-xs font-medium text-[#7A7589]">Full name</label>
                  <input
                    ref={nameRef}
                    id="adm-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    minLength={2}
                    className={inputCls}
                  />
                </div>

                <div>
                  <label htmlFor="adm-email" className="mb-1 block text-xs font-medium text-[#7A7589]">Email</label>
                  <input
                    id="adm-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    disabled={modal === "edit"}
                    autoComplete="off"
                    className={`${inputCls} disabled:bg-gray-50 disabled:text-gray-400`}
                  />
                </div>

                {modal === "create" && (
                  <>
                    <div>
                      <label htmlFor="adm-pass" className="mb-1 block text-xs font-medium text-[#7A7589]">
                        Password <span className="text-[#A39EB5]">(min 8 characters)</span>
                      </label>
                      <input
                        id="adm-pass"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label htmlFor="adm-mobile" className="mb-1 block text-xs font-medium text-[#7A7589]">Mobile</label>
                      <input
                        id="adm-mobile"
                        name="mobile"
                        type="tel"
                        inputMode="tel"
                        value={form.mobile}
                        onChange={handleChange}
                        required
                        pattern="\+?[0-9]{8,15}"
                        title="8 to 15 digits, optionally starting with +"
                        placeholder="e.g. 9876543210 or +971500000000"
                        className={inputCls}
                      />
                    </div>
                  </>
                )}

                {modal === "edit" && (
                  <label className="flex min-h-[44px] items-center gap-3 text-sm text-[#1F1B44]">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={form.is_active}
                      onChange={handleChange}
                      disabled={editingId === me?.id}
                      className="h-5 w-5 accent-[#4B3FA0]"
                    />
                    <span>
                      Active
                      {editingId === me?.id && (
                        <span className="ml-2 text-xs text-[#A39EB5]">(you can't deactivate yourself)</span>
                      )}
                    </span>
                  </label>
                )}
              </div>

              {error && (
                <p role="alert" className="mt-4 break-words rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              )}
            </div>

            {/* Footer (fixed, hamesha visible) */}
            <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-[#F3EFE6] bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:pb-6">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="min-h-[44px] rounded-xl border border-[#E8E3D9] px-4 py-2 text-sm text-[#1F1B44] hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="min-h-[44px] rounded-xl bg-[#1F1B44] px-5 py-2 text-sm font-medium text-white hover:bg-[#2c2760] disabled:opacity-60"
              >
                {saving ? "Saving…" : modal === "create" ? "Create admin" : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete confirm */}
      {deleteTarget && (
        <div
          className="fixed inset-x-0 top-0 z-50 flex h-[100dvh] items-end justify-center bg-black/40 sm:items-center sm:p-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget && !saving) setDeleteTarget(null);
          }}
        >
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="admin-del-title"
            className="max-h-[88dvh] w-full max-w-sm overflow-y-auto rounded-t-2xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl sm:rounded-2xl sm:p-6"
          >
            <h2 id="admin-del-title" className="font-serif text-2xl text-[#1F1B44]">Remove admin?</h2>
            <p className="mt-2 break-words text-sm text-[#4a4660]">
              <span className="font-medium">{deleteTarget.name}</span> ({deleteTarget.email}) will
              lose access to the admin panel. This can't be undone.
            </p>
            {error && (
              <p role="alert" className="mt-3 break-words rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                disabled={saving}
                className="min-h-[44px] rounded-xl border border-[#E8E3D9] px-4 py-2 text-sm text-[#1F1B44] hover:bg-gray-50 disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={saving}
                className="min-h-[44px] rounded-xl bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
              >
                {saving ? "Removing…" : "Yes, remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- small pieces ---------- */

function YouBadge() {
  return (
    <span className="ml-2 inline-block rounded-full bg-[#FBEFD3] px-2 py-0.5 align-middle text-[11px] font-semibold text-[#8A6411]">
      You
    </span>
  );
}

function RolePill({ role }) {
  return (
    <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-[#EEEAFB] px-3 py-1 text-xs font-medium capitalize text-[#4B3FA0]">
      {roleLabel(role)}
    </span>
  );
}

// Active/Inactive toggle. touch=true (cards) me bada tappable button
function StatusToggle({ admin, isMe, saving, onToggle, touch = false }) {
  return (
    <button
      onClick={() => onToggle(admin)}
      disabled={saving || isMe}
      title={isMe ? "You can't deactivate your own account" : "Click to change status"}
      className={`rounded-full text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
        touch ? "min-h-[40px] px-4" : "px-3 py-1"
      } ${
        admin.is_active
          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      {admin.is_active ? "Active" : "Inactive"}
    </button>
  );
}




// // updated code for AdminManagementPage.jsx is not provided in the snippets you shared. The code appears to be a React component for managing admin users, including creating, editing, and deleting admins, with modals for forms and confirmation dialogs. If you need specific edits or updates to this component, please provide the details or the updated code snippet.





// "use client";

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchAdmins,
//   createAdmin,
//   updateAdmin,
//   removeAdmin,
//   clearAdminError,
// } from "@/store/adminManageSlice";

// const EMPTY_FORM = { name: "", email: "", password: "", mobile: "", is_active: true };

// // text-base on mobile: iOS input focus pe zoom nahi karta
// const inputCls =
//   "w-full rounded-xl border border-[#E8E3D9] bg-white px-4 py-3 text-base text-[#1F1B44] outline-none focus:border-[#4B3FA0] focus:ring-2 focus:ring-[#4B3FA0]/15 sm:py-2.5 sm:text-sm";

// const roleLabel = (r) => (r || "admin").replace(/_/g, " ");

// export default function AdminManagementPage() {
//   const dispatch = useDispatch();
//   const { list = [], loading = false, saving = false, error = null } =
//     useSelector((s) => s.adminManage) ?? {};
//   const me = useSelector((s) => s.adminAuth?.user);

//   const [modal, setModal] = useState(null); // null | "create" | "edit"
//   const [editingId, setEditingId] = useState(null);
//   const [form, setForm] = useState(EMPTY_FORM);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     dispatch(fetchAdmins());
//   }, [dispatch]);

//   const closeModal = () => {
//     setModal(null);
//     setEditingId(null);
//   };

//   const dialogOpen = Boolean(modal || deleteTarget);

//   // Dialog khula ho: Escape se band, background scroll lock
//   useEffect(() => {
//     if (!dialogOpen) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     const onKey = (e) => {
//       if (e.key !== "Escape" || saving) return;
//       setModal(null);
//       setEditingId(null);
//       setDeleteTarget(null);
//     };
//     window.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = prev;
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [dialogOpen, saving]);

//   const openCreate = () => {
//     dispatch(clearAdminError());
//     setForm(EMPTY_FORM);
//     setEditingId(null);
//     setModal("create");
//   };

//   const openEdit = (admin) => {
//     dispatch(clearAdminError());
//     setForm({
//       name: admin.name || "",
//       email: admin.email || "",
//       password: "",
//       mobile: admin.mobile || "",
//       is_active: !!admin.is_active,
//     });
//     setEditingId(admin.id);
//     setModal("edit");
//   };

//   const askDelete = (admin) => {
//     dispatch(clearAdminError());
//     setDeleteTarget(admin);
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (saving) return;

//     if (modal === "create") {
//       const payload = {
//         name: form.name.trim(),
//         email: form.email.trim(),
//         password: form.password,
//         mobile: form.mobile.trim(),
//       };
//       const res = await dispatch(createAdmin(payload));
//       if (createAdmin.fulfilled.match(res)) closeModal();
//     } else {
//       // Update API accepts only name + is_active
//       const payload = { name: form.name.trim(), is_active: form.is_active };
//       const res = await dispatch(updateAdmin({ id: editingId, payload }));
//       if (updateAdmin.fulfilled.match(res)) closeModal();
//     }
//   };

//   const toggleActive = (admin) => {
//     if (admin.id === me?.id) return; // apna account kabhi deactivate nahi
//     dispatch(
//       updateAdmin({
//         id: admin.id,
//         payload: { name: admin.name, is_active: !admin.is_active },
//       })
//     );
//   };

//   const confirmDelete = async () => {
//     if (!deleteTarget || saving) return;
//     const res = await dispatch(removeAdmin(deleteTarget.id));
//     if (removeAdmin.fulfilled.match(res)) setDeleteTarget(null);
//   };

//   const q = search.trim().toLowerCase();
//   const filtered = list.filter((a) =>
//     `${a.name ?? ""} ${a.email ?? ""} ${a.mobile ?? ""}`.toLowerCase().includes(q)
//   );

//   const showSkeleton = loading && list.length === 0;
//   const dim = loading && list.length ? "opacity-60" : "";
//   const emptyText = q ? "No admins match your search." : "No admins found.";

//   return (
//     <div className="mx-auto w-full max-w-[1400px] p-4 sm:p-6 lg:p-10">
//       {/* Header */}
//       <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
//         <div className="min-w-0">
//           <h1 className="font-serif text-2xl text-[#1F1B44] sm:text-3xl">Admin Management</h1>
//           <p className="mt-1 text-sm text-[#7A7589]">
//             Add, update or remove people who can access this admin panel.
//           </p>
//         </div>
//         <button
//           onClick={openCreate}
//           className="min-h-[44px] w-full rounded-xl bg-[#1F1B44] px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#2c2760] sm:w-auto"
//         >
//           + Add admin
//         </button>
//       </div>

//       {/* Search */}
//       <div className="mt-5 w-full sm:mt-6 sm:max-w-sm">
//         <input
//           type="search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search by name, email or mobile…"
//           aria-label="Search admins"
//           className={inputCls}
//         />
//       </div>

//       {error && !modal && !deleteTarget && (
//         <div role="alert" className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           <span className="min-w-0 break-words">{error}</span>
//           <button onClick={() => dispatch(fetchAdmins())} className="shrink-0 font-medium underline">
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Desktop table (lg+) */}
//       <div className={`mt-6 hidden overflow-x-auto rounded-2xl border border-[#EFEADF] bg-white shadow-sm lg:block ${dim}`}>
//         <table className="w-full text-left text-sm">
//           <thead className="bg-[#FAF8F3] text-xs uppercase tracking-wide text-[#7A7589]">
//             <tr>
//               <th className="px-5 py-3">Name</th>
//               <th className="px-5 py-3">Email</th>
//               <th className="px-5 py-3">Mobile</th>
//               <th className="px-5 py-3">Role</th>
//               <th className="px-5 py-3">Status</th>
//               <th className="px-5 py-3 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {showSkeleton &&
//               Array.from({ length: 4 }).map((_, i) => (
//                 <tr key={i} className="border-t border-[#F3EFE6]">
//                   <td colSpan={6} className="px-5 py-4">
//                     <div className="h-5 animate-pulse rounded-lg bg-[#F3EFE6]" />
//                   </td>
//                 </tr>
//               ))}

//             {!loading && filtered.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="px-5 py-10 text-center text-[#7A7589]">{emptyText}</td>
//               </tr>
//             )}

//             {filtered.map((a) => {
//               const isMe = a.id === me?.id;
//               return (
//                 <tr key={a.id} className="border-t border-[#F3EFE6]">
//                   <td className="px-5 py-4 font-medium text-[#1F1B44]">
//                     {a.name}
//                     {isMe && <YouBadge />}
//                   </td>
//                   <td className="break-all px-5 py-4 text-[#4a4660]">{a.email}</td>
//                   <td className="whitespace-nowrap px-5 py-4 text-[#4a4660]">{a.mobile || "—"}</td>
//                   <td className="px-5 py-4"><RolePill role={a.role} /></td>
//                   <td className="px-5 py-4">
//                     <StatusToggle admin={a} isMe={isMe} saving={saving} onToggle={toggleActive} />
//                   </td>
//                   <td className="whitespace-nowrap px-5 py-4 text-right">
//                     <button
//                       onClick={() => openEdit(a)}
//                       className="text-sm font-medium text-[#4B3FA0] hover:underline"
//                     >
//                       Edit
//                     </button>
//                     {!isMe && (
//                       <button
//                         onClick={() => askDelete(a)}
//                         className="ml-4 text-sm font-medium text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     )}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Cards (< lg): phone pe 1 column, tablet pe 2 */}
//       <div className={`mt-6 grid gap-3 sm:gap-4 md:grid-cols-2 lg:hidden ${dim}`}>
//         {showSkeleton &&
//           Array.from({ length: 4 }).map((_, i) => (
//             <div key={i} className="h-36 animate-pulse rounded-2xl bg-[#F3EFE6]" />
//           ))}

//         {!loading && filtered.length === 0 && (
//           <div className="rounded-2xl border border-[#EFEADF] bg-white px-5 py-10 text-center text-sm text-[#7A7589] md:col-span-2">
//             {emptyText}
//           </div>
//         )}

//         {filtered.map((a) => {
//           const isMe = a.id === me?.id;
//           return (
//             <article key={a.id} className="flex min-w-0 flex-col rounded-2xl border border-[#EFEADF] bg-white p-4 shadow-sm">
//               <div className="flex items-start justify-between gap-3">
//                 <div className="min-w-0">
//                   <div className="break-words font-medium text-[#1F1B44]">
//                     {a.name}
//                     {isMe && <YouBadge />}
//                   </div>
//                   <a href={`mailto:${a.email}`} className="block break-all text-sm text-[#4a4660]">{a.email}</a>
//                   {a.mobile && (
//                     <a href={`tel:${a.mobile}`} className="text-sm text-[#7A7589]">{a.mobile}</a>
//                   )}
//                 </div>
//                 <RolePill role={a.role} />
//               </div>

//               <div className="mt-3">
//                 <StatusToggle admin={a} isMe={isMe} saving={saving} onToggle={toggleActive} touch />
//               </div>

//               <div className="mt-auto flex gap-2 border-t border-[#F3EFE6] pt-3">
//                 <button
//                   onClick={() => openEdit(a)}
//                   className="min-h-[44px] flex-1 rounded-xl border border-[#E4DFF5] text-sm font-medium text-[#4B3FA0] transition hover:bg-[#F4F1FC]"
//                 >
//                   Edit
//                 </button>
//                 {!isMe && (
//                   <button
//                     onClick={() => askDelete(a)}
//                     className="min-h-[44px] flex-1 rounded-xl border border-red-200 text-sm font-medium text-red-600 transition hover:bg-red-50"
//                   >
//                     Delete
//                   </button>
//                 )}
//               </div>
//             </article>
//           );
//         })}
//       </div>

//       {/* Create / Edit: phone pe bottom sheet, bade screen pe centered modal */}
//       {modal && (
//         <div
//           className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
//           onMouseDown={(e) => {
//             if (e.target === e.currentTarget && !saving) closeModal();
//           }}
//         >
//           <form
//             onSubmit={handleSubmit}
//             role="dialog"
//             aria-modal="true"
//             aria-labelledby="admin-modal-title"
//             className="max-h-[92dvh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl sm:rounded-2xl sm:p-6"
//           >
//             <h2 id="admin-modal-title" className="font-serif text-2xl text-[#1F1B44]">
//               {modal === "create" ? "Add new admin" : "Edit admin"}
//             </h2>

//             <div className="mt-5 space-y-4">
//               <div>
//                 <label htmlFor="adm-name" className="mb-1 block text-xs font-medium text-[#7A7589]">Full name</label>
//                 <input
//                   id="adm-name"
//                   name="name"
//                   value={form.name}
//                   onChange={handleChange}
//                   required
//                   minLength={2}
//                   autoFocus
//                   className={inputCls}
//                 />
//               </div>

//               <div>
//                 <label htmlFor="adm-email" className="mb-1 block text-xs font-medium text-[#7A7589]">Email</label>
//                 <input
//                   id="adm-email"
//                   type="email"
//                   name="email"
//                   value={form.email}
//                   onChange={handleChange}
//                   required
//                   disabled={modal === "edit"}
//                   autoComplete="off"
//                   className={`${inputCls} disabled:bg-gray-50 disabled:text-gray-400`}
//                 />
//               </div>

//               {modal === "create" && (
//                 <>
//                   <div>
//                     <label htmlFor="adm-pass" className="mb-1 block text-xs font-medium text-[#7A7589]">
//                       Password <span className="text-[#A39EB5]">(min 8 characters)</span>
//                     </label>
//                     <input
//                       id="adm-pass"
//                       type="password"
//                       name="password"
//                       value={form.password}
//                       onChange={handleChange}
//                       required
//                       minLength={8}
//                       autoComplete="new-password"
//                       className={inputCls}
//                     />
//                   </div>
//                   <div>
//                     <label htmlFor="adm-mobile" className="mb-1 block text-xs font-medium text-[#7A7589]">Mobile</label>
//                     <input
//                       id="adm-mobile"
//                       name="mobile"
//                       type="tel"
//                       inputMode="tel"
//                       value={form.mobile}
//                       onChange={handleChange}
//                       required
//                       pattern="\+?[0-9]{8,15}"
//                       title="8 to 15 digits, optionally starting with +"
//                       placeholder="e.g. 9876543210 or +971500000000"
//                       className={inputCls}
//                     />
//                   </div>
//                 </>
//               )}

//               {modal === "edit" && (
//                 <label className="flex min-h-[44px] items-center gap-3 text-sm text-[#1F1B44]">
//                   <input
//                     type="checkbox"
//                     name="is_active"
//                     checked={form.is_active}
//                     onChange={handleChange}
//                     disabled={editingId === me?.id}
//                     className="h-5 w-5 accent-[#4B3FA0]"
//                   />
//                   <span>
//                     Active
//                     {editingId === me?.id && (
//                       <span className="ml-2 text-xs text-[#A39EB5]">(you can't deactivate yourself)</span>
//                     )}
//                   </span>
//                 </label>
//               )}
//             </div>

//             {error && (
//               <p role="alert" className="mt-4 break-words rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
//             )}

//             <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
//               <button
//                 type="button"
//                 onClick={closeModal}
//                 disabled={saving}
//                 className="min-h-[44px] rounded-xl border border-[#E8E3D9] px-4 py-2 text-sm text-[#1F1B44] hover:bg-gray-50 disabled:opacity-60"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="min-h-[44px] rounded-xl bg-[#1F1B44] px-5 py-2 text-sm font-medium text-white hover:bg-[#2c2760] disabled:opacity-60"
//               >
//                 {saving ? "Saving…" : modal === "create" ? "Create admin" : "Save changes"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Delete confirm */}
//       {deleteTarget && (
//         <div
//           className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 sm:items-center sm:p-4"
//           onMouseDown={(e) => {
//             if (e.target === e.currentTarget && !saving) setDeleteTarget(null);
//           }}
//         >
//           <div
//             role="alertdialog"
//             aria-modal="true"
//             aria-labelledby="admin-del-title"
//             className="w-full max-w-sm rounded-t-2xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-xl sm:rounded-2xl sm:p-6"
//           >
//             <h2 id="admin-del-title" className="font-serif text-2xl text-[#1F1B44]">Remove admin?</h2>
//             <p className="mt-2 break-words text-sm text-[#4a4660]">
//               <span className="font-medium">{deleteTarget.name}</span> ({deleteTarget.email}) will
//               lose access to the admin panel. This can't be undone.
//             </p>
//             {error && (
//               <p role="alert" className="mt-3 break-words rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
//             )}
//             <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
//               <button
//                 onClick={() => setDeleteTarget(null)}
//                 disabled={saving}
//                 className="min-h-[44px] rounded-xl border border-[#E8E3D9] px-4 py-2 text-sm text-[#1F1B44] hover:bg-gray-50 disabled:opacity-60"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 disabled={saving}
//                 className="min-h-[44px] rounded-xl bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60"
//               >
//                 {saving ? "Removing…" : "Yes, remove"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- small pieces ---------- */

// function YouBadge() {
//   return (
//     <span className="ml-2 inline-block rounded-full bg-[#FBEFD3] px-2 py-0.5 align-middle text-[11px] font-semibold text-[#8A6411]">
//       You
//     </span>
//   );
// }

// function RolePill({ role }) {
//   return (
//     <span className="inline-block shrink-0 whitespace-nowrap rounded-full bg-[#EEEAFB] px-3 py-1 text-xs font-medium capitalize text-[#4B3FA0]">
//       {roleLabel(role)}
//     </span>
//   );
// }

// // Active/Inactive toggle. touch=true (cards) me bada tappable button
// function StatusToggle({ admin, isMe, saving, onToggle, touch = false }) {
//   return (
//     <button
//       onClick={() => onToggle(admin)}
//       disabled={saving || isMe}
//       title={isMe ? "You can't deactivate your own account" : "Click to change status"}
//       className={`rounded-full text-xs font-medium transition disabled:cursor-not-allowed disabled:opacity-60 ${
//         touch ? "min-h-[40px] px-4" : "px-3 py-1"
//       } ${
//         admin.is_active
//           ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
//           : "bg-gray-100 text-gray-500 hover:bg-gray-200"
//       }`}
//     >
//       {admin.is_active ? "Active" : "Inactive"}
//     </button>
//   );
// }