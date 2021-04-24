const { Router } = require("express");

const router = Router();

const { findVelocuty } = require("../controllers/operation.controller");

router.route("/mrua").get(findVelocuty);

module.exports = router;
