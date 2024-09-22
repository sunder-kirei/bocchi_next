"use client";

import React, { HTMLAttributes, useState } from "react";
import Image, { ImageProps } from "next/image";

interface Props extends ImageProps {}

export function ImageWithFallback({ src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      onError={() => {
        setImgSrc("/404.png");
      }}
      {...props}
    />
  );
}

export default ImageWithFallback;
