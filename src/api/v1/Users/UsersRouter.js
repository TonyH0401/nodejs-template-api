// --------------------------
// Section: Package Requirements
// --------------------------
const router = require("express").Router();
const createError = require("http-errors");

// --------------------------
// Section: Custom Utils Requirements
// --------------------------

// --------------------------
// Section: Custom Middlewares
// --------------------------

// --------------------------
// Section: Users Middlewares
// --------------------------
const { createUser } = require("./UsersMiddleware");

// --------------------------
// Section: Users Routers
// --------------------------
router.route("/").get((req, res) => {
  return res.status(200).json({
    code: 1,
    success: true,
    message: "Default branch 🥚 of /users! ",
  });
});
router.route("/create").post(createUser);
/* 
I define and group other routes as follow:

router.route("/all").get(getAllUsers);
router
  .route("/user/:userId")
  .get(getUserById)
  .patch(validateUser, patchUserById)
  .delete(deleteUserById);
*/

// --------------------------
// Section: Users Error Handlers
// --------------------------
router
  .use((req, res, next) => {
    next(createError(404, "This /users directory does not exist!"));
  })
  .use((err, req, res, next) => {
    let errorStatus = err.status || 404;
    let errorMessage = err.message || "";
    return res.status(errorStatus).json({
      code: 0,
      success: false,
      message: errorMessage,
    });
  });

// --------------------------
// Section: Exports
// --------------------------
module.exports = router;
