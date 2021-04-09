const express = require("express");
const router = express.Router();
const auth = require("../auth");
const ProjectController = require("../controllers/ProjectController");

router.get("/", auth, ProjectController.allProjects);
router.get("/:id", auth, ProjectController.getProject);
router.post("/create", auth, ProjectController.create);
router.patch("/update", auth, ProjectController.update);
router.delete("/delete/:id", auth, ProjectController.delete);

module.exports = router;
