import { Page } from "@/components/layout/Page";

export default function Loading() {
  return (
    <Page className="grid min-h-screen place-items-center">
      <div className="aspect-square w-36 animate-bounce">
        <img src="/logo.png" alt="logo" className="w-full" />
      </div>
    </Page>
  );
}
