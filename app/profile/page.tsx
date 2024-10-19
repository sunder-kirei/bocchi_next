import { Page } from "@/components/layout/Page";
import { createAvatar } from "@dicebear/core";
import { adventurerNeutral } from "@dicebear/collection";
import { genAvatar } from "@/lib/genAvatar";

export default function ProfilePage() {
  const avatar = genAvatar();
  return (
    <Page className="">
      <div dangerouslySetInnerHTML={{ __html: avatar.toString() }} />
    </Page>
  );
}
