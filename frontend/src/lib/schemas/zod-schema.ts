import { z } from 'zod';

export const patentSchema = z.object({
  applicationNumber: z.string().nullish(),
  publicationNumber: z.string().nullish(),
  title: z.string().nullish(),
  status: z.string().nullish(),
  country: z.string().nullish(),
  grantDate: z.string().nullish(),
  expirationDate: z.string().nullish(),
  sizeFamily: z.number().nonnegative().nullish(),
  numberCitations: z.number().nonnegative().nullish(),
  score: z.number().nullish(),
});

export type PatentSchema = typeof patentSchema;
