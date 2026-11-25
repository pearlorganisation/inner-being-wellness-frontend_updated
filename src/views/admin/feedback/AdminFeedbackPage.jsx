// "use client";

// import { useEffect, useRef, useState } from "react";
// import Stars from "@/components/feedback/Stars";
// import {
//   getAdminFeedbacksApi,
//   updateAdminFeedbackApi,
//   setFeedbackStatusApi,
//   deleteAdminFeedbackApi,
//   rowsOf,
//   errMsg,
//   fmtDate,
//   customerOf,
// } from "@/services/feedbackService";

// const LIMIT = 10;

// const inputCls =
//   "w-full rounded-lg border border-[#EAE5DD] bg-white px-3 py-2.5 text-sm text-[#1F1B44] outline-none transition focus:border-[#13382C] focus:ring-2 focus:ring-[#13382C]/15";

// function Avatar({ name, pic }) {
//   const [broken, setBroken] = useState(false);
//   if (pic && !broken) {
//     return (
//       <img
//         src={pic}
//         alt={name}
//         onError={() => setBroken(true)}
//         referrerPolicy="no-referrer"
//         className="h-9 w-9 shrink-0 rounded-full object-cover"
//       />
//     );
//   }
//   return (
//     <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4ECE6] text-sm font-semibold text-[#13382C]">
//       {(name || "C").charAt(0).toUpperCase()}
//     </span>
//   );
// }

// export default function AdminFeedbackPage() {
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [reload, setReload] = useState(0);

//   // filters
//   const [status, setStatus] = useState("all"); // all | true | false
//   const [rating, setRating] = useState("");
//   const [searchInput, setSearchInput] = useState("");
//   const [search, setSearch] = useState("");

//   // modal / delete / toast
//   const [editing, setEditing] = useState(null); // feedback object
//   const [form, setForm] = useState(null);
//   const [formError, setFormError] = useState("");
//   const [saving, setSaving] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deleting, setDeleting] = useState(false);
//   const [toast, setToast] = useState(null);
//   const toastTimer = useRef(null);

//   const showToast = (type, text) => {
//     setToast({ type, text });
//     clearTimeout(toastTimer.current);
//     toastTimer.current = setTimeout(() => setToast(null), 3000);
//   };

//   useEffect(() => () => clearTimeout(toastTimer.current), []);

//   /* ---------- fetch ---------- */
//   useEffect(() => {
//     let alive = true;
//     (async () => {
//       setLoading(true);
//       setError("");
//       try {
//         const data = await getAdminFeedbacksApi({
//           page,
//           limit: LIMIT,
//           is_active: status === "all" ? undefined : status,
//           rating: rating || undefined,
//           search: search || undefined,
//         });
//         if (!alive) return;
//         const rows = rowsOf(data);
//         setItems(rows);
//         setTotal(data?.total ?? rows.length);
//         setTotalPages(data?.total_pages || 1);
//       } catch (e) {
//         if (alive) setError(errMsg(e));
//       } finally {
//         if (alive) setLoading(false);
//       }
//     })();
//     return () => {
//       alive = false;
//     };
//   }, [page, status, rating, search, reload]);

//   const refresh = () => setReload((n) => n + 1);

//   /* ---------- filters ---------- */
//   const applySearch = (e) => {
//     e.preventDefault();
//     setPage(1);
//     setSearch(searchInput.trim());
//   };

//   const resetFilters = () => {
//     setStatus("all");
//     setRating("");
//     setSearchInput("");
//     setSearch("");
//     setPage(1);
//   };

//   /* ---------- approve / hide ---------- */
//   const toggleStatus = async (f) => {
//     try {
//       await setFeedbackStatusApi(f.id, !f.is_active);
//       setItems((prev) =>
//         prev.map((x) =>
//           x.id === f.id ? { ...x, is_active: !f.is_active } : x,
//         ),
//       );
//       showToast(
//         "success",
//         f.is_active ? "Feedback hidden" : "Feedback approved",
//       );
//     } catch (e) {
//       showToast("error", errMsg(e));
//     }
//   };

//   /* ---------- edit ---------- */
//   const openEdit = (f) => {
//     setEditing(f);
//     setFormError("");
//     setForm({
//       rating: f.rating || 5,
//       title: f.title || "",
//       comment: f.comment || "",
//       is_active: !!f.is_active,
//       admin_notes: f.admin_notes || "",
//     });
//   };

//   const closeEdit = () => {
//     if (saving) return;
//     setEditing(null);
//     setForm(null);
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();
//     if (!form.comment.trim()) return setFormError("Comment is required");

