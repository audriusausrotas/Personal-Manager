import { connectDatabase, insertData } from "../../../lib/db-util";
import hashPassword from "../../../lib/auth";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, email, password, passwordRetype } = req.body;

    if (username.trim().length < 5) {
      res.status(422).json({ message: "Username is too short", code: 1 });
      return;
    } else if (!email.trim() || !email.includes("@")) {
      res.status(422).json({ message: "Wrong email address", code: 2 });
      return;
    } else if (password.trim().length < 7) {
      res.status(422).json({ message: "Password is too short", code: 3 });
      return;
    } else if (passwordRetype.trim().length < 7) {
      res.status(422).json({ message: "Passwords too short", code: 4 });
      return;
    } else if (password !== passwordRetype) {
      res.status(409).json({ message: "Passwords do not match", code: 5 });
      return;
    }

    let client;

    try {
      client = await connectDatabase();
      console.log("Connected successfully to server");
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed" });
      return;
    }

    try {
      const db = client.db("PersonalManager");
      const collection = db.collection("users");
      const resultUsername = await collection.findOne({ username: username });
      const resultEmail = await collection.findOne({ email: email });

      if (resultUsername || resultEmail) {
        res.status(422).json({ message: "User already exist" });
        return;
      }
    } catch (error) {
      res.status(404).json({ message: "Error while searching for user" });
      client.close();
      return;
    }

    const hashedPassword = await hashPassword(password);
    const newUser = {
      username: username,
      email: email,
      password: hashedPassword,
    };

    try {
      await insertData(client, "users", newUser);
      res.status(201).json({ message: "User created" });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }
  }
}
