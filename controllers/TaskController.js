const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  const { id } = req.params;
  let { page } = req.query;
  const count = await Task.countDocuments({ project: id });
  page = parseInt(page) > count / 10 ? Math.ceil(count / 10) : page;
  await Task.paginate({ project: id }, { page: page }).then((tasks) =>
    res.json(tasks)
  );
};
exports.create = async (req, res) => {
  const { project, taskName, dateDue, assignee } = req.body.data;

  const NEW_TASK = new Task({
    project: project,
    taskName: taskName,
    dateDue: dateDue,
    assignee: assignee,
  });

  await NEW_TASK.save()
    .then((task) => res.json(task))
    .catch((err) => console.log(err));
};
exports.update = async (req, res) => {
  const { id, taskName, dateDue, assignee } = req.body.data;

  await Task.findOneAndUpdate(
    { _id: id },
    { $set: { taskName: taskName, dateDue: dateDue, assignee: assignee } },
    { new: true }
  )
    .then((task) => {
      res.json(task);
    })
    .catch((err) => console.log(err));
};
exports.complete = async (req, res) => {
  Task.findById(req.params.id).then((task) => {
    task.status = !task.status;
    task.save().then(() => res.json({ success: true }));
  });
};
exports.delete = async (req, res) => {
  Task.findByIdAndRemove(req.params.id).then(() => res.json({ success: true }));
};
