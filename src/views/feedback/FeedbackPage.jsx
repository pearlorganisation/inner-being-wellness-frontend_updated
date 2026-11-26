// // src/views/feedback/FeedbackPage.jsx
// "use client";

// import { useCallback, useEffect, useId, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";
// import { ArrowRight, Play, X } from "lucide-react";
// import Button from "@/components/ui/Button";
// import Reveal from "@/components/ui/Reveal";
// import Stars from "@/components/feedback/Stars";
// import {
//   getPublicFeedbacksApi,
//   rowsOf,
//   customerOf,
//   fmtDate,
// } from "@/services/feedbackService";

// /* -------------------------------------------------------------------------- */
// /*  CONFIG                                                                     */
// /* -------------------------------------------------------------------------- */
// const CTA_LABEL = "Book Free Discovery Call";
// const CTA_HREF = "/contact#contact-form";
// const PAGE_SIZE = 6; // pehle itne cards, "Show more" par itne aur

// export const HERO = {
//   titlePrefix: "What Our",
//   titleHighlight: "Clients",
//   titleSuffix: "Say",
//   subtitle: "Real feedback from people who worked with us",
// };

// // Purani dummy list hata di gayi hai. Koi file isse import kare to build na toote, isliye khali export.
// export const TESTIMONIALS = [];

// const CTA = {
//   title: "Ready to begin your own journey?",
//   description:
//     "Book a free discovery call, ask your questions and see if it feels right for you.",
// };

// const DISCLAIMER =
//   "Individual experiences vary. Wellness sessions complement, but do not replace, professional medical or mental-health care.";

// /* -------------------------------------------------------------------------- */
// /*  API data -> card shape                                                     */
// /* -------------------------------------------------------------------------- */
// const API_ORIGIN = (
//   process.env.NEXT_PUBLIC_API_URL ||
//   "https://inner-wellness-backend.onrender.com/api/v1"
// ).replace(/\/api\/v1\/?$/, "");

// // Backend relative path (/uploads/x.jpg) de to full URL banao
// const picUrl = (p) => {
//   if (!p) return "";
//   if (/^(https?:|data:|blob:)/i.test(p)) return p;
//   return `${API_ORIGIN}/${String(p).replace(/^\/+/, "")}`;
// };

// const toCard = (f) => {
//   const c = customerOf(f);
//   return {
//     id: `f-${f.id}`,
//     name: c.name,
//     image: picUrl(c.pic),
//     rating: Number(f.rating) || 0,
//     title: f.title,
//     date: fmtDate(f.created_at),
//     quote: f.comment,
//   };
// };

// // Saare pages fetch karta hai (backend sirf Active feedback deta hai)
// async function fetchAllPublic() {
//   let page = 1;
//   let totalPages = 1;
//   let all = [];
//   do {
//     const d = await getPublicFeedbacksApi({ page, limit: 20 });
//     all = all.concat(rowsOf(d));
//     totalPages = Array.isArray(d) ? 1 : d?.total_pages || 1;
//     page += 1;
//   } while (page <= totalPages && page <= 10);
//   return all.map(toCard);
// }

// /* -------------------------------------------------------------------------- */
// /*  helpers                                                                    */
// /* -------------------------------------------------------------------------- */
// const initialsOf = (name = "") =>
//   name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((w) => w[0]?.toUpperCase())
//     .join("");

// // Photo na ho / load na ho to initials circle (layout nahi tootta)
// function Avatar({ name, image }) {
//   const [failed, setFailed] = useState(false);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     setFailed(false);
//   }, [image]);

//   // Server render me image 404 ho jaye to onError miss ho jata hai, isliye mount par bhi check
//   useEffect(() => {
//     const el = imgRef.current;
//     if (el && el.complete && el.naturalWidth === 0) setFailed(true);
//   }, [image]);

//   if (image && !failed) {
//     return (
//       <img
//         ref={imgRef}
//         src={image}
//         alt=""
//         width={44}
//         height={44}
//         loading="lazy"
//         decoding="async"
//         referrerPolicy="no-referrer"
//         onError={() => setFailed(true)}
//         className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-[#2D1C59]/10"
//       />
//     );
//   }
//   return (
//     <span
//       aria-hidden="true"
//       className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2D1C59] font-serif text-base font-semibold text-white"
//     >
//       {initialsOf(name)}
//     </span>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  video modal (portal, focus trap, Esc, scroll lock, focus restore)          */
// /* -------------------------------------------------------------------------- */
// export function VideoModal({ video, name, onClose }) {
//   const dialogRef = useRef(null);
//   const closeRef = useRef(null);
//   const videoRef = useRef(null);
//   const titleId = useId();
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const previouslyFocused = document.activeElement;
//     const prevOverflow = document.body.style.overflow;
//     const videoEl = videoRef.current;
//     document.body.style.overflow = "hidden";
//     closeRef.current?.focus();

//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         e.preventDefault();
//         onClose();
//         return;
//       }
//       if (e.key !== "Tab") return;
//       const nodes = dialogRef.current?.querySelectorAll(
//         'button, video[controls], a[href], [tabindex]:not([tabindex="-1"])'
//       );
//       if (!nodes?.length) return;
//       const first = nodes[0];
//       const last = nodes[nodes.length - 1];
//       if (e.shiftKey && document.activeElement === first) {
//         e.preventDefault();
//         last.focus();
//       } else if (!e.shiftKey && document.activeElement === last) {
//         e.preventDefault();
//         first.focus();
//       }
//     };

//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = prevOverflow;
//       videoEl?.pause();
//       previouslyFocused?.focus?.();
//     };
//   }, [onClose]);

//   return createPortal(
//     <div
//       className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
//       onMouseDown={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div
//         ref={dialogRef}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby={titleId}
//         className="relative w-full max-w-3xl"
//       >
//         <h2 id={titleId} className="sr-only">
//           {name} video testimonial
//         </h2>

//         <button
//           ref={closeRef}
//           type="button"
//           onClick={onClose}
//           aria-label="Close video"
//           className="absolute -top-11 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//         >
//           <X className="h-5 w-5" aria-hidden="true" />
//         </button>

//         {error ? (
//           <div
//             role="status"
//             className="flex aspect-video w-full items-center justify-center rounded-2xl bg-[#1A103F] px-6 text-center text-sm text-white/80"
//           >
//             Video coming soon
//           </div>
//         ) : (
//           <video
//             ref={videoRef}
//             src={video.src}
//             poster={video.poster || undefined}
//             className="max-h-[80vh] w-full rounded-2xl bg-black object-contain"
//             controls
//             autoPlay
//             playsInline
//             preload="metadata"
//             onError={() => setError(true)}
//           />
//         )}
//       </div>
//     </div>,
//     document.body
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  testimonial card                                                           */
// /* -------------------------------------------------------------------------- */
// export function TestimonialCard({ t, onPlay }) {
//   const quoteRef = useRef(null);
//   const posterRef = useRef(null);
//   const quoteId = useId();
//   const [expanded, setExpanded] = useState(false);
//   const [clamped, setClamped] = useState(false);
//   const [posterFailed, setPosterFailed] = useState(false);

