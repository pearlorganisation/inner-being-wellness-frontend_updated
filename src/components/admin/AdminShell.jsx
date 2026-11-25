

// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import AdminGuard from "@/components/admin/AdminGuard";
// import AdminLogo from "@/components/admin/AdminLogo";
// import HideSiteChrome from "@/components/admin/HideSiteChrome";
// import Icon from "@/components/admin/Icon";
// import { ADMIN_NAV } from "@/components/admin/adminNav";
// import { logoutAdmin } from "@/store/adminAuthSlice";

// const LOGIN_ROUTE = "/admin/login";
// const HOME_ROUTE = "/admin/dashboard";

// /* ---------- outer: sab kuch data-admin-shell ke andar, taaki public chrome chhupa rahe ---------- */
// export default function AdminShell({ children }) {
//   const pathname = usePathname();
//   const isLogin = pathname?.startsWith(LOGIN_ROUTE);

//   return (
//     <div data-admin-shell>
//       <HideSiteChrome />
//       {isLogin ? (
//         children
//       ) : (
//         <AdminGuard>
//           <ShellInner>{children}</ShellInner>
//         </AdminGuard>
//       )}
//     </div>
//   );
// }

// /* ---------- inner: sidebar + topbar ---------- */
// function ShellInner({ children }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const user = useSelector((s) => s.adminAuth?.user);
//   const [open, setOpen] = useState(false);

//   // Route badalte hi mobile menu band
//   useEffect(() => {
//     setOpen(false);
//   }, [pathname]);

//   // Mobile menu khula ho: Escape se band, background scroll lock
//   useEffect(() => {
//     if (!open) return;
//     const prev = document.body.style.overflow;
//     document.body.style.overflow = "hidden";
//     const onKey = (e) => e.key === "Escape" && setOpen(false);
//     window.addEventListener("keydown", onKey);
//     return () => {
//       document.body.style.overflow = prev;
//       window.removeEventListener("keydown", onKey);
//     };
//   }, [open]);

//   const name = user?.name || "Admin";
//   const initials =
//     name
//       .split(" ")
//       .filter(Boolean)
//       .map((w) => w[0])
//       .join("")
//       .slice(0, 2)
//       .toUpperCase() || "AD";
//   const roleLabel = (user?.role || "admin").replace(/_/g, " ");

//   const isActive = (href) =>
//     pathname === href ||
//     pathname?.startsWith(href + "/") ||
//     (href === HOME_ROUTE && pathname === "/admin");

//   const current = ADMIN_NAV.find((n) => isActive(n.href));

//   const handleLogout = () => {
//     dispatch(logoutAdmin());
//     router.replace(LOGIN_ROUTE);
//   };

//   return (
//     <div className="ibs">
//       <style>{CSS}</style>

//       {open && <div className="ibs-scrim" onClick={() => setOpen(false)} />}

//       <aside id="admin-sidebar" className={`ibs-side ${open ? "is-open" : ""}`}>
//         <Link
//           href={HOME_ROUTE}
//           className="ibs-brand"
//           aria-label="Inner Being Wellness admin home"
//         >
//           <AdminLogo size="clamp(42px, 4vw, 48px)" priority />
//           <div className="ibs-brand-text">
//             <b>INNER BEING</b>
//             <small>WELLNESS ADMIN</small>
//           </div>
//         </Link>

//         <nav aria-label="Admin">
//           {ADMIN_NAV.map((n) => (
//             <Link
//               key={n.id}
//               href={n.href}
//               className={isActive(n.href) ? "is-active" : ""}
//               aria-current={isActive(n.href) ? "page" : undefined}
//               onClick={() => setOpen(false)}
//             >
//               <Icon d={n.icon} />
//               {n.label}
//             </Link>
//           ))}
//         </nav>

//         <div className="ibs-foot">
//           <b>Need help?</b>
//           <span>Reach support for account or billing issues.</span>
//           <a href="mailto:support@innerbeingwellness.com">Contact support</a>
//         </div>
//       </aside>

