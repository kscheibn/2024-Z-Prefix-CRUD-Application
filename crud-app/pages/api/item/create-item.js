import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../../lib/db";

// function for handling create-item requests
async function handler(req, res) {
  // only process POST requests
  if (req.method !== "POST") {
    return;
  }
  
  // ensure user is authenticated prior to proceeding
  const session = await getSession({ req: req });
  if (!session) {
    res
      .status(401)
      .json({ message: "Cannot create item. User not authenticated." });
    return;
  }

  // obtain item data from New Item form
  const { title, description, quantity } = req.body;

  // ensure data exists in all three fields
  if (!title || !description || !quantity) {
    res.status(422).json({
      message:
        "Invalid input. Please enter item Title, Description, and Quantity",
    });
    return;
  }

  // obtain current user from session data 
  const currentUser = session.user;

  const client = await connectToDatabase();

  const db = client.db();

  // insert item into DB
  const result = await db.collection("items").insertOne({
    title: title,
    description: description,
    quantity: quantity,
    user: currentUser.name,
  });

  res.status(201).json({ message: "New item created!" });

  client.close();
}

export default handler;
