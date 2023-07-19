import Image from "next/image";
import { CSSProperties, ReactEventHandler } from "react";

export function NextImageContainer({
  src,
  alt,
  height,
  width,
  aspectRatio,
  style,
  objectFit,
  onError,
  onLoad,
}: {
  src: string;
  alt: string;
  style?: CSSProperties;
  height?: CSSProperties["height"];
  width?: CSSProperties["width"];
  aspectRatio?: CSSProperties["aspectRatio"];
  objectFit?: CSSProperties["objectFit"];
  onError?: ReactEventHandler<HTMLImageElement>;
  onLoad?: ReactEventHandler<HTMLImageElement>;
}) {
  return (
    <div style={{ aspectRatio, width, height, position: "relative", ...style }}>
      <Image
        alt={alt}
        src={src}
        fill
        style={{ objectFit }}
        onError={onError}
        onLoad={onLoad}
      />
    </div>
  );
}
