import { MongoClient } from "mongodb";

let clientPromise = null;

function getClient() {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not set in .env");
  }
  if (!clientPromise) {
    const client = new MongoClient(process.env.MONGODB_URI);
    clientPromise = client.connect().then(() => client);
  }
  return clientPromise;
}

export async function getDb() {
  const client = await getClient();
  return client.db(process.env.MONGODB_DB_NAME || "lwsa");
}