//       <div className="ibs-main">
//         <header className="ibs-top">
//           <button
//             className="ibs-burger"
//             aria-label="Open menu"
//             aria-expanded={open}
//             aria-controls="admin-sidebar"
//             onClick={() => setOpen(true)}
//           >
//             <Icon d="M4 6h16M4 12h16M4 18h16" />
//           </button>

//           <div className="ibs-title">{current?.label || "Admin"}</div>

//           <div className="ibs-right">
        
//             <Link
//               href="/"
//               className="ibs-btn ibs-site"
//               target="_blank"
//               rel="noopener noreferrer"
//               aria-label="View website"
//               title="View website"
//             >
//               <svg
//                 width="18"
//                 height="18"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.7"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 aria-hidden="true"
//               >
//                 <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
//               </svg>
//               <span className="ibs-site-text">View website</span>
//             </Link>

//             <div className="ibs-user">
//               <span aria-hidden="true">{initials}</span>
//               <div>
//                 <b>{name}</b>
//                 <small>{roleLabel}</small>
//               </div>
//             </div>
//             <button className="ibs-btn" onClick={handleLogout}>
//               Log out
//             </button>
//           </div>
//         </header>

//         <div className="ibs-body">{children}</div>
//       </div>
//     </div>
//   );
// }

// const CSS = `
// .ibs{--ink:#241B4B;--amber:#E3A33B;--bg:#FAF8F3;--surface:#fff;--muted:#7B7590;--line:#ECE6DA;--serif:var(--font-cormorant,"Cormorant Garamond"),Georgia,serif;--ease:cubic-bezier(.2,.7,.2,1);
// display:flex;min-height:100vh;background:var(--bg);color:#2A2440;font-size:14px;line-height:1.5}
// .ibs *{box-sizing:border-box}
// .ibs :focus-visible{outline:2px solid var(--amber);outline-offset:2px}
// .ibs-side{position:sticky;top:0;height:100vh;width:252px;flex:none;color:#CFC8EA;display:flex;flex-direction:column;padding:22px 14px;gap:24px;overflow-y:auto;background:radial-gradient(260px 200px at 10% 0,rgba(227,163,59,.14),transparent 70%),linear-gradient(175deg,#2B2158,#1A1240)}
// .ibs-brand{display:flex;gap:12px;align-items:center;padding:4px 6px;text-decoration:none;min-width:0}
// .ibs-brand-text{min-width:0;animation:ibs-fade .8s .25s var(--ease) backwards}
// .ibs-brand b{display:block;color:#fff;font-family:var(--serif);font-size:19px;font-weight:600;letter-spacing:.12em;line-height:1.1;white-space:nowrap}
// .ibs-brand small{color:var(--amber);letter-spacing:.24em;font-size:9.5px;font-weight:700;white-space:nowrap}
// .ibs-side nav{display:flex;flex-direction:column;gap:3px}
// .ibs-side nav a{position:relative;display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#BDB5E0;text-decoration:none;transition:background .2s,color .2s,transform .2s var(--ease)}
// .ibs-side nav a:hover{background:rgba(255,255,255,.07);color:#fff;transform:translateX(3px)}
// .ibs-side nav a::before{content:"";position:absolute;left:0;top:50%;height:0;width:3px;border-radius:3px;background:var(--amber);transform:translateY(-50%);transition:height .3s var(--ease)}
// .ibs-side nav a.is-active{background:rgba(255,255,255,.11);color:#fff}
// .ibs-side nav a.is-active::before{height:22px}
// .ibs-foot{margin-top:auto;padding:16px;border-radius:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;gap:4px;font-size:12.5px}
// .ibs-foot b{color:#fff;font-family:var(--serif);font-size:17px}
// .ibs-foot a{color:var(--amber);margin-top:4px;text-decoration:none;font-weight:600}
// .ibs-scrim{position:fixed;inset:0;background:rgba(26,18,64,.55);backdrop-filter:blur(2px);z-index:1000}
// .ibs-main{flex:1;min-width:0;display:flex;flex-direction:column}
// .ibs-top{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:12px clamp(14px,3vw,32px);background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
// .ibs-title{font-family:var(--serif);font-weight:600;font-size:26px;line-height:1.2;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
// .ibs-right{margin-left:auto;display:flex;align-items:center;gap:12px}
// .ibs-btn{display:inline-flex;align-items:center;height:42px;padding:0 16px;border-radius:12px;border:1px solid var(--line);background:var(--surface);font:inherit;font-weight:600;color:inherit;text-decoration:none;cursor:pointer;white-space:nowrap;transition:all .2s var(--ease)}
// .ibs-btn:hover{background:var(--ink);color:#fff;border-color:var(--ink);transform:translateY(-2px)}
// .ibs-user{display:flex;align-items:center;gap:10px;min-width:0}
// .ibs-user span{flex:none;width:40px;height:40px;border-radius:50%;background:var(--ink);color:var(--amber);display:grid;place-items:center;font-weight:700;font-size:13px}
// .ibs-user b{display:block;line-height:1.2;white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis}
// .ibs-user small{color:var(--muted);text-transform:capitalize}
// .ibs-burger{display:none;flex:none;width:42px;height:42px;border-radius:12px;place-items:center;background:var(--surface);border:1px solid var(--line);cursor:pointer;color:inherit}
// .ibs-body{flex:1;min-width:0}
// @keyframes ibs-fade{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
// @media (max-width:900px){
// .ibs-side{position:fixed;left:0;top:0;z-index:1001;transform:translateX(-102%);transition:transform .35s var(--ease);box-shadow:16px 0 50px rgba(26,18,64,.4)}
// .ibs-side.is-open{transform:none}
// .ibs-burger{display:grid}
// .ibs-user div{display:none}
// }