//     setSaving(true);
//     setFormError("");
//     try {
//       await updateAdminFeedbackApi(editing.id, {
//         rating: Number(form.rating),
//         title: form.title.trim(),
//         comment: form.comment.trim(),
//         is_active: form.is_active,
//         admin_notes: form.admin_notes.trim(),
//       });
//       setEditing(null);
//       setForm(null);
//       showToast("success", "Feedback updated");
//       refresh();
//     } catch (err) {
//       setFormError(errMsg(err));
//     } finally {
//       setSaving(false);
//     }
//   };

//   /* ---------- delete ---------- */
//   const handleDelete = async () => {
//     if (!deleteTarget) return;
//     setDeleting(true);
//     try {
//       await deleteAdminFeedbackApi(deleteTarget.id);
//       showToast("success", "Feedback deleted");
//       if (items.length === 1 && page > 1) setPage(page - 1);
//       else refresh();
//     } catch (e) {
//       showToast("error", errMsg(e));
//     } finally {
//       setDeleting(false);
//       setDeleteTarget(null);
//     }
//   };

//   const hasFilters = status !== "all" || rating || search;

//   return (
//     <div className="p-6 pb-24">
//       {/* Toast */}
//       {toast && (
//         <div
//           className={`fixed right-6 top-6 z-[60] rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
//             toast.type === "success" ? "bg-[#13382C]" : "bg-red-600"
//           }`}
//         >
//           {toast.text}
//         </div>
//       )}

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="font-serif text-3xl text-[#1F1B44]">Feedback</h1>
//         <p className="mt-1 text-sm text-[#6B6673]">
//           {total} total · Testimonials will be displayed on the website only
//           after approval.
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="mb-4 flex flex-wrap items-center gap-3">
//         <form onSubmit={applySearch} className="flex flex-1 gap-2 sm:max-w-sm">
//           <input
//             value={searchInput}
//             onChange={(e) => setSearchInput(e.target.value)}
//             placeholder="Search feedback, name or email"
//             className={inputCls}
//           />
//           <button
//             type="submit"
//             className="rounded-lg bg-[#13382C] px-4 text-sm font-semibold text-white transition hover:bg-[#1E4839]"
//           >
//             Search
//           </button>
//         </form>

//         <select
//           value={status}
//           onChange={(e) => {
//             setStatus(e.target.value);
//             setPage(1);
//           }}
//           className={`${inputCls} w-auto`}
//         >
//           <option value="all">All status</option>
//           <option value="true">Approved</option>
//           <option value="false">Pending / Hidden</option>
//         </select>

//         <select
//           value={rating}
//           onChange={(e) => {
//             setRating(e.target.value);
//             setPage(1);
//           }}
//           className={`${inputCls} w-auto`}
//         >
//           <option value="">All ratings</option>
//           {[5, 4, 3, 2, 1].map((n) => (
//             <option key={n} value={n}>
//               {n} star{n > 1 ? "s" : ""}
//             </option>
//           ))}
//         </select>

//         {hasFilters && (
//           <button
//             onClick={resetFilters}
//             className="text-sm font-semibold text-[#13382C] underline"
//           >
//             Clear
//           </button>
//         )}
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="mb-4 flex items-center justify-between rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
//           <span>{error}</span>
//           <button onClick={refresh} className="font-semibold underline">
//             Retry
//           </button>
//         </div>
//       )}

//       {/* Table */}
//       <div className="overflow-hidden rounded-xl border border-[#EAE5DD] bg-white shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[900px] text-left text-sm">
//             <thead className="bg-[#E4ECE6] text-[#1F1B44]">
//               <tr>
//                 <th className="px-5 py-3.5 font-semibold">Customer</th>
//                 <th className="w-36 px-5 py-3.5 font-semibold">Rating</th>
//                 <th className="px-5 py-3.5 font-semibold">Feedback</th>
//                 <th className="w-32 px-5 py-3.5 font-semibold">Status</th>
//                 <th className="w-52 px-5 py-3.5 text-right font-semibold">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className={loading && items.length ? "opacity-50" : ""}>
//               {loading && items.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-5 py-14 text-center text-[#6B6673]"
//                   >
//                     Loading feedback...
//                   </td>
//                 </tr>
//               ) : items.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan={5}
//                     className="px-5 py-14 text-center text-[#6B6673]"
//                   >
//                     No feedback found.
//                   </td>
//                 </tr>
//               ) : (
//                 items.map((f) => {
//                   const c = customerOf(f);
//                   return (
//                     <tr
//                       key={f.id}
//                       className="border-t border-[#EAE5DD] align-top transition hover:bg-[#E4ECE6]/40"
//                     >
//                       {/* Customer */}
//                       <td className="px-5 py-4">
//                         <div className="flex items-center gap-3">
//                           <Avatar name={c.name} pic={c.pic} />
//                           <div className="min-w-0">
//                             <p className="truncate font-medium text-[#1F1B44]">
//                               {c.name}
//                             </p>
//                             {c.email && (
//                               <p className="truncate text-xs text-[#6B6673]">
//                                 {c.email}
//                               </p>
//                             )}
//                             {c.mobile && (
//                               <p className="text-xs text-[#6B6673]">
//                                 {c.mobile}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </td>

