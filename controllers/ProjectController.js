const Project = require("../models/Project");

exports.allProjects = async (req, res) => {
  let userProjects = [];

  await Project.find({}).then((projects) => {
    projects.map((project) => {
      project.teamMembers &&
        project.teamMembers.map((member) => {
          if (member.email === req.payload.email) {
            userProjects.push(project);
          }
        });
    });
  });
  await Project.find({ owner: req.payload.id })
    .then((projects) => {
      let allUserProjects = [...projects, ...userProjects];
      res.json(allUserProjects);
    })
    .catch((err) => console.log(err));
};
exports.getProject = async (req, res) => {
  await Project.findById(req.params.id).then((project) => res.json(project));
};
exports.create = async (req, res) => {
  let { projectName, members } = req.body.data;
  const NEW_PROJECT = new Project({
    owner: req.payload.id,
    name: projectName,
    teamMembers: members,
  });
  await NEW_PROJECT.save().then((project) => res.json(project));
};
exports.update = async (req, res) => {
  const { _id, projectName, teamMembers } = req.body.data;
  await Project.findOneAndUpdate(
    { _id: _id },
    { $set: { name: projectName, teamMembers: teamMembers } },
    { new: true }
  )
    .then((project) => {
      res.json(project);
    })
    .catch((err) => console.log(err));
};
exports.delete = async (req, res) => {
  await Project.findById(req.params.id).then((project) => {
    project.remove().then(() => res.json({ success: true }));
  });
};
