import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },

  email: {
    type: String,
    unique: true,
  },
});

const User = mongoose.model("user", userSchema);

export { User };