// .ibs-site{gap:8px}
// @media (max-width:560px){
// .ibs-site{width:42px;padding:0;justify-content:center}
// .ibs-site-text{display:none}
// .ibs-right{gap:8px}
// .ibs-top{gap:8px}
// .ibs-title{font-size:20px;min-width:0}
// }
// @media (prefers-reduced-motion:reduce){
// .ibs *{transition:none!important;animation:none!important}
// }
// `;



// updated code 





"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminLogo from "@/components/admin/AdminLogo";
import HideSiteChrome from "@/components/admin/HideSiteChrome";
import Icon from "@/components/admin/Icon";
import { ADMIN_NAV } from "@/components/admin/adminNav";
import { logoutAdmin } from "@/store/adminAuthSlice";

const LOGIN_ROUTE = "/admin/login";
const HOME_ROUTE = "/admin/dashboard";

/* ---------- outer: sab kuch data-admin-shell ke andar, taaki public chrome chhupa rahe ---------- */
export default function AdminShell({ children }) {
  const pathname = usePathname();
  const isLogin = pathname?.startsWith(LOGIN_ROUTE);

  return (
    <div data-admin-shell>
      <HideSiteChrome />
      {isLogin ? (
        children
      ) : (
        <AdminGuard>
          <ShellInner>{children}</ShellInner>
        </AdminGuard>
      )}
    </div>
  );
}

