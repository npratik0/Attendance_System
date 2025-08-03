// const cloudinary = require('cloudinary').v2;
// require('dotenv').config();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// module.exports = cloudinary;

// Add this to your cloudinaryConfig.js to debug
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Debug: Print what's being loaded
console.log('=== CLOUDINARY DEBUG ===');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET ? 'EXISTS' : 'MISSING');
console.log('========================');

// Check if values are undefined or empty
if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error('❌ CLOUDINARY_CLOUD_NAME is missing!');
}
if (!process.env.CLOUDINARY_API_KEY) {
    console.error('❌ CLOUDINARY_API_KEY is missing!');
}
if (!process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ CLOUDINARY_API_SECRET is missing!');
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Debug: Print the actual config being used
console.log('Cloudinary config:', cloudinary.config());

module.exports = cloudinary;