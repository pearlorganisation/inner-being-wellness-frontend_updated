// import api from "@/lib/api";

// /* ---------- helpers ---------- */
// export const rowsOf = (d) =>
//   Array.isArray(d) ? d : d?.results || d?.items || d?.data || [];

// export const errMsg = (e) => {
//   const detail = e?.response?.data?.detail;
//   if (Array.isArray(detail)) return detail.map((d) => d.msg).join(", ");
//   if (typeof detail === "string") return detail;
//   return e?.response?.data?.message || e?.message || "Something went wrong";
// };

// export const fmtDate = (v) =>
//   v
//     ? new Date(v).toLocaleDateString("en-IN", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       })
//     : "";

// // Backend customer details flat ya nested, dono shape handle karta hai
// export const customerOf = (f = {}) => {
//   const c = f.customer || f.user || {};
//   return {
//     name: c.name || f.customer_name || f.name || "Customer",
//     email: c.email || f.customer_email || f.email || "",
//     mobile: c.mobile || f.customer_mobile || f.mobile || "",
//     pic: c.profile_pic || f.profile_pic || f.customer_profile_pic || "",
//   };
// };

// /* ---------- customer ---------- */
// export const submitFeedbackApi = async (payload) =>
//   (await api.post("/customer/feedback", payload)).data;

// export const getMyFeedbacksApi = async ({ page = 1, limit = 20 } = {}) =>
//   (await api.get("/customer/feedback/my-feedbacks", { params: { page, limit } })).data;

// /* ---------- public (testimonials) ---------- */
// export const getPublicFeedbacksApi = async ({ page = 1, limit = 20, rating } = {}) =>
//   (
//     await api.get("/feedback/public", {
//       params: { page, limit, ...(rating ? { rating } : {}) },
//     })
//   ).data;

// /* ---------- admin ---------- */
// export const getAdminFeedbacksApi = async ({
//   page = 1,
//   limit = 10,
//   is_active,
//   rating,
//   search,
// } = {}) => {
//   const params = { page, limit };
//   if (is_active !== undefined && is_active !== "") params.is_active = is_active;
//   if (rating) params.rating = rating;
//   if (search) params.search = search;
//   return (await api.get("/admin/feedbacks/list", { params })).data;
// };

// export const getAdminFeedbackApi = async (id) =>
//   (await api.get(`/admin/feedbacks/detail/${id}`)).data;

// export const updateAdminFeedbackApi = async (id, payload) =>
//   (await api.put(`/admin/feedbacks/update/${id}`, payload)).data;

// export const setFeedbackStatusApi = async (id, is_active) =>
//   (await api.patch(`/admin/feedbacks/${id}/status`, { is_active })).data;

// export const deleteAdminFeedbackApi = async (id) =>
//   (await api.delete(`/admin/feedbacks/remove/${id}`)).data;








// updated  











import api from "@/lib/api";

/* ---------- helpers ---------- */
export const rowsOf = (d) =>
  Array.isArray(d) ? d : d?.results || d?.items || d?.data || [];

export const errMsg = (e) => {
  const detail = e?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join(", ");
  if (typeof detail === "string") return detail;
  return e?.response?.data?.message || e?.message || "Something went wrong";
};

export const fmtDate = (v) =>
  v
    ? new Date(v).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

// Backend customer details flat ya nested (customer / user / author), sab handle karta hai
export const customerOf = (f = {}) => {
  const c = f.customer || f.user || f.author || {};
  return {
    name: c.name || f.customer_name || f.name || "Customer",
    email: c.email || f.customer_email || f.email || "",
    mobile: c.mobile || f.customer_mobile || f.mobile || "",
    pic: c.profile_pic || f.profile_pic || f.customer_profile_pic || "",
  };
};

// Feedback ka video url (null ho sakta hai)
export const videoOf = (f = {}) => f.video_url || f.video || "";

/* ---------- video validation (submit se pehle call karo) ---------- */
export const MAX_VIDEO_MB = 50;

export const validateVideo = (file) => {
  if (!file) return "";
  if (!file.type?.startsWith("video/")) return "Please select a valid video file";
  if (file.size > MAX_VIDEO_MB * 1024 * 1024)
    return `Video must be under ${MAX_VIDEO_MB} MB`;
  return "";
};

/* ---------- FormData builder ---------- */
// payload: { rating, title?, comment, video? (File) } ya already FormData
const toFeedbackFormData = (payload) => {
  if (payload instanceof FormData) return payload;

  const { rating, title, comment, video } = payload || {};
  const fd = new FormData();
  fd.append("rating", String(rating));
  if (title) fd.append("title", title);
  if (comment) fd.append("comment", comment);
  if (video instanceof File) fd.append("video", video);
  return fd;
};

/* ---------- customer ---------- */
// onProgress optional: (percent) => void
export const submitFeedbackApi = async (payload, onProgress) =>
  (
    await api.post("/customer/feedback", toFeedbackFormData(payload), {
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 120000, // video upload + Render cold start ke liye
      onUploadProgress: (e) => {
        if (onProgress && e.total) onProgress(Math.round((e.loaded * 100) / e.total));
      },
    })
  ).data;

export const getMyFeedbacksApi = async ({ page = 1, limit = 20 } = {}) =>
  (await api.get("/customer/feedback/my-feedbacks", { params: { page, limit } })).data;

/* ---------- public (testimonials) ---------- */
export const getPublicFeedbacksApi = async ({ page = 1, limit = 20, rating } = {}) =>
  (
    await api.get("/feedback/public", {
      params: { page, limit, ...(rating ? { rating } : {}) },
    })
  ).data;

/* ---------- admin ---------- */
export const getAdminFeedbacksApi = async ({
  page = 1,
  limit = 10,
  is_active,
  rating,
  search,
} = {}) => {
  const params = { page, limit };
  if (is_active !== undefined && is_active !== "") params.is_active = is_active;
  if (rating) params.rating = rating;
  if (search) params.search = search;
  return (await api.get("/admin/feedbacks/list", { params })).data;
};

export const getAdminFeedbackApi = async (id) =>
  (await api.get(`/admin/feedbacks/detail/${id}`)).data;

export const updateAdminFeedbackApi = async (id, payload) =>
  (await api.put(`/admin/feedbacks/update/${id}`, payload)).data;

export const setFeedbackStatusApi = async (id, is_active) =>
  (await api.patch(`/admin/feedbacks/${id}/status`, { is_active })).data;

export const deleteAdminFeedbackApi = async (id) =>
  (await api.delete(`/admin/feedbacks/remove/${id}`)).data;