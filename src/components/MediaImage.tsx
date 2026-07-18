import Image from "next/image";

type MediaImageProps = {
  src: string;
  alt: string;
  className?: string;
  /** Aspect / size classes for the frame (ignored when fillParent) */
  aspect?: string;
  /** Stretch to fill positioned parent */
  fillParent?: boolean;
  priority?: boolean;
  sizes?: string;
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
  sizes = "(max-width: 768px) 100vw, 50vw",
  zoomOnHover = true,
  kenBurns = false,
  overlay = "none",
}: MediaImageProps) {
  return (
    <div
      className={`media-frame ${fillParent ? "absolute inset-0 h-full w-full" : aspect} ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
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
