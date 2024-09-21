import { z } from "zod";

export const queryAnimeSchema = z.object({
  query: z.string({ required_error: "Query string is required" }),
});

export type QueryAnime = z.infer<typeof queryAnimeSchema>;
