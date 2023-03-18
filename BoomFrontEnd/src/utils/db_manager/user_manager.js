import dbClient from "../db";

class User {
  
    // query through the user collection and get a single user based on a query
  async findUser(query) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('users');
      const data = await collection.findOne(query);
      return data;
    }
    return null;
  }

    // query through the user collection and get a all user based on a query
  async findUsers(query) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('users');
      const data = await collection.find(query).toArray();
      return data;
    }
    return null;
  }

//   insert into the database a new user
  async insertUser(user) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('users');
      const data = await collection.insertOne(user);
      return data;
    }
    return null;
  }

//   update a user with an existing or a new field
  async updateUser(user, field, value) {
    if (dbClient.isAlive() === true) {
      const collection = this.db.collection('users');
      const data = await collection.findOneAndUpdate(
        {_id: user._id},
        {$set: {[field]: value}},
        {returnNewDocument: true}
      );
      return data.value;
    }
  }

//   delete user that match the query parameter
  async deleteUser(query) {
    if(dbClient.isAlive() === true) {
      const collection = this.db.collection('users');
      const data = await collection.deleteMany(query);
    }
  }
}
