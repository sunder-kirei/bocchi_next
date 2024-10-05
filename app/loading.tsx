import { Page } from "@/components/layout/Page";

export default function Loading() {
  return (
    <Page className="grid place-items-center">
      <div className="w-36 aspect-square animate-spin">
        <img src="/logo.png" alt="logo" className="w-full" />
      </div>
    </Page>
  );
}