//   const hasVideo = Boolean(t.video?.src);

//   // Tailwind ko poori class string chahiye, isliye literal classes
//   const clampClass = expanded ? "" : hasVideo ? "line-clamp-3" : "line-clamp-5";

//   useEffect(() => {
//     const el = posterRef.current;
//     if (el && el.complete && el.naturalWidth === 0) setPosterFailed(true);
//   }, []);

//   // Asli overflow detect hota hai (character count guess nahi), resize par bhi
//   useEffect(() => {
//     const el = quoteRef.current;
//     if (!el || expanded) return;
//     const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
//     check();
//     if (typeof ResizeObserver === "undefined") return;
//     const ro = new ResizeObserver(check);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, [expanded, t.quote]);

//   const showToggle = clamped || expanded;
//   const subline = [t.role, t.location].filter(Boolean).join(" · ") || t.date || "";

//   return (
//     <article className="flex flex-col rounded-2xl border border-[#2D1C59]/[0.06] bg-white p-5 shadow-[0_10px_40px_-12px_rgba(45,28,89,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_50px_-12px_rgba(45,28,89,0.25)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
//       {hasVideo && (
//         <button
//           type="button"
//           onClick={() => onPlay?.(t)}
//           aria-label={`Play ${t.name} video testimonial`}
//           className="group relative mb-4 block aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-[#E9E4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D1C59]"
//         >
//           {posterFailed || !t.video.poster ? (
//             <span className="absolute inset-0 bg-gradient-to-br from-[#2D1C59] via-[#5B2FC2] to-[#B88B4A]" />
//           ) : (
//             <img
//               ref={posterRef}
//               src={t.video.poster}
//               alt=""
//               width={800}
//               height={450}
//               loading="lazy"
//               decoding="async"
//               onError={() => setPosterFailed(true)}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
//             />
//           )}
//           <span className="absolute inset-0 bg-[#1A103F]/10 transition-colors group-hover:bg-[#1A103F]/20" />
//           <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
//             <Play className="ml-0.5 h-5 w-5 fill-[#1A103F] text-[#1A103F]" aria-hidden="true" />
//           </span>
//         </button>
//       )}

//       <figure>
//         <figcaption className="flex items-center gap-3">
//           <Avatar name={t.name} image={t.image} />
//           <div className="min-w-0">
//             <cite className="block truncate text-base font-semibold not-italic leading-tight text-[#14123A] sm:text-lg">
//               {t.name}
//             </cite>
//             {subline && <p className="truncate text-sm text-[#6B7A90]">{subline}</p>}
//           </div>
//         </figcaption>

//         {t.rating > 0 && (
//           <div className="mt-3">
//             <Stars value={t.rating} size="h-4 w-4" />
//           </div>
//         )}

//         {t.title && (
//           <h3 className="mt-2 font-serif text-lg leading-snug text-[#2D1C59]">{t.title}</h3>
//         )}

//         <blockquote className="mt-3">
//           <p
//             ref={quoteRef}
//             id={quoteId}
//             className={`text-sm leading-relaxed text-[#6B7A90] sm:text-[15px] ${clampClass}`}
//           >
//             {t.quote}
//           </p>
//         </blockquote>
//       </figure>

//       <div className="pt-3">
//         {showToggle && (
//           <button
//             type="button"
//             onClick={() => setExpanded((v) => !v)}
//             aria-expanded={expanded}
//             aria-controls={quoteId}
//             className="cursor-pointer text-sm font-semibold text-[#0E6E6B] transition-colors hover:text-[#094D4B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6E6B]"
//           >
//             {expanded ? "Show less" : "Read more"}
//           </button>
//         )}
//         {t.service && (
//           <p
//             className={`${showToggle ? "mt-2" : ""} text-[11px] font-semibold uppercase tracking-wider text-[#B88B4A]`}
//           >
//             {t.service}
//           </p>
//         )}
//       </div>
//     </article>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  page                                                                       */
// /* -------------------------------------------------------------------------- */
// export default function FeedbackPage() {
//   const router = useRouter();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [visible, setVisible] = useState(PAGE_SIZE);
//   const [playing, setPlaying] = useState(null);

//   const closeVideo = useCallback(() => setPlaying(null), []);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     try {
//       setItems(await fetchAllPublic());
//     } catch (e) {
//       console.warn("Feedback load failed:", e);
//       setError("Feedback abhi load nahi ho paayi. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]);

//   const shown = items.slice(0, visible);
//   const hasMore = visible < items.length;

//   return (
//     <div className="relative w-full overflow-x-hidden bg-[#FBF9F5]">
//       <section className="section-y relative overflow-hidden">
//         <div
//           aria-hidden="true"
//           className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#F3CF63]/25 blur-3xl"
//         />

//         <div className="container-x relative">
//           <Reveal className="mx-auto mb-10 max-w-2xl space-y-3 text-center sm:mb-14">
//             <h1 className="text-[30px] font-extrabold leading-tight tracking-tight text-[#14123A] sm:text-5xl">
//               {HERO.titlePrefix}{" "}
//               <span className="bg-gradient-to-r from-[#5B2FC2] via-[#B88B4A] to-[#E8A948] bg-clip-text text-transparent">
//                 {HERO.titleHighlight}
//               </span>{" "}
//               {HERO.titleSuffix}
//             </h1>
//             <p className="text-base text-[#6B7A90] sm:text-lg">{HERO.subtitle}</p>
//             <div className="pt-2">
//               <Button variant="outline" size="md" onClick={() => router.push("/share-feedback")}>
//                 Share your feedback
//               </Button>
//             </div>
//           </Reveal>

//           {loading ? (
//             <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {Array.from({ length: 3 }).map((_, i) => (
//                 <div key={i} className="h-56 animate-pulse rounded-2xl bg-[#E9EEE3]/70" />
//               ))}
//             </div>
//           ) : error ? (
//             <div className="mx-auto max-w-md rounded-2xl bg-[#E9EEE3] px-6 py-8 text-center text-sm text-[#4A5560]">
//               <p>{error}</p>
//               <button
//                 onClick={load}
//                 className="mt-3 font-semibold text-[#2D1C59] underline underline-offset-4"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : items.length > 0 ? (
//             <>
//               {/* Masonry (columns): har card apni natural height leta hai, khali jagah nahi bachti */}
//               <ul className="mx-auto max-w-6xl columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3">
//                 {shown.map((t, idx) => (
//                   <li key={t.id} className="mb-5 break-inside-avoid sm:mb-6">
//                     <Reveal delay={(idx % 3) * 80}>
//                       <TestimonialCard t={t} onPlay={setPlaying} />
//                     </Reveal>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-10 flex flex-col items-center gap-3">
//                 <p className="text-sm text-[#6B7A90]" aria-live="polite">
//                   Showing {shown.length} of {items.length}
//                 </p>
//                 {hasMore && (
//                   <Button
//                     variant="outline"
//                     size="md"
//                     onClick={() => setVisible((v) => v + PAGE_SIZE)}
//                   >
//                     Show more feedback
//                   </Button>
//                 )}
//               </div>
//             </>
//           ) : (
//             <p className="text-center text-sm text-[#6B7A90]">
//               Client feedback will be shared here soon. Be the first to share your experience!
//             </p>
//           )}

