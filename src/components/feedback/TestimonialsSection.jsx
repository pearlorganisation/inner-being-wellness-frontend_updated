// // "use client";

// // import { useEffect, useState } from "react";
// // import Link from "next/link";
// // import Stars from "./Stars";
// // import { getPublicFeedbacksApi, rowsOf, customerOf } from "@/services/feedbackService";

// // function Avatar({ name, pic }) {
// //   const [broken, setBroken] = useState(false);
// //   if (pic && !broken) {
// //     return (
// //       <img
// //         src={pic}
// //         alt={name}
// //         onError={() => setBroken(true)}
// //         referrerPolicy="no-referrer"
// //         className="h-12 w-12 rounded-full object-cover"
// //       />
// //     );
// //   }
// //   return (
// //     <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E9EEE3] font-serif text-lg text-[#2D1C59]">
// //       {(name || "C").charAt(0).toUpperCase()}
// //     </span>
// //   );
// // }

// // export default function TestimonialsSection({
// //   eyebrow = "Testimonials",
// //   title = "Words From Our Community",
// //   limit = 6,
// //   ctaHref,
// //   ctaLabel = "Share your experience",
// // }) {
// //   const [items, setItems] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     let alive = true;
// //     getPublicFeedbacksApi({ page: 1, limit })
// //       .then((d) => alive && setItems(rowsOf(d)))
// //       .catch((e) => console.warn("Testimonials load failed:", e))
// //       .finally(() => alive && setLoading(false));
// //     return () => {
// //       alive = false;
// //     };
// //   }, [limit]);

// //   // koi Active feedback nahi hai to section chhupa do
// //   if (!loading && items.length === 0) return null;

// //   return (
// //     <section className="px-4 py-14 sm:px-6 lg:py-20">
// //       <div className="mx-auto max-w-6xl">
// //         <div className="text-center">
// //           <p className="text-xs font-medium tracking-[0.18em] text-[#C5A265]">
// //             {eyebrow.toUpperCase()}
// //           </p>
// //           <h2 className="mt-3 text-balance font-serif text-[clamp(1.9rem,4.4vw,3.1rem)] leading-tight text-[#2D1C59]">
// //             {title}
// //           </h2>
// //         </div>

// //         {loading ? (
// //           <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
// //             {Array.from({ length: 3 }).map((_, i) => (
// //               <div key={i} className="h-48 animate-pulse rounded-3xl bg-[#E9EEE3]/70" />
// //             ))}
// //           </div>
// //         ) : (
// //           <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
// //             {items.map((f) => {
// //               const c = customerOf(f);
// //               return (
// //                 <article
// //                   key={f.id}
// //                   className="flex flex-col rounded-3xl bg-white p-7 shadow-[0_8px_24px_rgba(45,28,89,0.08)]"
// //                 >
// //                   <Stars value={f.rating} size="h-4 w-4" />
// //                   {f.title && (
// //                     <h3 className="mt-4 font-serif text-xl leading-snug text-[#2D1C59]">
// //                       {f.title}
// //                     </h3>
// //                   )}
// //                   <p className="mt-3 flex-1 text-sm leading-relaxed text-[#4A5560]">
// //                     “{f.comment}”
// //                   </p>
// //                   <div className="mt-6 flex items-center gap-3">
// //                     <Avatar name={c.name} pic={c.pic} />
// //                     <span className="text-sm font-semibold text-[#2D1C59]">{c.name}</span>
// //                   </div>
// //                 </article>
// //               );
// //             })}
// //           </div>
// //         )}

// //         {ctaHref && (
// //           <div className="mt-10 text-center">
// //             <Link
// //               href={ctaHref}
// //               className="inline-block rounded-full bg-[#2D1C59] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#3B2F66]"
// //             >
// //               {ctaLabel}
// //             </Link>
// //           </div>
// //         )}
// //       </div>
// //     </section>
// //   );
// // }

// // new updated code

// "use client";

// import { useEffect, useMemo, useState } from "react";
// import Link from "next/link";
// import Reveal from "@/components/ui/Reveal";
// import Stars from "./Stars";
// import {
//   getPublicFeedbacksApi,
//   rowsOf,
//   customerOf,
// } from "@/services/feedbackService";

// /* ---------- helpers ---------- */
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
// const clean = (s = "") =>
//   String(s)
//     .replace(/^["“”'\s]+|["“”'\s]+$/g, "")
//     .trim();

// // Compare karne ke liye: lowercase, "..." hata ke
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

