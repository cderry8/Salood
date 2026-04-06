const { cloudinary, isCloudinaryConfigured } = require('../config/cloudinary');

const uploadFolder = () => process.env.CLOUDINARY_FOLDER || 'salood/services';

const uploadServiceImage = async (req, res) => {
  if (!isCloudinaryConfigured()) {
    return res.status(503).json({
      success: false,
      message:
        'Image uploads are not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.',
    });
  }

  if (!req.file?.buffer) {
    return res.status(400).json({
      success: false,
      message: 'Image file is required',
    });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        (error, uploadResult) => {
          if (error) reject(error);
          else resolve(uploadResult);
        },
        {
          folder: uploadFolder(),
          resource_type: 'image',
        }
      );
      stream.end(req.file.buffer);
    });

    res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload image',
    });
  }
};

module.exports = {
  uploadServiceImage,
};