//           <p className="mx-auto mt-8 max-w-2xl text-center text-xs italic leading-relaxed text-[#7A8E83]">
//             {DISCLAIMER}
//           </p>
//         </div>
//       </section>

//       <section className="section-y bg-[#FAF7F2]">
//         <Reveal className="container-x max-w-3xl space-y-5 text-center">
//           <h2 className="font-serif text-[26px] leading-tight text-[#2D1C59] sm:text-4xl">
//             {CTA.title}
//           </h2>
//           <p className="mx-auto max-w-xl text-base leading-relaxed text-[#4E6258]">
//             {CTA.description}
//           </p>
//           <div className="mx-auto flex w-full max-w-sm flex-col items-stretch pt-2 sm:max-w-none sm:flex-row sm:justify-center">
//             <Button
//               variant="primary"
//               size="lg"
//               onClick={() => router.push(CTA_HREF)}
//               className="w-full justify-center sm:w-auto"
//             >
//               {CTA_LABEL}
//               <ArrowRight className="ml-1 h-4 w-4" />
//             </Button>
//           </div>
//         </Reveal>
//       </section>

//       {playing?.video && (
//         <VideoModal video={playing.video} name={playing.name} onClose={closeVideo} />
//       )}
//     </div>
//   );
// }









// // src/views/feedback/FeedbackPage.jsx
// "use client";

// import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { useRouter } from "next/navigation";
// import { ArrowRight, Play, X } from "lucide-react";
// import Button from "@/components/ui/Button";
// import Reveal from "@/components/ui/Reveal";
// import Stars from "@/components/feedback/Stars";

// import {
//   getPublicFeedbacksApi,
//   rowsOf,
//   customerOf,
//   fmtDate,
//   videoOf,
// } from "@/services/feedbackService";

// /* -------------------------------------------------------------------------- */
// /*  CONFIG                                                                     */
// /* -------------------------------------------------------------------------- */
// const CTA_LABEL = "Book Free Discovery Call";
// const CTA_HREF = "/contact#contact-form";
// const PAGE_SIZE = 9; // pehle itne cards, "Show more" par itne aur

// export const HERO = {
//   titlePrefix: "What Our",
//   titleHighlight: "Clients",
//   titleSuffix: "Say",
//   subtitle: "Real feedback from people who worked with us",
// };

// // Purani dummy list hata di gayi hai. Koi file isse import kare to build na toote, isliye khali export.
// export const TESTIMONIALS = [];

// const CTA = {
//   title: "Ready to begin your own journey?",
//   description:
//     "Book a free discovery call, ask your questions and see if it feels right for you.",
// };

// const DISCLAIMER =
//   "Individual experiences vary. Wellness sessions complement, but do not replace, professional medical or mental-health care.";

// /* -------------------------------------------------------------------------- */
// /*  API data -> card shape                                                     */
// /* -------------------------------------------------------------------------- */
// const API_ORIGIN = (
//   process.env.NEXT_PUBLIC_API_URL ||
//   "https://inner-wellness-backend.onrender.com/api/v1"
// ).replace(/\/api\/v1\/?$/, "");

// // Backend relative path (/uploads/x.jpg) de to full URL banao
// const picUrl = (p) => {
//   if (!p) return "";
//   if (/^(https?:|data:|blob:)/i.test(p)) return p;
//   return `${API_ORIGIN}/${String(p).replace(/^\/+/, "")}`;
// };

// // Start/end ke quotes aur extra spaces hatao
// const clean = (s = "") => String(s).replace(/^["“”'\s]+|["“”'\s]+$/g, "").trim();

// const norm = (s = "") =>
//   clean(s)
//     .replace(/(\.\.\.|…)$/, "")
//     .trim()
//     .toLowerCase();

// // Title agar comment jaisa hi hai (ya uska hissa) to dikhana nahi
// const isDuplicate = (title, comment) => {
//   const t = norm(title);
//   const c = norm(comment);
//   if (!t) return true;
//   if (!c) return false;
//   return c.startsWith(t) || t.startsWith(c) || c === t;
// };

// // Cloudinary video se thumbnail (first frame) banata hai
// const posterOf = (url = "") =>
//   url.includes("/video/upload/")
//     ? url
//         .replace("/video/upload/", "/video/upload/so_0,w_800,f_jpg/")
//         .replace(/\.\w+$/, ".jpg")
//     : "";

// const toCard = (f) => {
//   const c = customerOf(f);
//   const quote = clean(f.comment);
//   const vid = videoOf(f);
//   return {
//     id: `f-${f.id}`,
//     name: c.name,
//     image: picUrl(c.pic),
//     rating: Number(f.rating) || 0,
//     title: f.title && !isDuplicate(f.title, f.comment) ? f.title : "",
//     date: fmtDate(f.created_at),
//     quote,
//     video: vid ? { src: vid, poster: posterOf(vid) } : null,
//   };
// };



// // const toCard = (f) => {
// //   const c = customerOf(f);
// //   const quote = clean(f.comment);
// //   return {
// //     id: `f-${f.id}`,
// //     name: c.name,
// //     image: picUrl(c.pic),
// //     rating: Number(f.rating) || 0,
// //     title: f.title && !isDuplicate(f.title, f.comment) ? f.title : "",
// //     date: fmtDate(f.created_at),
// //     quote,
// //   };
// // };

// // Saare pages fetch karta hai (backend sirf Active feedback deta hai)
// async function fetchAllPublic() {
//   let page = 1;
//   let totalPages = 1;
//   let all = [];
//   do {
//     const d = await getPublicFeedbacksApi({ page, limit: 20 });
//     all = all.concat(rowsOf(d));
//     totalPages = Array.isArray(d) ? 1 : d?.total_pages || 1;
//     page += 1;
//   } while (page <= totalPages && page <= 10);
//   return all.map(toCard);
// }

// /* -------------------------------------------------------------------------- */
// /*  helpers                                                                    */
// /* -------------------------------------------------------------------------- */
// const initialsOf = (name = "") =>
//   name
//     .split(" ")
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((w) => w[0]?.toUpperCase())
//     .join("");

// // Photo na ho / load na ho to initials circle (layout nahi tootta)
// function Avatar({ name, image }) {
//   const [failed, setFailed] = useState(false);
//   const imgRef = useRef(null);

//   useEffect(() => {
//     setFailed(false);
//   }, [image]);

//   // Server render me image 404 ho jaye to onError miss ho jata hai, isliye mount par bhi check
//   useEffect(() => {
//     const el = imgRef.current;
//     if (el && el.complete && el.naturalWidth === 0) setFailed(true);
//   }, [image]);

