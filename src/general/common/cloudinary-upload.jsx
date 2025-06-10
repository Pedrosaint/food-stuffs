// CloudinaryUpload.js
const CloudinaryUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "emmextella_ent");
  formData.append("folder", "Dashboard/Adduser"); 

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/emmextella/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to upload image");
    }

    return data.secure_url; 
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error; 
  }
};

export default CloudinaryUpload;
