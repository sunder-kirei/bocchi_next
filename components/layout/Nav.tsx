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
        "flex items-center gap-x-2 text-nowrap rounded-full px-2 py-2 text-white/50 transition-colors hover:text-white",
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
          "fixed bottom-0 z-10 flex h-16 w-full flex-row items-center justify-center gap-4 antialiased duration-500 sm:left-0 sm:top-0 sm:h-full sm:w-20 sm:flex-col",
          className,
        )}
        style={{
          background: `linear-gradient(90deg, rgba(0,0,0,0.8016456582633054) 0%, rgba(255,255,255,0) 100%)`,
        }}
        {...props}
      >
        <Link href="/" className="m-8 hidden h-fit w-full p-0 sm:block">
          <img src="/logo.png" alt="bocchi_logo" className="w-full" />
        </Link>

        <Button
          variant="ghost"
          className="rounded-full text-white/50 hover:bg-transparent hover:text-white"
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
          className="sm:mb-8 sm:mt-auto"
        >
          <UserRound />
        </NavTile>
      </nav>
    </>
  );
}
