export const handleChange = (key, value, setFormData) => {
  setFormData((prev) => ({
    ...prev,
    [key]: value,
  }));
};

export const handleImagesUpload = (e, images, MAX_CAT_IMAGES, setImages) => {
  const files = Array.from(e.target.files);
  if (images.length >= MAX_CAT_IMAGES) return;

  const remaining = MAX_CAT_IMAGES - images.length;
  setImages((prev) => [...prev, ...files.slice(0, remaining)]);
};

export const removeImage = (index, setImages) => {
  setImages((prev) => prev.filter((_, i) => i !== index));
};

export const handleVaccineUpload = (
  e,
  vaccineImages,
  MAX_VACCINE_IMAGES,
  setVaccineImages,
) => {
  const files = Array.from(e.target.files);
  if (vaccineImages.length >= MAX_VACCINE_IMAGES) return;

  const remaining = MAX_VACCINE_IMAGES - vaccineImages.length;
  setVaccineImages((prev) => [...prev, ...files.slice(0, remaining)]);
};

export const removeVaccineImage = (index, setVaccineImages) => {
  setVaccineImages((prev) => prev.filter((_, i) => i !== index));
};
