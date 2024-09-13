const userRouter = require("express").Router();
const { getOneUser } = require("../middlewares/userMiddlewares");

const {
  registerUser,
  loginUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getOneUser, getUser);
userRouter.patch("/:id", getOneUser, updateUser);
userRouter.delete("/:id", getOneUser, deleteUser);

module.exports = userRouter;
