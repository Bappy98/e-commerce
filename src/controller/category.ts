import { Request,Response } from "express"
import { categorySchema } from "../validation/productValidation.js"
import prisma from "../config/db.config.js"
import { formatError } from "../helper.js"
import { ZodError } from "zod"
export const createCategory = async(req:Request,res:Response):Promise<any> =>{
    try {
        const body = req.body
        const payload = categorySchema.parse(body)
        
        const newCategory = await prisma.category.create({
            data:{
                name:payload.name
            }
        })
        res.status(201).json(newCategory)
    } catch (error) {
        if(error instanceof ZodError) {
            return res.status(400).json(formatError(error))
        }
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const getCategories = async(req:Request,res:Response):Promise<any> =>{
    try {
       const categories = await prisma.category.findMany()
       res.status(200).json(categories) 
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const deleteCategories = async(req:Request,res:Response):Promise<any> =>{
    const {id} = req.params
    try {
        const category = await prisma.category.delete({
            where:{
                id:Number(id)
            }
        })
    } catch (error) {
        
    }
}