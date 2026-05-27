const express = require("express")

const router = express.Router()

const {
  createPuja,
  getPujas,
  updatePuja,
  deletePuja
} = require("../controllers/pujaController")

router.post("/", createPuja)

router.get("/", getPujas)

router.put("/:id", updatePuja)

router.delete("/:id", deletePuja)

module.exports = router
