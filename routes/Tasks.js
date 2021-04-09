const express = require("express");
const router = express.Router();
const auth = require("../auth");
const TaskController = require("../controllers/TaskController");

router.get("/:id", auth, TaskController.getTasks);
router.post("/create", auth, TaskController.create);
router.patch("/update", auth, TaskController.update);
router.patch("/complete/:id", auth, TaskController.complete);
router.delete("/delete/:id", auth, TaskController.delete);

module.exports = router;
