import { Page } from "@/components/layout/Page";
import { genAvatar } from "@/lib/genAvatar";

export default function ProfilePage() {
  const avatar = genAvatar();
  return (
    <Page className="">
      <div dangerouslySetInnerHTML={{ __html: avatar.toString() }} />
    </Page>
  );
}
