const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", require("./routes/Users"));
app.use("/api/projects", require("./routes/Projects"));
app.use("/api/tasks", require("./routes/Tasks"));

mongoose
  .connect(
    "mongodb+srv://admin:sensen45@cluster0.rty0n.mongodb.net/projectapp?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("MongoDB successfully connected!");
  })
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT}!`);
});
