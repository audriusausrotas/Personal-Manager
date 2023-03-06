import {
  connectDatabase,
  insertData,
  getData,
  deleteData,
  updateDataMany,
} from "../../lib/db-util";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { website, user, email, password, creator } = req.body;

    const newData = {
      website: website,
      user: user,
      email: email,
      password: password,
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
      const response = await insertData(client, "passwords", newData);
      client.close();
      res
        .status(201)
        .json({ message: "Item added", newID: response.insertedId });
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
      const result = await getData(client, "passwords", username);
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
      const result = await deleteData(client, "passwords", itemID);
      client.close();
      res.status(201).json({ result: result });
    } catch (error) {
      res.status(500).json({ message: "Deleting data failed!" });
      return;
    }

    //////////////////////////////////////////////////////////////////
    // update request
  } else if (req.method === "PATCH") {
    const { itemID, website, user, email, password } = req.body;

    let client;

    try {
      client = await connectDatabase();

      console.log("Connected successfully to server");
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    const updateValue = {
      website: website,
      user: user,
      email: email,
      password: password,
    };

    try {
      const result = await updateDataMany(
        client,
        "passwords",
        itemID,
        updateValue
      );
      client.close();
      res.status(201).json({ result: result });
    } catch (error) {
      res.status(500).json({ message: "Updating data failed!" });
      return;
    }
  }
}
