import {z} from 'zod'

export const categorySchema = z.object({
    name:z.string({message:"name is required"})
})
export const brandSchema = z.object({
    name:z.string({message:"name is required"})
})