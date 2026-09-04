/**
 * Format Indian Price into readable format (e.g. 1.25 Cr, 85 Lakhs, or ₹ 4,500)
 */
export const formatPrice = (price) => {
  if (price === undefined || price === null || isNaN(price)) return 'Price on Request';
  const num = Number(price);
  if (num >= 10000000) {
    return `₹ ${(num / 10000000).toFixed(2)} Cr`;
  }
  if (num >= 100000) {
    return `₹ ${(num / 100000).toFixed(2)} Lakhs`;
  }
  return `₹ ${num.toLocaleString('en-IN')}`;
};

/**
 * Generate official WhatsApp pre-filled contact link
 * Official Number: +919917970750
 */
export const getWhatsAppLink = (propertyTitle = '', customMsg = '') => {
  const phone = '919917970750';
  let text = 'Hello Mahalaxmi Property, I would like to inquire about your real estate services.';
  
  if (propertyTitle) {
    text = `Hello Mahalaxmi Property, I am interested in "${propertyTitle}". Please share more details and arrange a call/visit.`;
  } else if (customMsg) {
    text = customMsg;
  }
  
  return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
};

/**
 * Format date string into human readable format
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};

/**
 * Image Validator (Max 5 files, Max 500 KB per file, valid extensions)
 */
export const validateImageFile = (file) => {
  const maxSize = 500 * 1024; // 500 KB
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return 'Only JPG, JPEG, PNG and WEBP images are allowed.';
  }
  if (file.size > maxSize) {
    return 'Image size must be 500 KB or less.';
  }
  return null;
};
