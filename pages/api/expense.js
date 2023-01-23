import {
  connectDatabase,
  insertData,
  getData,
  deleteData,
} from "../../lib/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { price, description, date, income, creator } = req.body;
    const newData = {
      price,
      description,
      date,
      income,
      creator,
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
      const response = await insertData(client, "expense", newData);
      client.close();
      res
        .status(201)
        .json({ message: "Expense added", newID: response.insertedId });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
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
      const result = await getData(client, "expense", username);
      client.close();
      res.status(201).json({ result: result });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
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
      const result = await deleteData(client, "expense", itemID);
      client.close();
      res.status(201).json({ result: result });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
  }
}
