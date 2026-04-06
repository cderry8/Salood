const Category = require('../models/Category');
const Service = require('../models/Service');
const { defaultCategories } = require('../data/defaultCatalog');
const slugify = require('../utils/slugify');

const seedDefaultCategories = async () => {
  const count = await Category.countDocuments();
  if (count > 0) return;
  await Category.insertMany(defaultCategories);
};

const getCategories = async (req, res) => {
  try {
    await seedDefaultCategories();

    const categories = await Category.find().sort({ name: 1 });
    const serviceCounts = await Service.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
    ]);

    const countsMap = new Map(
      serviceCounts.map((entry) => [String(entry._id), entry.count])
    );

    const data = categories.map((category) => ({
      ...category.toObject(),
      serviceCount: countsMap.get(String(category._id)) || 0,
    }));

    res.status(200).json({
      success: true,
      data: { categories: data },
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching categories',
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name, icon } = req.body;
    const slug = slugify(name);

    if (!name?.trim() || !slug) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      });
    }

    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists',
      });
    }

    const category = await Category.create({
      name: name.trim(),
      slug,
      icon: icon?.trim() || '',
    });

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: { category },
    });
  } catch (error) {
    console.error('Create category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating category',
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, icon } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const nextName = (name ?? category.name).trim();
    const nextSlug = slugify(nextName);

    if (!nextName || !nextSlug) {
      return res.status(400).json({
        success: false,
        message: 'Category name is required',
      });
    }

    const existingCategory = await Category.findOne({
      _id: { $ne: id },
      slug: nextSlug,
    });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: 'Category with this name already exists',
      });
    }

    category.name = nextName;
    category.slug = nextSlug;
    category.icon = (icon ?? category.icon).trim();

    await category.save();

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: { category },
    });
  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating category',
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    const linkedServices = await Service.countDocuments({ category: category._id });
    if (linkedServices > 0) {
      return res.status(400).json({
        success: false,
        message:
          'Cannot delete category with active services. Move or delete those services first.',
      });
    }

    await category.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Category deleted successfully',
    });
  } catch (error) {
    console.error('Delete category error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting category',
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
