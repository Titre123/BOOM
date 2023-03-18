import dbClient from "../db";

class Song {
  
    // query through the user collection and get a single user based on a query
  async findSong(query) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('songs');
      const data = await collection.findOne(query);
      return data;
    }
    return null;
  }

    // query through the user collection and get a all user based on a query
  async findSongs(query) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('songs');
      const data = await collection.find(query).toArray();
      return data;
    }
    return null;
  }

//   insert into the database a new user
  async insertSong(song) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('songs');
      const data = await collection.insertOne(song);
      return data;
    }
    return null;
  }

//   update a user with an existing or a new field
  async updateSong(song, field, value) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('songs');
      const data = await collection.findOneAndUpdate(
        {_id: song._id},
        {$set: {[field]: value}},
        {returnNewDocument: true}
      );
      return data.value;
    }
  }

//   delete user that match the query parameter
  async deleteSong(query) {
    if(dbClient.isAlive() === true) {
      const collection = this.db.collection('songs');
      const data = await collection.deleteMany(query);
    }
  }
}
