// // Consultation APIs (Postman folder 3 & 4)
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

// /* -------------------------------------------------------------------------- */
// /*  ADMIN TOKEN FINDER                                                         */
// /*  Known keys -> koi bhi "token" naam wali key -> JSON ke andar -> cookies    */
// /* -------------------------------------------------------------------------- */
// const KNOWN_KEYS = [
//   "admin_token",
//   "adminToken",
//   "admin_access_token",
//   "adminAccessToken",
//   "access_token",
//   "accessToken",
//   "token",
// ];

// const looksLikeJwt = (v) =>
//   typeof v === "string" && /^[\w-]+\.[\w-]+\.[\w-]+$/.test(v.trim());

// // JSON ke andar token dhoondho: {access_token}, {token}, {admin:{token}} ...
// function extractTokenFromValue(raw) {
//   if (!raw) return null;
//   if (looksLikeJwt(raw)) return raw.trim();
//   try {
//     const obj = JSON.parse(raw);
//     if (typeof obj === "string") return looksLikeJwt(obj) ? obj : null;
//     const stack = [obj];
//     while (stack.length) {
//       const cur = stack.pop();
//       if (!cur || typeof cur !== "object") continue;
//       for (const [k, v] of Object.entries(cur)) {
//         if (typeof v === "string" && /token/i.test(k) && looksLikeJwt(v)) return v;
//         if (v && typeof v === "object") stack.push(v);
//       }
//     }
//   } catch {
//     /* plain string, JWT nahi */
//   }
//   return null;
// }

// function findInStorage(storage) {
//   // 1) known keys
//   for (const key of KNOWN_KEYS) {
//     const t = extractTokenFromValue(storage.getItem(key)) || storage.getItem(key);
//     if (t && looksLikeJwt(t)) return t;
//   }
//   // 2) koi bhi key jisme "token" ya "admin" / "auth" ho
//   for (let i = 0; i < storage.length; i++) {
//     const key = storage.key(i);
//     if (!/token|admin|auth/i.test(key)) continue;
//     const t = extractTokenFromValue(storage.getItem(key));
//     if (t) return t;
//   }
//   return null;
// }

// function findInCookies() {
//   const cookies = document.cookie.split(";").map((c) => c.trim());
//   for (const c of cookies) {
//     const [name, ...rest] = c.split("=");
//     if (!/token|admin|auth/i.test(name)) continue;
//     const t = extractTokenFromValue(decodeURIComponent(rest.join("=")));
//     if (t) return t;
//   }
//   return null;
// }

// export const getAdminToken = () => {
//   if (typeof window === "undefined") return null;
//   const token =
//     findInStorage(window.localStorage) ||
//     findInStorage(window.sessionStorage) ||
//     findInCookies();

//   if (!token && process.env.NODE_ENV !== "production") {
//     console.warn(
//       "[consultationService] Admin token nahi mila. localStorage keys:",
//       Object.keys(window.localStorage),
//       "| sessionStorage keys:",
//       Object.keys(window.sessionStorage),
//       "| cookies:",
//       document.cookie
//     );
//   }
//   return token;
// };

// /* -------------------------------------------------------------------------- */
// /*  ERROR PARSING                                                              */
// /* -------------------------------------------------------------------------- */
// function parseErrorMessage(data, status) {
//   const d = data?.detail ?? data?.message ?? data?.errors;

//   // FastAPI / Pydantic: [{ loc: ["body","phone"], msg: "..." }]
//   if (Array.isArray(d)) {
//     return d
//       .map((e) => {
//         if (typeof e === "string") return e;
//         const field = Array.isArray(e.loc)
//           ? e.loc.filter((x) => x !== "body").join(".")
//           : "";
//         return field ? `${field}: ${e.msg}` : e.msg || JSON.stringify(e);
//       })
//       .join(" | ");
//   }
//   if (typeof d === "string") return d;
//   if (d && typeof d === "object") return JSON.stringify(d);

//   return `Request failed (${status})`;
// }

