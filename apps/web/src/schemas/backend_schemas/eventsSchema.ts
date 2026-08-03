import { z } from "zod";

export const EventSchema = z.object({
  title: z.string().min(1),
  date: z.string(),
  slug: z.string(),
  location: z.string().min(1),
});

export const EventsResponseSchema = z.object({
  success: z.boolean(),
  events: z.array(EventSchema),
});

export type Event = z.infer<typeof EventSchema>;

export type EventsResponse = z.infer<typeof EventsResponseSchema>;