//                       {/* Rating */}
//                       <td className="px-5 py-4">
//                         <Stars value={f.rating} size="h-4 w-4" />
//                         <p className="mt-1 text-xs text-[#6B6673]">
//                           {fmtDate(f.created_at)}
//                         </p>
//                       </td>

//                       {/* Feedback */}
//                       <td className="max-w-sm px-5 py-4">
//                         {f.title && (
//                           <p className="font-medium text-[#1F1B44]">
//                             {f.title}
//                           </p>
//                         )}
//                         <p
//                           className="line-clamp-2 text-[#6B6673]"
//                           title={f.comment}
//                         >
//                           {f.comment}
//                         </p>
//                         {f.admin_notes && (
//                           <p className="mt-1 text-xs italic text-[#8A6A1F]">
//                             Note: {f.admin_notes}
//                           </p>
//                         )}
//                       </td>

//                       {/* Status */}
//                       <td className="px-5 py-4">
//                         <button
//                           onClick={() => toggleStatus(f)}
//                           title={
//                             f.is_active ? "Click to hide" : "Click to approve"
//                           }
//                           className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
//                             f.is_active
//                               ? "bg-[#D2E3D8] text-[#13382C] hover:bg-[#c2d8c9]"
//                               : "bg-[#F5ECD7] text-[#8A6A1F] hover:bg-[#efe2c0]"
//                           }`}
//                         >
//                           {f.is_active ? "Approved" : "Pending"}
//                         </button>
//                       </td>

//                       {/* Actions */}
//                       <td className="px-5 py-4">
//                         <div className="flex items-center justify-end gap-2 whitespace-nowrap">
//                           <button
//                             onClick={() => openEdit(f)}
//                             className="rounded-md border border-[#13382C]/30 px-3 py-1 text-xs font-semibold text-[#13382C] transition hover:bg-[#13382C] hover:text-white"
//                           >
//                             View / Edit
//                           </button>
//                           <button
//                             onClick={() => setDeleteTarget(f)}
//                             className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
//         <span className="text-[#6B6673]">
//           {total === 0
//             ? "No results"
//             : `Showing ${(page - 1) * LIMIT + 1}–${Math.min(page * LIMIT, total)} of ${total}`}
//         </span>
//         <div className="flex items-center gap-3">
//           <button
//             disabled={page <= 1 || loading}
//             onClick={() => setPage(page - 1)}
//             className="rounded-lg border border-[#EAE5DD] bg-white px-4 py-2 text-[#1F1B44] transition hover:bg-[#E4ECE6] disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             Prev
//           </button>
//           <span className="text-[#6B6673]">
//             Page {page} of {totalPages}
//           </span>
//           <button
//             disabled={page >= totalPages || loading}
//             onClick={() => setPage(page + 1)}
//             className="rounded-lg border border-[#EAE5DD] bg-white px-4 py-2 text-[#1F1B44] transition hover:bg-[#E4ECE6] disabled:cursor-not-allowed disabled:opacity-40"
//           >
//             Next
//           </button>
//         </div>
//       </div>

//       {/* Edit modal */}
//       {editing && form && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
//           onMouseDown={(e) => e.target === e.currentTarget && closeEdit()}
//         >
//           <form
//             onSubmit={handleSave}
//             className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl"
//           >
//             <h2 className="mb-4 font-serif text-2xl text-[#1F1B44]">
//               Feedback Details
//             </h2>

