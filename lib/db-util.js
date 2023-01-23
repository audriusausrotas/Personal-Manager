import { MongoClient, ObjectId } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@personalmanager.j769tty.mongodb.net/?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertData(client, col, data) {
  const db = client.db("PersonalManager");
  const collection = db.collection(col);
  const result = await collection.insertOne(data);
  return result;
}

export async function getData(client, col, username) {
  const db = client.db("PersonalManager");
  const collection = db.collection(col);
  const result = await collection.find({ creator: username }).toArray();
  return result;
}

export async function getUser(client, col, user) {
  const db = client.db("PersonalManager");
  const collection = db.collection(col);
  const result = await collection.findOne({ username: user });
  return result;
}

export async function deleteData(client, col, itemID) {
  const db = client.db("PersonalManager");
  const collection = db.collection(col);
  const result = await collection.deleteOne({ _id: ObjectId(itemID) });
  return result;
}
