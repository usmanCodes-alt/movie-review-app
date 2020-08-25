const mongoose = require("mongoose");
mongoose
  .connect("mongodb://127.0.0.1:27017/movie-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = mongoose;
