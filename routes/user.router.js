import express from "express"
import { getAllData, addData, getByIdData, updateByIdData, deleteByIdData } from "../controllers/users.controller.js"
const router = express.Router()


router.post("/", addData)


router.get("/", getAllData)

router.get("/:id", getByIdData)

router.put("/:id", updateByIdData)

router.delete("/:id", deleteByIdData)

export default router