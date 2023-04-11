const cloudinary = require('cloudinary').v2;
const express = require('express');
const dotenv = require("dotenv");
const multer = require('multer')
const fs = require('fs');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the storage engine. 
// The destination is the folder you want the uploaded file to be saved. You will have to create the destination folder yourself in the project folder.
const storage = multer.diskStorage({
  destination: './',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Set up multer instance.
// Limit is by default set to 1mb but using the limit property we can set it to 10MB
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } });

app.post('/upload', async (req, res) => {
// Use multer to handle file uploads
   upload.fields([
     { name: 'image', maxCount: 1 }
   ])(req, res, async (err) => {
       if (err) {
         return res.status(400).json({ error: err.message });
        }
      })
  // Retrieve uploaded files from request object
  console.log(req.files);
  console.log(req.body);
  const image = req.files.image[0];
  try{
    const response= await cloudinary.uploader.upload(image.path, {
      folder: 'images',
    })
    res.status(201).json({image: {public_id: response.public_id, url: response.secure_url}});
  }catch {
    res.status(500).json({ error: 'Internal Server Error' });
  }
  finally {
    fs.unlinkSync(image.path);
  }
})

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});