const dbClient = require("../db");

class Playlist {
  
    // query through the user collection and get a single user based on a query
  static async findPlaylist(query) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('playlists');
      const data = await collection.findOne(query);
      return data;
    }
    return null;
  }

    // query through the user collection and get a all user based on a query
  static async findPlaylists(query) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('playlists');
      const data = await collection.find(query).toArray();
      return data;
    }
    return null;
  }

//   insert into the database a new user
  static async insertPlaylist(playlist) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('playlists');
      const data = await collection.insertOne(playlist);
      return data;
    }
    return null;
  }

//   update a user with an existing or a new field
  static async updatePlaylist(playlist, changes) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('playlists');
      const data = await collection.findOneAndUpdate(
        {_id: playlist._id},
        {$set: changes},
        {returnNewDocument: true}
      );
      return data.value;
    }
  }

// delete user that match the query parameter
  static async deletePlaylist(query) {
    if(dbClient.isAlive() === true) {
      const collection = this.db.collection('playlists');
      const data = await collection.deleteMany(query);
    }
  }
}

module.exports = {Playlist};
