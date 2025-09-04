# Student Uploader

This project is a simple **Student Uploader** built with **Node.js**, **Express**, **MongoDB Atlas**, and **Cloudinary**.  
It allows you to upload student information (name, roll number) along with a photo, which gets stored on Cloudinary. The student data is saved in MongoDB Atlas.

---

## ⚡ Purpose

This code is primarily written to **test MongoDB Atlas and Cloudinary API integration**.  

- Upload a student with photo  
- Store student data in MongoDB  
- Upload and store photos in Cloudinary  

> **Important:** All API credentials must be set in a `.env` file.

---

## 📝 Setup Instructions

1. **Clone the repository**  

```bash
git clone <>
cd student-uploader

2. Install dependencies

npm install

Dependencies:

express

mongoose

dotenv

multer

multer-storage-cloudinary

cloudinary

nodemon (for development)

 3. Create .env file in the root folder and add your credentials

 # MongoDB Atlas Connection URI
MONGODB_URI=<your-mongodb-atlas-uri>

# Cloudinary Credentials
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>

# Server Port (optional)
PORT=5000


4. Start the server
npm run dev
# or
node index.js


node index.js

5. Open the frontend

Open public/index.html in your browser.

Fill the form to upload a student with a photo.

Check the students list below the form.
