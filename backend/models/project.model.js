const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    projectLanguage: {
      type: String,
      required: true,
      enum: ["python", "java", "javascript", "cpp", "c", "go", "bash"],
    },
    code: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", projectSchema);