// /* -------------------------------------------------------------------------- */
// /*  REQUEST HELPER                                                             */
// /* -------------------------------------------------------------------------- */
// async function request(path, { method = "GET", body, auth = false } = {}) {
//   const headers = { "Content-Type": "application/json" };

//   if (auth) {
//     const token = getAdminToken();
//     if (token) headers.Authorization = `Bearer ${token}`;
//   }

//   const res = await fetch(`${BASE_URL}${path}`, {
//     method,
//     headers,
//     body: body ? JSON.stringify(body) : undefined,
//     // agar backend cookie se auth karta ho to bhi chale
//     credentials: auth ? "include" : "same-origin",
//   });

//   const data = await res.json().catch(() => ({}));

//   if (!res.ok) {
//     if (auth && res.status === 401) {
//       throw new Error("Session expired or not logged in. Please log in again as admin.");
//     }
//     throw new Error(parseErrorMessage(data, res.status));
//   }
//   return data;
// }

// // ---------- Public (folder 4) ----------
// export const getInfoCards = () => request("/consultation/info-cards");
// export const submitConsultationRequest = (payload) =>
//   request("/consultation/submit-request", { method: "POST", body: payload });

// // ---------- Admin (folder 3) ----------
// export const listConsultations = ({ page = 1, limit = 20, status = "" } = {}) => {
//   const q = new URLSearchParams({ page, limit });
//   if (status) q.set("status", status);
//   return request(`/admin/consultations/list?${q}`, { auth: true });
// };
// export const getConsultationDetail = (id) =>
//   request(`/admin/consultations/detail/${id}`, { auth: true });
// // payload: {action:"confirm", session_date, meeting_details, admin_notes} | {action:"decline", admin_notes}
// export const respondConsultation = (id, payload) =>
//   request(`/admin/consultations/respond/${id}`, { method: "POST", body: payload, auth: true });
// export const deleteConsultation = (id) =>
//   request(`/admin/consultations/remove/${id}`, { method: "DELETE", auth: true });







// updated Code




// Consultation APIs (Postman folder 3 & 4)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

/* -------------------------------------------------------------------------- */
/*  ADMIN TOKEN FINDER                                                         */
/*  Known keys -> koi bhi "token" naam wali key -> JSON ke andar -> cookies    */
/* -------------------------------------------------------------------------- */
// Admin-specific keys pehle, generic (user ka token ho sakta hai) sabse aakhir me
const ADMIN_KEYS = [
  "admin_token",
  "adminToken",
  "admin_access_token",
  "adminAccessToken",
];
const GENERIC_KEYS = ["access_token", "accessToken", "token"];

const looksLikeJwt = (v) =>
  typeof v === "string" && /^[\w-]+\.[\w-]+\.[\w-]+$/.test(v.trim());

// JSON ke andar token dhoondho: {access_token}, {token}, {admin:{token}} ...
function extractTokenFromValue(raw) {
  if (!raw) return null;
  if (looksLikeJwt(raw)) return raw.trim();
  try {
    const obj = JSON.parse(raw);
    if (typeof obj === "string") return looksLikeJwt(obj) ? obj : null;
    const stack = [obj];
    while (stack.length) {
      const cur = stack.pop();
      if (!cur || typeof cur !== "object") continue;
      for (const [k, v] of Object.entries(cur)) {
        if (typeof v === "string" && /token/i.test(k) && looksLikeJwt(v)) return v;
        if (v && typeof v === "object") stack.push(v);
      }
    }
  } catch {
    /* plain string, JWT nahi */
  }
  return null;
}

function readKey(storage, key) {
  const raw = storage.getItem(key);
  const t = extractTokenFromValue(raw) || raw;
  return t && looksLikeJwt(t) ? t : null;
}

