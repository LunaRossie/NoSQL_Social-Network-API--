const router = require("express").Router();
const {
  getAllCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addReaction,
  removeReaction,
} = require("../../controllers/course-controller");
router.route("/").get(getAllCourse).post(createCourse);
router
  .route("/:id")
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);
router.route("/:courseId/reactions").post(addReaction);
router.route("/:courseId/reactions/:reactionId").delete(removeReaction);

module.exports = router;