const Category = require('../models/Category');
const Service = require('../models/Service');
const { defaultServices } = require('../data/defaultCatalog');

const mapService = (service) => ({
  ...service.toObject(),
  category: service.category
    ? {
        _id: service.category._id,
        name: service.category.name,
        slug: service.category.slug,
        icon: service.category.icon,
      }
    : null,
});

const seedDefaultServices = async () => {
  const count = await Service.countDocuments();
  if (count > 0) return;

  for (const service of defaultServices) {
    const category = await Category.findOne({ slug: service.categorySlug });
    if (!category) continue;

    await Service.create({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: service.image,
      emoji: service.emoji,
      category: category._id,
    });
  }
};

const getServices = async (req, res) => {
  try {
    await seedDefaultServices();

    const { category } = req.query;
    const query = {};

    if (category) {
      const categoryDoc = await Category.findOne({ slug: category });
      if (!categoryDoc) {
        return res.status(200).json({
          success: true,
          data: { services: [] },
        });
      }
      query.category = categoryDoc._id;
    }

    const services = await Service.find(query)
      .populate('category', 'name slug icon')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: { services: services.map(mapService) },
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching services',
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      'category',
      'name slug icon'
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { service: mapService(service) },
    });
  } catch (error) {
    console.error('Get service by id error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching service',
    });
  }
};

const createService = async (req, res) => {
  try {
    const { name, description, price, duration, image, emoji, categoryId } = req.body;

    if (!name?.trim() || !categoryId) {
      return res.status(400).json({
        success: false,
        message: 'Service name and category are required',
      });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(400).json({
        success: false,
        message: 'Selected category does not exist',
      });
    }

    const service = await Service.create({
      name: name.trim(),
      description: description?.trim() || '',
      price: Number(price) || 0,
      duration: Number(duration) || 0,
      image: image?.trim() || '',
      emoji: emoji?.trim() || '',
      category: category._id,
    });

    const populated = await service.populate('category', 'name slug icon');

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: { service: mapService(populated) },
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating service',
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, duration, image, emoji, categoryId } = req.body;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) {
        return res.status(400).json({
          success: false,
          message: 'Selected category does not exist',
        });
      }
      service.category = category._id;
    }

    if (typeof name === 'string') service.name = name.trim();
    if (typeof description === 'string') service.description = description.trim();
    if (price !== undefined) service.price = Number(price);
    if (duration !== undefined) service.duration = Number(duration);
    if (typeof image === 'string') service.image = image.trim();
    if (typeof emoji === 'string') service.emoji = emoji.trim();

    await service.save();
    const populated = await service.populate('category', 'name slug icon');

    res.status(200).json({
      success: true,
      message: 'Service updated successfully',
      data: { service: mapService(populated) },
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating service',
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found',
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting service',
    });
  }
};

module.exports = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
