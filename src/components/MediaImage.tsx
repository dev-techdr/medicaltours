import Image from "next/image";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Aspect / size classes for the frame (ignored when fillParent) */
  aspect?: string;
  /** Stretch to fill positioned parent */
  fillParent?: boolean;
  /** @deprecated Prefer `preload` in Next.js 16+ */
  priority?: boolean;
  /** Preload in <head> for LCP heroes */
  preload?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  loading?: "eager" | "lazy";
  sizes?: string;
  /** next/image quality 1–100; must be in next.config images.qualities */
  quality?: number;
  zoomOnHover?: boolean;
  kenBurns?: boolean;
  overlay?: "navy" | "navy-soft" | "hero" | "none";
};

export function MediaImage({
  src,
  alt,
  className = "",
  aspect = "aspect-[4/3]",
  fillParent = false,
  priority = false,
  preload = false,
  fetchPriority,
  loading,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality = 75,
  zoomOnHover = true,
  kenBurns = false,
  overlay = "none",
}: MediaImageProps) {
  return (
    <div
      className={`media-frame ${
        fillParent ? "absolute inset-0 min-h-full min-w-full" : aspect
      } ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        {...(preload
          ? { preload: true }
          : priority
            ? { priority: true }
            : {})}
        {...(fetchPriority ? { fetchPriority } : {})}
        {...(loading ? { loading } : {})}
        quality={quality}
        sizes={sizes}
        className={`media-img ${zoomOnHover ? "media-img-hover" : ""} ${
          kenBurns ? "media-ken-burns" : ""
        }`}
      />
      {overlay === "navy" && <div className="media-overlay media-overlay-navy" aria-hidden />}
      {overlay === "navy-soft" && (
        <div className="media-overlay media-overlay-navy-soft" aria-hidden />
      )}
      {overlay === "hero" && <div className="media-overlay media-overlay-hero" aria-hidden />}
    </div>
  );
}
