import express from "express";
const router = express.Router();

router.get('/', (req, res) => {
  res.json('Authorization route')
})

router.post('/login', (req, res) => {
  res.json('Logged in!')
})


export default router
