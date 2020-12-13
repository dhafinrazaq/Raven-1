const express = require("express");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./client/public/uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, file.filename);
  },
});

const upload = multer({ storage: storage });

// project model
const Project = require("../../models/Project");

// @route GET api/projects
// @desc get all projects
// @access public
router.get("/", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then((projects) => res.json(projects))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route POST api/projects
// @desc create a project
// @access public
router.post("/", (req, res) => {
  const newProject = new Project({
    name: req.body.name,
    description: req.body.description,
  });

  newProject.save().then((project) => res.json(project));
});

router.delete("/:id", (req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: true }))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route GET api/projects/:id
// @desc get a project
// @access public
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => res.status(404).json({ success: false }));
});

// @route PUT api/projects/:id
// @desc update a project
// @access public
router.put("/:id", (req, res) => {
  Project.findByIdAndUpdate(req.params.id, req.body, {
    returnOriginal: false,
    new: true,
  })
    .then((project) => res.json(project))
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;