// function Avatar({ name, pic }) {
//   const [broken, setBroken] = useState(false);
//   if (pic && !broken) {
//     return (
//       <img
//         src={pic}
//         alt=""
//         loading="lazy"
//         onError={() => setBroken(true)}
//         referrerPolicy="no-referrer"
//         className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
//       />
//     );
//   }
//   return (
//     <span
//       aria-hidden="true"
//       className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2D1C59] to-[#5B2FC2] font-serif text-sm font-semibold text-white ring-2 ring-white"
//     >
//       {(name || "C").charAt(0).toUpperCase()}
//     </span>
//   );
// }

// function Card({ f }) {
//   const c = customerOf(f);
//   const comment = clean(f.comment);
//   const showTitle = f.title && !isDuplicate(f.title, f.comment);

//   return (
//     <figure className="group relative flex h-full min-h-[210px] w-[250px] flex-col overflow-hidden rounded-2xl border border-[#2D1C59]/[0.06] bg-white p-5 shadow-[0_8px_24px_-12px_rgba(45,28,89,0.2)] transition-all duration-500 hover:-translate-y-2 hover:rotate-[0.6deg] hover:shadow-[0_22px_44px_-14px_rgba(45,28,89,0.35)] sm:min-h-[230px] sm:w-[290px] sm:p-6 lg:w-[320px]">
//       {/* decorative quote mark (ek hi) */}
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 24 24"
//         className="absolute right-4 top-4 h-9 w-9 fill-[#C5A265]/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-125"
//       >
//         <path d="M9.6 5C6.5 6.3 4 9.3 4 13.2V19h6.3v-6H7.5c0-2 1-3.5 2.6-4.4L9.6 5zm9 0c-3.1 1.3-5.6 4.3-5.6 8.2V19h6.3v-6h-2.8c0-2 1-3.5 2.6-4.4L18.6 5z" />
//       </svg>

//       <Stars value={Number(f.rating) || 0} size="h-3.5 w-3.5" />

//       {showTitle && (
//         <h3 className="mt-3 line-clamp-2 pr-8 font-serif text-lg leading-snug text-[#2D1C59]">
//           {f.title}
//         </h3>
//       )}

//       <p
//         className={`flex-1 text-sm leading-relaxed text-[#4A5560] line-clamp-4 ${
//           showTitle ? "mt-2" : "mt-3 pr-8"
//         }`}
//       >
//         {comment}
//       </p>

//       <figcaption className="mt-4 flex items-center gap-3 border-t border-[#2D1C59]/[0.07] pt-3">
//         <Avatar name={c.name} pic={picUrl(c.pic)} />
//         <span className="truncate text-sm font-semibold capitalize text-[#2D1C59]">
//           {c.name}
//         </span>
//       </figcaption>

//       {/* bottom accent line (hover par khulti hai) */}
//       <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#5B2FC2] via-[#C5A265] to-[#E8A948] transition-transform duration-500 group-hover:scale-x-100" />
//     </figure>
//   );
// }

// /* ---------- marquee row ---------- */
// function Row({ list, reverse = false }) {
//   // chhoti list ko repeat karke row bhar do, phir 2 copies (seamless loop ke liye)
//   const base = useMemo(() => {
//     let b = list;
//     while (b.length > 0 && b.length < 8) b = b.concat(list);
//     return b;
//   }, [list]);

//   const track = useMemo(() => [...base, ...base], [base]);
//   const duration = Math.max(34, base.length * 6);

//   return (
//     <div className="tm-marquee tm-mask relative overflow-hidden py-3">
//       <div
//         className={`tm-track ${reverse ? "tm-rev" : ""}`}
//         style={{ animationDuration: `${duration}s` }}
//       >
//         {track.map((f, i) => (
//           <div
//             key={`${f.id}-${i}`}
//             className="flex shrink-0 pr-4 sm:pr-5"
//             aria-hidden={i >= base.length ? "true" : undefined}
//           >
//             <Card f={f} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// /* ---------- section ---------- */
// export default function TestimonialsSection({
//   eyebrow = "Client Stories",
//   title = "Words From Our Community",
//   limit = 12,
//   ctaHref,
//   ctaLabel = "Share your experience",
// }) {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     let alive = true;
//     getPublicFeedbacksApi({ page: 1, limit })
//       .then((d) => alive && setItems(rowsOf(d)))
//       .catch((e) => console.warn("Testimonials load failed:", e))
//       .finally(() => alive && setLoading(false));
//     return () => {
//       alive = false;
//     };
//   }, [limit]);

//   const rated = items.filter((f) => Number(f.rating) > 0);
//   const avg = rated.length
//     ? (rated.reduce((s, f) => s + Number(f.rating), 0) / rated.length).toFixed(
//         1,
//       )
//     : null;

