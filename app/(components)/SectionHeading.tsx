import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
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
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="link"
            size="icon"
            className={twMerge(
              "flex w-fit items-end gap-x-2 more cursor-pointer justify-start",
              className
            )}
            {...props}
          >
            <h2 className="text-xl">{title}</h2>
            <div className={twMerge("flex items-end w-fit relative ")}>
              <ChevronRight className="" />
              <ChevronRight className="absolute bottom-0 left-0 move transition-all duration-300" />
            </div>
          </Button>
        </DialogTrigger>
        {dialogContent}
      </Dialog>

      {children}
    </>
  );
}
