import express from "express";
import authRoutes from "./groups/auth"
const router = express.Router();

// Auth routes
router.use('/auth', authRoutes)


// User Resource Routes


// Form Resource Routes






router.get('/', (req, res) => {
  res.json('home')
})

export default router
