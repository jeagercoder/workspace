import z from '.'


export const CreateProjectValidator = z.object({
    name: z.string().min(3).max(150),
    description: z.string().min(3).max(150),
    color: z.string().length(7)
})