//   if (image && !failed) {
//     return (
//       <img
//         ref={imgRef}
//         src={image}
//         alt=""
//         width={44}
//         height={44}
//         loading="lazy"
//         decoding="async"
//         referrerPolicy="no-referrer"
//         onError={() => setFailed(true)}
//         className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white"
//       />
//     );
//   }
//   return (
//     <span
//       aria-hidden="true"
//       className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2D1C59] to-[#5B2FC2] font-serif text-base font-semibold text-white ring-2 ring-white"
//     >
//       {initialsOf(name)}
//     </span>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  video modal (portal, focus trap, Esc, scroll lock, focus restore)          */
// /* -------------------------------------------------------------------------- */
// export function VideoModal({ video, name, onClose }) {
//   const dialogRef = useRef(null);
//   const closeRef = useRef(null);
//   const videoRef = useRef(null);
//   const titleId = useId();
//   const [error, setError] = useState(false);

//   useEffect(() => {
//     const previouslyFocused = document.activeElement;
//     const prevOverflow = document.body.style.overflow;
//     const videoEl = videoRef.current;
//     document.body.style.overflow = "hidden";
//     closeRef.current?.focus();

//     const onKey = (e) => {
//       if (e.key === "Escape") {
//         e.preventDefault();
//         onClose();
//         return;
//       }
//       if (e.key !== "Tab") return;
//       const nodes = dialogRef.current?.querySelectorAll(
//         'button, video[controls], a[href], [tabindex]:not([tabindex="-1"])'
//       );
//       if (!nodes?.length) return;
//       const first = nodes[0];
//       const last = nodes[nodes.length - 1];
//       if (e.shiftKey && document.activeElement === first) {
//         e.preventDefault();
//         last.focus();
//       } else if (!e.shiftKey && document.activeElement === last) {
//         e.preventDefault();
//         first.focus();
//       }
//     };

//     document.addEventListener("keydown", onKey);
//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = prevOverflow;
//       videoEl?.pause();
//       previouslyFocused?.focus?.();
//     };
//   }, [onClose]);

//   return createPortal(
//     <div
//       className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
//       onMouseDown={(e) => e.target === e.currentTarget && onClose()}
//     >
//       <div
//         ref={dialogRef}
//         role="dialog"
//         aria-modal="true"
//         aria-labelledby={titleId}
//         className="relative w-full max-w-3xl"
//       >
//         <h2 id={titleId} className="sr-only">
//           {name} video testimonial
//         </h2>

//         <button
//           ref={closeRef}
//           type="button"
//           onClick={onClose}
//           aria-label="Close video"
//           className="absolute -top-11 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
//         >
//           <X className="h-5 w-5" aria-hidden="true" />
//         </button>

//         {error ? (
//           <div
//             role="status"
//             className="flex aspect-video w-full items-center justify-center rounded-2xl bg-[#1A103F] px-6 text-center text-sm text-white/80"
//           >
//             Video coming soon
//           </div>
//         ) : (
//           <video
//             ref={videoRef}
//             src={video.src}
//             poster={video.poster || undefined}
//             className="max-h-[80vh] w-full rounded-2xl bg-black object-contain"
//             controls
//             autoPlay
//             playsInline
//             preload="metadata"
//             onError={() => setError(true)}
//           />
//         )}
//       </div>
//     </div>,
//     document.body
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  testimonial card                                                           */
// /* -------------------------------------------------------------------------- */
// export function TestimonialCard({ t, onPlay }) {
//   const quoteRef = useRef(null);
//   const posterRef = useRef(null);
//   const quoteId = useId();
//   const [expanded, setExpanded] = useState(false);
//   const [clamped, setClamped] = useState(false);
//   const [posterFailed, setPosterFailed] = useState(false);

//   const hasVideo = Boolean(t.video?.src);
//   const clampClass = expanded ? "" : hasVideo ? "line-clamp-3" : "line-clamp-5";

//   useEffect(() => {
//     const el = posterRef.current;
//     if (el && el.complete && el.naturalWidth === 0) setPosterFailed(true);
//   }, []);

//   // Asli overflow detect hota hai, resize par bhi
//   useEffect(() => {
//     const el = quoteRef.current;
//     if (!el || expanded) return;
//     const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
//     check();
//     if (typeof ResizeObserver === "undefined") return;
//     const ro = new ResizeObserver(check);
//     ro.observe(el);
//     return () => ro.disconnect();
//   }, [expanded, t.quote]);

//   const showToggle = clamped || expanded;
//   const subline = [t.role, t.location].filter(Boolean).join(" · ") || t.date || "";

//   return (
//     <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2D1C59]/[0.06] bg-white p-5 shadow-[0_8px_26px_-12px_rgba(45,28,89,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-14px_rgba(45,28,89,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6">
//       {/* decorative quote mark */}
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 24 24"
//         className="absolute right-4 top-4 h-10 w-10 fill-[#C5A265]/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-125"
//       >
//         <path d="M9.6 5C6.5 6.3 4 9.3 4 13.2V19h6.3v-6H7.5c0-2 1-3.5 2.6-4.4L9.6 5zm9 0c-3.1 1.3-5.6 4.3-5.6 8.2V19h6.3v-6h-2.8c0-2 1-3.5 2.6-4.4L18.6 5z" />
//       </svg>

//       {hasVideo && (
//         <button
//           type="button"
//           onClick={() => onPlay?.(t)}
//           aria-label={`Play ${t.name} video testimonial`}
//           className="group/v relative mb-4 block aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-[#E9E4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D1C59]"
//         >
//           {posterFailed || !t.video.poster ? (
//             <span className="absolute inset-0 bg-gradient-to-br from-[#2D1C59] via-[#5B2FC2] to-[#B88B4A]" />
//           ) : (
//             <img
//               ref={posterRef}
//               src={t.video.poster}
//               alt=""
//               width={800}
//               height={450}
//               loading="lazy"
//               decoding="async"
//               onError={() => setPosterFailed(true)}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover/v:scale-105 motion-reduce:transition-none"
//             />
//           )}
//           <span className="absolute inset-0 bg-[#1A103F]/10 transition-colors group-hover/v:bg-[#1A103F]/20" />
//           <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover/v:scale-110 motion-reduce:transition-none">
//             <Play className="ml-0.5 h-5 w-5 fill-[#1A103F] text-[#1A103F]" aria-hidden="true" />
//           </span>
//         </button>
//       )}

//       {t.rating > 0 && <Stars value={t.rating} size="h-4 w-4" />}

//       {t.title && (
//         <h3 className="mt-3 pr-8 font-serif text-lg leading-snug text-[#2D1C59]">{t.title}</h3>
//       )}

//       <blockquote className={t.title ? "mt-2" : "mt-3 pr-8"}>
//         <p
//           ref={quoteRef}
//           id={quoteId}
//           className={`text-sm leading-relaxed text-[#4A5560] sm:text-[15px] ${clampClass}`}
//         >
//           {t.quote}
//         </p>
//       </blockquote>

//       {showToggle && (
//         <button
//           type="button"
//           onClick={() => setExpanded((v) => !v)}
//           aria-expanded={expanded}
//           aria-controls={quoteId}
//           className="mt-2 w-fit cursor-pointer text-sm font-semibold text-[#0E6E6B] transition-colors hover:text-[#094D4B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6E6B]"
//         >
//           {expanded ? "Show less" : "Read more"}
//         </button>
//       )}

