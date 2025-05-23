import {z} from "zod";

export const formSchema = z.object(
   {
  name: z.string().min(2,"Enter at least 2 characters"),
  email:z.string().email("Invalid email"),
  password:z.string().min(8,"Use at least 8 characters"),
  confirmPassword:z.string().min(8,"Use at least 8 characters"),
}
).refine((data) => { return data.password === data.confirmPassword},
{
  message:"Password does not match!",
  path: ["confirmPassword"]
})

export type formFields = z.infer<typeof formSchema>