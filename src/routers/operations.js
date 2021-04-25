const { Router } = require("express");

const router = Router();

const { findMethod } = require("../controllers/operation.controller");

router.route("/mrua").post(findMethod);

module.exports = router;
