import NextAuth from "next-auth";
import { connectToDatabase } from "../../../lib/db";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../lib/auth";

// authentication/credentials provider for hanlding user sign-ins
export default NextAuth({
  session: { jwt: true },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = await client.db().collection("users");
        const user = await usersCollection.findOne({
          username: credentials.username,
        });

        if (!user) {
          client.close();
          throw new Error("No user found");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          client.close();
          throw new Error("Incorrect Password");
        }

        client.close();
        return { name: credentials.username };
      },
    }),
  ],
});
