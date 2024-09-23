"use client";

import { useInView } from "@/hooks/useInView";
import { House, Scroll, Search } from "lucide-react";
import {
  AnchorHTMLAttributes,
  HTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { twMerge } from "tailwind-merge";
import { AppCommandDialog } from "../CommandDialog";
import { Button } from "../ui/button";

function NavTile({
  className,
  children,
  active,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { active: boolean }) {
  return (
    <a
      className={twMerge(
        "flex gap-x-2 items-center px-4 py-2 rounded-full transition-colors text-nowrap",
        active && "bg-primary",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

function NavBar({
  className,
  onClick,
  ...props
}: HTMLAttributes<HTMLElement> & { onClick: () => void }) {
  const [link, setLink] = useState("");

  useEffect(() => {
    function set() {
      const id = window.location.href.split("#");
      if (id.length > 1) setLink(id[1]);
    }
    window.addEventListener("popstate", set);
    set();

    return () => {
      window.removeEventListener("popstate", set);
    };
  }, []);

  return (
    <nav
      className={twMerge(
        "w-full h-fit p-4 z-[10000]  duration-500 flex items-center justify-center gap-x-4",
        className
      )}
      {...props}
    >
      <NavTile href="/" active={`${link}` === "/" || link === ""}>
        <House />
        Home
      </NavTile>
      <Button
        variant="ghost"
        className="rounded-full"
        size="icon"
        onClick={onClick}
      >
        <Search />
      </Button>

      <NavTile href="/my-list" active={`${link}` === "/my-list"}>
        <Scroll />
        My List
      </NavTile>
    </nav>
  );
}

export function Nav({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, {
    amount: 0.6,
  });

  function handleSearch() {
    setOpen(true);
  }

  return (
    <>
      <AppCommandDialog open={open} setOpen={setOpen} />

      <div
        className={twMerge("w-full h-fit z-[1000]", className)}
        {...props}
        ref={ref}
      >
        <NavBar
          className={twMerge(
            "",
            !isInView ? "opacity-0 -translate-y-32 scale-0" : "scale-100"
          )}
          onClick={handleSearch}
        />

        <NavBar
          className={twMerge(
            "fixed bottom-2 w-fit left-1/2 -translate-x-1/2 rounded-full bg-background shadow-secondary shadow",
            isInView ? "opacity-0  translate-y-32 scale-0" : "scale-100"
          )}
          onClick={handleSearch}
        />
      </div>
    </>
  );
}
