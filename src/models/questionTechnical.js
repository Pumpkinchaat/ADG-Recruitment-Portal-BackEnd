const mongoose = require("mongoose");

const QuestionTechnicalSchema = mongoose.Schema({
  questionDescription: {
    type: String,
    required: true,
  },
  options: {
    a: {
      type: String,
      required: true,
    },
    b: {
      type: String,
      required: true,
    },
    c: {
      type: String,
      required: true,
    },
    d: {
      type: String,
      required: true,
    },
  },
  correctOption: {
    type: String,
  },
  questionImage: {
    url: String,
    filename: String,
  },
  yearofstudy: {
    type: Number,
    required: [true, "Please Specify which Year the questions are made for!"],
  },
  // difficulty: {
  //   type: String,
  //   enum:['Easy','Hard','Medium'],
  //   required: [true,'Please Provide a Difficulty Level Amongst the Given Options']
  // }
});

QuestionTechnicalSchema.post("findOneAndDelete" , async function (tQuestion) {
  await cloudinary.uploader.destroy(tQuestion.questionImage.filename);
})

module.exports = mongoose.model("tQuestion", QuestionTechnicalSchema);
