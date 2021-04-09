const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  project: {
    type: Schema.Types.ObjectId,
    ref: "projects",
    required: true,
  },
  taskName: {
    type: String,
    required: true,
  },
  dateDue: {
    type: Date,
  },
  assignee: {
    type: String,
  },
  status: {
    type: Boolean,
    default: false,
  },
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

TaskSchema.plugin(mongoosePaginate);

module.exports = Task = mongoose.model("tasks", TaskSchema);