//   //   // 4+ feedback ho to doosri row ulti direction me aur alag order me
//   //   const twoRows = items.length >= 4;
//   //   const rowB = useMemo(() => {
//   //     if (!twoRows) return [];
//   //     const mid = Math.ceil(items.length / 2);
//   //     return [...items.slice(mid), ...items.slice(0, mid)];
//   //   }, [items, twoRows]);

//   // koi Active feedback nahi hai to section chhupa do
//   if (!loading && items.length === 0) return null;

//   return (
//     <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#F6F2FB] to-[#FBF9F5] py-14 sm:py-16 lg:py-20">
//       {/* animated background blobs */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0">
//         <span className="tm-float absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#5B2FC2]/10 blur-3xl" />
//         <span
//           className="tm-float absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#E8A948]/15 blur-3xl"
//           style={{ animationDelay: "-6s" }}
//         />
//       </div>

//       <div className="relative">
//         {/* Heading */}
//         <Reveal className="mx-auto max-w-3xl px-4 text-center">
//           <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A265] sm:text-sm">
//             {eyebrow.toUpperCase()}
//           </p>
//           <h2 className="mt-3 text-balance font-serif text-[clamp(1.9rem,4.6vw,3.1rem)] leading-tight text-[#2D1C59]">
//             {title}
//           </h2>

//           {avg && (
//             <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 shadow-[0_6px_20px_-8px_rgba(45,28,89,0.25)]">
//               <Stars value={Math.round(Number(avg))} size="h-4 w-4" />
//               <span className="text-sm font-semibold text-[#2D1C59]">
//                 {avg}
//               </span>
//               <span className="text-sm text-[#6B7A90]">
//                 · {items.length} review{items.length > 1 ? "s" : ""}
//               </span>
//             </div>
//           )}
//         </Reveal>

//         {/* Marquee rows */}
//         <div className="mt-8 sm:mt-10">
//           {loading ? (
//             <div className="mx-auto flex max-w-6xl gap-4 overflow-hidden px-4">
//               {Array.from({ length: 3 }).map((_, i) => (
//                 <div
//                   key={i}
//                   className="h-48 w-[250px] shrink-0 animate-pulse rounded-2xl bg-[#E9EEE3]/70 sm:w-[290px]"
//                 />
//               ))}
//             </div>
//           ) : (
//             <>
//              <Row list={items} />
//               {/* {twoRows && <Row list={rowB} reverse />} */}
//             </>
//           )}
//         </div>

//         {/* CTA */}
//         {ctaHref && (
//           <Reveal delay={150} className="mt-6 px-4 text-center">
//             <Link
//               href={ctaHref}
//               className="group inline-flex items-center gap-2 rounded-full bg-[#2D1C59] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2D1C59]/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3B2F66] hover:shadow-xl"
//             >
//               {ctaLabel}
//               <span
//                 aria-hidden="true"
//                 className="transition-transform duration-300 group-hover:translate-x-1"
//               >
//                 →
//               </span>
//             </Link>
//           </Reveal>
//         )}
//       </div>

//       <style>{`
//         @keyframes tm-scroll {
//           from { transform: translateX(0); }
//           to   { transform: translateX(-50%); }
//         }
//         @keyframes tm-scroll-rev {
//           from { transform: translateX(-50%); }
//           to   { transform: translateX(0); }
//         }
//         @keyframes tm-float {
//           0%, 100% { transform: translateY(0) scale(1); }
//           50%      { transform: translateY(-28px) scale(1.1); }
//         }
//         .tm-track {
//           display: flex;
//           width: max-content;
//           animation: tm-scroll linear infinite;
//           will-change: transform;
//         }
//         .tm-rev { animation-name: tm-scroll-rev; }
//         .tm-float { animation: tm-float 14s ease-in-out infinite; }
//         .tm-mask {
//           -webkit-mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
//           mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
//         }
//         .tm-marquee:hover .tm-track,
//         .tm-marquee:active .tm-track { animation-play-state: paused; }

//         @media (prefers-reduced-motion: reduce) {
//           .tm-track, .tm-float { animation: none !important; }
//           .tm-marquee { overflow-x: auto; }
//         }
//       `}</style>
//     </section>
//   );
// }














"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Play } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Stars from "./Stars";
import { VideoModal } from "@/views/feedback/FeedbackPage"; // path apne project ke hisaab se check kar lena
import {
  getPublicFeedbacksApi,
  rowsOf,
  customerOf,
  videoOf,
} from "@/services/feedbackService";