function findInStorage(storage) {
  // 1) admin-specific known keys
  for (const key of ADMIN_KEYS) {
    const t = readKey(storage, key);
    if (t) return { token: t, source: key };
  }
  // 2) koi bhi key jisme "admin" ho (e.g. persist:adminAuth, adminAuth)
  for (let i = 0; i < storage.length; i++) {
    const key = storage.key(i);
    if (!/admin/i.test(key)) continue;
    const t = extractTokenFromValue(storage.getItem(key));
    if (t) return { token: t, source: key };
  }
  // 3) aakhir me generic keys (user ka token ho sakta hai)
  for (const key of GENERIC_KEYS) {
    const t = readKey(storage, key);
    if (t) return { token: t, source: key };
  }
  return null;
}

function findInCookies() {
  const cookies = document.cookie.split(";").map((c) => c.trim());
  // admin cookies pehle
  const sorted = [
    ...cookies.filter((c) => /admin/i.test(c.split("=")[0])),
    ...cookies.filter((c) => !/admin/i.test(c.split("=")[0])),
  ];
  for (const c of sorted) {
    const [name, ...rest] = c.split("=");
    if (!/token|admin|auth/i.test(name)) continue;
    const t = extractTokenFromValue(decodeURIComponent(rest.join("=")));
    if (t) return { token: t, source: `cookie:${name}` };
  }
  return null;
}

export const getAdminToken = () => {
  if (typeof window === "undefined") return null;
  const found =
    findInStorage(window.localStorage) ||
    findInStorage(window.sessionStorage) ||
    findInCookies();

  if (process.env.NODE_ENV !== "production") {
    if (found) {
      console.info("[consultationService] admin token source:", found.source);
    } else {
      console.warn(
        "[consultationService] Admin token nahi mila. localStorage keys:",
        Object.keys(window.localStorage),
        "| sessionStorage keys:",
        Object.keys(window.sessionStorage),
        "| cookies:",
        document.cookie
      );
    }
  }
  return found ? found.token : null;
};

/* -------------------------------------------------------------------------- */
/*  ERROR PARSING                                                              */
/* -------------------------------------------------------------------------- */
function parseErrorMessage(data, status) {
  const d = data?.detail ?? data?.message ?? data?.errors;

  // FastAPI / Pydantic: [{ loc: ["body","phone"], msg: "..." }]
  if (Array.isArray(d)) {
    return d
      .map((e) => {
        if (typeof e === "string") return e;
        const field = Array.isArray(e.loc)
          ? e.loc.filter((x) => x !== "body").join(".")
          : "";
        return field ? `${field}: ${e.msg}` : e.msg || JSON.stringify(e);
      })
      .join(" | ");
  }
  if (typeof d === "string") return d;
  if (d && typeof d === "object") return JSON.stringify(d);

  return `Request failed (${status})`;
}

/* -------------------------------------------------------------------------- */
/*  REQUEST HELPER                                                             */
/* -------------------------------------------------------------------------- */
async function request(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };

  if (auth) {
    const token = getAdminToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    // agar backend cookie se auth karta ho to bhi chale
    credentials: auth ? "include" : "same-origin",
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (auth && res.status === 401) {
      throw new Error("Session expired or not logged in. Please log in again as admin.");
    }
    throw new Error(parseErrorMessage(data, res.status));
  }
  return data;
}

// ---------- Public (folder 4) ----------
export const getInfoCards = () => request("/consultation/info-cards");
export const submitConsultationRequest = (payload) =>
  request("/consultation/submit-request", { method: "POST", body: payload });

// ---------- Admin (folder 3) ----------
export const listConsultations = ({ page = 1, limit = 20, status = "" } = {}) => {
  const q = new URLSearchParams({ page, limit });
  if (status) q.set("status", status);
  return request(`/admin/consultations/list?${q}`, { auth: true });
};
export const getConsultationDetail = (id) =>
  request(`/admin/consultations/detail/${id}`, { auth: true });
// payload: {action:"confirm", session_date, meeting_details, admin_notes} | {action:"decline", admin_notes}
export const respondConsultation = (id, payload) =>
  request(`/admin/consultations/respond/${id}`, { method: "POST", body: payload, auth: true });
export const deleteConsultation = (id) =>
  request(`/admin/consultations/remove/${id}`, { method: "DELETE", auth: true });