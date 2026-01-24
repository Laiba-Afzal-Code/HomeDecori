import User from "../models/User.js";
import Post from "../models/Post.js";

export const getDashboardStats = async (req, res) => {
  try {
    /* 1️⃣ Basic stats */
    const usersCount = await User.countDocuments();
    const postsCount = await Post.countDocuments();

    /* 2️⃣ Active users (last 24 hours) */
    const activeUsers = await User.countDocuments({
      lastLogin: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    /* 3️⃣ Posts analytics (for chart) */
    const postsByDate = await Post.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    /* 4️⃣ Send response */
    res.json({
      users: usersCount,
      posts: postsCount,
      active: activeUsers,
      chart: postsByDate,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users (Admin only)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // remove passwords
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};