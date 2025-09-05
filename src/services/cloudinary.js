const CLOUDINARY_CONFIG = {
  cloudName: 'dkzklcr1a',
  apiKey: '554786875375222',
  apiSecret: 'a6fIKpWqjmGmvhq_sZTWGYRVfXo',
  uploadPreset: 'foto_product'
};

export const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );
    
    const data = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw error;
  }
};

export default CLOUDINARY_CONFIG;