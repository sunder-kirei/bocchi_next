"use client";

import { House, Library, Search, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes, HTMLAttributes, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AppCommandDialog } from "../CommandDialog";
import { Button } from "../ui/button";
import React from "react";

function NavTile({
  className,
  children,
  active,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { active: boolean }) {
  return (
    <a
      className={twMerge(
        "flex gap-x-2 items-center text-white/50 px-2 py-2 rounded-full transition-colors text-nowrap hover:text-white",
        active && "text-white",
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function Nav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);

  const location = usePathname();

  function handleSearch() {
    setOpen(true);
  }

  return (
    <>
      <AppCommandDialog open={open} setOpen={setOpen} />

      <nav
        className={twMerge(
          "w-full sm:w-20 h-16 sm:h-full fixed bottom-0 sm:top-0 sm:left-0 z-10 duration-500 flex flex-row sm:flex-col items-center justify-center gap-4",
          className,
        )}
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,0.8016456582633054) 0%, rgba(255,255,255,0) 100%)`,
        }}
        {...props}
      >
        <Link href="/" className="hidden sm:block w-full h-fit p-0 m-8">
          <img src="/logo.png" alt="bocchi_logo" className="w-full" />
        </Link>

        <Button
          variant="ghost"
          className="rounded-full text-white/50 hover:text-white hover:bg-transparent"
          size="icon"
          onClick={handleSearch}
        >
          <Search />
        </Button>

        <NavTile href="/" active={`${location}` === "/" || location === ""}>
          <House />
        </NavTile>

        <NavTile href="/library" active={`${location}` === "/library"}>
          <Library />
        </NavTile>

        <NavTile
          href="/profile"
          active={`${location}` === "/profile"}
          className="sm:mt-auto sm:mb-8"
        >
          <UserRound />
        </NavTile>
      </nav>
    </>
  );
}
