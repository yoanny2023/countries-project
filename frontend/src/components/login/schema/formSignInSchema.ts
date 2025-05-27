import {z} from "zod";

export const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password:z.string().min(8,"at least 8 characters")
})

export type formFields = z.infer<typeof formSchema>