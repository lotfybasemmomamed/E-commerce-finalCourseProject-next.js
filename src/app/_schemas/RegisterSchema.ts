import z from "zod";

export const registerSchema =z.object({
    name:z.string().min(2,"name must be more than 2 charecters"),
    email:z.string().email("Invalid email address"),
    password:z.string().regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
      ),
      rePassword:z.string().min(8,"Confirm password is required"),
      phone: z.string().regex(/^01[0125][0-9]{8}$/, "Invalid phone number"),
}).refine(data=>data.password===data.rePassword,{
    message:"password not matching",
    path:["rePassword"]
})

export type _registerSchema = z.infer<typeof registerSchema>;