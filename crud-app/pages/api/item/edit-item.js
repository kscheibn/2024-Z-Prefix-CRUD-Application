// /api/user/edit-item
import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "bson";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    //only process PATCH requests
    return;
  }

  // only proceed if authenticated (i.e. session exists)
  const session = await getSession({ req: req });

  if (!session) {
    res
      .status(401)
      .json({ message: "Cannot edit item. User not authenticated." });
    return;
  }

  /* code above this line protects the api route. Code below this line just implements change item logic */

  const username = session.user.name;
  const itemId = req.body.itemId;
  const newTitle = req.body.newTitle;
  const newDescription = req.body.newDescription;
  const newQuantity = req.body.newQuantity;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ username: username });

  // ensure current session user exists in users collection
  if (!user) {
    res.status(401).json({ message: "Invalid user. Could not update item." });
    client.close();
    return;
  }

  if (!newTitle || !newDescription || !newQuantity) {
    res.status(401).json({ message: "Could not update item. Please include valid Title, Description, and Quanitity" });
    client.close();
    return;
  }

  const itemsCollection = client.db().collection("items");

  const result = await itemsCollection.updateOne(
    { _id: new ObjectId(itemId) },
    {
      $set: {
        title: newTitle,
        description: newDescription,
        quantity: newQuantity,
      },
    }
  );

  client.close();
  res.status(200).json({ message: "Item Updated" });
}

export default handler;