//       {t.service && (
//         <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[#B88B4A]">
//           {t.service}
//         </p>
//       )}

//       <div className="mt-5 flex items-center gap-3 border-t border-[#2D1C59]/[0.07] pt-4">
//         <Avatar name={t.name} image={t.image} />
//         <div className="min-w-0">
//           <cite className="block truncate text-sm font-semibold capitalize not-italic leading-tight text-[#2D1C59] sm:text-base">
//             {t.name}
//           </cite>
//           {subline && <p className="truncate text-xs text-[#6B7A90]">{subline}</p>}
//         </div>
//       </div>

//       {/* bottom accent line (hover par khulti hai) */}
//       <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#5B2FC2] via-[#C5A265] to-[#E8A948] transition-transform duration-500 group-hover:scale-x-100" />
//     </article>
//   );
// }

// /* -------------------------------------------------------------------------- */
// /*  page                                                                       */
// /* -------------------------------------------------------------------------- */
// export default function FeedbackPage() {
//   const router = useRouter();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [visible, setVisible] = useState(PAGE_SIZE);
//   const [filter, setFilter] = useState("all"); // "all" | 1..5
//   const [playing, setPlaying] = useState(null);

//   const closeVideo = useCallback(() => setPlaying(null), []);

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError("");
//     try {
//       setItems(await fetchAllPublic());
//     } catch (e) {
//       console.warn("Feedback load failed:", e);
//       setError("Feedback abhi load nahi ho paayi. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     load();
//   }, [load]);

//   // stats + filter counts
//   const { avg, counts } = useMemo(() => {
//     const rated = items.filter((i) => i.rating > 0);
//     const average = rated.length
//       ? (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1)
//       : null;
//     const c = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
//     items.forEach((i) => {
//       if (c[i.rating] !== undefined) c[i.rating] += 1;
//     });
//     return { avg: average, counts: c };
//   }, [items]);

//   const filtered = useMemo(
//     () => (filter === "all" ? items : items.filter((i) => i.rating === filter)),
//     [items, filter]
//   );

//   const shown = filtered.slice(0, visible);
//   const hasMore = visible < filtered.length;

//   const chooseFilter = (f) => {
//     setFilter(f);
//     setVisible(PAGE_SIZE);
//   };

//   const chips = [
//     { key: "all", label: "All", count: items.length },
//     ...[5, 4, 3, 2, 1]
//       .filter((n) => counts[n] > 0)
//       .map((n) => ({ key: n, label: `${n} ★`, count: counts[n] })),
//   ];

//   return (
//     <div className="relative w-full overflow-x-hidden bg-[#FBF9F5]">
//       {/* ================= HERO + LIST ================= */}
//       <section className="section-y relative overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#F6F2FB] to-[#FBF9F5]">
//         {/* animated blobs */}
//         <div aria-hidden="true" className="pointer-events-none absolute inset-0">
//           <span className="fb-float absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#5B2FC2]/10 blur-3xl" />
//           <span
//             className="fb-float absolute -right-24 top-40 h-80 w-80 rounded-full bg-[#F3CF63]/25 blur-3xl"
//             style={{ animationDelay: "-6s" }}
//           />
//           <span
//             className="fb-float absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#0E6E6B]/10 blur-3xl"
//             style={{ animationDelay: "-10s" }}
//           />
//         </div>

//         <div className="container-x relative">
//           {/* Heading */}
//           <Reveal className="mx-auto mb-10 max-w-2xl space-y-4 text-center sm:mb-12">
//             <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#14123A] sm:text-5xl">
//               {HERO.titlePrefix}{" "}
//               <span className="fb-gradient bg-gradient-to-r from-[#5B2FC2] via-[#B88B4A] to-[#E8A948] bg-clip-text text-transparent">
//                 {HERO.titleHighlight}
//               </span>{" "}
//               {HERO.titleSuffix}
//             </h1>
//             <p className="text-base text-[#6B7A90] sm:text-lg">{HERO.subtitle}</p>

//             {avg && (
//               <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 shadow-[0_6px_20px_-8px_rgba(45,28,89,0.25)]">
//                 <Stars value={Math.round(Number(avg))} size="h-4 w-4" />
//                 <span className="text-sm font-semibold text-[#2D1C59]">{avg}</span>
//                 <span className="text-sm text-[#6B7A90]">
//                   · {items.length} review{items.length > 1 ? "s" : ""}
//                 </span>
//               </div>
//             )}

//             <div className="pt-1">
//               <Button
//                 variant="outline"
//                 size="md"
//                 onClick={() => router.push("/share-feedback")}
//               >
//                 Share your feedback
//               </Button>
//             </div>
//           </Reveal>

//           {/* Rating filter chips */}
//           {!loading && !error && items.length > 0 && chips.length > 2 && (
//             <Reveal delay={80} className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2">
//               {chips.map((c) => {
//                 const active = filter === c.key;
//                 return (
//                   <button
//                     key={c.key}
//                     type="button"
//                     onClick={() => chooseFilter(c.key)}
//                     aria-pressed={active}
//                     className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
//                       active
//                         ? "scale-105 bg-[#2D1C59] text-white shadow-lg shadow-[#2D1C59]/25"
//                         : "bg-white text-[#2D1C59] shadow-sm hover:-translate-y-0.5 hover:shadow-md"
//                     }`}
//                   >
//                     {c.label}
//                     <span className={`ml-1.5 text-xs ${active ? "text-white/70" : "text-[#6B7A90]"}`}>
//                       {c.count}
//                     </span>
//                   </button>
//                 );
//               })}
//             </Reveal>
//           )}

//           {/* States */}
//           {loading ? (
//             <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
//               {Array.from({ length: 3 }).map((_, i) => (
//                 <div key={i} className="h-52 animate-pulse rounded-2xl bg-[#E9EEE3]/70" />
//               ))}
//             </div>
//           ) : error ? (
//             <div className="mx-auto max-w-md rounded-2xl bg-[#E9EEE3] px-6 py-8 text-center text-sm text-[#4A5560]">
//               <p>{error}</p>
//               <button
//                 onClick={load}
//                 className="mt-3 font-semibold text-[#2D1C59] underline underline-offset-4"
//               >
//                 Retry
//               </button>
//             </div>
//           ) : filtered.length > 0 ? (
//             <>
//               {/* Masonry (columns): har card apni natural height leta hai */}
//               <ul className="mx-auto max-w-6xl columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3">
//                 {shown.map((t, idx) => (
//                   <li key={t.id} className="mb-5 break-inside-avoid sm:mb-6">
//                     <Reveal delay={(idx % 3) * 90}>
//                       <TestimonialCard t={t} onPlay={setPlaying} />
//                     </Reveal>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-10 flex flex-col items-center gap-3">
//                 <p className="text-sm text-[#6B7A90]" aria-live="polite">
//                   Showing {shown.length} of {filtered.length}
//                 </p>
//                 {hasMore && (
//                   <Button
//                     variant="outline"
//                     size="md"
//                     onClick={() => setVisible((v) => v + PAGE_SIZE)}
//                   >
//                     Show more feedback
//                   </Button>
//                 )}
//               </div>
//             </>
//           ) : items.length > 0 ? (
//             <p className="text-center text-sm text-[#6B7A90]">
//               Is rating ka koi feedback nahi hai.{" "}
//               <button
//                 onClick={() => chooseFilter("all")}
//                 className="font-semibold text-[#2D1C59] underline underline-offset-4"
//               >
//                 Sab dekhein
//               </button>
//             </p>
//           ) : (
//             <p className="text-center text-sm text-[#6B7A90]">
//               Client feedback will be shared here soon. Be the first to share your experience!
//             </p>
//           )}

