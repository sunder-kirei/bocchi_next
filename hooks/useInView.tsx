import { MutableRefObject, useEffect, useState } from "react";

export function useInView(
  ref: MutableRefObject<null>,
  { amount = 0.5 }: { amount?: number },
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: amount,
      },
    );
    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return isInView;
}
