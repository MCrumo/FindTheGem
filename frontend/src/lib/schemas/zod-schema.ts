import { array, z } from 'zod';

export const patentSchema = z.object({
  id: z.string().uuid(),
  applicationNumber: z.string().nullish(),
  title: z.string().nullish(),
  country: z.string().nullish(),
  sizePatentFamily: z.number().nonnegative().nullish(),
  numberOfCitations: z.number().nonnegative().nullish(),
  applicationFields: z.array(z.string()).nullish(), 
  status: z.string().nullish(),
  owner: z.string().nullish()
});

export type PatentSchema = typeof patentSchema;
