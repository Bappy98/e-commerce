import express from 'express'
import authRouter from './auth.js'
import categoryRouter from './category.js'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/category',categoryRouter )

export default router