/* ---------- helpers ---------- */
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
const clean = (s = "") =>
  String(s)
    .replace(/^["“”'\s]+|["“”'\s]+$/g, "")
    .trim();

// Compare karne ke liye: lowercase, "..." hata ke
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

// Cloudinary video se thumbnail (first frame)
const posterOf = (url = "") =>
  url.includes("/video/upload/")
    ? url
        .replace("/video/upload/", "/video/upload/so_0,w_600,f_jpg/")
        .replace(/\.\w+$/, ".jpg")
    : "";

function Avatar({ name, pic }) {
  const [broken, setBroken] = useState(false);
  if (pic && !broken) {
    return (
      <img
        src={pic}
        alt=""
        loading="lazy"
        onError={() => setBroken(true)}
        referrerPolicy="no-referrer"
        className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-white"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#2D1C59] to-[#5B2FC2] font-serif text-sm font-semibold text-white ring-2 ring-white"
    >
      {(name || "C").charAt(0).toUpperCase()}
    </span>
  );
}

function VideoThumb({ poster, name, onPlay, hidden }) {
  const [failed, setFailed] = useState(false);
  return (
    <button
      type="button"
      onClick={onPlay}
      tabIndex={hidden ? -1 : 0}
      aria-label={`Play ${name} video testimonial`}
      className="group/v relative mb-3 block aspect-video w-full cursor-pointer overflow-hidden rounded-xl bg-[#E9E4F5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2D1C59]"
    >
      {failed || !poster ? (
        <span className="absolute inset-0 bg-gradient-to-br from-[#2D1C59] via-[#5B2FC2] to-[#B88B4A]" />
      ) : (
        <img
          src={poster}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-500 group-hover/v:scale-105"
        />
      )}
      <span className="absolute inset-0 bg-[#1A103F]/10 transition-colors group-hover/v:bg-[#1A103F]/20" />
      <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 group-hover/v:scale-110">
        <Play className="ml-0.5 h-4 w-4 fill-[#1A103F] text-[#1A103F]" aria-hidden="true" />
      </span>
    </button>
  );
}

function Card({ f, onPlay, hidden }) {
  const c = customerOf(f);
  const comment = clean(f.comment);
  const showTitle = f.title && !isDuplicate(f.title, f.comment);
  const vid = videoOf(f);

  return (
    <figure className="group relative flex h-full min-h-[210px] w-[250px] flex-col overflow-hidden rounded-2xl border border-[#2D1C59]/[0.06] bg-white p-5 shadow-[0_8px_24px_-12px_rgba(45,28,89,0.2)] transition-all duration-500 hover:-translate-y-2 hover:rotate-[0.6deg] hover:shadow-[0_22px_44px_-14px_rgba(45,28,89,0.35)] sm:min-h-[230px] sm:w-[290px] sm:p-6 lg:w-[320px]">
      {/* decorative quote mark (ek hi) */}
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="absolute right-4 top-4 h-9 w-9 fill-[#C5A265]/20 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-125"
      >
        <path d="M9.6 5C6.5 6.3 4 9.3 4 13.2V19h6.3v-6H7.5c0-2 1-3.5 2.6-4.4L9.6 5zm9 0c-3.1 1.3-5.6 4.3-5.6 8.2V19h6.3v-6h-2.8c0-2 1-3.5 2.6-4.4L18.6 5z" />
      </svg>

      {vid && (
        <VideoThumb
          poster={posterOf(vid)}
          name={c.name}
          hidden={hidden}
          onPlay={() =>
            onPlay?.({ src: vid, poster: posterOf(vid), name: c.name })
          }
        />
      )}

      <Stars value={Number(f.rating) || 0} size="h-3.5 w-3.5" />

      {showTitle && (
        <h3 className="mt-3 line-clamp-2 pr-8 font-serif text-lg leading-snug text-[#2D1C59]">
          {f.title}
        </h3>
      )}

      {comment ? (
        <p
          className={`flex-1 text-sm leading-relaxed text-[#4A5560] ${
            vid ? "line-clamp-2" : "line-clamp-4"
          } ${showTitle ? "mt-2" : "mt-3 pr-8"}`}
        >
          {comment}
        </p>
      ) : (
        <span className="flex-1" />
      )}

      <figcaption className="mt-4 flex items-center gap-3 border-t border-[#2D1C59]/[0.07] pt-3">
        <Avatar name={c.name} pic={picUrl(c.pic)} />
        <span className="truncate text-sm font-semibold capitalize text-[#2D1C59]">
          {c.name}
        </span>
      </figcaption>

      {/* bottom accent line (hover par khulti hai) */}
      <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#5B2FC2] via-[#C5A265] to-[#E8A948] transition-transform duration-500 group-hover:scale-x-100" />
    </figure>
  );
}

/* ---------- marquee row ---------- */
function Row({ list, reverse = false, onPlay }) {
  // chhoti list ko repeat karke row bhar do, phir 2 copies (seamless loop ke liye)
  const base = useMemo(() => {
    let b = list;
    while (b.length > 0 && b.length < 8) b = b.concat(list);
    return b;
  }, [list]);

  const track = useMemo(() => [...base, ...base], [base]);
  const duration = Math.max(34, base.length * 6);

  return (
    <div className="tm-marquee tm-mask relative overflow-hidden py-3">
      <div
        className={`tm-track ${reverse ? "tm-rev" : ""}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {track.map((f, i) => {
          const isCopy = i >= base.length;
          return (
            <div
              key={`${f.id}-${i}`}
              className="flex shrink-0 pr-4 sm:pr-5"
              aria-hidden={isCopy ? "true" : undefined}
            >
              <Card f={f} onPlay={onPlay} hidden={isCopy} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- section ---------- */
export default function TestimonialsSection({
  eyebrow = "Client Stories",
  title = "Words From Our Community",
  limit = 12,
  ctaHref,
  ctaLabel = "Share your experience",
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(null);

  const closeVideo = useCallback(() => setPlaying(null), []);

  useEffect(() => {
    let alive = true;
    getPublicFeedbacksApi({ page: 1, limit })
      .then((d) => alive && setItems(rowsOf(d)))
      .catch((e) => console.warn("Testimonials load failed:", e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [limit]);

  const rated = items.filter((f) => Number(f.rating) > 0);
  const avg = rated.length
    ? (rated.reduce((s, f) => s + Number(f.rating), 0) / rated.length).toFixed(1)
    : null;

  // koi Active feedback nahi hai to section chhupa do
  if (!loading && items.length === 0) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF9F5] via-[#F6F2FB] to-[#FBF9F5] py-14 sm:py-16 lg:py-20">
      {/* animated background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="tm-float absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#5B2FC2]/10 blur-3xl" />
        <span
          className="tm-float absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-[#E8A948]/15 blur-3xl"
          style={{ animationDelay: "-6s" }}
        />
      </div>

      <div className="relative">
        {/* Heading */}
        <Reveal className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#C5A265] sm:text-sm">
            {eyebrow.toUpperCase()}
          </p>
          <h2 className="mt-3 text-balance font-serif text-[clamp(1.9rem,4.6vw,3.1rem)] leading-tight text-[#2D1C59]">
            {title}
          </h2>

          {avg && (
            <div className="mt-5 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2 shadow-[0_6px_20px_-8px_rgba(45,28,89,0.25)]">
              <Stars value={Math.round(Number(avg))} size="h-4 w-4" />
              <span className="text-sm font-semibold text-[#2D1C59]">{avg}</span>
              <span className="text-sm text-[#6B7A90]">
                · {items.length} review{items.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </Reveal>

        {/* Marquee row */}
        <div className="mt-8 sm:mt-10">
          {loading ? (
            <div className="mx-auto flex max-w-6xl gap-4 overflow-hidden px-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 w-[250px] shrink-0 animate-pulse rounded-2xl bg-[#E9EEE3]/70 sm:w-[290px]"
                />
              ))}
            </div>
          ) : (
            <Row list={items} onPlay={setPlaying} />
          )}
        </div>

        {/* CTA */}
        {ctaHref && (
          <Reveal delay={150} className="mt-6 px-4 text-center">
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-full bg-[#2D1C59] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#2D1C59]/25 transition duration-300 hover:-translate-y-0.5 hover:bg-[#3B2F66] hover:shadow-xl"
            >
              {ctaLabel}
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        )}
      </div>

      {playing && (
        <VideoModal video={playing} name={playing.name} onClose={closeVideo} />
      )}

      <style>{`
        @keyframes tm-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes tm-scroll-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes tm-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50%      { transform: translateY(-28px) scale(1.1); }
        }
        .tm-track {
          display: flex;
          width: max-content;
          animation: tm-scroll linear infinite;
          will-change: transform;
        }
        .tm-rev { animation-name: tm-scroll-rev; }
        .tm-float { animation: tm-float 14s ease-in-out infinite; }
        .tm-mask {
          -webkit-mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 7%, #000 93%, transparent);
        }
        .tm-marquee:hover .tm-track,
        .tm-marquee:active .tm-track { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .tm-track, .tm-float { animation: none !important; }
          .tm-marquee { overflow-x: auto; }
        }
      `}</style>
    </section>
  );
}