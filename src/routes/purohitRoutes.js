const express = require("express")

const router = express.Router()

const {
  createPurohit,
  getPurohits,
  updatePurohit,
  deletePurohit
} = require("../controllers/purohitController")

router.post("/", createPurohit)

router.get("/", getPurohits)

router.put("/:id", updatePurohit)

router.delete("/:id", deletePurohit)

module.exports = router