/* ---------- inner: sidebar + topbar ---------- */
function ShellInner({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((s) => s.adminAuth?.user);
  const [open, setOpen] = useState(false);

  // Route badalte hi mobile menu band
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Mobile menu khula ho: Escape se band, background scroll lock
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Desktop width pe resize ho jaye to drawer band (scroll lock na atke)
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia("(min-width: 901px)");
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [open]);

  const name = user?.name || "Admin";
  const initials =
    name
      .split(" ")
      .filter(Boolean)
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "AD";
  const roleLabel = (user?.role || "admin").replace(/_/g, " ");

  const isActive = (href) =>
    pathname === href ||
    pathname?.startsWith(href + "/") ||
    (href === HOME_ROUTE && pathname === "/admin");

  const current = ADMIN_NAV.find((n) => isActive(n.href));

  const handleLogout = () => {
    dispatch(logoutAdmin());
    router.replace(LOGIN_ROUTE);
  };

  // Same sidebar content: desktop pe flow me, mobile pe portal drawer me
  const sidebarInner = (
    <>
      <Link
        href={HOME_ROUTE}
        className="ibs-brand"
        aria-label="Inner Being Wellness admin home"
        onClick={() => setOpen(false)}
      >
        <AdminLogo size="clamp(42px, 4vw, 48px)" priority />
        <div className="ibs-brand-text">
          <b>INNER BEING</b>
          <small>WELLNESS ADMIN</small>
        </div>
      </Link>

      {/* <nav> ki jagah div: HideSiteChrome tag-based rule se isse na chhupa sake */}
      <div className="ibs-nav" role="navigation" aria-label="Admin">
        {ADMIN_NAV.map((n) => (
          <Link
            key={n.id}
            href={n.href}
            className={isActive(n.href) ? "is-active" : ""}
            aria-current={isActive(n.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            <Icon d={n.icon} />
            {n.label}
          </Link>
        ))}
      </div>

      <div className="ibs-foot">
        <b>Need help?</b>
        <span>Reach support for account or billing issues.</span>
        <a href="mailto:support@innerbeingwellness.com">Contact support</a>
      </div>
    </>
  );

  return (
    <div className="ibs">
      <style>{CSS}</style>

      {/* Desktop sidebar (>900px) */}
      <aside id="admin-sidebar" className="ibs-side ibs-side-desktop">
        {sidebarInner}
      </aside>

      {/* Mobile/tablet drawer: document.body me portal, taaki koi parent transform fixed ko na tode */}
      {open &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="ibs-layer" data-admin-shell>
            <div className="ibs-scrim" onClick={() => setOpen(false)} />
            <aside
              id="admin-drawer"
              className="ibs-side ibs-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Admin menu"
            >
              {sidebarInner}
            </aside>
          </div>,
          document.body
        )}

      <div className="ibs-main">
        <header className="ibs-top">
          <button
            className="ibs-burger"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="admin-drawer"
            onClick={() => setOpen(true)}
          >
            <Icon d="M4 6h16M4 12h16M4 18h16" />
          </button>

          <div className="ibs-title">{current?.label || "Admin"}</div>

          <div className="ibs-right">
            <Link
              href="/"
              className="ibs-btn ibs-site"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View website"
              title="View website"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5" />
              </svg>
              <span className="ibs-site-text">View website</span>
            </Link>

            <div className="ibs-user">
              <span aria-hidden="true">{initials}</span>
              <div>
                <b>{name}</b>
                <small>{roleLabel}</small>
              </div>
            </div>
            <button className="ibs-btn" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </header>

        <div className="ibs-body">{children}</div>
      </div>
    </div>
  );
}

const CSS = `
.ibs,.ibs-layer{--ink:#241B4B;--amber:#E3A33B;--bg:#FAF8F3;--surface:#fff;--muted:#7B7590;--line:#ECE6DA;--serif:var(--font-cormorant,"Cormorant Garamond"),Georgia,serif;--ease:cubic-bezier(.2,.7,.2,1)}
.ibs{display:flex;min-height:100vh;background:var(--bg);color:#2A2440;font-size:14px;line-height:1.5}
.ibs-layer{font-size:14px;line-height:1.5}
.ibs *,.ibs-layer *{box-sizing:border-box}
.ibs :focus-visible,.ibs-layer :focus-visible{outline:2px solid var(--amber);outline-offset:2px}
.ibs-side{position:sticky;top:0;height:100vh;width:252px;flex:none;color:#CFC8EA;display:flex;flex-direction:column;padding:22px 14px;gap:24px;overflow-y:auto;background:radial-gradient(260px 200px at 10% 0,rgba(227,163,59,.14),transparent 70%),linear-gradient(175deg,#2B2158,#1A1240)}
.ibs-brand{display:flex;gap:12px;align-items:center;padding:4px 6px;text-decoration:none;min-width:0}
.ibs-brand-text{min-width:0;animation:ibs-fade .8s .25s var(--ease) backwards}
.ibs-brand b{display:block;color:#fff;font-family:var(--serif);font-size:19px;font-weight:600;letter-spacing:.12em;line-height:1.1;white-space:nowrap}
.ibs-brand small{color:var(--amber);letter-spacing:.24em;font-size:9.5px;font-weight:700;white-space:nowrap}
.ibs-nav{display:flex;flex-direction:column;gap:3px;flex:none}
.ibs-nav a{position:relative;display:flex;align-items:center;gap:12px;padding:11px 14px;border-radius:12px;color:#BDB5E0;text-decoration:none;transition:background .2s,color .2s,transform .2s var(--ease)}
.ibs-nav a:hover{background:rgba(255,255,255,.07);color:#fff;transform:translateX(3px)}
.ibs-nav a::before{content:"";position:absolute;left:0;top:50%;height:0;width:3px;border-radius:3px;background:var(--amber);transform:translateY(-50%);transition:height .3s var(--ease)}
.ibs-nav a.is-active{background:rgba(255,255,255,.11);color:#fff}
.ibs-nav a.is-active::before{height:22px}
.ibs-foot{margin-top:auto;flex:none;padding:16px;border-radius:16px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.08);display:flex;flex-direction:column;gap:4px;font-size:12.5px}
.ibs-foot b{color:#fff;font-family:var(--serif);font-size:17px}
.ibs-foot a{color:var(--amber);margin-top:4px;text-decoration:none;font-weight:600}
.ibs-scrim{position:fixed;top:0;left:0;right:0;bottom:0;height:100dvh;background:rgba(26,18,64,.6);z-index:1000}
.ibs-main{flex:1;min-width:0;display:flex;flex-direction:column}
.ibs-top{position:sticky;top:0;z-index:20;display:flex;align-items:center;gap:12px;padding:12px clamp(14px,3vw,32px);background:color-mix(in srgb,var(--bg) 88%,transparent);backdrop-filter:blur(12px);border-bottom:1px solid var(--line)}
.ibs-title{font-family:var(--serif);font-weight:600;font-size:26px;line-height:1.2;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ibs-right{margin-left:auto;display:flex;align-items:center;gap:12px}
.ibs-btn{display:inline-flex;align-items:center;height:42px;padding:0 16px;border-radius:12px;border:1px solid var(--line);background:var(--surface);font:inherit;font-weight:600;color:inherit;text-decoration:none;cursor:pointer;white-space:nowrap;transition:all .2s var(--ease)}
.ibs-btn:hover{background:var(--ink);color:#fff;border-color:var(--ink);transform:translateY(-2px)}
.ibs-site{gap:8px}
.ibs-user{display:flex;align-items:center;gap:10px;min-width:0}
.ibs-user span{flex:none;width:40px;height:40px;border-radius:50%;background:var(--ink);color:var(--amber);display:grid;place-items:center;font-weight:700;font-size:13px}
.ibs-user b{display:block;line-height:1.2;white-space:nowrap;max-width:180px;overflow:hidden;text-overflow:ellipsis}
.ibs-user small{color:var(--muted);text-transform:capitalize}
.ibs-burger{display:none;flex:none;width:42px;height:42px;border-radius:12px;place-items:center;background:var(--surface);border:1px solid var(--line);cursor:pointer;color:inherit}
.ibs-body{flex:1;min-width:0}
@keyframes ibs-fade{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@keyframes ibs-slide{from{transform:translateX(-102%)}to{transform:none}}
@keyframes ibs-scrim-in{from{opacity:0}to{opacity:1}}

/* Desktop: drawer layer kabhi nahi */
@media (min-width:901px){
.ibs-layer{display:none}
}

/* Tablet + phone: desktop sidebar chhupa, drawer portal se */
@media (max-width:900px){
.ibs-side-desktop{display:none}
.ibs-burger{display:grid}
.ibs-user div{display:none}
.ibs-scrim{animation:ibs-scrim-in .25s ease both}
.ibs-drawer{position:fixed;top:0;left:0;bottom:0;height:100dvh;width:min(280px,86vw);max-width:none;z-index:1001;padding-bottom:max(22px,env(safe-area-inset-bottom));box-shadow:16px 0 50px rgba(26,18,64,.4);overscroll-behavior:contain;animation:ibs-slide .3s var(--ease) both}
}

@media (max-width:560px){
.ibs-site{width:42px;padding:0;justify-content:center}
.ibs-site-text{display:none}
.ibs-right{gap:8px}
.ibs-top{gap:8px}
.ibs-title{font-size:20px;min-width:0}
}
@media (prefers-reduced-motion:reduce){
.ibs *,.ibs-layer *{transition:none!important;animation:none!important}
}
`;
