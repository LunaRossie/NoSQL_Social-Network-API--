const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const DirectionSchema = new Schema(
  {
    directionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    directionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const CourseSchema = new Schema(
  {
    courseText: {
      type: String,
      required: "Course is Required",
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => dateFormat(timestamp),
    },

    username: {
      type: String,
      required: true,
    },
    directions: [DirectionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

CourseSchema.virtual("directionCount").get(function () {
  return this.directions.length;
});

const Course = model("Course", CourseSchema);

module.exports = Course;