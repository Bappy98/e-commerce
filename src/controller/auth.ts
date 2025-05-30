import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/authValidation.js";
import prisma from "../config/db.config.js";
import bcrypt from "bcrypt";
import { ZodError } from "zod";
import { formatError } from "../helper.js";
import jwt from 'jsonwebtoken'

export const signUp = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = registerSchema.parse(body);
    const userExists = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (userExists) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    const salt = await bcrypt.genSalt(10);
    payload.password = await bcrypt.hash(payload.password, salt);
    const newUser = await prisma.user.create({
      data: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        // role: payload.role
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    if(error instanceof ZodError) {
        return res.status(400).json(formatError(error))
    }
    res.status(400).json(error);
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const body = req.body;
    const payload = loginSchema.parse(body);

    const userExists = await prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });
    if (!userExists) {
      return res.status(400).json({
        errors:{
          email:'no User found'
        }
      });
    }

    const compare = await bcrypt.compare(payload.password,userExists.password) 
    if(!compare) {
      return res.status(400).json({
        errors:{
          password:"password does not match"
        }
      })
    }

    const jwtPayload = {
      id:userExists?.id,
      name:userExists?.name,
      email:userExists?.email
    }
    const token = jwt.sign(jwtPayload,process.env.SECRET_KEY!,{
      expiresIn:'365d'
    })

    res.status(200).json({
      message:"Login successful",
      data:{
        ...jwtPayload,
        token:`Bearer ${token}`
      }
    })
    

  } catch (error) {
    if(error instanceof ZodError) {
      const errors = formatError(error)
      res.status(400).json({
        message:"Validation error",
        errors
      })
    }
     res.status(500).json({
            message: 'Internal Server Error'
        })
  }

}
