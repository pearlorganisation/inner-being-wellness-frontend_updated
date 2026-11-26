"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const FOCUSABLE =
  'button:not([disabled]), a[href], video[controls], [tabindex]:not([tabindex="-1"])';

/* video modal (portal, focus trap, inert background, Esc, scroll lock, focus restore) */
// video: { src, poster?, captions?: { src, srcLang?, label? } }
export default function VideoModal({ video, name, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const videoRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();
  const [error, setError] = useState(false);

  // Always call the latest onClose without re-running the setup effect.
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  // Reset the error state if a different video is passed without remounting.
  useEffect(() => {
    setError(false);
  }, [video.src]);

  // Setup / teardown: runs once on mount.
  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const body = document.body;
    const prevOverflow = body.style.overflow;
    const prevPaddingRight = body.style.paddingRight;
    const videoEl = videoRef.current;

    // Lock scroll without layout shift from the disappearing scrollbar.
    const scrollbarGap =
      window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (scrollbarGap > 0) body.style.paddingRight = `${scrollbarGap}px`;

    // Make everything except this modal's portal inert.
    const portalRoot = dialogRef.current?.closest("[data-video-modal-root]");
    const inertSiblings = [];
    Array.from(body.children).forEach((el) => {
      if (el === portalRoot || el.hasAttribute("inert")) return;
      el.setAttribute("inert", "");
      inertSiblings.push(el);
    });

    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;

      const nodes = dialogRef.current?.querySelectorAll(FOCUSABLE);
      if (!nodes?.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      // Focus escaped the dialog: pull it back in.
      if (!dialogRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPaddingRight;
      inertSiblings.forEach((el) => el.removeAttribute("inert"));
      videoEl?.pause();
      previouslyFocused?.focus?.();
    };
  }, []);

  return createPortal(
    <div
      data-video-modal-root
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onCloseRef.current()}
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
          onClick={() => onCloseRef.current()}
          aria-label="Close video"
          className="absolute right-2 top-2 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-[480px]:[@media(min-height:600px)]:-top-11 min-[480px]:[@media(min-height:600px)]:right-0 min-[480px]:[@media(min-height:600px)]:bg-white/15 min-[480px]:[@media(min-height:600px)]:hover:bg-white/30"
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
            key={video.src}
            ref={videoRef}
            src={video.src}
            poster={video.poster || undefined}
            className="max-h-[80vh] w-full rounded-2xl bg-black object-contain focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            controls
            autoPlay
            playsInline
            preload="metadata"
            onError={() => setError(true)}
          >
            {video.captions?.src && (
              <track
                kind="captions"
                src={video.captions.src}
                srcLang={video.captions.srcLang || "en"}
                label={video.captions.label || "English"}
                default
              />
            )}
          </video>
        )}
      </div>
    </div>,
    document.body
  );
}