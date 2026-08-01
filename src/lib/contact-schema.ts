import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter at least 2 characters"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message needs at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
