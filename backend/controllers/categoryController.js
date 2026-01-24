import Category from "../models/Category.js";
import Newsletter from "../models/Newsletter.js";
import slugify from "slugify";

// Create new category
export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === "") {
      return res.status(400).json({ message: "Category name is required" });
    }

    const slug = slugify(name, { lower: true, strict: true });

    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({ name, slug });
    res.status(201).json(category);
  } catch (error) {
    console.error("Create category error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Get all categories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Newsletter subscription
export const getNewsletter = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  const exists = await Newsletter.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already subscribed" });

  await Newsletter.create({ email });
  res.status(201).json({ message: "Subscribed successfully" });
};

// Delete category
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.json({ message: "Category deleted successfully", id });
  } catch (err) {
    console.error("Delete category error:", err.message);
    res.status(500).json({ message: err.message });
  }
};
