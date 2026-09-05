const User = require("../models/User");
const { validateUserPayload } = require("../utils/validators");

// GET /api/users
async function getUsers(req, res, next) {
  try {
    const { search } = req.query;
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },//i for case insensitive
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(filter).sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    next(err);
  }
}

// GET /api/users/stats
async function getStats(req, res, next) {
  try {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);// 7 days

    const [totalUsers, activeUsers, addedThisWeek] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ status: "active" }),
      User.countDocuments({ createdAt: { $gte: oneWeekAgo } }),
    ]);

    res.json({
      totalUsers,
      activeUsers,
      inactiveUsers: totalUsers - activeUsers,
      addedThisWeek,
    });
  } catch (err) {
    next(err);
  }
}

// GET
async function getUserById(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
}

// POST
async function createUser(req, res, next) {
  try {
    const { isValid, errors } = validateUserPayload(req.body);
    if (!isValid) return res.status(400).json({ message: "Validation failed", errors });

    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Validation failed",
        errors: { email: "A user with this email already exists" },
      });
    }
    next(err);
  }
}

// PUT /api/users/:id
async function updateUser(req, res, next) {
  try {
    const { isValid, errors } = validateUserPayload(req.body, { partial: true });
    if (!isValid) return res.status(400).json({ message: "Validation failed", errors });

    // Ignore fields a client shouldn't be able to overwrite directly.
    const { _id, createdAt, updatedAt, __v, ...updates } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        message: "Validation failed",
        errors: { email: "A user with this email already exists" },
      });
    }
    next(err);
  }
}

// DELETE /api/users/:id
async function deleteUser(req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", id: user._id });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getUsers,
  getStats,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
