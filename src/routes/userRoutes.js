const userRouter = require("express").Router();
const { getOneUser } = require("../middlewares/userMiddlewares");

const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userAddReview,
} = require("../controllers/userControllers");

userRouter.post("/create", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUser, getUser);
userRouter.patch("/:id", getOneUser, updateUser);
userRouter.delete("/:id", getOneUser, deleteUser);

module.exports = userRouter;
