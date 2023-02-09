import {
  connectDatabase,
  insertData,
  getData,
  deleteData,
} from "../../lib/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { task, creator } = req.body;

    const newData = {
      task: task,
      creator: creator,
    };

    let client;

    try {
      client = await connectDatabase();
      console.log("Connected successfully to server");
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      const response = await insertData(client, "todo", newData);
      client.close();
      res
        .status(201)
        .json({ message: "Task added", newID: response.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    /////////////////////////////////////////////////////////////////
    // get request
  } else if (req.method === "GET") {
    let client;
    const username = req.query.username;

    try {
      client = await connectDatabase();
      console.log("Connected successfully to server");
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      const result = await getData(client, "todo", username);
      client.close();
      res.status(201).json({ result: result });
    } catch (error) {
      res.status(500).json({ message: "Error when getting data" });
      return;
    }

    //////////////////////////////////////////////////////////////////
    // delete request
  } else if (req.method === "DELETE") {
    const { itemID } = req.body;
    let client;

    try {
      client = await connectDatabase();

      console.log("Connected successfully to server");
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      const result = await deleteData(client, "todo", itemID);
      client.close();
      res.status(201).json({ result: result });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
  }
}
