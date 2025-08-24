import { z } from 'zod';



export const SignUpSchema = z.object({
        username : z.string().nonempty().regex(/^[a-zA-Z0-9]*$/,"String must contain only letters and numbers (no special characters)"),
        password : z.string().nonempty(),
        name : z.string().nonempty()
})

export const SignInSchema = z.object({
        username : z.string().nonempty().regex(/^[a-zA-Z0-9]*$/,"String must contain only letters and numbers (no special characters)"),
        password : z.string().nonempty(),
})

export const CreateRoomSchema = z.object({
        name : z.string().nonempty()
})