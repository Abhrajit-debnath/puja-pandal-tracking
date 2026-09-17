import * as z from 'zod';


export const locationSchema = z.object({
  latitude: z.coerce.number()
    .min(-90, { message: "Latitude must be between -90 and 90" })
    .max(90, { message: "Latitude must be between -90 and 90" }),
  longitude: z.coerce.number()
    .min(-180, { message: "Longitude must be between -180 and 180" })
    .max(180, { message: "Longitude must be between -180 and 180" })
});

export type LocationQueryParams = z.infer<typeof locationSchema>;


export const pandalIdSchema = z.object({
    id: z.string().min(1, "Pandal id is required"),
});

export type PandalIdParam = z.infer<typeof pandalIdSchema>;



const crowdLevelEnum = z.enum(["CALM", "BUSY", "PACKED"]);

export const checkinSchema = z.object({
  crowdLevel : crowdLevelEnum,
})

export type CheckinBody = z.infer<typeof checkinSchema>;