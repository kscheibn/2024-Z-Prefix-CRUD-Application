import { getSession } from "next-auth/client";
import { connectToDatabase } from "../../../lib/db";
import { ObjectId } from "bson";

// function for handling delete-item requests
async function handler(req, res) {

  // only process DELETE requests
  if (req.method !== "DELETE") {
    return;
  }

  // ensure user is authenticated prior to proceeding
  const session = await getSession({ req: req });
  if (!session) {
    res
      .status(401)
      .json({ message: "Cannot delete item. User not authenticated." });
    return;
  }

  // obtain item data from New Item form
  const { itemId } = req.body;

  // ensure data exists in all three fields
  if (!itemId) {
    res.status(422).json({
      message: "Could not retrieve Item ID for deletion.",
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  // Delete item from DB
  const result = await db
    .collection("items")
    .deleteOne({ _id: new ObjectId(itemId) });

  res.status(201).json({ message: "Item deleted" });

  client.close();
}

export default handler;
