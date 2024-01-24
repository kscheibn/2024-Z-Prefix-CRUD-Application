import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from "../../../lib/auth";

// function to handle create-user POST requests
async function handler(req, res) {

  // only process POST requests
  if (req.method !== "POST") {
    return;
  }

  // obtain user input from Auth Form
  const { firstName, lastName, username, password } = req.body;

  // Ensure data exists in all fields
  if (!firstName || !lastName || !username || !password) {
    return res.status(422).json({ message: "Invalid input" });
  }

  // Connect to DB
  const client = await connectToDatabase();

  const db = client.db()

  // ensure username is not taken
  const existingUser = await db.collection("users").findOne({ username: username });

  if (existingUser) {
    res
      .status(422)
      .json({ message: "A user with the provided username already exists" });
    client.close();
    return;
  }

  // hash the password
  const hashedPassword = await hashPassword(password);

  // insert new user into DB
  const result = await db.collection("users").insertOne({
    firstName: firstName,
    lastName: lastName,
    username: username,
    password: hashedPassword,
  });

  res.status(201).json({ message: "New user created!" });

  client.close();
}

export default handler;
