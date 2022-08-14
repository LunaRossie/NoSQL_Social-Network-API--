const { Course, User } = require("../models");

const courseController = {

    getAllCourse(req, res) {
        Course.find({})
          .populate({
            path: "directions",
            select: "-__v",
          })
          .select("-__v")
          .sort({ _id: -1 })
          .then((dbCourseData) => res.json(dbCourseData))
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },

      getCourseById({ params }, res) {
        Course.findOne({ _id: params.id })
          .populate({
            path: "directions",
            select: "-__v",
          })
          .select("-__v")
          .then((dbCourseData) => {
            if (!dbCourseData) {
              return res.status(404).json({ message: "No thought with this id!" });
            }
            res.json(dbCourseData);
          })
          .catch((err) => {
            console.log(err);
            res.sendStatus(400);
          });
      },

      createCourse({ params, body }, res) {
        Course.create(body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: body.userId },
              { $push: { courses: _id } },
              { new: true }
            );
          })
          .then((dbUserData) => {
            if (!dbUserData) {
              return res
                .status(404)
                .json({ message: "Course created but no user with this id!" });
            }
    
            res.json({ message: "Course successfully created!" });
          })
          .catch((err) => res.json(err));
      },

      updateCourse({ params, body }, res) {
        Course.findOneAndUpdate({ _id: params.id }, body, {
          new: true,
          runValidators: true,
        })
          .then((dbCourseData) => {
            if (!dbCourseData) {
              res.status(404).json({ message: "No course found with this id!" });
              return;
            }
            res.json(dbCourseData);
          })
          .catch((err) => res.json(err));
      },

      deleteCourse({ params }, res) {
        Course.findOneAndDelete({ _id: params.id })
          .then((dbCourseData) => {
            if (!dbCourseData) {
              return res.status(404).json({ message: "No course with this id!" });
            }

            return User.findOneAndUpdate(
                { courses: params.id },
                { $pull: { courses: params.id } }, //$pull removes from an existing values that match a specified condition.
                { new: true }
              );
            })
            .then((dbUserData) => {
              if (!dbUserData) {
                return res
                  .status(404)
                  .json({ message: "Course created but no user with this id!" });
              }
              res.json({ message: "Course successfully deleted!" });
            })
            .catch((err) => res.json(err));
        },

        addDirection({ params, body }, res) {
            Course.findOneAndUpdate(
              { _id: params.courseId },
              { $addToSet: { directions: body } },
              { new: true, runValidators: true }
            )
              .then((dbCourseData) => {
                if (!dbCourseData) {
                  res.status(404).json({ message: "No course with this id" });
                  return;
                }
                res.json(dbCourseData);
              })
              .catch((err) => res.json(err));
          },

          removeDirection({ params }, res) {
            Course.findOneAndUpdate(
              { _id: params.courseId },
              { $pull: { directions: { directionId: params.directionId } } },
              { new: true }
            )
              .then((dbCourseData) => res.json(dbCourseData))
              .catch((err) => res.json(err));
          },
        };
        
        module.exports = courseController;