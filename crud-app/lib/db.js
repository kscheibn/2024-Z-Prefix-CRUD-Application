import { MongoClient } from "mongodb";

// utility function for connecting to database
export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://manu:nextjs@cluster0.gukqfme.mongodb.net/users?retryWrites=true&w=majority"
  );
  return client;
}
