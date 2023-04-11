const axios = require('axios');
const {ObjectId} = require('mongodb');
const {Song} = require('../utils/db_manager/song_manager');
const {User} = require('../utils/db_manager/user_manager');
const {dbClient} = require('../utils/db');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const fs = require('fs');

// Set the storage engine
const storage = multer.diskStorage({
  destination: './',
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

// Check if file type is acceptable
const fileFilter = function(req, file, cb) {
  // List of acceptable MIME types for images and audio
  const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const audioMimeTypes = ['audio/mpeg', 'audio/wav', 'audio/x-wav', 'audio/mp3', 'audio/x-mpeg'];
  
  // Check if the file MIME type is in the acceptable list of image or audio types
  if (imageMimeTypes.includes(file.mimetype) || audioMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
};

// Set up multer instance
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 10 * 1024 * 1024 } });

// find song by Id
async function findSongById(songId) {
  return await Song.findSong({ _id: new ObjectId(songId) });
}

class songController {

    static async postSong(req, res) {
      // Use multer to handle file uploads
      upload.fields([
        { name: 'songFile', maxCount: 1 },
        { name: 'songThumbnail', maxCount: 1 }
      ])(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        // Retrieve form data from request body
        const body = req.body;
        if (!req.body || !req.files) {
          return res.status(400).json({ error: 'Form not filled' });
        } 

        // Check if files were uploaded
        if (!req.files || !req.files.songFile || !req.files.songThumbnail) {
          return res.status(400).json({ error: 'Song file or thumbnail are required' });
        }

        if (!req.body.songTitle || !req.body.songArtiste ) {
          return res.status(400).json({ error: 'Song title or artiste are required' });
        }

        if (!req.body.songGenre || !req.body.songReleaseDate) {
          return res.status(400).json({ error: 'Song genre or release date are required' });
        }

        // Retrieve uploaded files from request object
        const songFile = req.files.songFile[0];
        const songThumbnail = req.files.songThumbnail[0];

        // Get authorization header and user info
        const [bearer, credentials] = req.headers.authorization.split(' ');
        const response = await axios.get('https://taiwotriumphant.eu.auth0.com/userinfo', {
          headers: {
            authorization: `Bearer ${credentials}`
          }
        });

        // Configuration 
        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET,
        });

        try {
          console.log(body);
          console.log(req.files);
          const songResponse = await cloudinary.uploader.upload(songFile.path, {
            resource_type: "raw",
            folder: 'songs',
          });

          const thumbnailResponse = await cloudinary.uploader.upload(songThumbnail.path, {
            folder: 'thumbnails',
          });

          const find_user = await User.findUser({ email: response.data.email });
          if (find_user === null || find_user === undefined) {
            return res.status(400).json({ error: 'User does not exist' });
          }

          const find_song = await Song.findSong({ songTitle: body.songTitle, songArtiste: body.songArtiste });
          if (find_song === null || find_song === undefined) {
            const toInsert = {
              ...body,
              userId: find_user._id,
              songThumbnail: {
                public_id: thumbnailResponse.public_id,
                url: thumbnailResponse.secure_url,
              },
              songFile: {
                public_id: songResponse.public_id,
                url: songResponse.secure_url,
              }
            };
            const result = await Song.insertSong(toInsert);
            const song = await findSongById(result.insertedId);
            res.status(201).json(song);
          } else {
            return res.status(400).json({ error: 'Song already exists' });
          }
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } finally {
          // Delete uploaded files from server
          fs.unlinkSync(songFile.path);
          fs.unlinkSync(songThumbnail.path);
        }
      });
    }

    static async getSongs(req, res) {
      try{
        const findSongs = await Song.findSongs({});
        if(!findSongs) {
          return res.status(400).json({'error': 'No Song Exists'});
        }
        res.status(200).json(findSongs);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    static async getSong(req, res) {
      try{
        const findSong = await findSongById(req.params.id);
        if(!findSong) {
          return res.status(400).json({'error': 'Song not found'});
        }
        res.status(201).json(findSong);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    static async updateSong(req, res) {
      // Use multer to handle file uploads
      upload.fields([
        { name: 'songFile', maxCount: 1 },
        { name: 'songThumbnail', maxCount: 1 }
      ])(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        // Retrieve form data from request body
        const body = req.body;
        if (!req.body || !req.files) {
          return res.status(400).json({ error: 'Form not filled' });
        } 

        // Check if files were uploaded
        if (!req.files || !req.files.songFile || !req.files.songThumbnail) {
          return res.status(400).json({ error: 'Song file or thumbnail are required' });
        }

        if (!req.body.songTitle || !req.body.songArtiste ) {
          return res.status(400).json({ error: 'Song title or artiste are required' });
        }

        if (!req.body.songGenre || !req.body.songReleaseDate) {
          return res.status(400).json({ error: 'Song genre or release date are required' });
        }

        // Retrieve uploaded files from request object
        const songFile = req.files.songFile[0];
        const songThumbnail = req.files.songThumbnail[0];

        // Get authorization header and user info
        const [bearer, credentials] = req.headers.authorization.split(' ');
        const response = await axios.get('https://taiwotriumphant.eu.auth0.com/userinfo', {
          headers: {
            authorization: `Bearer ${credentials}`
          }
        });

        // Configuration 
        cloudinary.config({
          cloud_name: process.env.CLOUD_NAME,
          api_key: process.env.API_KEY,
          api_secret: process.env.API_SECRET,
        });

        try {
          const songResponse = await cloudinary.uploader.upload(songFile.path, {
            resource_type: "raw",
            folder: 'songs',
          });

          const thumbnailResponse = await cloudinary.uploader.upload(songThumbnail.path, {
            folder: 'thumbnails',
          });

          const find_user = await User.findUser({ email: response.data.email });
          if (!find_user) {
            return res.status(400).json({ error: 'User does not exist' });
          }

          const find_song = await findSongById(req.params.id);
          if (!find_song) {
            return res.status(401).json({error: 'Song does not exist'});
          }
          if (find_user._id.toString() != find_song.userId.toString()) {
            return res.status(401).json({error: 'Unauthorized'});
          }
          const result = await Song.updateSong(find_song, {
            ...body,
            userId: find_user._id,
            songThumbnail: {
              public_id: thumbnailResponse.public_id,
              url: thumbnailResponse.secure_url,
            },
            songFile: {
              public_id: songResponse.public_id,
              url: songResponse.secure_url,
            }
          })
          const new_song = await findSongById(req.params.id);
          res.status(201).json({'prev': result, 'current': new_song})
        } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Internal Server Error' });
        } finally {
          // Delete uploaded files from server
          fs.unlinkSync(songFile.path);
          fs.unlinkSync(songThumbnail.path);
        }
      });
    }

    // delete the user from db based on id
  static async deleteSong(req, res) {
    try {
      const song = await findSongById(req.params.id);
      if(!song) {
        return res.status(400).json({'error': 'Song not found'});
      }
      await Song.deleteSong({_id: new ObjectId(req.params.id)});
      res.status(200).json({'message': 'Song deleted', song: song});
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    } 
  }

  static async addPlay() {
    try{
      const song = await findSongById(req.params.id);
      if(!song) {
        return res.status(400).json({'error': 'Song not found'});
      }
      if (!song.hasOwnProperty('plays')) {
        await dbClient.db.collection('songs').findOneAndUpdate(
        {_id: song._id},
        { $set: { [plays]: 1 } })
      }
      if (song.plays > 0) {
        await dbClient.db.collection('songs').findOneAndUpdate(
        {_id: song._id},
        { $inc: { [plays]: 1 } })
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = {songController}