//           <p className="mx-auto mt-8 max-w-2xl text-center text-xs italic leading-relaxed text-[#7A8E83]">
//             {DISCLAIMER}
//           </p>
//         </div>
//       </section>

//       {/* ================= CTA ================= */}
//       <section className="section-y relative overflow-hidden bg-[#FAF7F2]">
//         <Reveal className="container-x max-w-4xl">
//           <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2D1C59] via-[#3B2F66] to-[#5B2FC2] px-6 py-12 text-center shadow-2xl shadow-[#2D1C59]/25 sm:px-12 sm:py-14">
//             <span
//               aria-hidden="true"
//               className="fb-float absolute -right-10 -top-10 h-52 w-52 rounded-full bg-[#E8A948]/25 blur-3xl"
//             />
//             <span
//               aria-hidden="true"
//               className="fb-float absolute -bottom-12 -left-10 h-52 w-52 rounded-full bg-white/10 blur-3xl"
//               style={{ animationDelay: "-7s" }}
//             />

//             <div className="relative space-y-5">
//               <h2 className="font-serif text-[26px] leading-tight text-white sm:text-4xl">
//                 {CTA.title}
//               </h2>
//               <p className="mx-auto max-w-xl text-base leading-relaxed text-white/80">
//                 {CTA.description}
//               </p>
//               <div className="pt-2">
//                 <button
//                   type="button"
//                   onClick={() => router.push(CTA_HREF)}
//                   className="fb-shine group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#E8A948] px-8 py-3.5 text-sm font-semibold text-[#2D1C59] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
//                 >
//                   {CTA_LABEL}
//                   <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Reveal>
//       </section>

//       {playing?.video && (
//         <VideoModal video={playing.video} name={playing.name} onClose={closeVideo} />
//       )}

//       <style>{`
//         @keyframes fb-float {
//           0%, 100% { transform: translateY(0) scale(1); }
//           50%      { transform: translateY(-28px) scale(1.1); }
//         }
//         @keyframes fb-gradient {
//           0%, 100% { background-position: 0% 50%; }
//           50%      { background-position: 100% 50%; }
//         }
//         @keyframes fb-sheen {
//           0%   { transform: translateX(-120%) skewX(-20deg); }
//           60%, 100% { transform: translateX(220%) skewX(-20deg); }
//         }
//         .fb-float { animation: fb-float 14s ease-in-out infinite; }
//         .fb-gradient { background-size: 200% 200%; animation: fb-gradient 6s ease infinite; }
//         .fb-shine::after {
//           content: "";
//           position: absolute;
//           inset: 0;
//           width: 40%;
//           background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
//           transform: translateX(-120%) skewX(-20deg);
//           animation: fb-sheen 3.5s ease-in-out infinite;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           .fb-float, .fb-gradient, .fb-shine::after { animation: none !important; }
//         }
//       `}</style>
//     </div>
//   );
// }





// updated 





// src/views/feedback/FeedbackPage.jsx
"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ArrowRight, Play, X } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import Stars from "@/components/feedback/Stars";
import {
  getPublicFeedbacksApi,
  rowsOf,
  customerOf,
  fmtDate,
  videoOf,
} from "@/services/feedbackService";

/* -------------------------------------------------------------------------- */
/*  CONFIG                                                                     */
/* -------------------------------------------------------------------------- */
const CTA_LABEL = "Book Free Discovery Call";
const CTA_HREF = "/contact#contact-form";
const PAGE_SIZE = 9; // pehle itne cards, "Show more" par itne aur

export const HERO = {
  titlePrefix: "What Our",
  titleHighlight: "Clients",
  titleSuffix: "Say",
  subtitle: "Real feedback from people who worked with us",
};

// Purani dummy list hata di gayi hai. Koi file isse import kare to build na toote, isliye khali export.
export const TESTIMONIALS = [];

const CTA = {
  title: "Ready to begin your own journey?",
  description:
    "Book a free discovery call, ask your questions and see if it feels right for you.",
};

const DISCLAIMER =
  "Individual experiences vary. Wellness sessions complement, but do not replace, professional medical or mental-health care.";

/* -------------------------------------------------------------------------- */
/*  API data -> card shape                                                     */
/* -------------------------------------------------------------------------- */
const API_ORIGIN = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://inner-wellness-backend.onrender.com/api/v1"
).replace(/\/api\/v1\/?$/, "");

// Backend relative path (/uploads/x.jpg) de to full URL banao
const picUrl = (p) => {
  if (!p) return "";
  if (/^(https?:|data:|blob:)/i.test(p)) return p;
  return `${API_ORIGIN}/${String(p).replace(/^\/+/, "")}`;
};

