"use client";

import { ImgHTMLAttributes, useState } from "react";

type Props = ImgHTMLAttributes<HTMLImageElement> & {};

export function ImageWithFallback({ src, alt, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={() => {
        setImgSrc("/404.png");
      }}
      {...props}
    />
  );
}

export default ImageWithFallback;
