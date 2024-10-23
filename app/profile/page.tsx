"use client";

import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { genAvatar } from "@/lib/genAvatar";

export default function ProfilePage() {
  const avatar = genAvatar();

  return (
    <Page className="flex flex-col items-center justify-center gap-2">
      <div
        dangerouslySetInnerHTML={{ __html: avatar.toString() }}
        className="aspect-square w-64 max-w-[80%] overflow-hidden"
      />
      <div>
        <Button variant="ghost" onClick={() => window.location.reload()}>
          Refresh to randomize dp
        </Button>
      </div>
    </Page>
  );
}