//             {/* Customer info (read-only) */}
//             {(() => {
//               const c = customerOf(editing);
//               return (
//                 <div className="mb-5 flex items-center gap-3 rounded-xl bg-[#E4ECE6]/60 p-3">
//                   <Avatar name={c.name} pic={c.pic} />
//                   <div className="min-w-0 text-sm">
//                     <p className="font-semibold text-[#1F1B44]">{c.name}</p>
//                     <p className="truncate text-xs text-[#6B6673]">
//                       {[c.email, c.mobile].filter(Boolean).join(" · ")}
//                     </p>
//                   </div>
//                 </div>
//               );
//             })()}

//             {formError && (
//               <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
//                 {formError}
//               </div>
//             )}

//             <label className="mb-1.5 block text-sm font-medium text-[#1F1B44]">
//               Rating
//             </label>
//             <div className="mb-4">
//               <Stars
//                 value={Number(form.rating)}
//                 onChange={(n) => setForm({ ...form, rating: n })}
//                 size="h-7 w-7"
//               />
//             </div>

//             <label className="mb-1.5 block text-sm font-medium text-[#1F1B44]">
//               Title
//             </label>
//             <input
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               className={`${inputCls} mb-4`}
//             />

//             <label className="mb-1.5 block text-sm font-medium text-[#1F1B44]">
//               Comment <span className="text-red-500">*</span>
//             </label>
//             <textarea
//               rows={4}
//               value={form.comment}
//               onChange={(e) => setForm({ ...form, comment: e.target.value })}
//               className={`${inputCls} mb-4 resize-none`}
//             />

//             <label className="mb-1.5 block text-sm font-medium text-[#1F1B44]">
//               Admin notes <span className="text-[#6B6673]">(internal)</span>
//             </label>
//             <textarea
//               rows={2}
//               value={form.admin_notes}
//               onChange={(e) =>
//                 setForm({ ...form, admin_notes: e.target.value })
//               }
//               placeholder="Only admins can see this"
//               className={`${inputCls} mb-4 resize-none`}
//             />

//             <label className="mb-2 flex cursor-pointer items-center gap-2 text-sm text-[#1F1B44]">
//               <input
//                 type="checkbox"
//                 checked={form.is_active}
//                 onChange={(e) =>
//                   setForm({ ...form, is_active: e.target.checked })
//                 }
//                 className="h-4 w-4 accent-[#13382C]"
//               />
//               Approved
//             </label>

//             <div className="mt-6 flex justify-end gap-3">
//               <button
//                 type="button"
//                 onClick={closeEdit}
//                 disabled={saving}
//                 className="rounded-lg border border-[#EAE5DD] px-5 py-2.5 text-sm font-medium text-[#1F1B44] transition hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={saving}
//                 className="rounded-lg bg-[#13382C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E4839] disabled:opacity-60"
//               >
//                 {saving ? "Saving..." : "Save changes"}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Delete confirm */}
//       {deleteTarget && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
//           onMouseDown={(e) =>
//             e.target === e.currentTarget && !deleting && setDeleteTarget(null)
//           }
//         >
//           <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
//             <h3 className="mb-2 font-serif text-xl text-[#1F1B44]">
//               Delete feedback?
//             </h3>
//             <p className="mb-6 text-sm text-[#6B6673]">
//               <span className="font-semibold text-[#1F1B44]">
//                 {customerOf(deleteTarget).name}
//               </span>{" "}
//               The feedback will be permanently deleted.
//             </p>
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setDeleteTarget(null)}
//                 disabled={deleting}
//                 className="rounded-lg border border-[#EAE5DD] px-5 py-2.5 text-sm font-medium text-[#1F1B44] transition hover:bg-gray-50 disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDelete}
//                 disabled={deleting}
//                 className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
//               >
//                 {deleting ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }







"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Stars from "@/components/feedback/Stars";
import {
  getAdminFeedbacksApi,
  updateAdminFeedbackApi,
  setFeedbackStatusApi,
  deleteAdminFeedbackApi,
  rowsOf,
  errMsg,
  fmtDate,
  customerOf,
} from "@/services/feedbackService";

const LIMIT = 10;

// text-base on mobile: iOS input focus pe zoom nahi karta
const inputCls =
  "w-full rounded-lg border border-[#EAE5DD] bg-white px-3 py-3 text-base text-[#1F1B44] outline-none transition focus:border-[#13382C] focus:ring-2 focus:ring-[#13382C]/15 sm:py-2.5 sm:text-sm";

/* document.body me render: parent ke transform/filter se fixed nahi tootta */
function Portal({ children }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return createPortal(<div data-admin-shell>{children}</div>, document.body);
}

