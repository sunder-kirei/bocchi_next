import { adventurerNeutral } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export function genAvatar(seed?: string) {
  const avatar = createAvatar(adventurerNeutral, {
    seed: seed ?? Math.random().toString(36).substring(2, 17),
    backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "ffd5dc", "ffdfbf"],
  });
  return avatar;
}
