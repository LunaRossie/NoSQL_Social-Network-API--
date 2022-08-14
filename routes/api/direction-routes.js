const router = require("express").Router();
const {
  getAllCourse,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addDirection,
  removeDirection,
} = require("../../controllers/course-controller");
router.route("/").get(getAllCourse).post(createCourse);
router
  .route("/:id")
  .get(getCourseById)
  .put(updateCourse)
  .delete(deleteCourse);
router.route("/:courseId/directions").post(addDirection);
router.route("/:courseId/directions/:directionId").delete(removeDirection);

module.exports = router;