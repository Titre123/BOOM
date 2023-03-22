const {dbClient} = require('../db');

class Song {
  
    // query through the user collection and get a single user based on a query
  static async findSong(query) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('songs');
      const data = await collection.findOne(query);
      return data;
    }
    return null;
  }

    // query through the user collection and get a all user based on a query
  static async findSongs(query) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('songs');
      const data = await collection.find(query).toArray();
      return data;
    }
    return null;
  }

//   insert into the database a new user
  static async insertSong(song) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('songs');
      const data = await collection.insertOne(song);
      return data;
    }
    return null;
  }

//   update a user with an existing or a new field
  static async updateSong(song, changes) {
    if (dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('songs');
      const data = await collection.findOneAndUpdate(
        {_id: song._id},
        {$set: changes},
        {returnNewDocument: true}
      );
      return data.value;
    }
  }

//   delete user that match the query parameter
  static async deleteSong(query) {
    if(dbClient.isAlive() === true) {
      const collection = dbClient.db.collection('songs');
      const data = await collection.deleteMany(query);
    }
  }
}

module.exports = {Song};