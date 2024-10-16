import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends HTMLAttributes<HTMLElement> {
  title: string;
  dialogContent?: ReactNode;
}

export function SectionHeading({
  className,
  title,
  children,
  dialogContent,
  ...props
}: Props) {
  return (
    <div className={twMerge("mb-2 flex h-full items-center", className)}>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            size="icon"
            className={twMerge(
              "more flex w-fit cursor-pointer items-center justify-start gap-x-2",
            )}
            {...props}
          >
            <h2 className="text-xl">{title}</h2>
            <div className={twMerge("relative flex w-fit items-end")}>
              <ChevronRight className="" />
              <ChevronRight className="move absolute bottom-0 left-0 transition-all duration-300" />
            </div>
          </Button>
        </DialogTrigger>
        {dialogContent}
      </Dialog>

      {children}
    </div>
  );
}
