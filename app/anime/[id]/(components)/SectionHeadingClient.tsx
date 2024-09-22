"use client";

import { SectionHeading } from "@/app/(components)/SectionHeading";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
}

export function SectionHeadingClient({ className, title, ...props }: Props) {
  return (
    <SectionHeading title={title} className={twMerge("mt-4 mb-2", className)} />
  );
}
