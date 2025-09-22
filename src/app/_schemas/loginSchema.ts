import z from "zod";

export const loginSchema =z.object({
    email:z.string().email("Invalid email address"),
    password:z.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
})

export type _loginSchema = z.infer<typeof loginSchema>;