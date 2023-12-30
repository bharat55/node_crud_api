const mongoose = require("mongoose");
const postSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: [true, "User id must be present"],
    },
    title: {
      type: String,
      required: [true, "title must be present"],
    },
    body: {
      type: String,
      required: [true, "post body must be present"],
    },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Post", postSchema);
