import z from "zod";

export const checkoutSchema = z.object({
  phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
  details: z.string().min(5, "Enter your address"),
  city: z.string().min(2, "Enter your city"),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