// Start/end ke quotes aur extra spaces hatao
const clean = (s = "") => String(s).replace(/^["“”'\s]+|["“”'\s]+$/g, "").trim();

const norm = (s = "") =>
  clean(s)
    .replace(/(\.\.\.|…)$/, "")
    .trim()
    .toLowerCase();

// Title agar comment jaisa hi hai (ya uska hissa) to dikhana nahi
const isDuplicate = (title, comment) => {
  const t = norm(title);
  const c = norm(comment);
  if (!t) return true;
  if (!c) return false;
  return c.startsWith(t) || t.startsWith(c) || c === t;
};

// Cloudinary video se thumbnail (first frame) banata hai
const posterOf = (url = "") =>
  url.includes("/video/upload/")
    ? url
        .replace("/video/upload/", "/video/upload/so_0,w_800,f_jpg/")
        .replace(/\.\w+$/, ".jpg")
    : "";

const toCard = (f) => {
  const c = customerOf(f);
  const quote = clean(f.comment);
  const vid = videoOf(f);
  return {
    id: `f-${f.id}`,
    name: c.name,
    image: picUrl(c.pic),
    rating: Number(f.rating) || 0,
    title: f.title && !isDuplicate(f.title, f.comment) ? f.title : "",
    date: fmtDate(f.created_at),
    quote,
    video: vid ? { src: vid, poster: posterOf(vid) } : null,
  };
};

// Saare pages fetch karta hai (backend sirf Active feedback deta hai)
async function fetchAllPublic() {
  let page = 1;
  let totalPages = 1;
  let all = [];
  do {
    const d = await getPublicFeedbacksApi({ page, limit: 20 });
    all = all.concat(rowsOf(d));
    totalPages = Array.isArray(d) ? 1 : d?.total_pages || 1;
    page += 1;
  } while (page <= totalPages && page <= 10);
  return all.map(toCard);
}

/* -------------------------------------------------------------------------- */
/*  helpers                                                                    */
/* -------------------------------------------------------------------------- */
const initialsOf = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

// Photo na ho / load na ho to initials circle (layout nahi tootta)
function Avatar({ name, image }) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setFailed(false);
  }, [image]);

  // Server render me image 404 ho jaye to onError miss ho jata hai, isliye mount par bhi check
  useEffect(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [image]);

  if (image && !failed) {
    return (
      <img
        ref={imgRef}
        src={image}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2D1C59] to-[#5B2FC2] font-serif text-base font-semibold text-white ring-2 ring-white"
    >
      {initialsOf(name)}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/*  video modal (portal, focus trap, Esc, scroll lock, focus restore)          */
/* -------------------------------------------------------------------------- */
export function VideoModal({ video, name, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const titleId = useId();
  const [error, setError] = useState(false);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    const videoEl = videoRef.current;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const nodes = dialogRef.current?.querySelectorAll(
        'button, video[controls], a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      videoEl?.pause();
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative w-full max-w-3xl"
      >
        <h2 id={titleId} className="sr-only">
          {name} video testimonial
        </h2>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute -top-11 right-0 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        {error ? (
          <div
            role="alert"
            className="flex aspect-video w-full items-center justify-center rounded-2xl bg-[#1A103F] px-6 text-center text-sm text-white/80"
          >
            Video could not be loaded. Please try again later.
          </div>
        ) : (
          <video
            ref={videoRef}
            src={video.src}
            poster={video.poster || undefined}
            className="max-h-[80vh] w-full rounded-2xl bg-black object-contain"
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={() => setError(true)}
          />
        )}
      </div>
    </div>,
    document.body
  );
}

/* -------------------------------------------------------------------------- */
/*  testimonial card                                                           */
/* -------------------------------------------------------------------------- */
export function TestimonialCard({ t, onPlay }) {
  const quoteRef = useRef(null);
  const posterRef = useRef(null);
  const quoteId = useId();
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const hasVideo = Boolean(t.video?.src);
  const hasQuote = Boolean(t.quote);
  const clampClass = expanded ? "" : hasVideo ? "line-clamp-3" : "line-clamp-5";

  useEffect(() => {
    const el = posterRef.current;
    if (el && el.complete && el.naturalWidth === 0) setPosterFailed(true);
  }, []);

  // Asli overflow detect hota hai, resize par bhi
  useEffect(() => {
    const el = quoteRef.current;
    if (!el || expanded) return;
    const check = () => setClamped(el.scrollHeight > el.clientHeight + 1);
    check();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [expanded, t.quote]);

  const showToggle = hasQuote && (clamped || expanded);
  const subline = [t.role, t.location].filter(Boolean).join(" · ") || t.date || "";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#2D1C59]/[0.06] bg-white p-5 shadow-[0_8px_26px_-12px_rgba(45,28,89,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_48px_-14px_rgba(45,28,89,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6">
      {/* decorative quote mark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute right-4 top-4 h-10 w-10 fill-[#C5A265]/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-125"
      >
        <path d="M9.6 5C6.5 6.3 4 9.3 4 13.2V19h6.3v-6H7.5c0-2 1-3.5 2.6-4.4L9.6 5zm9 0c-3.1 1.3-5.6 4.3-5.6 8.2V19h6.3v-6h-2.8c0-2 1-3.5 2.6-4.4L18.6 5z" />
      </svg>

      {hasVideo && (
        <button
          type="button"
          onClick={() => onPlay?.(t)}
          aria-label={`Play ${t.name} video testimonial`}
          className="group/v relative mb-4 block aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-[#E9E4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D1C59]"
        >
          {posterFailed || !t.video.poster ? (
            <span className="absolute inset-0 bg-gradient-to-br from-[#2D1C59] via-[#5B2FC2] to-[#B88B4A]" />
          ) : (
            <img
              ref={posterRef}
              src={t.video.poster}
              alt=""
              width={800}
              height={450}
              loading="lazy"
              decoding="async"
              onError={() => setPosterFailed(true)}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/v:scale-105 motion-reduce:transition-none"
            />
          )}
          <span className="absolute inset-0 bg-[#1A103F]/10 transition-colors group-hover/v:bg-[#1A103F]/20" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover/v:scale-110 motion-reduce:transition-none">
            <Play className="ml-0.5 h-5 w-5 fill-[#1A103F] text-[#1A103F]" aria-hidden="true" />
          </span>
        </button>
      )}

      {t.rating > 0 && <Stars value={t.rating} size="h-4 w-4" />}

      {t.title && (
        <h3 className="mt-3 pr-8 font-serif text-lg leading-snug text-[#2D1C59]">{t.title}</h3>
      )}

      {hasQuote && (
        <blockquote className={t.title ? "mt-2" : "mt-3 pr-8"}>
          <p
            ref={quoteRef}
            id={quoteId}
            className={`text-sm leading-relaxed text-[#4A5560] sm:text-[15px] ${clampClass}`}
          >
            {t.quote}
          </p>
        </blockquote>
      )}

      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
          aria-controls={quoteId}
          className="mt-2 w-fit cursor-pointer text-sm font-semibold text-[#0E6E6B] transition-colors hover:text-[#094D4B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E6E6B]"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}

      {t.service && (
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-[#B88B4A]">
          {t.service}
        </p>
      )}

      <div className="mt-5 flex items-center gap-3 border-t border-[#2D1C59]/[0.07] pt-4">
        <Avatar name={t.name} image={t.image} />
        <div className="min-w-0">
          <cite className="block truncate text-sm font-semibold capitalize not-italic leading-tight text-[#2D1C59] sm:text-base">
            {t.name}
          </cite>
          {subline && <p className="truncate text-xs text-[#6B7A90]">{subline}</p>}
        </div>
      </div>

      {/* bottom accent line (hover par khulti hai) */}
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#5B2FC2] via-[#C5A265] to-[#E8A948] transition-transform duration-500 group-hover:scale-x-100" />
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*  page                                                                       */
/* -------------------------------------------------------------------------- */
export default function FeedbackPage() {
  const router = useRouter();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [filter, setFilter] = useState("all"); // "all" | 1..5
  const [playing, setPlaying] = useState(null);

  const closeVideo = useCallback(() => setPlaying(null), []);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setItems(await fetchAllPublic());
    } catch (e) {
      console.warn("Feedback load failed:", e);
      setError("Feedback abhi load nahi ho paayi. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // stats + filter counts
  const { avg, counts } = useMemo(() => {
    const rated = items.filter((i) => i.rating > 0);
    const average = rated.length
      ? (rated.reduce((s, i) => s + i.rating, 0) / rated.length).toFixed(1)
      : null;
    const c = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    items.forEach((i) => {
      if (c[i.rating] !== undefined) c[i.rating] += 1;
    });
    return { avg: average, counts: c };
  }, [items]);

  const filtered = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.rating === filter)),
    [items, filter]
  );

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  const chooseFilter = (f) => {
    setFilter(f);
    setVisible(PAGE_SIZE);
  };

  const chips = [
    { key: "all", label: "All", count: items.length },
    ...[5, 4, 3, 2, 1]
      .filter((n) => counts[n] > 0)
      .map((n) => ({ key: n, label: `${n} ★`, count: counts[n] })),
  ];

  return (
    <div className="relative w-full overflow-x-hidden bg-[#FBF9F5]">
      {/* ================= HERO + LIST ================= */}
      <section className="section-y relative overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#F6F2FB] to-[#FBF9F5]">
        {/* animated blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <span className="fb-float absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#5B2FC2]/10 blur-3xl" />
          <span
            className="fb-float absolute -right-24 top-40 h-80 w-80 rounded-full bg-[#F3CF63]/25 blur-3xl"
            style={{ animationDelay: "-6s" }}
          />
          <span
            className="fb-float absolute bottom-10 left-1/3 h-64 w-64 rounded-full bg-[#0E6E6B]/10 blur-3xl"
            style={{ animationDelay: "-10s" }}
          />
        </div>

        <div className="container-x relative">
          {/* Heading */}
          <Reveal className="mx-auto mb-10 max-w-2xl space-y-4 text-center sm:mb-12">
            <h1 className="text-[32px] font-extrabold leading-tight tracking-tight text-[#14123A] sm:text-5xl">
              {HERO.titlePrefix}{" "}
              <span className="fb-gradient bg-gradient-to-r from-[#5B2FC2] via-[#B88B4A] to-[#E8A948] bg-clip-text text-transparent">
                {HERO.titleHighlight}
              </span>{" "}
              {HERO.titleSuffix}
            </h1>
            <p className="text-base text-[#6B7A90] sm:text-lg">{HERO.subtitle}</p>

            {avg && (
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 shadow-[0_6px_20px_-8px_rgba(45,28,89,0.25)]">
                <Stars value={Math.round(Number(avg))} size="h-4 w-4" />
                <span className="text-sm font-semibold text-[#2D1C59]">{avg}</span>
                <span className="text-sm text-[#6B7A90]">
                  · {items.length} review{items.length > 1 ? "s" : ""}
                </span>
              </div>
            )}

            <div className="pt-1">
              <Button
                variant="outline"
                size="md"
                onClick={() => router.push("/share-feedback")}
              >
                Share your feedback
              </Button>
            </div>
          </Reveal>

          {/* Rating filter chips */}
          {!loading && !error && items.length > 0 && chips.length > 2 && (
            <Reveal delay={80} className="mx-auto mb-8 flex max-w-3xl flex-wrap justify-center gap-2">
              {chips.map((c) => {
                const active = filter === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => chooseFilter(c.key)}
                    aria-pressed={active}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                      active
                        ? "scale-105 bg-[#2D1C59] text-white shadow-lg shadow-[#2D1C59]/25"
                        : "bg-white text-[#2D1C59] shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                    }`}
                  >
                    {c.label}
                    <span className={`ml-1.5 text-xs ${active ? "text-white/70" : "text-[#6B7A90]"}`}>
                      {c.count}
                    </span>
                  </button>
                );
              })}
            </Reveal>
          )}

          {/* States */}
          {loading ? (
            <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-52 animate-pulse rounded-2xl bg-[#E9EEE3]/70" />
              ))}
            </div>
          ) : error ? (
            <div className="mx-auto max-w-md rounded-2xl bg-[#E9EEE3] px-6 py-8 text-center text-sm text-[#4A5560]">
              <p>{error}</p>
              <button
                onClick={load}
                className="mt-3 font-semibold text-[#2D1C59] underline underline-offset-4"
              >
                Retry
              </button>
            </div>
          ) : filtered.length > 0 ? (
            <>
              {/* Masonry (columns): har card apni natural height leta hai */}
              <ul className="mx-auto max-w-6xl columns-1 gap-5 sm:columns-2 sm:gap-6 lg:columns-3">
                {shown.map((t, idx) => (
                  <li key={t.id} className="mb-5 break-inside-avoid sm:mb-6">
                    <Reveal delay={(idx % 3) * 90}>
                      <TestimonialCard t={t} onPlay={setPlaying} />
                    </Reveal>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col items-center gap-3">
                <p className="text-sm text-[#6B7A90]" aria-live="polite">
                  Showing {shown.length} of {filtered.length}
                </p>
                {hasMore && (
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  >
                    Show more feedback
                  </Button>
                )}
              </div>
            </>
          ) : items.length > 0 ? (
            <p className="text-center text-sm text-[#6B7A90]">
              Is rating ka koi feedback nahi hai.{" "}
              <button
                onClick={() => chooseFilter("all")}
                className="font-semibold text-[#2D1C59] underline underline-offset-4"
              >
                Sab dekhein
              </button>
            </p>
          ) : (
            <p className="text-center text-sm text-[#6B7A90]">
              Client feedback will be shared here soon. Be the first to share your experience!
            </p>
          )}

          <p className="mx-auto mt-8 max-w-2xl text-center text-xs italic leading-relaxed text-[#7A8E83]">
            {DISCLAIMER}
          </p>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="section-y relative overflow-hidden bg-[#FAF7F2]">
        <Reveal className="container-x max-w-4xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2D1C59] via-[#3B2F66] to-[#5B2FC2] px-6 py-12 text-center shadow-2xl shadow-[#2D1C59]/25 sm:px-12 sm:py-14">
            <span
              aria-hidden="true"
              className="fb-float absolute -right-10 -top-10 h-52 w-52 rounded-full bg-[#E8A948]/25 blur-3xl"
            />
            <span
              aria-hidden="true"
              className="fb-float absolute -bottom-12 -left-10 h-52 w-52 rounded-full bg-white/10 blur-3xl"
              style={{ animationDelay: "-7s" }}
            />

            <div className="relative space-y-5">
              <h2 className="font-serif text-[26px] leading-tight text-white sm:text-4xl">
                {CTA.title}
              </h2>
              <p className="mx-auto max-w-xl text-base leading-relaxed text-white/80">
                {CTA.description}
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => router.push(CTA_HREF)}
                  className="fb-shine group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#E8A948] px-8 py-3.5 text-sm font-semibold text-[#2D1C59] shadow-lg transition duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
                >
                  {CTA_LABEL}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {playing?.video && (
        <VideoModal video={playing.video} name={playing.name} onClose={closeVideo} />
      )}

      <style>{`
        @keyframes fb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-28px) scale(1.1); }
        }
        @keyframes fb-gradient {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        @keyframes fb-sheen {
          0%   { transform: translateX(-120%) skewX(-20deg); }
          60%, 100% { transform: translateX(220%) skewX(-20deg); }
        }
        .fb-float { animation: fb-float 14s ease-in-out infinite; }
        .fb-gradient { background-size: 200% 200%; animation: fb-gradient 6s ease infinite; }
        .fb-shine::after {
          content: "";
          position: absolute;
          inset: 0;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: translateX(-120%) skewX(-20deg);
          animation: fb-sheen 3.5s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .fb-float, .fb-gradient, .fb-shine::after { animation: none !important; }
        }
      `}</style>
    </div>
  );
}