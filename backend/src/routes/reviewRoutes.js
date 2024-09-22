const reviewRouter = require("express").Router();
const { getOneReview } = require("../middlewares/reviewMiddlewares");
const { authenticateToken } = require("../middlewares/authMiddleware");

const {
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
  addMovieReview,
} = require("../controllers/reviewControllers");

reviewRouter.get("/", getAllReviews);
reviewRouter.get("/:id", getOneReview, getReview);
reviewRouter.patch("/:id", getOneReview, updateReview);
reviewRouter.delete("/:id", getOneReview, deleteReview);
reviewRouter.post("/", authenticateToken, addMovieReview);

module.exports = reviewRouter;