function Avatar({ name, pic }) {
  const [broken, setBroken] = useState(false);
  if (pic && !broken) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={pic}
        alt={name}
        onError={() => setBroken(true)}
        referrerPolicy="no-referrer"
        className="h-9 w-9 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E4ECE6] text-sm font-semibold text-[#13382C]">
      {(name || "C").charAt(0).toUpperCase()}
    </span>
  );
}

function StatusPill({ active, onClick, touch = false }) {
  return (
    <button
      onClick={onClick}
      title={active ? "Click to hide" : "Click to approve"}
      className={`shrink-0 rounded-full text-xs font-semibold transition ${
        touch ? "min-h-[36px] px-4" : "px-3 py-1"
      } ${
        active
          ? "bg-[#D2E3D8] text-[#13382C] hover:bg-[#c2d8c9]"
          : "bg-[#F5ECD7] text-[#8A6A1F] hover:bg-[#efe2c0]"
      }`}
    >
      {active ? "Approved" : "Pending"}
    </button>
  );
}

export default function AdminFeedbackPage() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);

  // filters
  const [status, setStatus] = useState("all"); // all | true | false
  const [rating, setRating] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // modal / delete / toast
  const [editing, setEditing] = useState(null); // feedback object
  const [form, setForm] = useState(null);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = (type, text) => {
    setToast({ type, text });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const dialogOpen = Boolean((editing && form) || deleteTarget);

  // Dialog khula ho: Escape se band, background scroll lock
  useEffect(() => {
    if (!dialogOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key !== "Escape" || saving || deleting) return;
      setEditing(null);
      setForm(null);
      setDeleteTarget(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [dialogOpen, saving, deleting]);

  /* ---------- fetch ---------- */
  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getAdminFeedbacksApi({
          page,
          limit: LIMIT,
          is_active: status === "all" ? undefined : status,
          rating: rating || undefined,
          search: search || undefined,
        });
        if (!alive) return;
        const rows = rowsOf(data);
        setItems(rows);
        setTotal(data?.total ?? rows.length);
        setTotalPages(data?.total_pages || 1);
      } catch (e) {
        if (alive) setError(errMsg(e));
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [page, status, rating, search, reload]);

  const refresh = () => setReload((n) => n + 1);

  /* ---------- filters ---------- */
  const applySearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const resetFilters = () => {
    setStatus("all");
    setRating("");
    setSearchInput("");
    setSearch("");
    setPage(1);
  };

  /* ---------- approve / hide ---------- */
  const toggleStatus = async (f) => {
    try {
      await setFeedbackStatusApi(f.id, !f.is_active);
      setItems((prev) =>
        prev.map((x) =>
          x.id === f.id ? { ...x, is_active: !f.is_active } : x,
        ),
      );
      showToast(
        "success",
        f.is_active ? "Feedback hidden" : "Feedback approved",
      );
    } catch (e) {
      showToast("error", errMsg(e));
    }
  };

  /* ---------- edit ---------- */
  const openEdit = (f) => {
    setEditing(f);
    setFormError("");
    setForm({
      rating: f.rating || 5,
      title: f.title || "",
      comment: f.comment || "",
      is_active: !!f.is_active,
      admin_notes: f.admin_notes || "",
    });
  };

  const closeEdit = () => {
    if (saving) return;
    setEditing(null);
    setForm(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (saving) return;
    if (!form.comment.trim()) return setFormError("Comment is required");

    setSaving(true);
    setFormError("");
    try {
      await updateAdminFeedbackApi(editing.id, {
        rating: Number(form.rating),
        title: form.title.trim(),
        comment: form.comment.trim(),
        is_active: form.is_active,
        admin_notes: form.admin_notes.trim(),
      });
      setEditing(null);
      setForm(null);
      showToast("success", "Feedback updated");
      refresh();
    } catch (err) {
      setFormError(errMsg(err));
    } finally {
      setSaving(false);
    }
  };

  /* ---------- delete ---------- */
  const handleDelete = async () => {
    if (!deleteTarget || deleting) return;
    setDeleting(true);
    try {
      await deleteAdminFeedbackApi(deleteTarget.id);
      showToast("success", "Feedback deleted");
      if (items.length === 1 && page > 1) setPage(page - 1);
      else refresh();
    } catch (e) {
      showToast("error", errMsg(e));
    } finally {
      setDeleting(false);
      setDeleteTarget(null);
    }
  };

  const hasFilters = status !== "all" || rating || search;
  const showEmpty = !loading && items.length === 0;
  const showInitialLoad = loading && items.length === 0;
  const dim = loading && items.length ? "opacity-50" : "";

  return (
    <div className="mx-auto w-full max-w-[1400px] p-4 pb-24 sm:p-6 lg:p-8">
      {/* Toast (portal) */}
      {toast && (
        <Portal>
          <div
            role="status"
            className={`fixed inset-x-4 top-4 z-[70] rounded-lg px-4 py-3 text-center text-sm font-medium text-white shadow-lg sm:inset-x-auto sm:right-6 sm:top-6 sm:text-left ${
              toast.type === "success" ? "bg-[#13382C]" : "bg-red-600"
            }`}
          >
            {toast.text}
          </div>
        </Portal>
      )}

      {/* Header */}
      <div className="mb-5 sm:mb-6">
        <h1 className="font-serif text-2xl text-[#1F1B44] sm:text-3xl">
          Feedback
        </h1>
        <p className="mt-1 text-sm text-[#6B6673]">
          {total} total · Testimonials will be displayed on the website only
          after approval.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <form
          onSubmit={applySearch}
          className="flex w-full gap-2 sm:max-w-sm sm:flex-1"
        >
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search feedback, name or email"
            aria-label="Search feedback"
            className={`${inputCls} min-w-0 flex-1`}
          />
          <button
            type="submit"
            className="min-h-[44px] shrink-0 rounded-lg bg-[#13382C] px-4 text-sm font-semibold text-white transition hover:bg-[#1E4839] sm:min-h-0"
          >
            Search
          </button>
        </form>

        <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by status"
            className={`${inputCls} min-w-0 sm:w-auto`}
          >
            <option value="all">All status</option>
            <option value="true">Approved</option>
            <option value="false">Pending / Hidden</option>
          </select>

          <select
            value={rating}
            onChange={(e) => {
              setRating(e.target.value);
              setPage(1);
            }}
            aria-label="Filter by rating"
            className={`${inputCls} min-w-0 sm:w-auto`}
          >
            <option value="">All ratings</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {n} star{n > 1 ? "s" : ""}
              </option>
            ))}
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={resetFilters}
            className="min-h-[40px] self-start text-sm font-semibold text-[#13382C] underline sm:min-h-0 sm:self-auto"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span className="min-w-0 break-words">{error}</span>
          <button onClick={refresh} className="shrink-0 font-semibold underline">
            Retry
          </button>
        </div>
      )}

      {/* Desktop table (lg+) */}
      <div className="hidden overflow-hidden rounded-xl border border-[#EAE5DD] bg-white shadow-sm lg:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-[#E4ECE6] text-[#1F1B44]">
              <tr>
                <th className="px-5 py-3.5 font-semibold">Customer</th>
                <th className="w-36 px-5 py-3.5 font-semibold">Rating</th>
                <th className="px-5 py-3.5 font-semibold">Feedback</th>
                <th className="w-32 px-5 py-3.5 font-semibold">Status</th>
                <th className="w-52 px-5 py-3.5 text-right font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className={dim}>
              {showInitialLoad ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-14 text-center text-[#6B6673]"
                  >
                    Loading feedback...
                  </td>
                </tr>
              ) : showEmpty ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-14 text-center text-[#6B6673]"
                  >
                    No feedback found.
                  </td>
                </tr>
              ) : (
                items.map((f) => {
                  const c = customerOf(f);
                  return (
                    <tr
                      key={f.id}
                      className="border-t border-[#EAE5DD] align-top transition hover:bg-[#E4ECE6]/40"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar name={c.name} pic={c.pic} />
                          <div className="min-w-0">
                            <p className="truncate font-medium text-[#1F1B44]">
                              {c.name}
                            </p>
                            {c.email && (
                              <p className="truncate text-xs text-[#6B6673]">
                                {c.email}
                              </p>
                            )}
                            {c.mobile && (
                              <p className="text-xs text-[#6B6673]">
                                {c.mobile}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <Stars value={f.rating} size="h-4 w-4" />
                        <p className="mt-1 text-xs text-[#6B6673]">
                          {fmtDate(f.created_at)}
                        </p>
                      </td>

                      <td className="max-w-sm px-5 py-4">
                        {f.title && (
                          <p className="font-medium text-[#1F1B44]">
                            {f.title}
                          </p>
                        )}
                        <p
                          className="line-clamp-2 text-[#6B6673]"
                          title={f.comment}
                        >
                          {f.comment}
                        </p>
                        {f.admin_notes && (
                          <p className="mt-1 text-xs italic text-[#8A6A1F]">
                            Note: {f.admin_notes}
                          </p>
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <StatusPill
                          active={f.is_active}
                          onClick={() => toggleStatus(f)}
                        />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
                          <button
                            onClick={() => openEdit(f)}
                            className="rounded-md border border-[#13382C]/30 px-3 py-1 text-xs font-semibold text-[#13382C] transition hover:bg-[#13382C] hover:text-white"
                          >
                            View / Edit
                          </button>
                          <button
                            onClick={() => setDeleteTarget(f)}
                            className="rounded-md border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards (< lg): phone pe 1 column, tablet pe 2 */}
      <div className={`grid gap-3 sm:gap-4 md:grid-cols-2 lg:hidden ${dim}`}>
        {showInitialLoad &&
          Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-2xl bg-[#E4ECE6]/70"
            />
          ))}

        {showEmpty && (
          <div className="rounded-2xl border border-[#EAE5DD] bg-white px-5 py-10 text-center text-sm text-[#6B6673] md:col-span-2">
            No feedback found.
          </div>
        )}

        {items.map((f) => {
          const c = customerOf(f);
          return (
            <article
              key={f.id}
              className="flex min-w-0 flex-col rounded-2xl border border-[#EAE5DD] bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={c.name} pic={c.pic} />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-[#1F1B44]">
                      {c.name}
                    </p>
                    {c.email && (
                      <p className="truncate text-xs text-[#6B6673]">
                        {c.email}
                      </p>
                    )}
                    {c.mobile && (
                      <p className="text-xs text-[#6B6673]">{c.mobile}</p>
                    )}
                  </div>
                </div>
                <StatusPill
                  active={f.is_active}
                  onClick={() => toggleStatus(f)}
                  touch
                />
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                <Stars value={f.rating} size="h-4 w-4" />
                <span className="text-xs text-[#6B6673]">
                  {fmtDate(f.created_at)}
                </span>
              </div>

              <div className="mt-3 min-w-0">
                {f.title && (
                  <p className="break-words font-medium text-[#1F1B44]">
                    {f.title}
                  </p>
                )}
                <p className="line-clamp-4 break-words text-sm text-[#6B6673]">
                  {f.comment}
                </p>
                {f.admin_notes && (
                  <p className="mt-1 break-words text-xs italic text-[#8A6A1F]">
                    Note: {f.admin_notes}
                  </p>
                )}
              </div>

              <div className="mt-auto flex gap-2 border-t border-[#EAE5DD] pt-3">
                <button
                  onClick={() => openEdit(f)}
                  className="mt-3 min-h-[44px] flex-1 rounded-xl border border-[#13382C]/30 text-sm font-semibold text-[#13382C] transition hover:bg-[#13382C] hover:text-white"
                >
                  View / Edit
                </button>
                <button
                  onClick={() => setDeleteTarget(f)}
                  className="mt-3 min-h-[44px] flex-1 rounded-xl border border-red-200 text-sm font-semibold text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  Delete
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col gap-3 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span className="text-center text-[#6B6673] sm:text-left">
          {total === 0
            ? "No results"
            : `Showing ${(page - 1) * LIMIT + 1}–${Math.min(page * LIMIT, total)} of ${total}`}
        </span>
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            disabled={page <= 1 || loading}
            onClick={() => setPage(page - 1)}
            className="min-h-[44px] flex-1 rounded-lg border border-[#EAE5DD] bg-white px-4 py-2 text-[#1F1B44] transition hover:bg-[#E4ECE6] disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-0 sm:flex-none"
          >
            Prev
          </button>
          <span className="whitespace-nowrap px-1 text-center text-[#6B6673]">
            Page {page} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages || loading}
            onClick={() => setPage(page + 1)}
            className="min-h-[44px] flex-1 rounded-lg border border-[#EAE5DD] bg-white px-4 py-2 text-[#1F1B44] transition hover:bg-[#E4ECE6] disabled:cursor-not-allowed disabled:opacity-40 sm:min-h-0 sm:flex-none"
          >
            Next
          </button>
        </div>
      </div>

      {/* Edit modal (portal): phone pe bottom sheet, bade screen pe centered */}
      {editing && form && (
        <Portal>
          <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
            style={{ height: "100dvh" }}
            onMouseDown={(e) => e.target === e.currentTarget && closeEdit()}
          >
            <form
              onSubmit={handleSave}
              role="dialog"
              aria-modal="true"
              aria-labelledby="fb-modal-title"
              className="flex max-h-[88dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:max-h-[90dvh] sm:rounded-2xl"
            >
              {/* Header (fixed) */}
              <div className="shrink-0 px-5 pb-3 pt-5 sm:px-6 sm:pt-6">
                <h2
                  id="fb-modal-title"
                  className="font-serif text-2xl text-[#1F1B44]"
                >
                  Feedback Details
                </h2>
              </div>

              {/* Body (scrollable) */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 sm:px-6">
                {(() => {
                  const c = customerOf(editing);
                  return (
                    <div className="mb-5 flex items-center gap-3 rounded-xl bg-[#E4ECE6]/60 p-3">
                      <Avatar name={c.name} pic={c.pic} />
                      <div className="min-w-0 text-sm">
                        <p className="truncate font-semibold text-[#1F1B44]">
                          {c.name}
                        </p>
                        <p className="break-all text-xs text-[#6B6673]">
                          {[c.email, c.mobile].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                  );
                })()}

                {formError && (
                  <div
                    role="alert"
                    className="mb-4 break-words rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    {formError}
                  </div>
                )}

                <label className="mb-1.5 block text-sm font-medium text-[#1F1B44]">
                  Rating
                </label>
                <div className="mb-4">
                  <Stars
                    value={Number(form.rating)}
                    onChange={(n) => setForm({ ...form, rating: n })}
                    size="h-8 w-8 sm:h-7 sm:w-7"
                  />
                </div>

                <label
                  htmlFor="fb-title"
                  className="mb-1.5 block text-sm font-medium text-[#1F1B44]"
                >
                  Title
                </label>
                <input
                  id="fb-title"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className={`${inputCls} mb-4`}
                />

                <label
                  htmlFor="fb-comment"
                  className="mb-1.5 block text-sm font-medium text-[#1F1B44]"
                >
                  Comment <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="fb-comment"
                  rows={4}
                  value={form.comment}
                  onChange={(e) =>
                    setForm({ ...form, comment: e.target.value })
                  }
                  className={`${inputCls} mb-4 resize-none`}
                />

                <label
                  htmlFor="fb-notes"
                  className="mb-1.5 block text-sm font-medium text-[#1F1B44]"
                >
                  Admin notes <span className="text-[#6B6673]">(internal)</span>
                </label>
                <textarea
                  id="fb-notes"
                  rows={2}
                  value={form.admin_notes}
                  onChange={(e) =>
                    setForm({ ...form, admin_notes: e.target.value })
                  }
                  placeholder="Only admins can see this"
                  className={`${inputCls} mb-4 resize-none`}
                />

                <label className="flex min-h-[44px] cursor-pointer items-center gap-3 text-sm text-[#1F1B44]">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) =>
                      setForm({ ...form, is_active: e.target.checked })
                    }
                    className="h-5 w-5 accent-[#13382C]"
                  />
                  Approved
                </label>
              </div>

              {/* Footer (fixed, hamesha visible) */}
              <div className="flex shrink-0 flex-col-reverse gap-2 border-t border-[#EAE5DD] bg-white px-5 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4 sm:flex-row sm:justify-end sm:gap-3 sm:px-6 sm:pb-6">
                <button
                  type="button"
                  onClick={closeEdit}
                  disabled={saving}
                  className="min-h-[44px] rounded-lg border border-[#EAE5DD] px-5 py-2.5 text-sm font-medium text-[#1F1B44] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="min-h-[44px] rounded-lg bg-[#13382C] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1E4839] disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </div>
        </Portal>
      )}

      {/* Delete confirm (portal) */}
      {deleteTarget && (
        <Portal>
          <div
            className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
            style={{ height: "100dvh" }}
            onMouseDown={(e) =>
              e.target === e.currentTarget &&
              !deleting &&
              setDeleteTarget(null)
            }
          >
            <div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="fb-del-title"
              className="max-h-[88dvh] w-full max-w-sm overflow-y-auto rounded-t-2xl bg-white p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl sm:rounded-2xl sm:p-6"
            >
              <h3
                id="fb-del-title"
                className="mb-2 font-serif text-xl text-[#1F1B44]"
              >
                Delete feedback?
              </h3>
              <p className="mb-6 break-words text-sm text-[#6B6673]">
                <span className="font-semibold text-[#1F1B44]">
                  {customerOf(deleteTarget).name}
                </span>{" "}
                The feedback will be permanently deleted.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleting}
                  className="min-h-[44px] rounded-lg border border-[#EAE5DD] px-5 py-2.5 text-sm font-medium text-[#1F1B44] transition hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="min-h-[44px] rounded-lg bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}