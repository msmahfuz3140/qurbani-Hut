import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "qurbani-hut";

function getDatabaseAdapter() {
  if (!mongoUri) {
    return undefined;
  }
  
  const client = new MongoClient(mongoUri);
  const db = client.db(dbName);
  
  return mongodbAdapter(db, {
    client,
  });
}

export const auth = betterAuth({
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET && {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectURI: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/auth/callback/google`,
      },
    }),
  },
  database: mongoUri ? getDatabaseAdapter() : undefined,
});