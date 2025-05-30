import express  from "express";
import { createCategory, deleteCategories, getCategories } from "../controller/category.js";

const router = express.Router()

router.route('/create').post(createCategory)
router.route('/').get(getCategories)
router.route('/:id').get(deleteCategories)

export default router